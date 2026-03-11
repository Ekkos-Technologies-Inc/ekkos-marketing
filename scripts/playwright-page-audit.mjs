#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium, devices } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const cwd = process.cwd();
const appDir = path.join(cwd, 'app');
const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3001';
const outputDir = path.join(cwd, 'audit', 'playwright');

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, '-');
const jsonPath = path.join(outputDir, `audit-${stamp}.json`);
const mdPath = path.join(outputDir, `audit-${stamp}.md`);
const latestJsonPath = path.join(outputDir, 'audit-latest.json');
const latestMdPath = path.join(outputDir, 'audit-latest.md');

function unique(items) {
  return [...new Set(items)];
}

async function discoverRoutes(dir, relative = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];

  const hasPageFile = entries.some((entry) => entry.isFile() && (entry.name === 'page.tsx' || entry.name === 'page.ts'));
  if (hasPageFile) {
    const segments = relative
      .split(path.sep)
      .filter(Boolean)
      .filter((segment) => !segment.startsWith('(') && !segment.startsWith('@'));

    if (!segments.some((segment) => segment.includes('[')) && !segments.includes('api')) {
      routes.push(`/${segments.join('/')}`.replace(/\/$/, '') || '/');
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_')) continue;
    const childRelative = relative ? path.join(relative, entry.name) : entry.name;
    const childRoutes = await discoverRoutes(path.join(dir, entry.name), childRelative);
    routes.push(...childRoutes);
  }

  return unique(routes).sort();
}

function trimText(value, max = 140) {
  if (!value) return '';
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function summarizeAxe(violations) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact || 'unknown',
    description: trimText(v.description, 180),
    help: v.help,
    helpUrl: v.helpUrl,
    nodes: v.nodes.length,
  }));
}

const ignoredConsoleErrorPatterns = [
  /WebGL context could not be created/i,
  /Error creating WebGL context/i,
];

function isIgnoredConsoleError(text) {
  return ignoredConsoleErrorPatterns.some((pattern) => pattern.test(text));
}

function isIgnoredNetworkIssue(url) {
  return /\/_vercel\/insights\/script\.js(\?|$)/.test(url);
}

async function auditPage(context, route, profileName) {
  const page = await context.newPage();
  const url = `${baseUrl}${route}`;

  const consoleErrors = [];
  const ignoredConsoleErrors = [];
  const consoleWarnings = [];
  const requestFailures = [];
  const responseErrors = [];

  page.on('console', (msg) => {
    const type = msg.type();
    const payload = {
      type,
      text: trimText(msg.text(), 300),
      location: msg.location(),
    };
    if (type === 'error') {
      const locationUrl = payload.location?.url || '';
      if (isIgnoredConsoleError(payload.text) || isIgnoredNetworkIssue(locationUrl)) {
        ignoredConsoleErrors.push(payload);
      } else {
        consoleErrors.push(payload);
      }
    }
    if (type === 'warning') consoleWarnings.push(payload);
  });

  page.on('requestfailed', (req) => {
    if (isIgnoredNetworkIssue(req.url())) return;
    requestFailures.push({
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType(),
      failureText: req.failure()?.errorText || 'unknown',
    });
  });

  page.on('response', (res) => {
    const status = res.status();
    if (status >= 400 && !isIgnoredNetworkIssue(res.url())) {
      responseErrors.push({
        url: res.url(),
        status,
        resourceType: res.request().resourceType(),
      });
    }
  });

  const startedAt = Date.now();
  let mainStatus = null;
  let navError = null;

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    mainStatus = response?.status() ?? null;
  } catch (error) {
    navError = String(error);
  }

  let dom = null;
  let axeSummary = [];
  let axeViolations = [];

  if (!navError) {
    try {
      await page.waitForTimeout(750);
      dom = await page.evaluate(() => {
        const getAttr = (selector, attr) => document.querySelector(selector)?.getAttribute(attr) || '';
        const title = document.title || '';
        const description = getAttr('meta[name="description"]', 'content');
        const canonical = getAttr('link[rel="canonical"]', 'href');
        const lang = document.documentElement.getAttribute('lang') || '';
        const viewport = getAttr('meta[name="viewport"]', 'content');
        const h1s = [...document.querySelectorAll('h1')].map((n) => n.textContent?.trim() || '').filter(Boolean);
        const images = [...document.querySelectorAll('img')];
        const missingAlt = images
          .filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt')?.trim() === '')
          .map((img) => img.getAttribute('src') || '[inline]');

        const anchorIssues = [...document.querySelectorAll('a[href^="#"]')]
          .map((a) => a.getAttribute('href') || '')
          .filter((href) => href.length > 1)
          .filter((href) => !document.querySelector(href))
          .slice(0, 20);

        return {
          title,
          description,
          canonical,
          lang,
          viewport,
          h1s,
          missingAlt,
          anchorIssues,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
          internalLinks: [...document.querySelectorAll('a[href]')]
            .map((a) => a.getAttribute('href') || '')
            .filter((href) => href.startsWith('/') && !href.startsWith('//')),
        };
      });

      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      axeViolations = axe.violations;
      axeSummary = summarizeAxe(axe.violations);
    } catch (error) {
      navError = navError || `Audit extraction failed: ${String(error)}`;
    }
  }

  await page.close();

  return {
    route,
    profile: profileName,
    url,
    startedAt: new Date(startedAt).toISOString(),
    durationMs: Date.now() - startedAt,
    mainStatus,
    navError,
    dom,
    axe: {
      violationCount: axeViolations.length,
      summary: axeSummary,
      criticalCount: axeViolations.filter((v) => v.impact === 'critical').length,
      seriousCount: axeViolations.filter((v) => v.impact === 'serious').length,
      moderateCount: axeViolations.filter((v) => v.impact === 'moderate').length,
      minorCount: axeViolations.filter((v) => v.impact === 'minor').length,
    },
    consoleErrors,
    ignoredConsoleErrors,
    consoleWarnings,
    requestFailures,
    responseErrors,
  };
}

function severityForResult(result) {
  if (result.navError) return 'critical';
  if (result.mainStatus && result.mainStatus >= 500) return 'critical';
  if (result.mainStatus && result.mainStatus >= 400) return 'high';
  if (result.requestFailures.length > 0) return 'high';
  if (result.axe.criticalCount > 0 || result.axe.seriousCount > 0) return 'high';
  if ((result.dom?.missingAlt.length || 0) > 0) return 'medium';
  if (!result.dom?.title || !result.dom?.description || (result.dom?.h1s.length || 0) !== 1) return 'medium';
  if (result.consoleErrors.length > 0) return 'medium';
  if (result.consoleWarnings.length > 0 || result.axe.moderateCount > 0 || result.axe.minorCount > 0) return 'low';
  return 'pass';
}

function buildFindings(results) {
  const findings = [];

  for (const r of results) {
    const label = `${r.route} (${r.profile})`;
    if (r.navError) {
      findings.push({ severity: 'critical', page: label, issue: `Navigation failed: ${trimText(r.navError, 260)}` });
      continue;
    }
    if (r.mainStatus && r.mainStatus >= 400) {
      findings.push({ severity: r.mainStatus >= 500 ? 'critical' : 'high', page: label, issue: `HTTP status ${r.mainStatus}` });
    }
    if (r.requestFailures.length > 0) {
      findings.push({ severity: 'high', page: label, issue: `${r.requestFailures.length} network request(s) failed` });
    }
    if (r.responseErrors.length > 0) {
      findings.push({ severity: 'high', page: label, issue: `${r.responseErrors.length} response(s) returned 4xx/5xx` });
    }
    if (r.consoleErrors.length > 0) {
      findings.push({ severity: 'medium', page: label, issue: `${r.consoleErrors.length} console error(s)` });
    }
    if (!r.dom?.title) {
      findings.push({ severity: 'medium', page: label, issue: 'Missing document title' });
    }
    if (!r.dom?.description) {
      findings.push({ severity: 'medium', page: label, issue: 'Missing meta description' });
    }
    if ((r.dom?.h1s.length || 0) !== 1) {
      findings.push({ severity: 'medium', page: label, issue: `Expected 1 h1, found ${r.dom?.h1s.length || 0}` });
    }
    if ((r.dom?.missingAlt.length || 0) > 0) {
      findings.push({ severity: 'medium', page: label, issue: `${r.dom.missingAlt.length} image(s) missing alt text` });
    }
    if (r.dom?.horizontalOverflow) {
      findings.push({ severity: 'medium', page: label, issue: 'Horizontal overflow detected (layout spills viewport)' });
    }
    if ((r.dom?.anchorIssues.length || 0) > 0) {
      findings.push({ severity: 'low', page: label, issue: `${r.dom.anchorIssues.length} in-page anchor(s) target missing` });
    }
    if (r.axe.criticalCount + r.axe.seriousCount > 0) {
      findings.push({
        severity: 'high',
        page: label,
        issue: `A11y violations: ${r.axe.criticalCount} critical, ${r.axe.seriousCount} serious`,
      });
    } else if (r.axe.moderateCount + r.axe.minorCount > 0) {
      findings.push({
        severity: 'low',
        page: label,
        issue: `A11y violations: ${r.axe.moderateCount} moderate, ${r.axe.minorCount} minor`,
      });
    }
  }

  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity] || a.page.localeCompare(b.page));
}

function asMarkdown(report) {
  const lines = [];
  lines.push('# Playwright End-to-End Page Audit');
  lines.push('');
  lines.push(`- Generated: ${report.generatedAt}`);
  lines.push(`- Base URL: ${report.baseUrl}`);
  lines.push(`- Routes audited: ${report.routes.length}`);
  lines.push(`- Profiles: ${report.profiles.join(', ')}`);
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  lines.push(`- Pages checked (route x profile): ${report.results.length}`);
  lines.push(`- Critical findings: ${report.summary.critical}`);
  lines.push(`- High findings: ${report.summary.high}`);
  lines.push(`- Medium findings: ${report.summary.medium}`);
  lines.push(`- Low findings: ${report.summary.low}`);
  lines.push(`- Passes (no findings on page-profile): ${report.summary.passes}`);
  lines.push('');

  lines.push('## Findings');
  lines.push('');
  if (report.findings.length === 0) {
    lines.push('- None');
  } else {
    for (const finding of report.findings) {
      lines.push(`- [${finding.severity.toUpperCase()}] ${finding.page}: ${finding.issue}`);
    }
  }

  lines.push('');
  lines.push('## Per-Page Snapshot');
  lines.push('');
  for (const r of report.results) {
    const sev = severityForResult(r).toUpperCase();
    lines.push(`### ${r.route} (${r.profile}) [${sev}]`);
    lines.push(`- URL: ${r.url}`);
    lines.push(`- Status: ${r.mainStatus ?? 'n/a'}`);
    lines.push(`- Duration: ${r.durationMs} ms`);
    if (r.navError) {
      lines.push(`- Navigation error: ${trimText(r.navError, 220)}`);
      lines.push('');
      continue;
    }
    lines.push(`- Title: ${trimText(r.dom?.title || '(missing)', 120)}`);
    lines.push(`- Meta description: ${trimText(r.dom?.description || '(missing)', 120)}`);
    lines.push(`- H1 count: ${r.dom?.h1s.length || 0}`);
    lines.push(`- Missing image alt count: ${r.dom?.missingAlt.length || 0}`);
    lines.push(`- Console errors: ${r.consoleErrors.length}`);
    lines.push(`- Failed requests: ${r.requestFailures.length}`);
    lines.push(`- 4xx/5xx responses: ${r.responseErrors.length}`);
    lines.push(`- Axe violations: critical ${r.axe.criticalCount}, serious ${r.axe.seriousCount}, moderate ${r.axe.moderateCount}, minor ${r.axe.minorCount}`);

    if (r.axe.summary.length > 0) {
      for (const item of r.axe.summary.slice(0, 3)) {
        lines.push(`- Axe detail: [${item.impact}] ${item.id} (${item.nodes} node${item.nodes === 1 ? '' : 's'})`);
      }
    }

    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const routes = await discoverRoutes(appDir);

  if (routes.length === 0) {
    throw new Error('No static routes discovered in app/.');
  }

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });
  const results = [];
  const profiles = ['desktop', 'mobile'];

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobileContext = await browser.newContext({ ...devices['iPhone 13'] });

  for (const route of routes) {
    process.stdout.write(`Auditing ${route} (desktop)\n`);
    results.push(await auditPage(desktopContext, route, 'desktop'));
    process.stdout.write(`Auditing ${route} (mobile)\n`);
    results.push(await auditPage(mobileContext, route, 'mobile'));
  }

  await desktopContext.close();
  await mobileContext.close();
  await browser.close();

  const findings = buildFindings(results);
  const summary = {
    critical: findings.filter((f) => f.severity === 'critical').length,
    high: findings.filter((f) => f.severity === 'high').length,
    medium: findings.filter((f) => f.severity === 'medium').length,
    low: findings.filter((f) => f.severity === 'low').length,
    passes: results.filter((r) => severityForResult(r) === 'pass').length,
  };

  const report = {
    generatedAt: now.toISOString(),
    baseUrl,
    routes,
    profiles,
    results,
    findings,
    summary,
  };

  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), 'utf8');
  await fs.writeFile(latestJsonPath, JSON.stringify(report, null, 2), 'utf8');

  const markdown = asMarkdown(report);
  await fs.writeFile(mdPath, markdown, 'utf8');
  await fs.writeFile(latestMdPath, markdown, 'utf8');

  process.stdout.write(`\nAudit complete.\n`);
  process.stdout.write(`JSON: ${jsonPath}\n`);
  process.stdout.write(`Markdown: ${mdPath}\n`);
  process.stdout.write(`\nFindings: critical=${summary.critical}, high=${summary.high}, medium=${summary.medium}, low=${summary.low}, passes=${summary.passes}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

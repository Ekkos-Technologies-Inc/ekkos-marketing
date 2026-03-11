'use client';

import { ArrowRight, RefreshCw } from 'lucide-react';

interface LoopStepProps {
  step: string;
  name: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

export function LoopStep({
  step,
  name,
  description,
  delay = 0,
  isLast = false,
}: LoopStepProps) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="card flex-1 p-6 group relative top-glow animate-fade-in-up"
        style={{
          animationDelay: `${delay}s`,
          animationFillMode: 'both',
        }}
      >
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-shrink-0 w-10 h-10 clip-sm bg-[#00f0ff] flex items-center justify-center">
            <span className="text-[#0a0a0f] font-display text-sm font-bold">{step}</span>
          </div>
          <h3 className="text-xl font-display text-[#e8e8f0]">
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#7a7a8e] font-body text-sm leading-relaxed pl-14">
          {description}
        </p>
      </div>

      {/* Arrow or Loop Back */}
      {!isLast && (
        <ArrowRight className="flex-shrink-0 w-8 h-8 text-[#00f0ff] hidden md:block" />
      )}
      {isLast && (
        <div className="flex-shrink-0 hidden md:flex items-center justify-center w-12 h-12 clip-sm border border-[#00f0ff]/40 border-dashed animate-pulse-slow">
          <RefreshCw className="w-6 h-6 text-[#00f0ff]" />
        </div>
      )}
    </div>
  );
}

interface LoopDiagramProps {
  steps: Array<{
    step: string;
    name: string;
    description: string;
  }>;
}

export function LoopDiagram({ steps }: LoopDiagramProps) {
  return (
    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-1 md:gap-4">
      {steps.map((stepData, index) => (
        <LoopStep
          key={stepData.step}
          {...stepData}
          delay={index * 0.1}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}

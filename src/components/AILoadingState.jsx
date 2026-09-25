import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, Database, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { text: 'Analyzing your profile & skill matrix...', icon: Brain },
  { text: 'Matching your interests with domain taxonomies...', icon: Sparkles },
  { text: 'Evaluating 30+ live events & conference tracks...', icon: Database },
  { text: 'Synthesizing transparent recommendation factors...', icon: Cpu },
];

export default function AILoadingState() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round(((currentStage + 1) / STAGES.length) * 100);

  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-in">
      
      {/* Animated AI Core Pulse Rings */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-electric-500/10 border border-electric-500/30 flex items-center justify-center shadow-glow-lg animate-pulse-subtle">
          <div className="w-16 h-16 rounded-full bg-electric-600/20 border border-electric-400/40 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-electric-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>
        <div className="absolute -inset-3 rounded-full border border-electric-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Main Title */}
      <h3 className="text-xl font-bold text-white tracking-tight mb-2">
        Curating Your Recommendations
      </h3>
      <p className="text-xs text-slate-400 mb-6 max-w-sm">
        Our multi-factor engine is scoring relevance across your technical skills, experience tier, and recent activity.
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-dark-900 rounded-full h-2 p-0.5 border border-white/10 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-electric-500 via-indigo-500 to-electric-400 h-full rounded-full transition-all duration-500 ease-out shadow-glow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stage Checklist */}
      <div className="w-full space-y-2.5 text-left bg-dark-900/60 p-4 rounded-xl border border-white/[0.06]">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div 
              key={idx}
              className={`flex items-center space-x-3 text-xs transition-colors ${
                isDone 
                  ? 'text-emerald-400' 
                  : isCurrent 
                  ? 'text-white font-medium' 
                  : 'text-slate-500'
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-electric-400 animate-bounce' : 'text-slate-600'}`} />
                )}
              </div>
              <span className="truncate">{stage.text}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] font-mono text-slate-500">
        AI Provider: Adaptive Multi-Factor Engine
      </p>

    </div>
  );
}

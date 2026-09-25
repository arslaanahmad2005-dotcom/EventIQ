import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-electric-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm animate-slide-up">
      <div className="p-3.5 rounded-xl bg-dark-900/95 backdrop-blur-xl border border-white/10 shadow-2xl flex items-start space-x-3 text-xs text-white">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 font-medium leading-relaxed text-slate-200">
          {toast.message}
        </div>
      </div>
    </div>
  );
}

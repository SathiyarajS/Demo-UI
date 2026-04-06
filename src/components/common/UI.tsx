import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`premium-card ${className}`} {...props}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'info' }) => {
  const styles = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: { icon: any, title: string, description: string, actionLabel?: string, onAction?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
    <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
      <Icon size={48} />
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
      <p className="text-slate-500 max-w-sm mx-auto font-medium">{description}</p>
    </div>
    {actionLabel && (
      <button onClick={onAction} className="btn-primary py-3 px-8 shadow-xl">{actionLabel}</button>
    )}
  </div>
);

export const SuccessState = ({ title, description, actionLabel, onAction }: { title: string, description: string, actionLabel?: string, onAction?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-emerald-500/10">
      <CheckCircle2 size={48} />
    </div>
    <div className="space-y-2">
      <h3 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
      <p className="text-slate-500 max-w-sm mx-auto font-medium">{description}</p>
    </div>
    {actionLabel && (
      <button onClick={onAction} className="btn-primary py-3 px-8 shadow-xl">{actionLabel}</button>
    )}
  </div>
);

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Card } from '../common/UI';
import { THEMES, WeddingTheme } from '../../types';

interface CreateWeddingFlowProps {
  setCurrentScreen: (screen: string) => void;
  setCurrentTheme: (theme: WeddingTheme) => void;
  currentTheme: WeddingTheme;
}

export const CreateWeddingFlow = ({ setCurrentScreen, setCurrentTheme, currentTheme }: CreateWeddingFlowProps) => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="flex items-center gap-6">
        <button onClick={() => setCurrentScreen('dashboard')} className="p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-90">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-4xl font-bold tracking-tight">Create New Wedding</h1>
      </div>

      <div className="flex justify-between relative px-12">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold z-10 transition-all duration-500 ${
            step >= s ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-110' : 'bg-white border-2 border-slate-100 text-slate-300'
          }`}>
            {s}
          </div>
        ))}
      </div>

      <Card className="p-12">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Couple Details</h2>
              <p className="text-slate-500">Tell us about the lucky couple.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Couple Names</label>
                <input className="input-field" placeholder="e.g. Sarah & James" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Wedding Title</label>
                <input className="input-field" placeholder="e.g. The Smith-Jones Wedding" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">City</label>
                <input className="input-field" placeholder="e.g. New York" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Wedding Date</label>
                <input type="date" className="input-field" />
              </div>
            </div>
            <div className="pt-6">
              <button onClick={() => setStep(2)} className="btn-primary w-full py-4 text-lg">Next: Website Setup</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Website & Branding</h2>
              <p className="text-slate-500">Configure the digital home for the wedding.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Website URL Preview</label>
              <div className="flex items-center">
                <div className="px-6 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-2xl text-slate-500 text-sm font-medium">wedding.com/</div>
                <input className="input-field rounded-l-none" placeholder="sarah-james" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Planner Branding</label>
              <input className="input-field" placeholder="e.g. Elegant Events by Sarah" />
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <button onClick={() => setStep(1)} className="btn-secondary py-4">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary py-4">Next: Theme Selection</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Initial Theme</h2>
              <p className="text-slate-500">Select a starting theme. You can customize this later.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {THEMES.map(theme => (
                <button 
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme)}
                  className={`p-6 rounded-3xl border-2 transition-all text-left group ${
                    currentTheme.id === theme.id ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.primary }} />
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.accent }} />
                  </div>
                  <p className="font-bold text-lg">{theme.name}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{theme.fontFamily} style</p>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <button onClick={() => setStep(2)} className="btn-secondary py-4">Back</button>
              <button onClick={() => setCurrentScreen('dashboard')} className="btn-primary py-4">Create Wedding</button>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

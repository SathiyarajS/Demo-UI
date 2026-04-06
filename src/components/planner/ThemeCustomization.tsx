import React from 'react';
import { motion } from 'motion/react';
import { Eye, Palette as PaletteIcon, CheckCircle2, Smartphone, Globe } from 'lucide-react';
import { Card } from '../common/UI';
import { Wedding, WeddingTheme, THEMES } from '../../types';

interface ThemeCustomizationProps {
  selectedWedding: Wedding;
  currentTheme: WeddingTheme;
  setCurrentTheme: (theme: WeddingTheme) => void;
  setAppMode: (mode: any) => void;
}

export const ThemeCustomization = ({ selectedWedding, currentTheme, setCurrentTheme, setAppMode }: ThemeCustomizationProps) => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Theme Customization</h1>
        <p className="text-slate-500 mt-1">Customizing theme for {selectedWedding.coupleNames}</p>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setAppMode('GUEST')} className="btn-secondary flex items-center gap-2">
          <Eye size={20} />
          <span>Preview Website</span>
        </button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 space-y-8">
        <Card className="p-8 space-y-8">
          <div>
            <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
              <PaletteIcon size={22} className="text-slate-400" />
              Preset Wedding Themes
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {THEMES.map(theme => (
                <button 
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme)}
                  className={`p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                    currentTheme.id === theme.id ? 'border-slate-900 bg-slate-50 shadow-lg shadow-slate-900/5' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.primary }} />
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.accent }} />
                    </div>
                    <span className="font-bold text-slate-900">{theme.name}</span>
                  </div>
                  {currentTheme.id === theme.id && <CheckCircle2 size={20} className="text-slate-900" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <h3 className="font-bold mb-6 text-lg">Manual Customization</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="section-label">Typography</label>
                <select className="input-field text-sm font-medium">
                  <option>Playfair Display (Serif)</option>
                  <option>Outfit (Sans)</option>
                  <option>Inter (Modern)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="section-label">Banner Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Classic', 'Modern', 'Minimal', 'Romantic'].map(style => (
                    <button key={style} className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      style.toLowerCase() === currentTheme.bannerStyle ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}>
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="h-[800px] overflow-hidden flex flex-col shadow-2xl border-slate-200/50">
          <div className="p-5 bg-slate-100/50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="px-6 py-1.5 bg-white rounded-full text-xs text-slate-400 font-mono border border-slate-200 shadow-sm">
              {selectedWedding.websiteUrl}
            </div>
            <div className="flex gap-3">
              <Smartphone size={18} className="text-slate-400" />
              <Globe size={18} className="text-slate-900" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-white" style={{ fontFamily: currentTheme.fontFamily === 'serif' ? 'Playfair Display' : 'Outfit' }}>
            {/* Mini Website Preview */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover"
                alt=""
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-12 text-center backdrop-blur-[2px]">
                <motion.div 
                  key={currentTheme.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="uppercase tracking-[0.5em] text-xs font-light">The Wedding of</p>
                  <h2 className="text-6xl md:text-7xl font-serif italic">{selectedWedding.coupleNames}</h2>
                  <div className="w-16 h-px bg-white/40 mx-auto" />
                  <p className="text-xl font-light tracking-widest">{new Date(selectedWedding.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </motion.div>
              </div>
            </div>
            <div className="p-16 space-y-16 text-center max-w-2xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-3xl font-serif italic" style={{ color: currentTheme.accent }}>Our Story</h3>
                <p className="text-slate-500 leading-relaxed text-lg font-light italic">
                  "We met on a rainy afternoon in New York, and from that moment, we knew our lives would never be the same. Join us as we celebrate our love and the beginning of our forever."
                </p>
              </div>
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <p className="text-4xl font-serif italic" style={{ color: currentTheme.accent }}>142</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">Days</p>
                </div>
                <div>
                  <p className="text-4xl font-serif italic" style={{ color: currentTheme.accent }}>12</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">Hours</p>
                </div>
                <div>
                  <p className="text-4xl font-serif italic" style={{ color: currentTheme.accent }}>45</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">Minutes</p>
                </div>
              </div>
              <button 
                className="px-10 py-4 text-white rounded-full transition-all text-lg font-semibold shadow-xl"
                style={{ 
                  backgroundColor: currentTheme.primary === '#FFFFFF' ? '#18181B' : currentTheme.primary, 
                  color: currentTheme.primary === '#FFFFFF' ? '#FFFFFF' : currentTheme.accent,
                  boxShadow: `0 10px 30px ${currentTheme.primary}40`
                }}
              >
                Register to Attend
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

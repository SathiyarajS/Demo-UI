import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, X, Camera, ChevronRight } from 'lucide-react';
import { Card } from '../common/UI';
import { Wedding, WeddingTheme } from '../../types';

interface GuestWebsiteProps {
  selectedWedding: Wedding;
  currentTheme: WeddingTheme;
  setAppMode: (mode: any) => void;
}

export const GuestWebsite = ({ selectedWedding, currentTheme, setAppMode }: GuestWebsiteProps) => {
  const [showRegister, setShowRegister] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8" style={{ fontFamily: currentTheme.fontFamily === 'serif' ? 'Playfair Display' : 'Outfit' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full text-center space-y-10">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-serif italic" style={{ color: currentTheme.accent }}>You're Registered!</h1>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Thank you for registering for {selectedWedding.coupleNames}'s wedding. We are so excited to celebrate with you!
            </p>
          </div>
          <Card className="p-10 bg-slate-50/50 border-none shadow-xl text-left space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="section-label">Date</span>
              <span className="font-bold text-lg">{new Date(selectedWedding.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="section-label">Location</span>
              <span className="font-bold text-lg">{selectedWedding.city}</span>
            </div>
          </Card>
          <button onClick={() => setRegistered(false)} className="btn-secondary w-full py-4 text-lg">Back to Website</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: currentTheme.fontFamily === 'serif' ? 'Playfair Display' : 'Outfit' }}>
      {/* Guest Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel px-10 py-6 flex justify-between items-center">
        <div className="font-serif italic text-2xl font-bold tracking-tight" style={{ color: currentTheme.accent }}>
          {selectedWedding.coupleNames}
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
          <a href="#home" className="hover:text-slate-900 transition-colors">Home</a>
          <a href="#events" className="hover:text-slate-900 transition-colors">Events</a>
          <a href="#venue" className="hover:text-slate-900 transition-colors">Venue</a>
          <a href="#photos" className="hover:text-slate-900 transition-colors">Photos</a>
        </div>
        <button onClick={() => setShowRegister(true)} className="btn-primary py-2.5 px-8 text-xs uppercase tracking-widest">Register</button>
      </nav>

      {/* Hero */}
      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center text-white space-y-10 max-w-5xl px-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.6em] text-xs font-light"
          >
            We are Getting Married
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-[10rem] font-serif italic leading-none"
          >
            {selectedWedding.coupleNames}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8"
          >
            <div className="h-px w-20 bg-white/40" />
            <p className="text-2xl md:text-3xl font-light tracking-[0.2em]">
              {new Date(selectedWedding.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="h-px w-20 bg-white/40" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl font-light italic opacity-80 tracking-widest"
          >
            {selectedWedding.city}
          </motion.p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white opacity-40">
          <ChevronRight size={40} className="rotate-90" />
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-8 max-w-5xl mx-auto text-center space-y-16">
        <div className="space-y-6">
          <h2 className="text-5xl font-serif italic" style={{ color: currentTheme.accent }}>Our Story</h2>
          <div className="w-20 h-px bg-slate-200 mx-auto" />
        </div>
        <p className="text-2xl text-slate-500 leading-relaxed font-light italic px-12">
          "It was a chance encounter at a local bookstore that changed everything. James was looking for a rare first edition, and Sarah happened to be holding the last copy. What started as a polite conversation turned into a three-hour coffee date, and the rest, as they say, is history."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-700 mt-12 md:mt-24">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-32 bg-slate-50/50 px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-serif italic" style={{ color: currentTheme.accent }}>The Celebration</h2>
            <p className="section-label">Event Schedule</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Welcome Dinner', time: '6:00 PM', date: 'June 14', desc: 'A casual evening to kick off the festivities.' },
              { name: 'Wedding Ceremony', time: '4:00 PM', date: 'June 15', desc: 'The main event. Please be seated by 3:45 PM.' },
              { name: 'Grand Reception', time: '7:00 PM', date: 'June 15', desc: 'Dinner, dancing, and drinks until late.' }
            ].map((event, i) => (
              <Card key={i} className="p-12 text-center space-y-6 hover:shadow-2xl transition-all duration-500 border-none">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto text-slate-300">
                  <Clock size={32} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{event.name}</h3>
                <div className="space-y-2">
                  <p className="text-slate-900 font-bold text-lg">{event.date}</p>
                  <p className="text-slate-400 font-medium">{event.time}</p>
                </div>
                <p className="text-slate-500 font-light leading-relaxed">{event.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <p className="section-label" style={{ color: currentTheme.accent }}>Moments Captured</p>
            <h2 className="wedding-heading">Wedding Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1465495910483-0d674575693c?auto=format&fit=crop&q=80&w=800"
            ].map((url, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group cursor-pointer"
              >
                <img src={url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn-secondary px-12 py-5 text-lg">View Full Gallery</button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegister && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRegister(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row h-[90vh] md:h-[700px]">
                <div className="hidden md:block w-2/5 relative">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                    <h2 className="text-4xl font-serif italic mb-4">Join Us</h2>
                    <p className="text-sm font-light opacity-80 leading-relaxed">We can't wait to celebrate our special day with our favorite people.</p>
                  </div>
                </div>
                <div className="flex-1 p-8 md:p-12 overflow-y-auto space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold tracking-tight">Guest Registration</h2>
                      <p className="text-slate-500 font-medium">Please fill in your details below.</p>
                    </div>
                    <button onClick={() => setShowRegister(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-90">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="section-label">Full Name</label>
                      <input className="input-field" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="section-label">Email Address</label>
                        <input className="input-field" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-3">
                        <label className="section-label">Mobile Number</label>
                        <input className="input-field" placeholder="+1 234 567 890" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="section-label">Events Attending</label>
                      <div className="flex flex-wrap gap-3">
                        {['Welcome Dinner', 'Ceremony', 'Reception'].map(ev => (
                          <button key={ev} className="px-6 py-3 rounded-2xl border-2 border-slate-100 text-sm font-bold hover:border-slate-900 transition-all">
                            {ev}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="section-label">Selfie for AI Photo Matching</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center space-y-4 hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300 group-hover:text-slate-900 transition-colors">
                          <Camera size={32} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold">Click to upload or drag & drop</p>
                          <p className="text-xs text-slate-400 font-medium">This helps us find your photos in the wedding gallery!</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setRegistered(true)} className="btn-primary w-full py-5 text-xl shadow-2xl">Confirm Registration</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Back to Planner Button (Demo Only) */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={() => setAppMode('PLANNER')}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          <ChevronRight size={20} className="rotate-180" />
          <span>Back to Planner</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-slate-100 text-center space-y-6">
        <p className="font-serif italic text-4xl" style={{ color: currentTheme.accent }}>{selectedWedding.coupleNames}</p>
        <div className="w-12 h-px bg-slate-100 mx-auto" />
        <p className="section-label">Planned with Love by {selectedWedding.plannerBranding}</p>
      </footer>
    </div>
  );
};

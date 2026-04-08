import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, X, Camera, ChevronRight, MessageSquare, Send, User, Smartphone, QrCode, Download, Heart, IndianRupee, Sparkles } from 'lucide-react';
import { Card, Badge } from '../common/UI';
import { Wedding, WeddingTheme } from '../../types';

interface GuestWebsiteProps {
  selectedWedding: Wedding;
  currentTheme: WeddingTheme;
  setAppMode: (mode: any) => void;
}

export const GuestWebsite = ({ selectedWedding, currentTheme, setAppMode }: GuestWebsiteProps) => {
  const [showRegister, setShowRegister] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showGifting, setShowGifting] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [guestData, setGuestData] = useState({ name: '', email: '', phone: '', selfie: null as string | null });

  const chatMessages = [
    { role: 'bot', text: `Hi there! We're so excited to have you join ${selectedWedding.coupleNames}'s wedding celebrations. Shall we get you registered?` },
    { role: 'bot', text: "First, what's your full name?" },
    { role: 'user', field: 'name', placeholder: 'Type your name...' },
    { role: 'bot', text: "Great! And your mobile number? (We'll send your VIP Pass here)" },
    { role: 'user', field: 'phone', placeholder: 'Type your number...' },
    { role: 'bot', text: "Almost done! Could you share a quick selfie? Our AI will use this to find all your photos from the wedding and send them to you instantly! 📸" },
    { role: 'user', field: 'selfie', type: 'camera' },
    { role: 'bot', text: "Perfect! You're all set. Generating your VIP Pass now..." }
  ];

  const handleChatInput = (value: string) => {
    const currentMsg = chatMessages[chatStep];
    if (currentMsg.field) {
      setGuestData(prev => ({ ...prev, [currentMsg.field!]: value }));
    }
    
    if (chatStep < chatMessages.length - 1) {
      setChatStep(prev => prev + 1);
      // Auto-advance bot messages
      if (chatMessages[chatStep + 1].role === 'bot') {
        setTimeout(() => {
          setChatStep(prev => prev + 1);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setRegistered(true);
        setShowRegister(false);
      }, 1500);
    }
  };

  const VIPPass = () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-[3rem] overflow-hidden shadow-2xl relative"
      >
        {/* Pass Header */}
        <div className="bg-slate-900 p-10 text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Sparkles size={120} className="absolute -top-10 -right-10 rotate-12" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Official VIP Guest Pass</p>
          <h2 className="text-3xl font-serif italic text-white">{selectedWedding.coupleNames}</h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
          <p className="text-xs font-bold text-white uppercase tracking-widest">{selectedWedding.city} • {new Date(selectedWedding.date).getFullYear()}</p>
        </div>

        {/* Pass Content */}
        <div className="p-10 space-y-8 text-center">
          <div className="space-y-2">
            <div className="w-24 h-24 rounded-full border-4 border-slate-50 mx-auto overflow-hidden shadow-xl">
              <img src={guestData.selfie || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{guestData.name || 'Guest Name'}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Confirmed Attendee</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center gap-4">
            <QrCode size={120} className="text-slate-900" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scan at Entry</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="btn-secondary py-4 flex items-center justify-center gap-2 text-xs font-bold">
              <Download size={16} />
              Save Pass
            </button>
            <button className="btn-primary py-4 flex items-center justify-center gap-2 text-xs font-bold shadow-xl">
              <Smartphone size={16} />
              Add to Wallet
            </button>
          </div>
        </div>

        {/* Decorative Cutouts */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 bg-slate-900 rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 bg-slate-900 rounded-full -translate-y-1/2" />
      </motion.div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
        <button onClick={() => setRegistered(false)} className="text-white/40 hover:text-white font-bold text-sm transition-colors">Close Pass</button>
      </div>
    </div>
  );

  if (registered) {
    return <VIPPass />;
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
        <div className="flex items-center gap-4">
          <button onClick={() => setShowGifting(true)} className="hidden md:flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest hover:text-pink-600 transition-colors">
            <Heart size={16} fill="currentColor" />
            Gift
          </button>
          <button onClick={() => setShowRegister(true)} className="btn-primary py-2.5 px-8 text-xs uppercase tracking-widest">Register</button>
        </div>
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

      {/* Registration Modal (WhatsApp Flow) */}
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
              className="relative w-full max-w-lg bg-[#F0F2F5] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px]"
            >
              {/* Chat Header */}
              <div className="bg-[#075E54] p-6 flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold leading-tight">Wedding Concierge</h3>
                  <p className="text-white/60 text-xs font-medium">Online</p>
                </div>
                <button onClick={() => setShowRegister(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {chatMessages.slice(0, chatStep + 1).map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                      msg.role === 'bot' ? 'bg-white text-slate-900 rounded-tl-none' : 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                    }`}>
                      {msg.text}
                      {msg.type === 'camera' && (
                        <div className="mt-4 space-y-4">
                          <div 
                            onClick={() => handleChatInput('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200')}
                            className="w-full aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-slate-900 transition-all cursor-pointer group"
                          >
                            <Camera size={32} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tap to Capture</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-100 flex gap-3 shrink-0">
                {chatMessages[chatStep].role === 'user' && chatMessages[chatStep].type !== 'camera' ? (
                  <>
                    <input 
                      autoFocus
                      className="flex-1 bg-slate-50 border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-[#075E54]/10"
                      placeholder={chatMessages[chatStep].placeholder}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleChatInput(e.currentTarget.value);
                      }}
                    />
                    <button className="w-12 h-12 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all">
                      <Send size={20} />
                    </button>
                  </>
                ) : (
                  <div className="flex-1 text-center py-3 text-xs text-slate-400 font-medium italic">
                    {chatMessages[chatStep].role === 'bot' ? 'Concierge is typing...' : 'Waiting for action...'}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gifting Modal */}
      <AnimatePresence>
        {showGifting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGifting(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="p-10 space-y-8 text-center">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <button onClick={() => setShowGifting(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={20} /></button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif italic text-slate-900">Digital Shagun</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Your love and blessings are the greatest gift. If you wish to send a token of love, you can use the UPI below.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center gap-6">
                  <QrCode size={160} className="text-slate-900" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">wedding.james.sarah@upi</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scan to send blessings</p>
                  </div>
                </div>
                <button className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg shadow-xl">
                  <IndianRupee size={20} />
                  Send Shagun
                </button>
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

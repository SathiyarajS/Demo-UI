import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Sparkles, Palette, Image as ImageIcon, ChevronRight, Heart, Star, CheckCircle2, X, Download, Share2, Home, Calendar, Clock, ShoppingBag, Utensils, IndianRupee, Smartphone, MessageSquare, QrCode, Copy } from 'lucide-react';
import { Card, Badge, SuccessState } from '../common/UI';
import { Wedding, WeddingTheme, MOCK_PHOTOS, Photo, CATALOG_ITEMS, CatalogItem, ApprovalRequest } from '../../types';

interface CouplePortalProps {
  selectedWedding: Wedding;
  currentTheme: WeddingTheme;
  setAppMode: (mode: any) => void;
  setCurrentScreen: (screen: string) => void;
  initialTab?: 'dashboard' | 'gallery' | 'approvals' | 'schedule' | 'catalog' | 'gifting';
}

export const CouplePortal = ({ selectedWedding, currentTheme, setAppMode, setCurrentScreen, initialTab = 'dashboard' }: CouplePortalProps) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gallery' | 'approvals' | 'schedule' | 'catalog' | 'gifting'>(initialTab);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<string[]>(selectedWedding.selectedCatalogItems);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(selectedWedding.approvals);

  const toggleCatalogItem = (id: string) => {
    setSelectedCatalogItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const totalSpent = selectedCatalogItems.reduce((acc, id) => {
    const item = CATALOG_ITEMS.find(i => i.id === id);
    return acc + (item?.price || 0);
  }, selectedWedding.budget.spent);

  const budgetPercentage = (totalSpent / selectedWedding.budget.total) * 100;
  const budgetStatus = budgetPercentage > 100 ? 'over' : budgetPercentage > 85 ? 'nearing' : 'safe';

  const BudgetGuardrail = () => (
    <Card className={`p-6 border-none shadow-xl transition-all ${budgetStatus === 'over' ? 'bg-red-50' : budgetStatus === 'nearing' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${budgetStatus === 'over' ? 'bg-red-500 text-white' : budgetStatus === 'nearing' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
            <IndianRupee size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Wedding Budget</p>
            <p className="text-xl font-bold text-slate-900">₹{totalSpent.toLocaleString()} / ₹{selectedWedding.budget.total.toLocaleString()}</p>
          </div>
        </div>
        <Badge variant={budgetStatus === 'over' ? 'default' : budgetStatus === 'nearing' ? 'warning' : 'success'}>
          {budgetStatus === 'over' ? 'Over Budget' : budgetStatus === 'nearing' ? 'Nearing Limit' : 'Within Budget'}
        </Badge>
      </div>
      <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          className={`h-full transition-all ${budgetStatus === 'over' ? 'bg-red-500' : budgetStatus === 'nearing' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
        />
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">
        {budgetStatus === 'over' ? '⚠️ This selection exceeds your planned budget.' : budgetStatus === 'nearing' ? 'You are close to the budget limit.' : 'You are well within your budget.'}
      </p>
    </Card>
  );

  const CatalogTab = () => {
    const [catFilter, setCatFilter] = useState<'Food' | 'Decor'>('Food');
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-4">
            <button 
              onClick={() => setCatFilter('Food')}
              className={`flex-1 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all ${catFilter === 'Food' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
            >
              <Utensils size={20} />
              Food & Catering
            </button>
            <button 
              onClick={() => setCatFilter('Decor')}
              className={`flex-1 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all ${catFilter === 'Decor' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
            >
              <Palette size={20} />
              Standard Decor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATALOG_ITEMS.filter(item => item.category === catFilter).map(item => (
              <Card key={item.id} className="overflow-hidden border-none shadow-xl group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="info">₹{item.price}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                  </div>
                  <button 
                    onClick={() => toggleCatalogItem(item.id)}
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                      selectedCatalogItems.includes(item.id) 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {selectedCatalogItems.includes(item.id) ? 'Remove Selection' : 'Add to Selection'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <BudgetGuardrail />
          <Card className="p-8 space-y-6 border-none shadow-xl">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
              <ShoppingBag className="text-indigo-500" size={24} />
              Your Selections
            </h3>
            <div className="space-y-4">
              {selectedCatalogItems.length === 0 ? (
                <p className="text-sm text-slate-400 font-medium text-center py-8">No items selected yet.</p>
              ) : (
                selectedCatalogItems.map(id => {
                  const item = CATALOG_ITEMS.find(i => i.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden">
                          <img src={item?.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item?.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item?.category}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-900">₹{item?.price}</p>
                    </div>
                  );
                })
              )}
            </div>
            {selectedCatalogItems.length > 0 && (
              <button className="btn-primary w-full py-4 shadow-xl">Confirm Selections</button>
            )}
          </Card>
        </div>
      </div>
    );
  };

  const GiftingTab = () => (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
          <IndianRupee size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Digital Shagun</h2>
          <p className="text-slate-500 font-medium">Enable a tasteful way for guests to send their blessings and gifts.</p>
        </div>
      </div>

      <Card className="p-10 space-y-8 border-none shadow-2xl bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Heart size={120} className="text-pink-500" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="p-4 bg-white rounded-3xl shadow-2xl border border-slate-100">
              <QrCode size={200} className="text-slate-900" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-lg font-bold text-slate-900">UPI ID: wedding.{selectedWedding.coupleNames.toLowerCase().replace(' & ', '.')}.shagun@upi</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Scan to send your blessings</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="section-label">Gift Message (Optional)</label>
            <textarea 
              placeholder="Add a default thank you message for guests..."
              className="input-field min-h-[100px] py-4 resize-none"
              defaultValue={`We are so grateful for your love and blessings. Thank you for being a part of our special day! - ${selectedWedding.coupleNames}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="btn-secondary py-4 flex items-center justify-center gap-3 font-bold">
              <Copy size={20} />
              Copy Link
            </button>
            <button className="btn-primary py-4 flex items-center justify-center gap-3 font-bold shadow-xl">
              <MessageSquare size={20} />
              Share on WhatsApp
            </button>
          </div>
        </div>
      </Card>

      <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex items-center gap-6">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm">
          <Smartphone size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-indigo-900">Premium Gifting Experience</p>
          <p className="text-xs text-indigo-700 font-medium">Guests will see a beautiful, branded gifting page on your wedding website.</p>
        </div>
        <Badge variant="info">Active</Badge>
      </div>
    </div>
  );

  const MobileApprovalPortal = () => (
    <div className="fixed inset-0 z-[200] bg-slate-900 flex items-center justify-center p-4 lg:p-10 overflow-hidden">
      <button 
        onClick={() => setIsMobileView(false)}
        className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-[380px] aspect-[9/19] bg-slate-800 rounded-[3.5rem] border-[8px] border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-700 rounded-b-3xl z-50" />
        
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar pt-10">
          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Review Website</h3>
                <p className="text-xs text-slate-400 font-medium tracking-tight">Version 2.4 • Draft</p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                <Globe size={20} />
              </div>
            </div>

            <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-90" alt="" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <p className="text-[8px] font-bold text-slate-900 tracking-[0.3em]">SAVE THE DATE</p>
                <h4 className="text-2xl font-serif italic text-slate-900">{selectedWedding.coupleNames}</h4>
                <div className="w-8 h-px bg-slate-900" />
                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">June 15, 2026</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-2">
                <p className="text-xs font-bold text-slate-900">Planner's Note</p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">"I've updated the 'Our Story' section with the new photos you sent. Please check if the tone is right!"</p>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Your Comments</label>
                <textarea 
                  placeholder="Suggest edits or leave a comment..."
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl text-xs focus:ring-2 focus:ring-slate-900/5 min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex gap-3 shrink-0">
          <button className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-all">Suggest Edits</button>
          <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-xl hover:bg-slate-800 transition-all">✅ Approve</button>
        </div>
      </div>

      <div className="hidden lg:block absolute left-20 top-1/2 -translate-y-1/2 space-y-6 max-w-xs">
        <h2 className="text-4xl font-bold text-white tracking-tight">Mobile Approval Portal</h2>
        <p className="text-slate-400 font-medium leading-relaxed">This is exactly what the couple sees on their phones when you request an approval.</p>
        <div className="flex items-center gap-4 text-emerald-400">
          <CheckCircle2 size={24} />
          <p className="font-bold">Optimized for quick decisions</p>
        </div>
      </div>
    </div>
  );

  const DashboardTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <Card className="p-12 bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <p className="section-label text-slate-400">Countdown to Forever</p>
              <h2 className="text-6xl md:text-7xl font-serif italic tracking-tight">142 Days to Go</h2>
            </div>
            <div className="flex gap-12 items-center">
              <div className="space-y-1">
                <p className="text-4xl font-bold tracking-tight">112</p>
                <p className="section-label text-slate-400">Guests Confirmed</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-1">
                <p className="text-4xl font-bold tracking-tight">85%</p>
                <p className="section-label text-slate-400">Planning Progress</p>
              </div>
            </div>
            <div className="pt-6">
              <button onClick={() => setActiveTab('schedule')} className="btn-primary bg-white text-slate-900 hover:bg-slate-100 py-4 px-10 text-lg shadow-2xl">View Full Timeline</button>
            </div>
          </div>
          <Sparkles className="absolute -top-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent rounded-full -mr-32 -mb-32" />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-6 hover:translate-y-[-4px] transition-all duration-500 border-none shadow-xl">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/10">
                <Palette size={28} />
              </div>
              <Badge variant="success">Approved</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">Decor Selection</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Enchanted Garden Package with Pastel Roses and Wisteria.</p>
            </div>
            <button onClick={() => setCurrentScreen('decor-catalog')} className="text-sm font-bold text-slate-900 hover:underline flex items-center gap-2 group">
              View Selection <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Card>
          <Card className="p-8 space-y-6 hover:translate-y-[-4px] transition-all duration-500 border-none shadow-xl">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                <Globe size={28} />
              </div>
              <Badge variant="warning">Review Needed</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">Wedding Theme</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Current: {currentTheme.name}. Please review the color palette and typography.</p>
            </div>
            <div className="flex gap-4 pt-2">
              <button className="btn-primary py-2 px-6 text-xs">Approve</button>
              <button className="btn-secondary py-2 px-6 text-xs">Request Changes</button>
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-10">
        <Card className="border-none shadow-xl">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-xl font-bold tracking-tight">Planner Notes</h2>
          </div>
          <div className="p-8 space-y-8">
            {[
              { title: 'Catering Menu', status: 'Pending', date: 'Due in 2 days', desc: 'Finalize the main course selection.' },
              { title: 'Music Playlist', status: 'In Review', date: 'Sent yesterday', desc: 'Sarah is reviewing your song list.' },
              { title: 'Guest List Final', status: 'Completed', date: 'Done', desc: 'All addresses have been verified.' }
            ].map((note, i) => (
              <div key={i} className="flex gap-6 group">
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 shadow-lg ${
                  note.status === 'Pending' ? 'bg-amber-400 shadow-amber-400/20' : note.status === 'In Review' ? 'bg-blue-400 shadow-blue-400/20' : 'bg-emerald-400 shadow-emerald-400/20'
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-900 leading-none">{note.title}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{note.desc}</p>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-1">{note.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 pt-0">
            <button className="btn-secondary w-full py-4 text-sm font-bold shadow-sm">View All Tasks</button>
          </div>
        </Card>
      </div>
    </div>
  );

  const ScheduleTab = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedWedding.schedule.map((event, i) => (
          <Card key={i} className="p-10 space-y-8 border-none shadow-xl hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Calendar size={32} />
              </div>
              <Badge variant="info">{event.time}</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">{event.name}</h3>
              <p className="text-slate-500 font-medium">{event.date}</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{event.desc}</p>
            <button className="text-sm font-bold text-slate-900 hover:underline">Manage Details</button>
          </Card>
        ))}
      </div>
    </div>
  );

  const GalleryTab = () => {
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [isFinalized, setIsFinalized] = useState(false);

    if (isFinalized) {
      return (
        <SuccessState 
          title="Selection Finalized!"
          description="Your final photo selection has been sent to Studio Bloom. They will now begin the album design process."
          actionLabel="Back to Gallery"
          onAction={() => setIsFinalized(false)}
        />
      );
    }

    return (
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {['All', 'Ceremony', 'Reception', 'Portrait', 'Guest'].map(cat => (
              <button key={cat} className="px-6 py-2.5 rounded-full text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2 py-2.5 px-6 text-sm">
              <Download size={18} />
              <span>Download All</span>
            </button>
            <button 
              onClick={() => {
                setIsFinalizing(true);
                setTimeout(() => {
                  setIsFinalizing(false);
                  setIsFinalized(true);
                }, 1500);
              }}
              className="btn-primary flex items-center gap-2 py-2.5 px-6 text-sm shadow-xl"
              disabled={isFinalizing}
            >
              {isFinalizing ? (
                <>
                  <Clock size={18} className="animate-spin" />
                  <span>Finalizing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Finalize Selection</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PHOTOS.map(photo => (
            <motion.div 
              key={photo.id} 
              layoutId={photo.id}
              className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <button className={`p-3 rounded-2xl backdrop-blur-md transition-all ${photo.isFavorite ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
                    <Heart size={20} fill={photo.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="info">{photo.category}</Badge>
                  <button className={`p-3 rounded-2xl backdrop-blur-md transition-all ${photo.isShortlisted ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
                    <Star size={20} fill={photo.isShortlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)} className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" />
              <motion.div layoutId={selectedPhoto.id} className="relative w-full max-w-5xl aspect-[4/3] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex">
                <div className="flex-1 bg-slate-100">
                  <img src={selectedPhoto.url} className="w-full h-full object-contain" alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="w-80 p-10 flex flex-col justify-between border-l border-slate-100">
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <Badge variant="info">{selectedPhoto.category}</Badge>
                      <button onClick={() => setSelectedPhoto(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} /></button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold tracking-tight">Photo Details</h3>
                      <p className="text-sm text-slate-500 font-medium">Captured by Studio Bloom on June 15, 2026.</p>
                    </div>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-pink-500 transition-all group">
                        <span className="font-bold text-slate-900">Mark as Favorite</span>
                        <Heart size={20} className="text-slate-300 group-hover:text-pink-500 transition-colors" />
                      </button>
                      <button className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 transition-all group">
                        <span className="font-bold text-slate-900">Add to Shortlist</span>
                        <Star size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 btn-secondary p-4 flex items-center justify-center"><Share2 size={20} /></button>
                    <button className="flex-1 btn-primary p-4 flex items-center justify-center"><Download size={20} /></button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const ApprovalsTab = () => {
    const [decorStatus, setDecorStatus] = useState<'pending' | 'approved' | 'changes'>('pending');
    const [showDecorSuccess, setShowDecorSuccess] = useState(false);

    if (showDecorSuccess) {
      return (
        <SuccessState 
          title="Decision Sent!"
          description="Your planner has been notified. We'll start coordinating with the vendors immediately."
          actionLabel="Back to Approvals"
          onAction={() => setShowDecorSuccess(false)}
        />
      );
    }

    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="p-10 space-y-8 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Pending Approvals</h2>
              <Badge variant="warning">{approvals.filter(a => a.status === 'pending').length} Required</Badge>
            </div>
            <div className="space-y-6">
              {/* Ad-hoc Approval Cards */}
              {approvals.filter(a => a.status === 'pending').map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6 group hover:border-slate-900 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    </div>
                    {item.price && <Badge variant="info">₹{item.price.toLocaleString()}</Badge>}
                  </div>
                  
                  {item.image && (
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-lg">
                      <img src={item.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
                    {item.plannerNote && (
                      <div className="p-4 bg-white rounded-2xl border border-slate-100 flex gap-3">
                        <MessageSquare size={16} className="text-indigo-500 shrink-0 mt-1" />
                        <p className="text-xs text-slate-600 italic">"{item.plannerNote}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={() => handleApproval(item.id, 'rejected')}
                      className="flex-1 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      No, Decline
                    </button>
                    <button 
                      onClick={() => {
                        handleApproval(item.id, 'approved');
                        setShowDecorSuccess(true);
                      }}
                      className="flex-1 btn-primary py-4 text-sm font-bold shadow-xl"
                    >
                      Yes, Approve
                    </button>
                  </div>
                </div>
              ))}

              {/* Standard Approvals */}
              {[
                { id: 'catering', title: 'Catering Menu Finalization', category: 'Food & Drink', deadline: '2 days left', desc: 'Please review the final menu for the main reception and cocktail hour.' },
                { id: 'music', title: 'Music Selection for First Dance', category: 'Entertainment', deadline: '1 week left', desc: 'Confirm your choice for the first dance and parent dances.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 group hover:border-slate-900 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <Badge variant="info">{item.deadline}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 btn-secondary py-3 text-xs font-bold">Review Details</button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDecorSuccess(true);
                      }}
                      className="flex-1 btn-primary py-3 text-xs font-bold"
                    >
                      Approve Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-10 space-y-8 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Recent Decisions</h2>
              <button className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">View History</button>
            </div>
            <div className="space-y-6">
              {approvals.filter(a => a.status !== 'pending').map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 hover:bg-slate-50 rounded-[2rem] transition-all">
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${item.status === 'approved' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.status === 'approved' ? <CheckCircle2 size={24} /> : <X size={24} />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest capitalize">{item.status} just now</p>
                  </div>
                  <button className="p-3 text-slate-300 hover:text-slate-900 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
              {[
                { title: 'Wedding Theme: Enchanted Garden', date: 'Approved 3 days ago', icon: CheckCircle2, color: 'text-emerald-500' },
                { title: 'Venue Contract: The Plaza', date: 'Approved 2 weeks ago', icon: CheckCircle2, color: 'text-emerald-500' },
                { title: 'Photographer: Studio Bloom', date: 'Approved 1 month ago', icon: CheckCircle2, color: 'text-emerald-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 hover:bg-slate-50 rounded-[2rem] transition-all">
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.date}</p>
                  </div>
                  <button className="p-3 text-slate-300 hover:text-slate-900 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 pb-20">
      {isMobileView && <MobileApprovalPortal />}
      
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Couple Dashboard</h1>
          <p className="text-slate-500 font-medium">Hello {selectedWedding.coupleNames.split(' & ')[0]}, here's your wedding progress.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsMobileView(true)}
            className="btn-secondary flex items-center gap-3 py-3 px-8 text-sm font-bold shadow-sm"
          >
            <Smartphone size={20} />
            <span>Mobile Portal</span>
          </button>
          <button onClick={() => setAppMode('GUEST')} className="btn-secondary flex items-center gap-3 py-3 px-8 text-sm font-bold shadow-sm">
            <Globe size={20} />
            <span>View Website</span>
          </button>
          <button className="btn-primary py-3 px-8 text-sm font-bold shadow-xl">Contact Planner</button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-slate-100 pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'dashboard', label: 'Overview', icon: Home },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'catalog', label: 'Catalog', icon: ShoppingBag },
          { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
          { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
          { id: 'gifting', label: 'Gifting', icon: Heart }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 px-2 text-sm font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-slate-900 rounded-full" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'schedule' && <ScheduleTab />}
          {activeTab === 'catalog' && <CatalogTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'approvals' && <ApprovalsTab />}
          {activeTab === 'gifting' && <GiftingTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

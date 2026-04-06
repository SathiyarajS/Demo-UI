import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  BookOpen, 
  Mail, 
  Camera, 
  Settings, 
  Heart, 
  Calendar, 
  Image as ImageIcon,
  Home,
  UserCheck,
  LogOut,
  Bell,
  Search,
  Menu,
  Upload,
  Globe,
  CheckCircle2,
  Star,
  Share2,
  X
} from 'lucide-react';

import { 
  AppMode, 
  WeddingTheme, 
  Wedding, 
  THEMES, 
  MOCK_WEDDINGS 
} from './types';

import { SidebarItem } from './components/common/UI';
import { 
  PlannerDashboard 
} from './components/planner/PlannerDashboard';
import { 
  WeddingsListView, 
  WebsiteManagementView, 
  InvitationView, 
  GuestListView, 
  GalleryManagementView,
  WeddingDetailView
} from './components/planner/PlannerViews';
import { CreateWeddingFlow } from './components/planner/CreateWeddingFlow';
import { ThemeCustomization } from './components/planner/ThemeCustomization';
import { DecorCatalog } from './components/planner/DecorCatalog';
import { GuestWebsite } from './components/guest/GuestWebsite';
import { 
  PhotographerDashboard, 
  UploadGalleryView, 
  AIMatchesView, 
  DeliveryTrackingView, 
  CoupleSelectionsView,
  DuplicateReviewView
} from './components/photographer/PhotographerViews';
import { CouplePortal } from './components/couple/CouplePortal';

// --- Placeholder Components for missing views ---
const PlaceholderView = ({ title }: { title: string }) => (
  <div className="h-full flex flex-col items-center justify-center space-y-6 text-center p-12">
    <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
      <Search size={48} />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="text-slate-500 max-w-md mx-auto">This module is currently being refined for the final prototype. Check back soon for the full interactive experience.</p>
    </div>
    <button className="btn-secondary px-8 py-3">Return to Dashboard</button>
  </div>
);

// --- Main App ---

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('PLANNER');
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedWedding, setSelectedWedding] = useState<Wedding>(MOCK_WEDDINGS[0]);
  const [currentTheme, setCurrentTheme] = useState<WeddingTheme>(THEMES.find(t => t.id === selectedWedding.themeId) || THEMES[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync theme when wedding changes
  useEffect(() => {
    const theme = THEMES.find(t => t.id === selectedWedding.themeId);
    if (theme) setCurrentTheme(theme);
  }, [selectedWedding]);

  // --- Render Logic ---

  const renderContent = () => {
    if (appMode === 'GUEST') return <GuestWebsite selectedWedding={selectedWedding} currentTheme={currentTheme} setAppMode={setAppMode} />;

    switch (currentScreen) {
      case 'dashboard':
        if (appMode === 'PLANNER') return <PlannerDashboard setCurrentScreen={setCurrentScreen} setSelectedWedding={setSelectedWedding} />;
        if (appMode === 'PHOTOGRAPHER') return <PhotographerDashboard />;
        if (appMode === 'COUPLE') return <CouplePortal selectedWedding={selectedWedding} currentTheme={currentTheme} setAppMode={setAppMode} setCurrentScreen={setCurrentScreen} />;
        return null;
      case 'create-wedding':
        return <CreateWeddingFlow setCurrentScreen={setCurrentScreen} setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} />;
      case 'themes':
        return <ThemeCustomization selectedWedding={selectedWedding} currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} setAppMode={setAppMode} />;
      case 'decor-catalog':
        return <DecorCatalog />;
      case 'weddings':
        return <WeddingsListView setCurrentScreen={setCurrentScreen} setSelectedWedding={setSelectedWedding} />;
      case 'wedding-detail':
        return <WeddingDetailView selectedWedding={selectedWedding} setCurrentScreen={setCurrentScreen} setAppMode={setAppMode} setIsShareModalOpen={setIsShareModalOpen} />;
      case 'websites':
        return <WebsiteManagementView selectedWedding={selectedWedding} />;
      case 'invitations':
        return <InvitationView selectedWedding={selectedWedding} />;
      case 'guests':
        return <GuestListView selectedWedding={selectedWedding} />;
      case 'galleries':
        return <GalleryManagementView selectedWedding={selectedWedding} />;
      case 'settings':
        return <PlaceholderView title="Settings" />;
      case 'uploads':
        return <UploadGalleryView />;
      case 'matches':
        return <AIMatchesView />;
      case 'deliveries':
        return <DeliveryTrackingView />;
      case 'selections':
        return <CoupleSelectionsView />;
      case 'duplicates':
        return <DuplicateReviewView />;
      case 'schedule':
        return <PlaceholderView title="Wedding Schedule" />;
      case 'gallery':
        return <CouplePortal selectedWedding={selectedWedding} currentTheme={currentTheme} setAppMode={setAppMode} setCurrentScreen={setCurrentScreen} initialTab="gallery" />;
      case 'approvals':
        return <CouplePortal selectedWedding={selectedWedding} currentTheme={currentTheme} setAppMode={setAppMode} setCurrentScreen={setCurrentScreen} initialTab="approvals" />;
      default:
        return <PlannerDashboard setCurrentScreen={setCurrentScreen} setSelectedWedding={setSelectedWedding} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Hidden in Guest Mode */}
      {appMode !== 'GUEST' && (
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                <Heart size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">Wedding Planner</span>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
              {appMode === 'PLANNER' && (
                <>
                  <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentScreen === 'dashboard'} onClick={() => { setCurrentScreen('dashboard'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Users} label="Weddings" active={currentScreen === 'weddings'} onClick={() => { setCurrentScreen('weddings'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Globe} label="Websites" active={currentScreen === 'websites'} onClick={() => { setCurrentScreen('websites'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Palette} label="Themes" active={currentScreen === 'themes'} onClick={() => { setCurrentScreen('themes'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={BookOpen} label="Catalog" active={currentScreen === 'decor-catalog'} onClick={() => { setCurrentScreen('decor-catalog'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Mail} label="Invitations" active={currentScreen === 'invitations'} onClick={() => { setCurrentScreen('invitations'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={UserCheck} label="Guests" active={currentScreen === 'guests'} onClick={() => { setCurrentScreen('guests'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Camera} label="Galleries" active={currentScreen === 'galleries'} onClick={() => { setCurrentScreen('galleries'); setIsSidebarOpen(false); }} />
                </>
              )}
              {appMode === 'PHOTOGRAPHER' && (
                <>
                  <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentScreen === 'dashboard'} onClick={() => { setCurrentScreen('dashboard'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Camera} label="Weddings" active={currentScreen === 'weddings'} onClick={() => { setCurrentScreen('weddings'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Upload} label="Uploads" active={currentScreen === 'uploads'} onClick={() => { setCurrentScreen('uploads'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={UserCheck} label="Matches" active={currentScreen === 'matches'} onClick={() => { setCurrentScreen('matches'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={CheckCircle2} label="Deliveries" active={currentScreen === 'deliveries'} onClick={() => { setCurrentScreen('deliveries'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Star} label="Selections" active={currentScreen === 'selections'} onClick={() => { setCurrentScreen('selections'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={ImageIcon} label="Duplicates" active={currentScreen === 'duplicates'} onClick={() => { setCurrentScreen('duplicates'); setIsSidebarOpen(false); }} />
                </>
              )}
              {appMode === 'COUPLE' && (
                <>
                  <SidebarItem icon={Home} label="Dashboard" active={currentScreen === 'dashboard'} onClick={() => { setCurrentScreen('dashboard'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Calendar} label="Schedule" active={currentScreen === 'schedule'} onClick={() => { setCurrentScreen('schedule'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={Palette} label="Decor Selection" active={currentScreen === 'decor-catalog'} onClick={() => { setCurrentScreen('decor-catalog'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={ImageIcon} label="Gallery" active={currentScreen === 'gallery'} onClick={() => { setCurrentScreen('gallery'); setIsSidebarOpen(false); }} />
                  <SidebarItem icon={CheckCircle2} label="Approvals" active={currentScreen === 'approvals'} onClick={() => { setCurrentScreen('approvals'); setIsSidebarOpen(false); }} />
                </>
              )}
            </nav>

            <div className="pt-6 border-t border-slate-100 space-y-2">
              <SidebarItem icon={Settings} label="Settings" active={currentScreen === 'settings'} onClick={() => { setCurrentScreen('settings'); setIsSidebarOpen(false); }} />
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-w-0 ${appMode === 'GUEST' ? '' : 'h-screen overflow-hidden'}`}>
        {/* Header - Hidden in Guest Mode */}
        {appMode !== 'GUEST' && (
          <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
                <Menu size={24} />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search weddings, guests..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5 w-64 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {appMode === 'PLANNER' && (
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all"
                >
                  <Share2 size={16} />
                  <span>Share Prototype</span>
                </button>
              )}
              <button className="p-2 text-slate-400 hover:text-slate-900 relative">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-100 mx-2" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                  <p className="text-xs text-slate-400 font-medium capitalize">{appMode.toLowerCase()}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                  <img src="https://i.pravatar.cc/150?u=sarah" alt="Avatar" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Scrollable Content Area */}
        <div className={`flex-1 ${appMode === 'GUEST' ? '' : 'overflow-y-auto p-8'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${appMode}-${currentScreen}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Demo Role Switcher */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full shadow-2xl">
        {[
          { id: 'PLANNER', label: 'Planner', icon: LayoutDashboard },
          { id: 'COUPLE', label: 'Couple', icon: Heart },
          { id: 'PHOTOGRAPHER', label: 'Photographer', icon: Camera },
          { id: 'GUEST', label: 'Guest', icon: Users }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              setAppMode(mode.id as AppMode);
              setCurrentScreen('dashboard');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              appMode === mode.id 
                ? 'bg-slate-900 text-white shadow-lg scale-105' 
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <mode.icon size={16} />
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Share Prototype Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Share Prototype</h2>
                  <p className="text-slate-500 font-medium">Send this link to your clients to showcase the wedding experience.</p>
                </div>
                <button onClick={() => setIsShareModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="section-label">Prototype Link</label>
                  <div className="flex gap-3">
                    <input 
                      readOnly 
                      value={`https://wedding-planner-demo.ais.dev/share/${selectedWedding.id}`}
                      className="input-field flex-1 bg-slate-50 border-slate-100 text-slate-500 text-sm"
                    />
                    <button className="btn-primary px-6 py-3 text-sm">Copy</button>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <Globe size={20} />
                    <p className="font-bold text-sm">What they'll see</p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'Full Guest Website experience',
                      'Private Couple Dashboard',
                      'Photographer Gallery workflow',
                      'Your custom planner branding'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-indigo-900/60 font-medium">
                        <CheckCircle2 size={14} className="text-indigo-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 btn-secondary py-4 font-bold">Email to Couple</button>
                <button className="flex-1 btn-primary py-4 font-bold">Done</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

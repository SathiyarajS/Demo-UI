import React from 'react';
import { 
  Users, 
  Globe, 
  Mail, 
  UserCheck, 
  Camera, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  ExternalLink, 
  Eye, 
  Send,
  CheckCircle2,
  Clock,
  X,
  Download,
  Share2,
  Settings,
  Heart,
  Palette,
  Sparkles,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Badge } from '../common/UI';
import { Wedding, MOCK_WEDDINGS } from '../../types';

// --- Weddings List View ---
export const WeddingsListView = ({ setCurrentScreen, setSelectedWedding }: { setCurrentScreen: (s: string) => void, setSelectedWedding: (w: Wedding) => void }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">All Weddings</h1>
        <p className="text-slate-500 font-medium">Manage your portfolio of 12 active weddings.</p>
      </div>
      <button onClick={() => setCurrentScreen('create-wedding')} className="btn-primary flex items-center gap-2 py-4 px-8 shadow-2xl">
        <Plus size={20} />
        <span>Add New Wedding</span>
      </button>
    </div>

    <Card className="border-none shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input-field pl-12 py-3" placeholder="Search by couple name, city, or date..." />
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center gap-2 py-3 px-6 text-sm">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="px-8 py-6">Couple</th>
              <th className="px-8 py-6">Date & Location</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Progress</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_WEDDINGS.map(wedding => (
              <tr key={wedding.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => {
                setSelectedWedding(wedding);
                setCurrentScreen('wedding-detail');
              }}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://picsum.photos/seed/${wedding.id}/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <p className="font-bold text-slate-900 text-lg">{wedding.coupleNames}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">{new Date(wedding.date).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{wedding.city}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge variant={wedding.status === 'Upcoming' ? 'info' : 'success'}>{wedding.status}</Badge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">65%</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-900 transition-all group-hover:translate-x-1">
                    <ChevronRight size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// --- Wedding Detail View (Planner's Hub for a specific wedding) ---
export const WeddingDetailView = ({ 
  selectedWedding, 
  setCurrentScreen, 
  setAppMode,
  setIsShareModalOpen
}: { 
  selectedWedding: Wedding, 
  setCurrentScreen: (s: string) => void,
  setAppMode: (m: any) => void,
  setIsShareModalOpen: (o: boolean) => void
}) => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('weddings')} className="text-slate-400 hover:text-slate-900 transition-colors">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{selectedWedding.coupleNames}</h1>
        </div>
        <p className="text-slate-500 font-medium">{new Date(selectedWedding.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {selectedWedding.city}, {selectedWedding.country}</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm"
        >
          <Share2 size={20} />
          <span>Share Prototype</span>
        </button>
        <Badge variant={selectedWedding.status === 'Upcoming' ? 'info' : 'success'}>
          {selectedWedding.status}
        </Badge>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl bg-white">
          <h2 className="text-2xl font-bold tracking-tight">Role Previews & Approvals</h2>
          <p className="text-slate-500 font-medium">Preview the experience from different user perspectives to approve features and content.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => setAppMode('GUEST')}
              className="p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group text-left space-y-4 border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                <Globe size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Guest Website</p>
                <p className="text-xs opacity-60 font-medium">Public view, RSVP flow, and gallery preview.</p>
              </div>
            </button>

            <button 
              onClick={() => setAppMode('COUPLE')}
              className="p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group text-left space-y-4 border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                <Heart size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Couple Portal</p>
                <p className="text-xs opacity-60 font-medium">Private dashboard, decor selection, and approvals.</p>
              </div>
            </button>

            <button 
              onClick={() => setAppMode('PHOTOGRAPHER')}
              className="p-8 rounded-[2.5rem] bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group text-left space-y-4 border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                <Camera size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Photographer</p>
                <p className="text-xs opacity-60 font-medium">Gallery management, AI matching, and delivery.</p>
              </div>
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-6 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tight">Budget Guardrail</h3>
              <Badge variant={selectedWedding.budget.spent / selectedWedding.budget.total > 0.9 ? 'warning' : 'success'}>
                {Math.round((selectedWedding.budget.spent / selectedWedding.budget.total) * 100)}% Used
              </Badge>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-500">Total Budget</span>
                  <span className="text-slate-900">₹{selectedWedding.budget.total.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedWedding.budget.spent / selectedWedding.budget.total) * 100}%` }}
                    className={`h-full ${selectedWedding.budget.spent / selectedWedding.budget.total > 0.9 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spent</p>
                  <p className="text-lg font-bold text-slate-900">₹{selectedWedding.budget.spent.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</p>
                  <p className="text-lg font-bold text-slate-900">₹{(selectedWedding.budget.total - selectedWedding.budget.spent).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 space-y-6 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tight">Recent Approvals</h3>
              <button onClick={() => setCurrentScreen('invitations')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {selectedWedding.approvals.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : item.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.status === 'approved' ? <CheckCircle2 size={18} /> : item.status === 'rejected' ? <X size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'approved' ? 'success' : item.status === 'rejected' ? 'default' : 'warning'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Plus size={14} />
              Create Custom Approval
            </button>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Quick Management</h2>
          <div className="space-y-4">
            <button onClick={() => setCurrentScreen('websites')} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <Globe size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="font-bold text-slate-900">Website Editor</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-all" />
            </button>
            <button onClick={() => setCurrentScreen('guests')} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <Users size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="font-bold text-slate-900">Guest List</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-all" />
            </button>
            <button onClick={() => setCurrentScreen('galleries')} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <Camera size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="font-bold text-slate-900">Gallery Hub</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-all" />
            </button>
            <button onClick={() => setCurrentScreen('themes')} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group">
              <div className="flex items-center gap-4">
                <Palette size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="font-bold text-slate-900">Theme & Style</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </Card>

        <Card className="p-10 space-y-6 border-none shadow-xl bg-slate-900 text-white">
          <h2 className="text-xl font-bold tracking-tight">Planner Branding</h2>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <p className="font-bold text-sm">{selectedWedding.plannerBranding}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">This branding is visible on the Guest Website and Couple Portal footers.</p>
          </div>
          <button className="w-full py-4 text-sm font-bold bg-white text-slate-900 rounded-2xl hover:bg-slate-100 transition-all">Edit Branding</button>
        </Card>
      </div>
    </div>
  </div>
);

// --- Website Management View ---
export const WebsiteManagementView = ({ selectedWedding }: { selectedWedding: Wedding }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [roughNotes, setRoughNotes] = React.useState('');
  const [generatedContent, setGeneratedContent] = React.useState<{
    welcome?: string;
    family?: string;
    story?: string;
    invitation?: string;
    event?: string;
  } | null>(null);
  const [publishStatus, setPublishStatus] = React.useState<'Draft' | 'Publishing' | 'Live'>(selectedWedding.status === 'Live' ? 'Live' : 'Draft');
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const [selectedTone, setSelectedTone] = React.useState('Family Oriented');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent({
        welcome: `With hearts full of joy, the families of ${selectedWedding.coupleNames.split(' & ')[0]} and ${selectedWedding.coupleNames.split(' & ')[1]} invite you to witness the beginning of their beautiful journey together. Your presence and blessings mean the world to us as we celebrate this sacred union.`,
        family: `The ${selectedWedding.coupleNames.split(' & ')[0].split(' ')[1] || 'Groom\'s'} and ${selectedWedding.coupleNames.split(' & ')[1].split(' ')[1] || 'Bride\'s'} families have long shared a bond of friendship and respect. This wedding is not just a union of two individuals, but a coming together of two families, rooted in tradition and love.`,
        story: `From their first meeting arranged by family to the deep friendship that blossomed into love, ${selectedWedding.coupleNames} have found in each other a partner for life. Their journey is a testament to the beauty of shared values and the grace of destiny.`,
        invitation: `We request the honor of your presence at the wedding ceremony of ${selectedWedding.coupleNames}. Join us as we celebrate love, family, and the traditions that bind us together.`,
        event: `A traditional ceremony followed by a grand reception. We look forward to an evening of music, laughter, and heartfelt celebrations with our nearest and dearest.`
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handlePublish = () => {
    setPublishStatus('Publishing');
    setTimeout(() => {
      setPublishStatus('Live');
      setShowPublishModal(false);
    }, 3000);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Website Management</h1>
          <p className="text-slate-500 font-medium">Design and publish the wedding website for {selectedWedding.coupleNames}.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${publishStatus === 'Live' ? 'bg-emerald-500' : publishStatus === 'Publishing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-sm font-bold text-slate-600">{publishStatus}</span>
          </div>
          <button className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm">
            <Eye size={20} />
            <span>Preview Site</span>
          </button>
          {publishStatus !== 'Live' && (
            <button 
              onClick={() => setShowPublishModal(true)}
              disabled={publishStatus === 'Publishing'}
              className="btn-primary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-xl disabled:opacity-50"
            >
              <Globe size={20} />
              <span>{publishStatus === 'Publishing' ? 'Publishing...' : 'Publish Website'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Copy Generator Module */}
          <Card className="p-10 space-y-8 border-none shadow-xl bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles size={120} className="text-slate-900" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  <Sparkles className="text-indigo-500" size={24} />
                  Elegant Wedding Copy Generator
                </h2>
                <Badge variant="info">AI Powered</Badge>
              </div>
              
              <div className="space-y-4">
                <label className="section-label">Family / Couple Notes</label>
                <textarea 
                  value={roughNotes}
                  onChange={(e) => setRoughNotes(e.target.value)}
                  placeholder="Paste rough notes here (e.g., 'Sarah likes hiking, James is a doctor, families met in 2020, traditional but warm vibe...')"
                  className="input-field min-h-[120px] py-4 resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {['Family Oriented', 'Elegant', 'Heartfelt', 'Traditional', 'Modern Warm'].map(tone => (
                  <button 
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedTone === tone ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !roughNotes}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Generating Elegant Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>✨ Generate Elegant Wedding Copy</span>
                  </>
                )}
              </button>

              {generatedContent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                  {[
                    { title: 'Welcome Message', content: generatedContent.welcome },
                    { title: 'Family Introduction', content: generatedContent.family },
                    { title: 'Couple Story', content: generatedContent.story },
                    { title: 'Invitation Text', content: generatedContent.invitation },
                    { title: 'Event Description', content: generatedContent.event }
                  ].map((card, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl space-y-3 border border-slate-100 group relative">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</p>
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-900">
                          <Settings size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed italic">"{card.content}"</p>
                      <div className="flex gap-2 pt-2">
                        <button className="text-[10px] font-bold text-indigo-600 hover:underline">Use in Website</button>
                        <button className="text-[10px] font-bold text-slate-400 hover:underline">Edit Manually</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-10 space-y-8 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Domain & URL</h2>
              <Badge variant={publishStatus === 'Live' ? 'success' : 'warning'}>{publishStatus}</Badge>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">weddingplanner.com/{selectedWedding.coupleNames.toLowerCase().replace(' & ', '-weds-')}</p>
                  <p className="text-xs text-slate-400 font-medium">Primary Slug Preview</p>
                </div>
              </div>
              <button className="p-3 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-900">
                <ExternalLink size={20} />
              </button>
            </div>
          </Card>

          <Card className="p-10 space-y-8 border-none shadow-xl">
            <h2 className="text-2xl font-bold tracking-tight">Page Configuration</h2>
            <div className="space-y-4">
              {[
                { name: 'Home Page', status: 'Published', icon: Globe },
                { name: 'Our Story', status: 'Published', icon: Heart },
                { name: 'Schedule', status: 'Draft', icon: Clock },
                { name: 'Gallery', status: 'Published', icon: Camera },
                { name: 'RSVP', status: 'Published', icon: UserCheck }
              ].map((page, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-3xl transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-slate-900 transition-colors">
                      <page.icon size={24} />
                    </div>
                    <p className="font-bold text-slate-900">{page.name}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge variant={page.status === 'Published' ? 'success' : 'warning'}>{page.status}</Badge>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-10">
          <Card className="p-10 space-y-8 border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                  Edit Hero Section
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                  Update Story
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left font-bold transition-all flex items-center justify-between group">
                  Manage RSVP Fields
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <Globe className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
          </Card>

          <Card className="p-10 space-y-6 border-none shadow-xl">
            <h2 className="text-xl font-bold tracking-tight">Website Stats</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 font-medium">Total Visitors</p>
                <p className="font-bold text-slate-900">1,240</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 font-medium">RSVP Submissions</p>
                <p className="font-bold text-slate-900">84</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500 font-medium">Photo Uploads</p>
                <p className="font-bold text-slate-900">12</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      <AnimatePresence>
        {showPublishModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPublishModal(false)}
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
                  <h2 className="text-3xl font-bold tracking-tight">Ready to Publish?</h2>
                  <p className="text-slate-500 font-medium">This will make the wedding website live for all guests.</p>
                </div>
                <button onClick={() => setShowPublishModal(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">weddingplanner.com/{selectedWedding.coupleNames.toLowerCase().replace(' & ', '-weds-')}</p>
                    <p className="text-xs text-slate-400 font-medium">Live URL</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowPublishModal(false)} className="flex-1 btn-secondary py-4 font-bold">Cancel</button>
                <button onClick={handlePublish} className="flex-1 btn-primary py-4 font-bold">🚀 Publish Now</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success State after Publish */}
      <AnimatePresence>
        {publishStatus === 'Live' && !showPublishModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 right-8 z-[150] w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Website is Live!</p>
                <p className="text-xs text-slate-500 font-medium">Successfully published to the web.</p>
              </div>
              <button onClick={() => setPublishStatus('Draft')} className="ml-auto p-2 text-slate-300 hover:text-slate-900">
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 btn-secondary py-3 text-xs font-bold flex items-center justify-center gap-2">
                <Share2 size={14} />
                Copy Link
              </button>
              <button className="flex-1 btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2">
                <ExternalLink size={14} />
                Open Site
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Invitation Management View ---
export const InvitationView = ({ selectedWedding }: { selectedWedding: Wedding }) => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Invitations</h1>
        <p className="text-slate-500 font-medium">Design and send digital invitations for {selectedWedding.coupleNames}.</p>
      </div>
      <button className="btn-primary flex items-center gap-3 py-4 px-10 text-lg shadow-2xl">
        <Send size={24} />
        <span>Send Invitations</span>
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <Card className="p-10 space-y-10 border-none shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Design Preview</h2>
            <button className="text-sm font-bold text-slate-900 hover:underline">Customize Design</button>
          </div>
          <div className="aspect-[3/4] bg-slate-50 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" alt="" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-8">
              <p className="section-label text-slate-900 tracking-[0.3em]">SAVE THE DATE</p>
              <h3 className="text-5xl font-serif italic text-slate-900">{selectedWedding.coupleNames}</h3>
              <div className="w-12 h-px bg-slate-900" />
              <p className="text-lg font-bold text-slate-900 uppercase tracking-widest">{new Date(selectedWedding.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-sm font-medium text-slate-500">{selectedWedding.city}, {selectedWedding.country}</p>
            </div>
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all duration-500" />
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Delivery Status</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-900">Sent</p>
                <p className="text-sm font-bold text-slate-500">142 / 150</p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-900">Opened</p>
                <p className="text-sm font-bold text-slate-500">118 / 142</p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '83%' }} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-900">RSVP'd</p>
                <p className="text-sm font-bold text-slate-500">84 / 118</p>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '71%' }} />
              </div>
            </div>
          </div>
          <button className="btn-secondary w-full py-4 text-sm font-bold shadow-sm">View Guest List</button>
        </Card>

        <Card className="p-10 space-y-6 border-none shadow-xl">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { name: 'John Smith', action: 'opened invitation', time: '2 mins ago' },
              { name: 'Emma Wilson', action: 'submitted RSVP', time: '15 mins ago' },
              { name: 'David Brown', action: 'opened invitation', time: '1 hour ago' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-slate-900">{item.name} <span className="font-medium text-slate-500">{item.action}</span></p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// --- Guest List View ---
export const GuestListView = ({ selectedWedding }: { selectedWedding: Wedding }) => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Guest List</h1>
        <p className="text-slate-500 font-medium">Manage RSVPs and guest details for {selectedWedding.coupleNames}.</p>
      </div>
      <div className="flex gap-4">
        <button className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
        <button className="btn-primary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-xl">
          <Plus size={20} />
          <span>Add Guest</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Total Guests</p>
        <p className="text-4xl font-bold tracking-tight">150</p>
        <Badge variant="info">Target: 160</Badge>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Confirmed</p>
        <p className="text-4xl font-bold tracking-tight">84</p>
        <Badge variant="success">56% Response</Badge>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Declined</p>
        <p className="text-4xl font-bold tracking-tight">12</p>
        <p className="text-xs text-slate-400 font-medium">8% of total</p>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Pending</p>
        <p className="text-4xl font-bold tracking-tight">54</p>
        <Badge variant="warning">Follow up needed</Badge>
      </Card>
    </div>

    {/* Multi-Event Headcount Tracker */}
    <Card className="p-10 space-y-8 border-none shadow-xl bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="text-indigo-500" size={24} />
          Multi-Event Headcount Tracker
        </h2>
        <Badge variant="info">Live RSVP Data</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {selectedWedding.schedule.map((event, i) => (
          <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-bold text-slate-900">{event.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.date}</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                <Users size={18} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900">{event.confirmedCount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confirmed</p>
                </div>
                <p className="text-xs font-bold text-slate-500">{Math.round((event.confirmedCount || 0) / (event.expectedCount || 1) * 100)}%</p>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-slate-900" style={{ width: `${(event.confirmedCount || 0) / (event.expectedCount || 1) * 100}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invited</p>
                  <p className="text-sm font-bold text-slate-900">{event.expectedCount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tentative</p>
                  <p className="text-sm font-bold text-slate-900">{Math.floor((event.expectedCount || 0) * 0.1)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    <Card className="border-none shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input-field pl-12 py-3" placeholder="Search guests..." />
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center gap-2 py-3 px-6 text-sm">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="px-8 py-6">Guest Name</th>
              <th className="px-8 py-6">Email</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Events</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'John Smith', email: 'john@example.com', status: 'Confirmed', events: 'Ceremony, Reception' },
              { name: 'Emma Wilson', email: 'emma@example.com', status: 'Pending', events: 'All Events' },
              { name: 'David Brown', email: 'david@example.com', status: 'Declined', events: '-' },
              { name: 'Sarah Miller', email: 'sarah@example.com', status: 'Confirmed', events: 'Reception Only' }
            ].map((guest, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                      {guest.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <p className="font-bold text-slate-900">{guest.name}</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-slate-500 font-medium">{guest.email}</td>
                <td className="px-8 py-6">
                  <Badge variant={guest.status === 'Confirmed' ? 'success' : guest.status === 'Pending' ? 'warning' : 'default'}>{guest.status}</Badge>
                </td>
                <td className="px-8 py-6 text-slate-500 font-medium">{guest.events}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-900 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// --- Gallery Management View ---
export const GalleryManagementView = ({ selectedWedding }: { selectedWedding: Wedding }) => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Galleries</h1>
        <p className="text-slate-500 font-medium">Manage photo galleries and AI matching for {selectedWedding.coupleNames}.</p>
      </div>
      <div className="flex gap-4">
        <button className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm">
          <Share2 size={20} />
          <span>Share Gallery</span>
        </button>
        <button className="btn-primary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-xl">
          <Camera size={20} />
          <span>Create Gallery</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { name: 'Engagement Session', photos: 42, status: 'Delivered', date: 'March 12, 2026' },
        { name: 'Wedding Day - Main', photos: 842, status: 'In Review', date: 'June 15, 2026' },
        { name: 'Guest Uploads', photos: 156, status: 'Live', date: 'June 15, 2026' }
      ].map((gallery, i) => (
        <Card key={i} className="p-10 space-y-8 border-none shadow-xl hover:translate-y-[-4px] transition-all group">
          <div className="aspect-video bg-slate-100 rounded-[2rem] overflow-hidden relative">
            <img src={`https://picsum.photos/seed/${gallery.name}/800/450`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" referrerPolicy="no-referrer" />
            <div className="absolute top-6 right-6">
              <Badge variant={gallery.status === 'Delivered' ? 'success' : gallery.status === 'In Review' ? 'warning' : 'info'}>{gallery.status}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{gallery.name}</h3>
            <p className="text-slate-500 font-medium">{gallery.photos} photos • {gallery.date}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 btn-secondary py-3 text-xs font-bold">Manage</button>
            <button className="flex-1 btn-primary py-3 text-xs font-bold">View</button>
          </div>
        </Card>
      ))}
    </div>

    <Card className="p-10 space-y-8 border-none shadow-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">AI Guest Matching Status</h2>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <p className="section-label">Matched Guests</p>
          <p className="text-4xl font-bold tracking-tight">112 / 150</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '75%' }} />
          </div>
        </div>
        <div className="space-y-4">
          <p className="section-label">Photos Processed</p>
          <p className="text-4xl font-bold tracking-tight">1,240</p>
          <Badge variant="info">98% Accuracy</Badge>
        </div>
        <div className="space-y-4">
          <p className="section-label">Notifications Sent</p>
          <p className="text-4xl font-bold tracking-tight">84</p>
          <p className="text-xs text-slate-400 font-medium">Guests notified of matches</p>
        </div>
      </div>
    </Card>
  </div>
);

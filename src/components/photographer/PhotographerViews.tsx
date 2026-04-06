import React from 'react';
import { 
  Upload, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  ChevronRight, 
  Camera, 
  UserCheck, 
  Star, 
  Download, 
  Share2, 
  Image as ImageIcon,
  X,
  Settings
} from 'lucide-react';
import { Card, Badge } from '../common/UI';
import { MOCK_WEDDINGS } from '../../types';

// --- Photographer Dashboard ---
export const PhotographerDashboard = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Photographer Dashboard</h1>
        <p className="text-slate-500 font-medium">Manage your galleries and AI guest matching.</p>
      </div>
      <button className="btn-primary flex items-center gap-3 py-4 px-10 text-lg shadow-2xl">
        <Upload size={24} />
        <span>Upload New Gallery</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Total Photos</p>
        <p className="text-4xl font-bold tracking-tight">4,280</p>
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
          <Plus size={14} /> 120 today
        </div>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">AI Matches</p>
        <p className="text-4xl font-bold tracking-tight">1,150</p>
        <Badge variant="success">98% Accuracy</Badge>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Galleries Delivered</p>
        <p className="text-4xl font-bold tracking-tight">24</p>
        <div className="flex items-center gap-2 text-blue-500 text-xs font-bold">
          <CheckCircle2 size={14} /> All on time
        </div>
      </Card>
      <Card className="p-8 space-y-4 border-none shadow-xl">
        <p className="section-label">Couple Selections</p>
        <p className="text-4xl font-bold tracking-tight">8</p>
        <Badge variant="warning">Pending Review</Badge>
      </Card>
    </div>

    <Card className="border-none shadow-2xl">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight">Active Galleries</h2>
        <div className="flex gap-4">
          <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-90"><Filter size={20} className="text-slate-400" /></button>
          <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-90"><Search size={20} className="text-slate-400" /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="px-8 py-6">Wedding</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Photos</th>
              <th className="px-8 py-6">Guest Matches</th>
              <th className="px-8 py-6">Delivery</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_WEDDINGS.map(wedding => (
              <tr key={wedding.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://picsum.photos/seed/${wedding.id}/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 text-lg leading-none">{wedding.coupleNames}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(wedding.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge variant={wedding.status === 'Upcoming' ? 'info' : 'success'}>{wedding.status}</Badge>
                </td>
                <td className="px-8 py-6 font-bold text-slate-900">842</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-emerald-500 shadow-lg shadow-emerald-500/20" style={{ width: '75%' }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">75%</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-400 uppercase tracking-widest">12 Days Left</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-3 text-slate-300 hover:text-slate-900 transition-all group-hover:translate-x-1">
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

// --- Upload Gallery View ---
export const UploadGalleryView = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Upload Gallery</h1>
        <p className="text-slate-500 font-medium">Add new photos to a wedding gallery and start AI matching.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-10">
        <Card className="p-12 border-none shadow-xl border-2 border-dashed border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer group text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 group-hover:text-slate-900 transition-colors">
            <Upload size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Drop your photos here</h3>
            <p className="text-slate-400 font-medium">or click to browse from your computer</p>
          </div>
          <div className="pt-4 flex justify-center gap-4">
            <Badge variant="info">JPG, PNG supported</Badge>
            <Badge variant="info">Max 25MB per file</Badge>
          </div>
        </Card>

        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Upload Queue</h2>
          <div className="space-y-6">
            {[
              { name: 'IMG_4821.jpg', size: '4.2 MB', progress: 100, status: 'Complete' },
              { name: 'IMG_4822.jpg', size: '3.8 MB', progress: 100, status: 'Complete' },
              { name: 'IMG_4823.jpg', size: '5.1 MB', progress: 45, status: 'Uploading' },
              { name: 'IMG_4824.jpg', size: '4.5 MB', progress: 0, status: 'Pending' }
            ].map((file, i) => (
              <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <ImageIcon size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-400 font-bold">{file.size}</p>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${file.progress}%` }} />
                  </div>
                </div>
                <div className="w-24 text-right">
                  <Badge variant={file.status === 'Complete' ? 'success' : file.status === 'Uploading' ? 'info' : 'default'}>{file.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Gallery Settings</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="section-label">Select Wedding</label>
              <select className="input-field py-3">
                {MOCK_WEDDINGS.map(w => <option key={w.id}>{w.coupleNames}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="section-label">Gallery Category</label>
              <select className="input-field py-3">
                <option>Ceremony</option>
                <option>Reception</option>
                <option>Portraits</option>
                <option>Engagement</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">AI Guest Matching</p>
                <p className="text-xs text-slate-400 font-medium">Auto-match guests to photos</p>
              </div>
              <div className="w-12 h-6 bg-slate-900 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <button className="btn-primary w-full py-4 shadow-xl">Start AI Processing</button>
        </Card>
      </div>
    </div>
  </div>
);

// --- AI Matches View ---
export const AIMatchesView = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">AI Guest Matching</h1>
        <p className="text-slate-500 font-medium">Review and verify AI-detected guest matches across all galleries.</p>
      </div>
      <div className="flex gap-4">
        <button className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm">
          <Settings size={20} />
          <span>Matching Settings</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <Card className="p-10 space-y-6 border-none shadow-xl">
        <h2 className="text-xl font-bold tracking-tight">Matching Accuracy</h2>
        <div className="flex items-center justify-center py-10">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-500" strokeDasharray="98, 100" strokeWidth="3" strokeLinecap="round" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">98%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-10 space-y-8 border-none shadow-xl col-span-2">
        <h2 className="text-xl font-bold tracking-tight">Recent Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { guest: 'John Smith', confidence: '99%', photos: 12, img: 'https://i.pravatar.cc/150?u=john' },
            { guest: 'Emma Wilson', confidence: '96%', photos: 8, img: 'https://i.pravatar.cc/150?u=emma' },
            { guest: 'David Brown', confidence: '94%', photos: 15, img: 'https://i.pravatar.cc/150?u=david' },
            { guest: 'Sarah Miller', confidence: '97%', photos: 6, img: 'https://i.pravatar.cc/150?u=sarah' }
          ].map((match, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-slate-900 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                <img src={match.img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-bold text-slate-900">{match.guest}</p>
                <p className="text-xs text-slate-400 font-medium">{match.photos} photos matched • {match.confidence} confidence</p>
              </div>
              <button className="p-2 text-slate-300 group-hover:text-slate-900 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- Delivery Tracking View ---
export const DeliveryTrackingView = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Delivery Tracking</h1>
        <p className="text-slate-500 font-medium">Monitor the status of gallery deliveries and couple approvals.</p>
      </div>
    </div>

    <Card className="border-none shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="px-8 py-6">Wedding</th>
              <th className="px-8 py-6">Delivery Type</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6">Deadline</th>
              <th className="px-8 py-6">Couple Action</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { wedding: 'Sarah & James', type: 'Full Gallery', status: 'In Progress', deadline: 'July 15, 2026', action: 'Pending' },
              { wedding: 'Priya & Arjun', type: 'Engagement', status: 'Delivered', deadline: 'Completed', action: 'Approved' },
              { wedding: 'Mike & Anna', type: 'Highlights', status: 'Delivered', deadline: 'Completed', action: 'In Review' }
            ].map((delivery, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td className="px-8 py-6 font-bold text-slate-900">{delivery.wedding}</td>
                <td className="px-8 py-6 text-slate-500 font-medium">{delivery.type}</td>
                <td className="px-8 py-6">
                  <Badge variant={delivery.status === 'Delivered' ? 'success' : 'info'}>{delivery.status}</Badge>
                </td>
                <td className="px-8 py-6 text-slate-400 font-bold text-xs uppercase tracking-widest">{delivery.deadline}</td>
                <td className="px-8 py-6">
                  <Badge variant={delivery.action === 'Approved' ? 'success' : delivery.action === 'In Review' ? 'warning' : 'default'}>{delivery.action}</Badge>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="btn-secondary py-2 px-4 text-xs font-bold">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// --- Couple Selections View ---
export const CoupleSelectionsView = () => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Couple Selections</h1>
        <p className="text-slate-500 font-medium">Review photos favorited and shortlisted by couples for final albums.</p>
      </div>
      <button className="btn-primary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-xl">
        <Download size={20} />
        <span>Export Selection List</span>
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {MOCK_WEDDINGS.slice(0, 3).map((wedding, i) => (
        <Card key={i} className="p-10 space-y-8 border-none shadow-xl hover:translate-y-[-4px] transition-all group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{wedding.coupleNames}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(wedding.date).toLocaleDateString()}</p>
            </div>
            <Badge variant="info">84 Photos</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
                <img src={`https://picsum.photos/seed/${wedding.id + n}/200`} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-500">Favorites</span>
              <span className="text-slate-900">42</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-500">Shortlisted</span>
              <span className="text-slate-900">24</span>
            </div>
          </div>
          <button className="btn-secondary w-full py-4 text-sm font-bold shadow-sm">Review Selections</button>
        </Card>
      ))}
    </div>
  </div>
);

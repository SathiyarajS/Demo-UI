import React, { useState } from 'react';
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
  Settings,
  Sparkles
} from 'lucide-react';
import { Card, Badge, SuccessState } from '../common/UI';
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

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <Card className="lg:col-span-2 border-none shadow-2xl overflow-hidden">
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

      <div className="space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Competitive Edge</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">Planner Network Rank</p>
                  <Badge variant="success">Top 5%</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Delivery Speed</span>
                    <span className="text-white">98th Percentile</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '98%' }} />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">AI Matching Accuracy</p>
                  <p className="text-emerald-400 font-bold">99.2%</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Your accuracy is 4.5% higher than the average photographer in this network.</p>
              </div>
            </div>
          </div>
          <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
        </Card>

        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Recent Selections</h2>
          <div className="space-y-6">
            {[
              { couple: 'Sarah & James', count: 12, time: '2h ago' },
              { couple: 'Priya & Arjun', count: 45, time: '1d ago' },
              { couple: 'Mike & Anna', count: 8, time: '3d ago' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.couple}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.count} new favorites</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
            Review All Selections
          </button>
        </Card>
      </div>
    </div>
  </div>
);

// --- Upload Gallery View ---
export const UploadGalleryView = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<any[]>([]);
  const [isTethered, setIsTethered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);

  const toggleTethering = () => {
    setIsTethered(!isTethered);
    if (!isTethered) {
      // Simulate incoming photos
      const interval = setInterval(() => {
        setUploadQueue(prev => [{
          name: `TETHER_${Math.floor(Math.random() * 10000)}.JPG`,
          size: '12.4 MB',
          progress: 100,
          status: 'Complete'
        }, ...prev].slice(0, 100));
      }, 3000);
      return () => clearInterval(interval);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    const newFiles = files.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      progress: 0,
      status: 'Pending'
    }));

    setUploadQueue(prev => [...newFiles.slice(0, 20), ...prev].slice(0, 100)); // Limit UI for demo
    
    // Simulate upload progress for the first few
    setTimeout(() => {
      setUploadQueue(prev => prev.map((f, i) => {
        const isNew = newFiles.some(nf => nf.name === f.name);
        return isNew ? { ...f, progress: 100, status: 'Complete' } : f;
      }));
    }, 1500);
  };

  const simulateDeviceScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const mockFiles = Array.from({ length: 15 }).map((_, i) => ({
        name: `DSC_${1000 + i}.RAW`,
        size: '42.5 MB',
        progress: 0,
        status: 'Pending'
      }));
      setUploadQueue(prev => [...mockFiles, ...prev]);
    }, 2000);
  };

  const clearCompleted = () => {
    setUploadQueue(prev => prev.filter(f => f.status !== 'Complete'));
  };

  const totalProgress = uploadQueue.length > 0 
    ? Math.round((uploadQueue.filter(f => f.status === 'Complete').length / uploadQueue.length) * 100)
    : 0;

  if (isComplete) {
    return (
      <SuccessState 
        title="AI Processing Complete"
        description={`${uploadQueue.length || 842} photos have been matched with 124 guests. The gallery is now ready for couple review.`}
        actionLabel="View Matches"
        onAction={() => {
          setIsComplete(false);
          setUploadQueue([]);
        }}
      />
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">High-Speed Bulk Upload</h1>
          <p className="text-slate-500 font-medium">Import thousands of RAW or JPG photos directly from your memory card or camera.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={toggleTethering}
            className={`btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm transition-all ${isTethered ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ''}`}
          >
            <Camera size={20} className={isTethered ? 'animate-pulse' : ''} />
            <span>{isTethered ? 'Tethering Active' : 'Enable Tethering'}</span>
          </button>
          <button 
            onClick={simulateDeviceScan}
            disabled={isScanning}
            className="btn-secondary flex items-center gap-3 py-4 px-8 text-sm font-bold shadow-sm"
          >
            <Clock size={20} className={isScanning ? 'animate-pulse' : ''} />
            <span>{isScanning ? 'Scanning Devices...' : 'Scan for Memory Card'}</span>
          </button>
        </div>
      </div>

      {uploadQueue.length > 0 && (
        <Card className="p-6 bg-slate-900 text-white border-none shadow-2xl flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-6 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Upload size={24} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>Total Upload Progress</span>
                <span>{totalProgress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 transition-all duration-700" style={{ width: `${totalProgress}%` }} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {uploadQueue.filter(f => f.status === 'Complete').length} / {uploadQueue.length} Files
            </p>
            <button onClick={clearCompleted} className="text-xs font-bold hover:text-emerald-400 transition-colors">Clear Completed</button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <input 
            type="file" 
            {...({ webkitdirectory: "" } as any)}
            className="hidden" 
            ref={folderInputRef}
            onChange={handleFileSelect}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              onClick={() => fileInputRef.current?.click()}
              className="p-12 border-none shadow-xl border-2 border-dashed border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer group text-center space-y-4"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300 group-hover:text-slate-900 transition-colors">
                <ImageIcon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Select Files</h3>
                <p className="text-slate-400 font-medium text-sm">Import individual photos</p>
              </div>
            </Card>
            <Card 
              onClick={() => folderInputRef.current?.click()}
              className="p-12 border-none shadow-xl border-2 border-dashed border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer group text-center space-y-4"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300 group-hover:text-slate-900 transition-colors">
                <Plus size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Import Folder</h3>
                <p className="text-slate-400 font-medium text-sm">Upload entire directory structure</p>
              </div>
            </Card>
          </div>

          <Card className="p-10 space-y-8 border-none shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Upload Queue</h2>
              <div className="flex gap-4">
                <Badge variant="info">RAW Support Active</Badge>
                <Badge variant="info">Auto-Grouping On</Badge>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {uploadQueue.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <ImageIcon size={48} className="mx-auto text-slate-100" />
                  <p className="text-slate-400 font-medium">Your upload queue is empty. Connect a device or select files to begin.</p>
                </div>
              ) : (
                uploadQueue.map((file, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <ImageIcon size={24} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{file.size}</p>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${file.progress}%` }} />
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <Badge variant={file.status === 'Complete' ? 'success' : file.status === 'Uploading' ? 'info' : 'default'}>{file.status}</Badge>
                    </div>
                  </div>
                ))
              )}
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
            <button 
              onClick={() => {
                setIsProcessing(true);
                setTimeout(() => setIsComplete(true), 2000);
              }}
              className="btn-primary w-full py-4 shadow-xl flex items-center justify-center gap-2"
              disabled={isProcessing || uploadQueue.length === 0}
            >
              {isProcessing ? (
                <>
                  <Clock size={20} className="animate-spin" />
                  <span>Processing {uploadQueue.length} Photos...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Start AI Processing</span>
                </>
              )}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

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

// --- Duplicate Review View ---
export const DuplicateReviewView = () => {
  const [resolvedGroups, setResolvedGroups] = useState<number[]>([]);

  const resolveGroup = (id: number) => {
    setResolvedGroups(prev => [...prev, id]);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">AI Duplicate Review</h1>
          <p className="text-slate-500 font-medium">AI has detected potential duplicates. Review and clean up your gallery to save storage.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary py-4 px-8 text-sm font-bold">Ignore All</button>
          <button className="btn-primary py-4 px-8 text-sm font-bold shadow-xl">Auto-Clean Gallery</button>
        </div>
      </div>

      <div className="space-y-8">
        {[1, 2, 3].map(group => (
          <Card key={group} className={`p-10 space-y-8 border-none shadow-xl transition-all duration-500 ${resolvedGroups.includes(group) ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${resolvedGroups.includes(group) ? 'bg-slate-100 text-slate-400' : 'bg-amber-50 text-amber-500'}`}>
                  <ImageIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Duplicate Group #{group}</h3>
                  <p className="text-sm text-slate-400 font-medium">98% Visual Similarity Detected</p>
                </div>
              </div>
              <Badge variant={resolvedGroups.includes(group) ? 'success' : 'warning'}>
                {resolvedGroups.includes(group) ? 'Resolved' : 'Action Required'}
              </Badge>
            </div>
            {!resolvedGroups.includes(group) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map(photo => (
                    <div key={photo} className="relative aspect-[3/4] rounded-[2rem] overflow-hidden group border-4 border-transparent hover:border-slate-900 transition-all cursor-pointer">
                      <img src={`https://picsum.photos/seed/dup-${group}-${photo}/400`} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4">
                        <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all ${photo === 1 ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white'}`}>
                          {photo === 1 ? <CheckCircle2 size={16} /> : null}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <p className="text-white font-bold text-sm">{photo === 1 ? 'Keep this' : 'Mark as Duplicate'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-4 border-t border-slate-50 pt-8">
                  <button className="btn-secondary py-3 px-8 text-xs font-bold">Keep All</button>
                  <button onClick={() => resolveGroup(group)} className="btn-primary py-3 px-8 text-xs font-bold">Resolve Group</button>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

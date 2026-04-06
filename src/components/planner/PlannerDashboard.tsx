import React from 'react';
import { Plus, Heart, UserCheck, Clock, ChevronRight, Calendar, TrendingUp, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, Badge } from '../common/UI';
import { Wedding, MOCK_WEDDINGS } from '../../types';

interface PlannerDashboardProps {
  setCurrentScreen: (screen: string) => void;
  setSelectedWedding: (wedding: Wedding) => void;
}

export const PlannerDashboard = ({ setCurrentScreen, setSelectedWedding }: PlannerDashboardProps) => (
  <div className="space-y-10">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Portfolio Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back, Sarah. Your portfolio is performing 12% better than last month.</p>
      </div>
      <button 
        onClick={() => setCurrentScreen('create-wedding')}
        className="btn-primary flex items-center gap-3 py-4 px-8 shadow-2xl"
      >
        <Plus size={20} />
        <span>New Wedding Project</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Active Weddings', value: '12', icon: Heart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Total Guests', value: '842', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Pending Approvals', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Avg. Satisfaction', value: '4.9', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' }
      ].map((stat, i) => (
        <Card key={i} className="p-8 flex flex-col gap-4 border-none shadow-xl">
          <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="section-label">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <Card className="lg:col-span-2 border-none shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold tracking-tight">Recent Projects</h2>
          <button onClick={() => setCurrentScreen('weddings')} className="text-sm font-bold text-slate-900 hover:underline flex items-center gap-2">
            View All Portfolio <ChevronRight size={16} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {MOCK_WEDDINGS.slice(0, 4).map(wedding => (
            <div key={wedding.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => {
              setSelectedWedding(wedding);
              setCurrentScreen('wedding-detail');
            }}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                  <img 
                    src={`https://picsum.photos/seed/${wedding.id}/200`} 
                    alt="" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-lg">{wedding.coupleNames}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={12} /> {new Date(wedding.date).toLocaleDateString()}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{wedding.city}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:block text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs font-bold text-slate-900">65%</span>
                  </div>
                </div>
                <Badge variant={wedding.status === 'Upcoming' ? 'info' : 'success'}>
                  {wedding.status}
                </Badge>
                <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-10">
        <Card className="p-10 space-y-8 border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Business Insights</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Revenue Growth</p>
                  <p className="text-xs text-slate-400">+24% vs last quarter</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Client Feedback</p>
                  <p className="text-xs text-slate-400">98% positive sentiment</p>
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all">
              View Reports
            </button>
          </div>
          <BarChart3 className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
        </Card>

        <Card className="p-10 space-y-8 border-none shadow-xl">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Tasks</h2>
          <div className="space-y-8">
            {[
              { time: '10:00 AM', event: 'Venue Walkthrough', couple: 'Sarah & James' },
              { time: '02:30 PM', event: 'Floral Tasting', couple: 'Priya & Arjun' },
              { time: '05:00 PM', event: 'Gallery Review', couple: 'Mike & Anna' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group cursor-pointer">
                <div className="w-16 text-[10px] font-bold text-slate-400 pt-1 uppercase tracking-widest">{item.time}</div>
                <div className="flex-1 pb-6 border-l-2 border-slate-100 pl-6 relative last:pb-0">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-900 group-hover:bg-slate-900 transition-colors" />
                  <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.event}</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{item.couple}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
            Full Calendar
          </button>
        </Card>
      </div>
    </div>
  </div>
);

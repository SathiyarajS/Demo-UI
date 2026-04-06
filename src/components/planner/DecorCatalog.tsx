import React, { useState } from 'react';
import { Plus, Eye, Heart, Filter } from 'lucide-react';
import { Card, Badge } from '../common/UI';
import { DECOR_PACKAGES, THEMES } from '../../types';

export const DecorCatalog = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Stage', 'Floral', 'Bouquet', 'Entrance'];
  
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Decor & Bouquet Catalog</h1>
          <p className="text-slate-500 mt-1">Manage your premium inventory and packages.</p>
        </div>
        <button className="btn-primary flex items-center gap-3">
          <Plus size={22} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap tracking-wider uppercase ${
              filter === cat ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {DECOR_PACKAGES.filter(p => filter === 'All' || p.category === filter).map(pkg => (
          <Card key={pkg.id} className="group cursor-pointer border-none shadow-xl">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6">
                <Badge variant="info">{pkg.category}</Badge>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                <button className="w-14 h-14 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform flex items-center justify-center shadow-2xl">
                  <Eye size={24} />
                </button>
                <button className="w-14 h-14 bg-white rounded-full text-pink-500 hover:scale-110 transition-transform flex items-center justify-center shadow-2xl">
                  <Heart size={24} />
                </button>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-slate-900 text-xl mb-2">{pkg.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-2">{pkg.description}</p>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: THEMES.find(t => t.id === pkg.themeId)?.accent }} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{THEMES.find(t => t.id === pkg.themeId)?.name}</span>
                </div>
                <button className="text-slate-900 font-bold text-sm hover:underline tracking-tight">Edit Package</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

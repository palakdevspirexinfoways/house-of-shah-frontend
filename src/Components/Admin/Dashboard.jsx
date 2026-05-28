import React from 'react';
import { Sliders, ShoppingBag, Image as ImageIcon, ToggleLeft, TrendingUp, Activity } from 'lucide-react';

const Dashboard = ({ slidesCount, productsCount, galleryCount, popupEnabled }) => {
  const stats = [
    { 
      title: 'Hero Slides', 
      value: slidesCount, 
      code: 'SYSTEM.SLIDES', 
      icon: <Sliders size={18} />, 
      color: '#1a4173',
      lightBg: 'rgba(26,65,115,0.08)',
      border: 'rgba(26,65,115,0.15)'
    },
    { 
      title: 'Signature Products', 
      value: productsCount, 
      code: 'SYSTEM.PRODUCTS', 
      icon: <ShoppingBag size={18} />, 
      color: '#7c3aed',
      lightBg: 'rgba(124,58,237,0.08)',
      border: 'rgba(124,58,237,0.15)'
    },
    { 
      title: 'Gallery Artifacts', 
      value: galleryCount, 
      code: 'SYSTEM.GALLERY', 
      icon: <ImageIcon size={18} />, 
      color: '#059669',
      lightBg: 'rgba(5,150,105,0.08)',
      border: 'rgba(5,150,105,0.15)'
    },
    { 
      title: 'Auto Popup', 
      value: popupEnabled ? 'ON' : 'OFF', 
      code: 'SYSTEM.POPUP', 
      icon: <ToggleLeft size={18} />, 
      color: popupEnabled ? '#059669' : '#dc2626',
      lightBg: popupEnabled ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
      border: popupEnabled ? 'rgba(5,150,105,0.15)' : 'rgba(220,38,38,0.15)'
    }
  ];

  return (
    <div className="space-y-8 font-outfit">
      
      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="relative overflow-hidden group"
            style={{
              background: 'white',
              border: `1px solid ${stat.border}`,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = `0 8px 24px ${stat.lightBg}`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 transition-transform group-hover:scale-125"
              style={{ background: stat.lightBg }} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase">{stat.code}</span>
                <div className="p-2 rounded-xl" style={{ background: stat.lightBg, color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <span className="text-4xl font-black block tracking-tight mb-1.5" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Activity Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="md:col-span-2" style={{
          background: 'white',
          border: '1px solid rgba(26,65,115,0.1)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(26,65,115,0.08)' }}>
              <Activity size={16} style={{ color: '#1a4173' }} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: '#1a4173' }}>Welcome to Atelier Console</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">System Control Workspace</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              This control workspace manages all frontend content in real-time via a live MongoDB backend. Use the sidebar navigation to manage hero slides, products, gallery artifacts, and registered users.
            </p>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              All edits are immediately reflected on the public-facing website. Product images are stored on the server and served via Cloudinary CDN for optimal performance.
            </p>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1a4173 0%, #0d2140 100%)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(26,65,115,0.2)'
        }}>
          <TrendingUp size={20} className="text-white/50 mb-4" />
          <h4 className="text-white font-black text-lg tracking-tight mb-1">
            {(slidesCount + productsCount + galleryCount)} Items
          </h4>
          <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-6">Total Content Items</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-[10px] uppercase tracking-wider">Slides</span>
              <span className="text-white font-bold text-xs">{slidesCount}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-[10px] uppercase tracking-wider">Products</span>
              <span className="text-white font-bold text-xs">{productsCount}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-[10px] uppercase tracking-wider">Gallery</span>
              <span className="text-white font-bold text-xs">{galleryCount}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

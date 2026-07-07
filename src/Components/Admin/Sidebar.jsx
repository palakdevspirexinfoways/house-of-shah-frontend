import React from 'react';
import { 
   LayoutDashboard, 
   Sliders, 
   ShoppingBag, 
   Image as ImageIcon, 
   ToggleLeft, 
   LogOut,
   User,
   Crown
} from 'lucide-react';
 
const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
   const tabs = [
     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
     { id: 'slider', label: 'Slider Manage', icon: <Sliders size={16} /> },
     { id: 'collections', label: 'Collections', icon: <LayoutDashboard size={16} /> },
     { id: 'products', label: 'Product Manage', icon: <ShoppingBag size={16} /> },
     { id: 'gallery', label: 'Gallery Manage', icon: <ImageIcon size={16} /> },
     { id: 'popup', label: 'Form Popup', icon: <ToggleLeft size={16} /> },
     { id: 'users', label: 'User Registry', icon: <User size={16} /> }
   ];

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between hidden md:flex font-outfit"
      style={{
        background: 'linear-gradient(180deg, #0d2140 0%, #1a4173 60%, #0d2140 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      
      {/* Brand Header */}
      <div>
        <div className="px-7 pt-8 pb-6 border-b border-white/10">
          <p className="text-white font-bold tracking-[0.35em] uppercase text-sm mb-5">House of Shah</p>
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/60">ATELIER CONSOLE</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="px-4 pt-5 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] tracking-wider uppercase font-bold transition-all duration-200 rounded-xl ${
                activeTab === tab.id 
                  ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20' 
                  : 'text-white/50 hover:text-white/80 hover:bg-white/8 border border-transparent'
              }`}
            >
              <span className={activeTab === tab.id ? 'opacity-100' : 'opacity-60'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="px-4 py-6 border-t border-white/10 space-y-3">
        {/* Admin Badge */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/8 border border-white/10">
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
            <Crown size={12} className="text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest block">Admin</span>
            <span className="text-[8px] text-white/40 uppercase tracking-widest">House of Shah</span>
          </div>
        </div>
        {/* Disconnect Button */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-[11px] tracking-wider uppercase font-bold text-red-300/70 hover:text-red-300 hover:bg-red-500/10 transition-all rounded-xl border border-transparent hover:border-red-500/20"
        >
          <LogOut size={14} />
          Disconnect
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;

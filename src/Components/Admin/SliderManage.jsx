import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';

const SliderManage = ({ slides, onAddClick, onEditClick, onDeleteClick }) => {
  const [filterPage, setFilterPage] = useState('all');

  const filteredSlides = filterPage === 'all' 
    ? slides 
    : slides.filter(slide => slide.page === filterPage);

  const getPageDisplayName = (pageCode) => {
    switch (pageCode) {
      case 'home': return 'Home';
      case 'product': return 'Jewellery';
      case 'gallery': return 'Digital Magazine';
      case 'about': return 'About Us';
      case 'beyond': return 'Beyond Jewellery';
      case 'contact': return 'Contact';
      default: return pageCode?.toUpperCase() || 'HOME';
    }
  };

  return (
    <div className="space-y-6 font-outfit">
      
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
            {filteredSlides.length} Hero Banners Registered
          </span>
          <div className="relative inline-block">
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="appearance-none bg-white border border-[rgba(26,65,115,0.18)] text-[#1a4173] text-[10px] font-bold uppercase tracking-widest py-2 pl-3 pr-8 rounded-lg outline-none focus:border-[#1a4173] transition-colors cursor-pointer"
            >
              <option value="all">Filter: All Pages</option>
              <option value="home">Home</option>
              <option value="product">Jewellery</option>
              <option value="gallery">Digital Magazine</option>
              <option value="about">About Us</option>
              <option value="beyond">Beyond Jewellery</option>
              <option value="contact">Contact</option>
            </select>
            <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all"
          style={{
            background: '#1a4173',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(26,65,115,0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#0d2140'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26,65,115,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,65,115,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Plus size={14} /> Add New Slide
        </button>
      </div>

      {/* Empty State */}
      {filteredSlides.length === 0 && (
        <div className="text-center py-20" style={{
          background: 'white',
          border: '2px dashed rgba(26,65,115,0.15)',
          borderRadius: '16px'
        }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(26,65,115,0.08)' }}>
            <Plus size={24} style={{ color: '#1a4173', opacity: 0.5 }} />
          </div>
          <p className="text-gray-400 text-sm font-medium">No slides yet</p>
          <p className="text-gray-300 text-xs mt-1">Click "Add New Slide" to create your first hero banner</p>
        </div>
      )}

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSlides.map((slide) => (
          <div 
            key={slide.id} 
            className="group overflow-hidden"
            style={{
              background: 'white',
              border: '1px solid rgba(26,65,115,0.08)',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,65,115,0.1)'; e.currentTarget.style.borderColor = 'rgba(26,65,115,0.2)'; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(26,65,115,0.08)'; }}
          >
            {/* Image Thumbnail */}
            <div className="w-full h-44 overflow-hidden" style={{ background: '#f8f9fa' }}>
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="p-5">
              {/* Content */}
              <div className="space-y-1 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: '#1a4173' }}>
                    {slide.tagline || '—'}
                  </span>
                  <span className="text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded" style={{ background: '#1a4173', color: 'white' }}>
                    {getPageDisplayName(slide.page)}
                  </span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight" style={{ color: '#1a4173' }}>{slide.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">{slide.desc}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4" style={{ borderTop: '1px solid rgba(26,65,115,0.06)' }}>
                <button 
                  onClick={() => onEditClick(slide)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{
                    padding: '8px 14px',
                    background: 'rgba(26,65,115,0.06)',
                    color: '#1a4173',
                    borderRadius: '8px',
                    border: '1px solid rgba(26,65,115,0.12)'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#1a4173'; }}
                  title="Edit Slide"
                >
                  <Edit2 size={11} /> Edit
                </button>
                <button 
                  onClick={() => onDeleteClick(slide.id)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{
                    padding: '8px 14px',
                    background: 'rgba(220,38,38,0.06)',
                    color: '#dc2626',
                    borderRadius: '8px',
                    border: '1px solid rgba(220,38,38,0.12)'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.color = '#dc2626'; }}
                  title="Delete Slide"
                >
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SliderManage;

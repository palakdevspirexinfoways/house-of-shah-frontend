import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const GalleryManage = ({ gallery, onAddClick, onEditClick, onDeleteClick }) => {
  return (
    <div className="space-y-6 font-outfit">
      
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {gallery.length} Gallery Images Loaded
        </span>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
          style={{
            background: '#1a4173', color: 'white',
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            boxShadow: '0 4px 12px rgba(26,65,115,0.3)', transition: 'all 0.2s ease'
          }}
          onMouseOver={e => { e.currentTarget.style.background = '#0d2140'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26,65,115,0.4)'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,65,115,0.3)'; }}
        >
          <Plus size={14} /> Add Gallery Image
        </button>
      </div>

      {/* Empty State */}
      {gallery.length === 0 && (
        <div className="text-center py-20" style={{
          background: 'white', border: '2px dashed rgba(26,65,115,0.15)',
          borderRadius: '16px'
        }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(26,65,115,0.06)' }}>
            <Plus size={24} style={{ color: '#1a4173', opacity: 0.4 }} />
          </div>
          <p className="text-gray-400 text-sm font-medium">No gallery items yet</p>
          <p className="text-gray-300 text-xs mt-1">Click "Add Gallery Image" to upload your first item</p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gallery.map((item) => (
          <div 
            key={item.id} 
            className="group overflow-hidden flex flex-col"
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
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden" style={{ background: '#f8f9fa' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3" style={{ borderTop: '1px solid rgba(26,65,115,0.06)' }}>
                <button 
                  onClick={() => onEditClick(item)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{
                    padding: '7px 12px', background: 'rgba(26,65,115,0.06)',
                    color: '#1a4173', borderRadius: '8px', border: '1px solid rgba(26,65,115,0.12)'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#1a4173'; }}
                  title="Edit Gallery entry"
                >
                  <Edit2 size={11} /> Edit
                </button>
                <button 
                  onClick={() => onDeleteClick(item.id)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{
                    padding: '7px 12px', background: 'rgba(220,38,38,0.06)',
                    color: '#dc2626', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.12)'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.color = '#dc2626'; }}
                  title="Delete Gallery entry"
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

export default GalleryManage;

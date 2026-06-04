import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, ChevronDown, Check, Search } from 'lucide-react';

// ─── Luxury Custom Dropdown Component ─────────────────────────────────────────
const CustomDropdown = ({ value, onChange, options, placeholder = 'Select...', label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
        style={{
          background: 'white',
          border: isOpen ? '1.5px solid #1a4173' : '1.5px solid rgba(26,65,115,0.18)',
          borderRadius: '10px',
          boxShadow: isOpen ? '0 0 0 3px rgba(26,65,115,0.08)' : 'none',
          color: value ? '#1a4173' : '#9ca3af',
          transition: 'all 0.18s ease'
        }}
      >
        <span className="text-xs font-semibold truncate" style={{ color: value ? '#1a4173' : '#9ca3af' }}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={14} 
          className="shrink-0 ml-2 transition-transform duration-200"
          style={{ color: '#1a4173', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1.5 overflow-hidden"
          style={{
            background: 'white',
            border: '1.5px solid rgba(26,65,115,0.15)',
            borderRadius: '12px',
            boxShadow: '0 16px 40px rgba(26,65,115,0.15)',
            animation: 'dropdownIn 0.15s ease'
          }}
        >
          {/* Search bar inside dropdown */}
          {options.length > 4 && (
            <div className="p-2 border-b" style={{ borderColor: 'rgba(26,65,115,0.06)' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(26,65,115,0.04)' }}>
                <Search size={11} style={{ color: '#9ca3af' }} />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 text-xs outline-none bg-transparent"
                  style={{ color: '#1a4173' }}
                />
              </div>
            </div>
          )}
          {/* Options List */}
          <div className="max-h-52 overflow-y-auto py-1.5">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400 text-center">No matches found</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors"
                  style={{
                    color: opt === value ? '#1a4173' : '#374151',
                    background: opt === value ? 'rgba(26,65,115,0.06)' : 'transparent',
                    fontSize: '12px',
                    fontWeight: opt === value ? 700 : 500
                  }}
                  onMouseOver={e => { if (opt !== value) e.currentTarget.style.background = 'rgba(26,65,115,0.04)'; }}
                  onMouseOut={e => { if (opt !== value) e.currentTarget.style.background = 'transparent'; }}
                >
                  {opt}
                  {opt === value && <Check size={12} style={{ color: '#1a4173' }} />}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── Product Manage Component ─────────────────────────────────────────────────
const ProductManage = ({ 
  products, 
  availableCollections, 
  availableCategories, 
  onAddClick, 
  onEditClick, 
  onDeleteClick, 
  onAssignHighlight,
  onReorder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCollection, setFilterCollection] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterHighlight, setFilterHighlight] = useState('All');
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection = filterCollection === 'All' || p.collection === filterCollection;
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesHighlight = 
      filterHighlight === 'All'
        ? true
        : filterHighlight === 'None'
          ? !p.homepageHighlight
          : p.homepageHighlight === filterHighlight;
    return matchesSearch && matchesCollection && matchesCategory && matchesHighlight;
  });

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    if (draggedItemIndex === index) return;
    
    // Check if we are currently filtering; if so, maybe disable reorder to avoid confusion, 
    // but assuming dragging happens when list is mostly unfiltered. Let's allow it but warn.
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
      setDraggedItemIndex(null);
      return;
    }

    const draggedProduct = filteredProducts[draggedItemIndex];
    const targetProduct = filteredProducts[targetIndex];

    const originalDraggedIndex = products.findIndex(p => p.id === draggedProduct.id);
    const originalTargetIndex = products.findIndex(p => p.id === targetProduct.id);

    const newProductsList = [...products];
    newProductsList.splice(originalDraggedIndex, 1);
    newProductsList.splice(originalTargetIndex, 0, draggedProduct);
    
    setDraggedItemIndex(null);
    
    if (onReorder) {
      onReorder(newProductsList.map(p => p.id));
    }
  };


  return (
    <div className="space-y-6 font-outfit">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filteredProducts.length} of {products.length} Products
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
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Filter Bar with Custom Dropdowns */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5"
        style={{
          background: 'white',
          border: '1px solid rgba(26,65,115,0.08)',
          borderRadius: '14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}
      >
        {/* Search Input */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">Search Products</label>
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-xs outline-none transition-all"
              style={{
                background: 'white',
                border: '1.5px solid rgba(26,65,115,0.18)',
                borderRadius: '10px',
                color: '#1a4173'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#1a4173'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,65,115,0.08)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(26,65,115,0.18)'; e.currentTarget.style.boxShadow = 'none'; }}
              placeholder="Search by title..."
            />
          </div>
        </div>

        {/* Collection Filter */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">Collection</label>
          <CustomDropdown 
            value={filterCollection === 'All' ? '' : filterCollection}
            onChange={(v) => setFilterCollection(v)}
            options={['All', ...availableCollections]}
            placeholder="All Collections"
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">Category</label>
          <CustomDropdown 
            value={filterCategory === 'All' ? '' : filterCategory}
            onChange={(v) => setFilterCategory(v)}
            options={['All', ...availableCategories]}
            placeholder="All Categories"
          />
        </div>

        {/* Highlight Filter */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">Highlight</label>
          <CustomDropdown 
            value={filterHighlight === 'All' ? '' : filterHighlight}
            onChange={(v) => setFilterHighlight(v)}
            options={['All', 'Signature Creations', 'Jewellery Design', 'None']}
            placeholder="All Highlights"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16" style={{
          background: 'white', border: '2px dashed rgba(26,65,115,0.12)',
          borderRadius: '16px'
        }}>
          <p className="text-gray-400 text-sm font-medium">No products found</p>
          <p className="text-gray-300 text-xs mt-1">Try adjusting your filters or add a new product</p>
        </div>
      )}

      {/* Products Table */}
      {filteredProducts.length > 0 && (
        <div style={{
          background: 'white',
          border: '1px solid rgba(26,65,115,0.08)',
          borderRadius: '14px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          overflow: 'hidden'
        }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(26,65,115,0.08)', background: 'rgba(26,65,115,0.02)' }}>
                  {['Product', 'Collection', 'Category', 'Weight', 'Highlights', 'Actions'].map((h) => (
                    <th key={h} className="p-4 text-[9px] font-black tracking-widest text-gray-400 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, i) => (
                  <tr 
                    key={product.id} 
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDrop={(e) => handleDrop(e, i)}
                    className="transition-colors cursor-move"
                    style={{ 
                      borderBottom: i < filteredProducts.length - 1 ? '1px solid rgba(26,65,115,0.05)' : 'none',
                      opacity: draggedItemIndex === i ? 0.5 : 1
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.02)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Product Details */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-13 rounded-lg overflow-hidden shrink-0" style={{ background: '#f8f9fa', border: '1px solid rgba(26,65,115,0.08)' }}>
                          <img src={product.image} className="w-full h-full object-cover" alt={product.title} style={{ height: '52px' }} />
                        </div>
                        <div>
                          <span className="font-bold text-xs uppercase tracking-wide block" style={{ color: '#1a4173' }}>{product.title}</span>
                          <span className="text-[9px] font-mono text-gray-400 block mt-0.5 uppercase">{product.id?.slice(0, 10)}...</span>
                        </div>
                      </div>
                    </td>

                    {/* Collection */}
                    <td className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" 
                        style={{ background: 'rgba(26,65,115,0.08)', color: '#1a4173' }}>
                        {product.collection || '—'}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
                    </td>

                    {/* Weight */}
                    <td className="p-4 font-mono text-xs text-gray-500">{product.weight || '—'}</td>

                    {/* Highlight Toggles */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button 
                          onClick={() => onAssignHighlight(product.id, product.homepageHighlight === 'Signature Creations' ? '' : 'Signature Creations')}
                          className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full transition-all"
                          style={{
                            background: product.homepageHighlight === 'Signature Creations' ? '#1a4173' : 'rgba(26,65,115,0.06)',
                            color: product.homepageHighlight === 'Signature Creations' ? 'white' : '#1a4173',
                            border: `1px solid ${product.homepageHighlight === 'Signature Creations' ? '#1a4173' : 'rgba(26,65,115,0.15)'}`
                          }}
                        >
                          Signature
                        </button>
                        <button 
                          onClick={() => onAssignHighlight(product.id, product.homepageHighlight === 'Jewellery Design' ? '' : 'Jewellery Design')}
                          className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full transition-all"
                          style={{
                            background: product.homepageHighlight === 'Jewellery Design' ? '#7c3aed' : 'rgba(124,58,237,0.06)',
                            color: product.homepageHighlight === 'Jewellery Design' ? 'white' : '#7c3aed',
                            border: `1px solid ${product.homepageHighlight === 'Jewellery Design' ? '#7c3aed' : 'rgba(124,58,237,0.15)'}`
                          }}
                        >
                          Jewellery
                        </button>
                        {product.homepageHighlight && (
                          <button 
                            onClick={() => onAssignHighlight(product.id, '')}
                            className="p-1 rounded-full transition-all"
                            style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.15)' }}
                            onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.08)'; e.currentTarget.style.color = '#dc2626'; }}
                            title="Clear highlight"
                          >
                            <X size={9} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onEditClick(product)}
                          className="p-2 rounded-lg transition-all"
                          style={{ background: 'rgba(26,65,115,0.06)', color: '#1a4173', border: '1px solid rgba(26,65,115,0.12)' }}
                          onMouseOver={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.color = 'white'; }}
                          onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#1a4173'; }}
                          title="Edit Product"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button 
                          onClick={() => onDeleteClick(product.id)}
                          className="p-2 rounded-lg transition-all"
                          style={{ background: 'rgba(220,38,38,0.06)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.12)' }}
                          onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                          onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.color = '#dc2626'; }}
                          title="Delete Product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export { CustomDropdown };
export default ProductManage;

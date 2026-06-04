import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  Search
} from 'lucide-react';

// Import Separated Modular Admin Components
import Sidebar from '../Components/Admin/Sidebar';
import Login from '../Components/Admin/Login';
import Dashboard from '../Components/Admin/Dashboard';
import SliderManage from '../Components/Admin/SliderManage';
import ProductManage from '../Components/Admin/ProductManage';
import GalleryManage from '../Components/Admin/GalleryManage';

// ─── Shared Luxury Input Styles ───────────────────────────────────────────────
const inputStyle = {
  background: 'white',
  border: '1.5px solid rgba(26,65,115,0.18)',
  borderRadius: '10px',
  color: '#1a4173',
  padding: '12px 16px',
  fontSize: '13px',
  width: '100%',
  outline: 'none',
  transition: 'all 0.18s ease',
  fontFamily: 'Outfit, sans-serif'
};
const inputFocusStyle = { border: '1.5px solid #1a4173', boxShadow: '0 0 0 3px rgba(26,65,115,0.08)' };

// ─── Custom Luxury Dropdown ───────────────────────────────────────────────────
const CustomDropdown = ({ value, onChange, options, placeholder = 'Select...', hasNewOption, onAddNew, onDeleteOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

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
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{
          ...inputStyle,
          padding: '12px 16px',
          color: value ? '#1a4173' : '#9ca3af',
          border: isOpen ? '1.5px solid #1a4173' : '1.5px solid rgba(26,65,115,0.18)',
          boxShadow: isOpen ? '0 0 0 3px rgba(26,65,115,0.08)' : 'none',
          cursor: 'pointer'
        }}
      >
        <span className="text-sm font-semibold truncate" style={{ color: value ? '#1a4173' : '#9ca3af' }}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={15} 
          className="shrink-0 ml-2 transition-transform duration-200"
          style={{ color: '#1a4173', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute z-50 w-full mt-1.5 overflow-hidden origin-top"
            style={{
              background: 'white',
              border: '1.5px solid rgba(26,65,115,0.15)',
              borderRadius: '12px',
              boxShadow: '0 16px 40px rgba(26,65,115,0.15)'
            }}
          >
            {/* Search */}
            {options.length > 5 && (
              <div className="p-2" style={{ borderBottom: '1px solid rgba(26,65,115,0.06)' }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(26,65,115,0.04)' }}>
                  <Search size={11} style={{ color: '#9ca3af' }} />
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 text-sm outline-none bg-transparent font-outfit"
                    style={{ color: '#1a4173' }}
                  />
                </div>
              </div>
            )}
            {/* Options */}
            <div className="max-h-52 overflow-y-auto py-1.5">
              {filtered.map((opt) => (
                <div key={opt} className="w-full flex items-center justify-between transition-colors font-outfit"
                  style={{
                    color: opt === value ? '#1a4173' : '#374151',
                    background: opt === value ? 'rgba(26,65,115,0.06)' : 'transparent',
                  }}
                  onMouseOver={e => { if (opt !== value) e.currentTarget.style.background = 'rgba(26,65,115,0.03)'; }}
                  onMouseOut={e => { if (opt !== value) e.currentTarget.style.background = 'transparent'; }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className="flex-1 flex items-center justify-between px-4 py-2.5 text-left"
                    style={{ fontSize: '13px', fontWeight: opt === value ? 700 : 500 }}
                  >
                    {opt}
                    {opt === value && <Check size={13} style={{ color: '#1a4173' }} />}
                  </button>
                  {onDeleteOption && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDeleteOption(opt); }}
                      className="px-4 py-2.5 text-red-400 hover:text-red-600 transition-colors"
                      title="Delete Option"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400 text-center">No matches</div>
              )}
            </div>
            {/* Add new option */}
            {hasNewOption && onAddNew && (
              <div style={{ borderTop: '1px solid rgba(26,65,115,0.06)', padding: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); onAddNew(); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-colors rounded-lg"
                  style={{ color: '#1a4173', background: 'rgba(26,65,115,0.04)' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.08)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.04)'; }}
                >
                  <Plus size={13} /> Add New…
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Luxury Label + Input Field Helper ───────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest block" style={{ color: '#9ca3af' }}>{label}</label>
    {children}
  </div>
);

// ─── Luxury Form Input ───────────────────────────────────────────────────────
const LuxInput = ({ value, onChange, placeholder, required, type = 'text', textarea, rows = 3, minLength, maxLength, pattern, min, max, accept }) => {
  const [focused, setFocused] = useState(false);
  const style = { ...inputStyle, ...(focused ? inputFocusStyle : {}) };
  
  if (textarea) {
    return (
      <textarea 
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...style, resize: 'none' }}
      />
    );
  }
  return (
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      min={min}
      max={max}
      accept={accept}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={style}
    />
  );
};

// ─── Drag & Drop Image Upload ────────────────────────────────────────────────
const ImageUploadDropzone = ({ onFileSelect, isUploading, required, id }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`relative flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 rounded-xl ${isDragActive ? 'bg-[#1a4173]/10 border-2 border-[#1a4173] scale-[1.02]' : 'bg-[#1a4173]/[0.02] border-[1.5px] border-dashed border-[#1a4173]/30 hover:bg-[#1a4173]/[0.05] hover:border-[#1a4173]/50'}`}
    >
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*" 
        onChange={onFileSelect} 
        required={required}
        id={id}
        className="hidden" 
      />
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-[#1a4173]/10">
        <Plus size={16} className="text-[#1a4173]" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a4173] mb-1">
        {isUploading ? 'Uploading...' : 'Click or Drag Image Here'}
      </p>
      <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">
        PNG, JPG up to 3MB
      </p>
    </div>
  );
};

const AdminPage = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Datastore States
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [popupEnabled, setPopupEnabled] = useState(true);
  const [exhibitionMode, setExhibitionMode] = useState(false);
  // Form / Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formType, setFormType] = useState('');
  
  // Slide Form Fields
  const [slideForm, setSlideForm] = useState({ id: '', tagline: '', title: '', desc: '', image: '', page: 'home' });
  // Product Form Fields
  const [productForm, setProductForm] = useState({ id: '', title: '', collection: '', category: '', homepageHighlight: '', weight: '', image: '', dynamicText: '' });
  // Gallery Form Fields
  const [galleryForm, setGalleryForm] = useState({ id: '', title: '', category: '', image: '' });

  // Users Registry
  const [users, setUsers] = useState([]);
  const [editUserItem, setEditUserItem] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '', email: '', companyName: '', contactNumber: '',
    interestedProduct: [], natureOfBusiness: [], additionalRemarks: '', password: ''
  });

  // Dynamic Collections & Categories
  const [availableCollections, setAvailableCollections] = useState(() => {
    const saved = localStorage.getItem('hos_available_collections');
    return saved ? JSON.parse(saved) : ['Heritage', 'Imperial', 'Bridal', 'Minimalist'];
  });

  const [availableCategories, setAvailableCategories] = useState(() => {
    const saved = localStorage.getItem('hos_available_categories');
    return saved ? JSON.parse(saved) : ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware'];
  });

  // Inline new input states
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  // Notifications
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isUploading, setIsUploading] = useState(false);

  // Hero Display Configuration
  const [heroMode, setHeroMode] = useState('slider');
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [isHeroSettingsOpen, setIsHeroSettingsOpen] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    try {
      const resSlides = await fetch(`${API_BASE_URL}/slides`);
      const dataSlides = await resSlides.json();
      if (dataSlides.success) setSlides(dataSlides.data);

      const resProducts = await fetch(`${API_BASE_URL}/products`);
      const dataProducts = await resProducts.json();
      if (dataProducts.success) setProducts(dataProducts.data);

      const resGallery = await fetch(`${API_BASE_URL}/gallery`);
      const dataGallery = await resGallery.json();
      if (dataGallery.success) setGallery(dataGallery.data);

      const resSettings = await fetch(`${API_BASE_URL}/settings`);
      const dataSettings = await resSettings.json();
      if (dataSettings.success) {
        setPopupEnabled(dataSettings.data.popupEnabled !== false);
        setExhibitionMode(dataSettings.data.exhibitionMode === true);
        if (dataSettings.data.hero_mode) setHeroMode(dataSettings.data.hero_mode);
        if (dataSettings.data.hero_video_url) setHeroVideoUrl(dataSettings.data.hero_video_url);
      }

      const token = localStorage.getItem('hos_admin_token');
      if (token) {
        const resUsers = await fetch(`${API_BASE_URL}/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataUsers = await resUsers.json();
        if (dataUsers.success) {
          setUsers(dataUsers.data);
        } else {
          // Token invalid or user not found
          localStorage.removeItem('hos_admin_session');
          localStorage.removeItem('hos_admin_token');
          setIsLoggedIn(false);
          setLoginEmail(''); 
          setLoginPass('');
          triggerToast('Session expired. Please log in again.', 'error');
        }
      }
    } catch (error) {
      console.error('Error fetching backend data:', error);
    }
  };

  const handleImageFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) { alert('File size exceeds the 3MB limit.'); return; }

    const token = localStorage.getItem('hos_admin_token');
    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    triggerToast('Uploading image…', 'info');

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.success) {
        if (type === 'slide') setSlideForm(prev => ({ ...prev, image: data.imageUrl }));
        else if (type === 'product') setProductForm(prev => ({ ...prev, image: data.imageUrl }));
        else if (type === 'gallery') setGalleryForm(prev => ({ ...prev, image: data.imageUrl }));
        triggerToast('Image uploaded successfully!', 'success');
      } else { alert(data.message || 'Image upload failed.'); }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Upload failed. Server error.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    if (file.size > 99 * 1024 * 1024) { alert('File size exceeds the 99MB limit.'); return; }

    const token = localStorage.getItem('hos_admin_token');
    const formData = new FormData();
    formData.append('image', file); // We use the same 'image' field for multer
    setIsUploading(true);
    triggerToast('Uploading video…', 'info');

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setHeroVideoUrl(data.imageUrl);
        await saveHeroSettings(heroMode, data.imageUrl);
        triggerToast('Video uploaded successfully!', 'success');
      } else { alert(data.message || 'Video upload failed.'); }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Upload failed. Server error.');
    } finally {
      setIsUploading(false);
    }
  };

  const saveHeroSettings = async (mode, url) => {
    const token = localStorage.getItem('hos_admin_token');
    try {
      await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: 'hero_mode', value: mode })
      });
      await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: 'hero_video_url', value: url })
      });
      triggerToast('Hero settings saved.', 'success');
    } catch (error) {
      triggerToast('Failed to save hero settings.', 'error');
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('hos_admin_session');
    const token = localStorage.getItem('hos_admin_token');
    if (session === 'active' && token) setIsLoggedIn(true);
    fetchData();
  }, []);

  const triggerToast = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPass.trim()) { setLoginError('Please enter both Email and Password.'); return; }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('hos_admin_token', data.token);
        localStorage.setItem('hos_admin_session', 'active');
        setIsLoggedIn(true);
        setLoginError('');
        triggerToast('Logged in successfully.');
        fetchData();
      } else { setLoginError(data.message || 'Invalid Credentials.'); }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Server connection failed. Make sure the backend is running.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hos_admin_session');
    localStorage.removeItem('hos_admin_token');
    setIsLoggedIn(false);
    setLoginEmail(''); setLoginPass('');
    triggerToast('Logged out of Atelier Console.');
  };

  const handlePopupToggle = async () => {
    const nextVal = !popupEnabled;
    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: 'popupEnabled', value: nextVal })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPopupEnabled(nextVal);
        triggerToast(`5s Popup ${nextVal ? 'Enabled' : 'Disabled'}.`);
      } else { triggerToast(data.message || 'Failed to update settings.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleExhibitionToggle = async () => {
    const nextVal = !exhibitionMode;
    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: 'exhibitionMode', value: nextVal })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setExhibitionMode(nextVal);
        triggerToast(`Exhibition Mode ${nextVal ? 'Enabled' : 'Disabled'}.`);
      } else { triggerToast(data.message || 'Failed to update settings.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleDataReset = async () => {
    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/settings/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        triggerToast('Database reseeded successfully.');
        fetchData();
      } else { triggerToast(data.message || 'Reset failed.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleAssignHighlight = async (productId, highlightName) => {
    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ homepageHighlight: highlightName })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        triggerToast(highlightName ? `Assigned to '${highlightName}'.` : 'Highlight removed.');
        fetchData();
      } else { triggerToast(data.message || 'Failed to assign highlight.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleProductReorder = async (newOrderIds) => {
    const oldProducts = [...products];
    const reorderedProducts = newOrderIds.map(id => oldProducts.find(p => p.id === id)).filter(Boolean);
    setProducts(reorderedProducts);

    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/products/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ orderedIds: newOrderIds })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        triggerToast(data.message || 'Failed to save product order.');
        setProducts(oldProducts);
      } else {
        triggerToast('Products reordered successfully.');
      }
    } catch (error) {
      triggerToast('Server connection failed.');
      setProducts(oldProducts);
    }
  };

  const handleSaveNewCollection = () => {
    if (newCollectionName && newCollectionName.trim()) {
      const trimmed = newCollectionName.trim();
      if (!availableCollections.includes(trimmed)) {
        const updated = [...availableCollections, trimmed];
        setAvailableCollections(updated);
        localStorage.setItem('hos_available_collections', JSON.stringify(updated));
      }
      setProductForm(prev => ({ ...prev, collection: trimmed }));
      setShowNewCollectionInput(false);
      setNewCollectionName('');
      triggerToast('Collection added.');
    }
  };

  const handleDeleteCollection = async (collectionName) => {
    const isUsed = products.some(p => p.collection === collectionName);
    if (isUsed) {
      if (!window.confirm(`"${collectionName}" is currently assigned to one or more products. Are you sure you want to delete this collection? This will remove it from all assigned products.`)) {
        return;
      }
      // Remove collection from existing products
      const productsToUpdate = products.filter(p => p.collection === collectionName);
      const token = localStorage.getItem('hos_admin_token');
      for (const p of productsToUpdate) {
        try {
          await fetch(`${API_BASE_URL}/products/${p.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ collection: '' })
          });
        } catch (e) {
          console.error("Failed to update product", p.id);
        }
      }
      fetchData(); // Refresh product list
    }
    const updatedCollections = availableCollections.filter(c => c !== collectionName);
    setAvailableCollections(updatedCollections);
    localStorage.setItem('hos_available_collections', JSON.stringify(updatedCollections));
    triggerToast(`Collection '${collectionName}' deleted.`);
    if (productForm.collection === collectionName) {
      setProductForm(prev => ({ ...prev, collection: '' }));
    }
  };

  const handleSaveNewCategory = () => {
    if (newCategoryName && newCategoryName.trim()) {
      const trimmed = newCategoryName.trim();
      if (!availableCategories.includes(trimmed)) {
        const updated = [...availableCategories, trimmed];
        setAvailableCategories(updated);
        localStorage.setItem('hos_available_categories', JSON.stringify(updated));
      }
      setProductForm(prev => ({ ...prev, category: trimmed }));
      setShowNewCategoryInput(false);
      setNewCategoryName('');
      triggerToast('Category added.');
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    const isUsed = products.some(p => p.category === categoryName);
    if (isUsed) {
      if (!window.confirm(`"${categoryName}" is currently assigned to one or more products. Are you sure you want to delete this category? This will remove it from all assigned products.`)) {
        return;
      }
      // Remove category from existing products
      const productsToUpdate = products.filter(p => p.category === categoryName);
      const token = localStorage.getItem('hos_admin_token');
      for (const p of productsToUpdate) {
        try {
          await fetch(`${API_BASE_URL}/products/${p.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ category: '' }) // Can be empty or a default value
          });
        } catch (e) {
          console.error("Failed to update product", p.id);
        }
      }
      fetchData(); // Refresh product list
    }
    const updatedCategories = availableCategories.filter(c => c !== categoryName);
    setAvailableCategories(updatedCategories);
    localStorage.setItem('hos_available_categories', JSON.stringify(updatedCategories));
    triggerToast(`Category '${categoryName}' deleted.`);
    if (productForm.category === categoryName) {
      setProductForm(prev => ({ ...prev, category: '' }));
    }
  };

  const handleOpenAdd = (type) => {
    setFormType(type);
    setEditItem(null);
    if (type === 'slide') setSlideForm({ id: '', tagline: '', title: '', desc: '', image: '', page: 'home' });
    else if (type === 'product') setProductForm({ title: '', collection: '', category: '', homepageHighlight: '', weight: '', image: '', dynamicText: '' });
    else if (type === 'gallery') setGalleryForm({ title: '', category: 'Magazine Issue #44', image: '' });
    setShowAddModal(true);
  };

  const handleOpenEdit = (type, item) => {
    setFormType(type);
    setEditItem(item);
    if (type === 'slide') setSlideForm({ id: item.id || item._id, tagline: item.tagline || '', title: item.title, desc: item.desc || '', image: item.image, page: item.page || 'home' });
    else if (type === 'product') setProductForm({ title: item.title, collection: item.collection || '', category: item.category, homepageHighlight: item.homepageHighlight || '', weight: item.weight || '', image: item.image, dynamicText: item.dynamicText || '' });
    else if (type === 'gallery') setGalleryForm({ title: item.title, category: item.category, image: item.image });
    setShowAddModal(true);
  };

  const handleDeleteItem = async (type, id) => {
    const token = localStorage.getItem('hos_admin_token');
    const map = { slide: ['slides', 'Hero Slide removed.'], product: ['products', 'Product removed.'], gallery: ['gallery', 'Gallery item removed.'] };
    const [endpoint, toastName] = map[type];
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.success) { triggerToast(toastName); fetchData(); }
      else { triggerToast(data.message || 'Deletion failed.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleOpenUserEdit = (user) => {
    setEditUserItem(user);
    setUserForm({
      name: user.name || '', email: user.email || '', companyName: user.companyName || '',
      contactNumber: user.contactNumber || '', interestedProduct: user.interestedProduct || [],
      natureOfBusiness: user.natureOfBusiness || [], additionalRemarks: user.additionalRemarks || '', password: ''
    });
  };

  const handleToggleUserEditProduct = (prod) => {
    let current = userForm.interestedProduct || [];
    if (prod === 'All') {
      if (current.includes('All')) setUserForm(prev => ({ ...prev, interestedProduct: [] }));
      else setUserForm(prev => ({ ...prev, interestedProduct: ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware'] }));
      return;
    }
    let next = [...current];
    if (next.includes(prod)) next = next.filter(item => item !== prod && item !== 'All');
    else {
      next.push(prod);
      const items = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware'];
      if (items.every(i => next.includes(i))) next.push('All');
    }
    setUserForm(prev => ({ ...prev, interestedProduct: next }));
  };

  const handleToggleUserEditBusiness = (bus) => {
    let current = userForm.natureOfBusiness || [];
    if (bus === 'All') {
      if (current.includes('All')) setUserForm(prev => ({ ...prev, natureOfBusiness: [] }));
      else setUserForm(prev => ({ ...prev, natureOfBusiness: ['All', 'Wholesale', 'Retail', 'Online'] }));
      return;
    }
    let next = [...current];
    if (next.includes(bus)) next = next.filter(item => item !== bus && item !== 'All');
    else {
      next.push(bus);
      const items = ['Wholesale', 'Retail', 'Online'];
      if (items.every(i => next.includes(i))) next.push('All');
    }
    setUserForm(prev => ({ ...prev, natureOfBusiness: next }));
  };

  const handleSaveUserEdit = async (e) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim() || !userForm.contactNumber.trim()) {
      alert('Name, Email Address, and Contact Number are mandatory.'); return;
    }
    if ((userForm.interestedProduct || []).length === 0 || (userForm.natureOfBusiness || []).length === 0) {
      alert('Please select at least one Interested Product and one Nature of Business.'); return;
    }
    const token = localStorage.getItem('hos_admin_token');
    const userId = editUserItem.id || editUserItem._id;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(userForm)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        triggerToast('User profile updated successfully.');
        setEditUserItem(null); fetchData();
      } else { alert(data.message || 'Failed to update user.'); }
    } catch (error) { alert('Server connection failed during update.'); }
  };

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm('Permanently delete this user registry profile?');
    if (!isConfirmed) return;
    const token = localStorage.getItem('hos_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.success) { triggerToast('User profile deleted.'); fetchData(); }
      else { triggerToast(data.message || 'Deletion failed.'); }
    } catch (error) { triggerToast('Server connection failed.'); }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('hos_admin_token');
    
    if (formType === 'slide') {
      if (!slideForm.title.trim() || !slideForm.image.trim()) { alert('Title and Image are required.'); return; }
      try {
        const response = editItem
          ? await fetch(`${API_BASE_URL}/slides/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(slideForm) })
          : await fetch(`${API_BASE_URL}/slides`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(slideForm) });
        const data = await response.json();
        if (response.ok && data.success) { triggerToast(editItem ? 'Slide updated.' : 'New slide added.'); fetchData(); setShowAddModal(false); }
        else { alert(data.message || 'Save failed.'); }
      } catch (error) { alert('Server connection failed.'); }
    } else if (formType === 'product') {
      if (!productForm.title.trim() || !productForm.image.trim()) { alert('Product Title and Image are required.'); return; }
      try {
        const response = editItem
          ? await fetch(`${API_BASE_URL}/products/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(productForm) })
          : await fetch(`${API_BASE_URL}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(productForm) });
        const data = await response.json();
        if (response.ok && data.success) { triggerToast(editItem ? 'Product updated.' : 'New product added.'); fetchData(); setShowAddModal(false); }
        else { alert(data.message || 'Save failed.'); }
      } catch (error) { alert('Server connection failed.'); }
    } else if (formType === 'gallery') {
      if (!galleryForm.title.trim() || !galleryForm.image.trim()) { alert('Gallery Title and Image are required.'); return; }
      try {
        const response = editItem
          ? await fetch(`${API_BASE_URL}/gallery/${editItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(galleryForm) })
          : await fetch(`${API_BASE_URL}/gallery`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(galleryForm) });
        const data = await response.json();
        if (response.ok && data.success) { triggerToast(editItem ? 'Gallery updated.' : 'Gallery item added.'); fetchData(); setShowAddModal(false); }
        else { alert(data.message || 'Save failed.'); }
      } catch (error) { alert('Server connection failed.'); }
    }
  };

  // ─── Form Panel Renderer ───────────────────────────────────────────────────
  const renderInPlaceForm = () => {
    const typeLabel = { slide: 'Hero Slide', product: 'Product', gallery: 'Gallery Image' };
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="font-outfit"
        style={{
          background: 'white',
          border: '1px solid rgba(26,65,115,0.1)',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: '0 4px 20px rgba(26,65,115,0.06)'
        }}
      >
        {/* Form Header */}
        <div className="flex justify-between items-start mb-8 pb-6" style={{ borderBottom: '1px solid rgba(26,65,115,0.08)' }}>
          <div>
            <h3 className="text-lg font-black uppercase tracking-wide" style={{ color: '#1a4173' }}>
              {editItem ? `Edit ${typeLabel[formType]}` : `Add New ${typeLabel[formType]}`}
            </h3>
            <span className="text-[10px] font-mono tracking-widest uppercase block mt-1" style={{ color: '#9ca3af' }}>
              Atelier {formType} Manager
            </span>
          </div>
          <button 
            type="button"
            onClick={() => setShowAddModal(false)}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-all"
            style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'rgba(26,65,115,0.04)', color: '#6b7280',
              border: '1px solid rgba(26,65,115,0.1)'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.08)'; e.currentTarget.style.color = '#1a4173'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.04)'; e.currentTarget.style.color = '#6b7280'; }}
          >
            <X size={13} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSaveForm} className="space-y-5 max-w-2xl">

          {/* ── SLIDE FORM ── */}
          {formType === 'slide' && (
            <>
              <Field label="Target Page *">
                <CustomDropdown
                  value={
                    {
                      home: 'Home',
                      product: 'Jewellery',
                      gallery: 'Digital Magazine',
                      about: 'About Us',
                      beyond: 'Beyond Jewellery',
                      contact: 'Contact'
                    }[slideForm.page] || 'Home'
                  }
                  onChange={val => {
                    const mapped = {
                      'Home': 'home',
                      'Jewellery': 'product',
                      'Digital Magazine': 'gallery',
                      'About Us': 'about',
                      'Beyond Jewellery': 'beyond',
                      'Contact': 'contact'
                    }[val];
                    setSlideForm({ ...slideForm, page: mapped });
                  }}
                  options={['Home', 'Jewellery', 'Digital Magazine', 'About Us', 'Beyond Jewellery', 'Contact']}
                />
              </Field>
              <Field label="Banner Tagline">
                <LuxInput value={slideForm.tagline} onChange={e => setSlideForm({ ...slideForm, tagline: e.target.value })} placeholder="e.g. A 15-Year Legacy of Purity" maxLength={100} />
              </Field>
              <Field label="Main Slide Title *">
                <LuxInput value={slideForm.title} onChange={e => setSlideForm({ ...slideForm, title: e.target.value })} placeholder="e.g. Artistry" required minLength={2} maxLength={50} />
              </Field>
              <Field label="Banner Description">
                <LuxInput textarea value={slideForm.desc} onChange={e => setSlideForm({ ...slideForm, desc: e.target.value })} placeholder="e.g. Curating bespoke silver collections..." maxLength={300} />
              </Field>
              <Field label="Upload Banner Image *">
                <div style={{
                  background: 'rgba(26,65,115,0.02)',
                  border: '1.5px dashed rgba(26,65,115,0.2)',
                  borderRadius: '10px', padding: '12px'
                }}>
                  <input 
                    type="file" accept="image/*"
                    onChange={e => handleImageFileChange(e, 'slide')}
                    required={!slideForm.image}
                    className="w-full text-sm font-outfit"
                    style={{ color: '#1a4173' }}
                  />
                </div>
                <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase mt-2 text-right">
                  Recommended: 1920x1080px (16:9) | Max: 3MB
                </p>
                {slideForm.image && (
                  <div className="mt-3 p-3 rounded-xl inline-block relative group" style={{ background: 'rgba(26,65,115,0.04)', border: '1px solid rgba(26,65,115,0.1)' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Preview</span>
                      <button 
                        type="button" 
                        onClick={() => setSlideForm({ ...slideForm, image: '' })}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1 rounded-md transition-colors"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <img src={slideForm.image} alt="Preview" className="max-h-28 rounded-lg object-contain" />
                  </div>
                )}
              </Field>
            </>
          )}

          {/* ── PRODUCT FORM ── */}
          {formType === 'product' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {/* Collection Field with custom dropdown */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Collection</label>
                    <button 
                      type="button" 
                      onClick={() => setShowNewCollectionInput(!showNewCollectionInput)}
                      className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
                      style={{ color: '#1a4173' }}
                    >
                      <Plus size={11} /> Add New
                    </button>
                  </div>
                  <CustomDropdown 
                    value={productForm.collection}
                    onChange={v => setProductForm({ ...productForm, collection: v })}
                    options={availableCollections}
                    placeholder="Select Collection"
                    onDeleteOption={handleDeleteCollection}
                  />
                  {/* Inline new collection input */}
                  <AnimatePresence>
                    {showNewCollectionInput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2 mt-2 p-3 rounded-xl" style={{ background: 'rgba(26,65,115,0.04)', border: '1px solid rgba(26,65,115,0.1)' }}>
                          <input 
                            type="text" value={newCollectionName}
                            onChange={e => setNewCollectionName(e.target.value)}
                            placeholder="Collection name..."
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSaveNewCollection(); } }}
                            style={{ ...inputStyle, padding: '8px 12px', fontSize: '12px', flex: 1 }}
                          />
                          <button type="button" onClick={handleSaveNewCollection}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg text-white"
                            style={{ background: '#1a4173' }}>Save</button>
                          <button type="button" onClick={() => { setShowNewCollectionInput(false); setNewCollectionName(''); }}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg"
                            style={{ background: 'rgba(26,65,115,0.08)', color: '#6b7280' }}>Cancel</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category Field with custom dropdown */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#9ca3af' }}>Category *</label>
                    <button 
                      type="button"
                      onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                      className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
                      style={{ color: '#1a4173' }}
                    >
                      <Plus size={11} /> Add New
                    </button>
                  </div>
                  <CustomDropdown 
                    value={productForm.category}
                    onChange={v => setProductForm({ ...productForm, category: v })}
                    options={availableCategories}
                    placeholder="Select Category"
                    onDeleteOption={handleDeleteCategory}
                  />
                  {/* Inline new category input */}
                  <AnimatePresence>
                    {showNewCategoryInput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2 mt-2 p-3 rounded-xl" style={{ background: 'rgba(26,65,115,0.04)', border: '1px solid rgba(26,65,115,0.1)' }}>
                          <input 
                            type="text" value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                            placeholder="Category name..."
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSaveNewCategory(); } }}
                            style={{ ...inputStyle, padding: '8px 12px', fontSize: '12px', flex: 1 }}
                          />
                          <button type="button" onClick={handleSaveNewCategory}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg text-white"
                            style={{ background: '#1a4173' }}>Save</button>
                          <button type="button" onClick={() => { setShowNewCategoryInput(false); setNewCategoryName(''); }}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg"
                            style={{ background: 'rgba(26,65,115,0.08)', color: '#6b7280' }}>Cancel</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Product Title *">
                  <LuxInput value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} placeholder="e.g. Royal Rajkot Queen Choker" required minLength={2} maxLength={100} />
                </Field>
                <Field label="Product Weight (g)">
                  <LuxInput value={productForm.weight} onChange={e => setProductForm({ ...productForm, weight: e.target.value })} placeholder="e.g. 92.5g" maxLength={50} />
                </Field>
                <div className="col-span-2">
                  <Field label="Dynamic Text (e.g. masterpieces matching active filters)">
                    <LuxInput value={productForm.dynamicText || ''} onChange={e => setProductForm({ ...productForm, dynamicText: e.target.value })} placeholder="Custom text for collection" />
                  </Field>
                </div>
              </div>

              <Field label="Upload Product Image *">
                <ImageUploadDropzone 
                  onFileSelect={e => handleImageFileChange(e, 'product')}
                  isUploading={isUploading}
                  required={!productForm.image}
                  id="product-image-upload"
                />
                <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase mt-2 text-right">
                  Recommended: 1080x1080px (1:1) | Max: 3MB
                </p>
                {productForm.image && (
                  <div className="mt-3 p-3 rounded-xl inline-block relative group" style={{ background: 'rgba(26,65,115,0.04)', border: '1px solid rgba(26,65,115,0.1)' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Preview</span>
                      <button 
                        type="button" 
                        onClick={() => setProductForm({ ...productForm, image: '' })}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1 rounded-md transition-colors"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <img src={productForm.image} alt="Preview" className="max-h-28 rounded-lg object-contain" />
                  </div>
                )}
              </Field>
            </>
          )}

          {/* ── GALLERY FORM ── */}
          {formType === 'gallery' && (
            <>
              <Field label="Magazine Page Title *">
                <LuxInput value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} placeholder="e.g. Symmetric Silver Plate" required minLength={2} maxLength={100} />
              </Field>
              <Field label="Magazine Issue / Volume *">
                <LuxInput value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })} placeholder="e.g. Magazine Issue #44" required maxLength={100} />
              </Field>
              <Field label="Upload Gallery Image *">
                <ImageUploadDropzone 
                  onFileSelect={e => handleImageFileChange(e, 'gallery')}
                  isUploading={isUploading}
                  required={!galleryForm.image}
                  id="gallery-image-upload"
                />
                <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase mt-2 text-right">
                  Recommended: 1080x1350px (4:5) or 1080x1080px | Max: 3MB
                </p>
                {galleryForm.image && (
                  <div className="mt-3 p-3 rounded-xl inline-block relative group" style={{ background: 'rgba(26,65,115,0.04)', border: '1px solid rgba(26,65,115,0.1)' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Preview</span>
                      <button 
                        type="button" 
                        onClick={() => setGalleryForm({ ...galleryForm, image: '' })}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1 rounded-md transition-colors"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <img src={galleryForm.image} alt="Preview" className="max-h-28 rounded-lg object-contain" />
                  </div>
                )}
              </Field>
            </>
          )}

          {/* Form Footer */}
          <div className="pt-6 flex gap-3" style={{ borderTop: '1px solid rgba(26,65,115,0.08)' }}>
            <button 
              type="button" onClick={() => setShowAddModal(false)}
              className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all rounded-xl"
              style={{ background: 'rgba(26,65,115,0.06)', color: '#6b7280', border: '1px solid rgba(26,65,115,0.1)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.1)'; e.currentTarget.style.color = '#1a4173'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#6b7280'; }}
            >Cancel</button>
            <button 
              type="submit"
              className="px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-all rounded-xl"
              style={{ background: '#1a4173', boxShadow: '0 4px 12px rgba(26,65,115,0.3)', border: 'none' }}
              onMouseOver={e => { e.currentTarget.style.background = '#0d2140'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26,65,115,0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,65,115,0.3)'; }}
            >
              {isUploading ? 'Uploading...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </motion.div>
    );
  };

  const tabTitles = {
    dashboard: ['Dashboard Overview', 'System status and live counters'],
    slider: ['Hero Slider', 'Manage high-resolution home page banners'],
    products: ['Signature Collections', 'Create, edit, and remove silver products'],
    gallery: ['Digital Gallery', 'Configure magazine pages and portfolios'],
    popup: ['Form Popup', 'Enable or disable the 5s login popup'],
    users: ['User Registry', 'View all registered client profiles']
  };

  return (
    <div className="min-h-screen font-outfit relative" style={{ background: '#f0f4f8' }}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -60, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -60, x: '-50%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-0 left-1/2 z-[999] flex items-center gap-3 text-xs tracking-widest uppercase font-bold"
            style={{
              background: toastType === 'info' ? '#6b7280' : '#1a4173',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '40px',
              boxShadow: '0 8px 24px rgba(26,65,115,0.3)'
            }}
          >
            <Check size={15} className="text-emerald-400" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Screen */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <Login 
            email={loginEmail} setEmail={setLoginEmail}
            password={loginPass} setPassword={setLoginPass}
            onSubmit={handleLoginSubmit} error={loginError}
          />
        ) : (
          <motion.div 
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen"
          >
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-10 overflow-y-auto max-h-screen" style={{ background: '#f0f4f8' }}>
              
              {/* Page Header */}
              <header className="flex justify-between items-center mb-8 pb-6" style={{ borderBottom: '1px solid rgba(26,65,115,0.08)' }}>
                <div>
                  <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: '#1a4173' }}>
                    {tabTitles[activeTab]?.[0]}
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-gray-400">
                    {tabTitles[activeTab]?.[1]}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-5 py-2.5 hidden sm:block rounded-xl" style={{ background: 'white', border: '1px solid rgba(26,65,115,0.1)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <span className="text-[9px] font-bold tracking-widest text-gray-400 block uppercase">CONSOLE CLEARANCE</span>
                    <span className="text-xs font-black uppercase" style={{ color: '#1a4173' }}>Atelier Admin</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-3 rounded-xl md:hidden transition-all"
                    style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.15)' }}
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </header>

              {/* ── TAB: DASHBOARD ── */}
              {activeTab === 'dashboard' && (
                <Dashboard 
                  slidesCount={slides.length} productsCount={products.length}
                  galleryCount={gallery.length} popupEnabled={popupEnabled}
                  exhibitionMode={exhibitionMode}
                  users={users}
                  products={products}
                />
              )}

              {/* ── TAB: SLIDER ── */}
              {activeTab === 'slider' && (
                showAddModal && formType === 'slide' ? renderInPlaceForm() : (
                  <div className="space-y-8">
                    {/* Home Page Hero Settings */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(26,65,115,0.04)] border border-[rgba(26,65,115,0.06)] mb-8 relative overflow-hidden"
                    >
                      {/* Decorative background element */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1a4173]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-[rgba(26,65,115,0.06)] cursor-pointer select-none" onClick={() => setIsHeroSettingsOpen(!isHeroSettingsOpen)}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1a4173]/10 flex items-center justify-center text-[#1a4173]">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-sm font-black uppercase tracking-widest text-[#1a4173]">
                                Home Page Display Settings
                              </h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                                Configure the main hero banner for the home page only
                              </p>
                            </div>
                          </div>
                          <button className="text-[#1a4173]/60 hover:text-[#1a4173] transition-colors p-2 rounded-full hover:bg-gray-50">
                            <motion.div animate={{ rotate: isHeroSettingsOpen ? 180 : 0 }}>
                              <ChevronDown size={20} />
                            </motion.div>
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {isHeroSettingsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/3 space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Display Mode</label>
                            <div className="flex flex-col gap-3">
                              <button
                                onClick={() => { setHeroMode('slider'); saveHeroSettings('slider', heroVideoUrl); }}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${heroMode === 'slider' ? 'border-[#1a4173] bg-[#1a4173]/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                              >
                                <span className={`text-[11px] font-bold uppercase tracking-widest ${heroMode === 'slider' ? 'text-[#1a4173]' : 'text-gray-400'}`}>Image Slider</span>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${heroMode === 'slider' ? 'border-[#1a4173]' : 'border-gray-300'}`}>
                                  {heroMode === 'slider' && <div className="w-2 h-2 rounded-full bg-[#1a4173]" />}
                                </div>
                              </button>
                              <button
                                onClick={() => { setHeroMode('video'); saveHeroSettings('video', heroVideoUrl); }}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${heroMode === 'video' ? 'border-[#1a4173] bg-[#1a4173]/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                              >
                                <span className={`text-[11px] font-bold uppercase tracking-widest ${heroMode === 'video' ? 'text-[#1a4173]' : 'text-gray-400'}`}>Single Video</span>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${heroMode === 'video' ? 'border-[#1a4173]' : 'border-gray-300'}`}>
                                  {heroMode === 'video' && <div className="w-2 h-2 rounded-full bg-[#1a4173]" />}
                                </div>
                              </button>
                            </div>
                          </div>

                          <div className="w-full md:w-2/3 space-y-4">
                            <div className="flex justify-between items-end">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Home Video Background</label>
                              <span className="text-[9px] text-gray-400 font-mono">1920x1080 (16:9), Max: 99MB</span>
                            </div>
                            
                            <div className={`relative group rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed transition-colors aspect-video w-full max-w-lg ${heroMode === 'video' ? 'border-[#1a4173]/30 hover:border-[#1a4173]/50' : 'border-gray-200 opacity-60 grayscale'}`}>
                              {heroVideoUrl ? (
                                <>
                                  <video src={heroVideoUrl} className="w-full h-full object-cover" controls muted playsInline />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                                    <label className="cursor-pointer px-6 py-3 bg-white text-[#1a4173] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 shadow-lg transition-transform hover:scale-105 active:scale-95">
                                      {isUploading ? 'Uploading...' : 'Replace Video'}
                                      <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={isUploading || heroMode !== 'video'} />
                                    </label>
                                  </div>
                                </>
                              ) : (
                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-400 group-hover:bg-[#1a4173]/10 group-hover:text-[#1a4173] transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                  </div>
                                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#1a4173] transition-colors">
                                    {isUploading ? 'Uploading Please Wait...' : 'Click to Upload MP4'}
                                  </span>
                                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={isUploading || heroMode !== 'video'} />
                                </label>
                              )}
                              
                              {heroMode !== 'video' && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Switch to Video mode to edit</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

                    <SliderManage 
                      slides={slides}
                      onAddClick={() => handleOpenAdd('slide')}
                      onEditClick={item => handleOpenEdit('slide', item)}
                      onDeleteClick={id => handleDeleteItem('slide', id)}
                    />
                  </div>
                )
              )}

              {/* ── TAB: PRODUCTS ── */}
              {activeTab === 'products' && (
                showAddModal && formType === 'product' ? renderInPlaceForm() : (
                  <ProductManage 
                    products={products}
                    availableCollections={availableCollections}
                    availableCategories={availableCategories}
                    onAddClick={() => handleOpenAdd('product')}
                    onEditClick={item => handleOpenEdit('product', item)}
                    onDeleteClick={id => handleDeleteItem('product', id)}
                    onAssignHighlight={handleAssignHighlight}
                    onReorder={handleProductReorder}
                  />
                )
              )}

              {/* ── TAB: GALLERY ── */}
              {activeTab === 'gallery' && (
                showAddModal && formType === 'gallery' ? renderInPlaceForm() : (
                  <GalleryManage 
                    gallery={gallery}
                    onAddClick={() => handleOpenAdd('gallery')}
                    onEditClick={item => handleOpenEdit('gallery', item)}
                    onDeleteClick={id => handleDeleteItem('gallery', id)}
                  />
                )
              )}

              {/* ── TAB: USERS ── */}
              {activeTab === 'users' && (
                editUserItem ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-outfit"
                    style={{ background: 'white', border: '1px solid rgba(26,65,115,0.1)', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 20px rgba(26,65,115,0.06)' }}
                  >
                    <div className="flex justify-between items-start mb-8 pb-6" style={{ borderBottom: '1px solid rgba(26,65,115,0.08)' }}>
                      <div>
                        <h3 className="text-lg font-black uppercase tracking-wide" style={{ color: '#1a4173' }}>Edit User Profile</h3>
                        <span className="text-[10px] font-mono tracking-widest uppercase block mt-1 text-gray-400">
                          ID: {editUserItem.id || editUserItem._id}
                        </span>
                      </div>
                      <button 
                        type="button" onClick={() => setEditUserItem(null)}
                        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-all"
                        style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(26,65,115,0.04)', color: '#6b7280', border: '1px solid rgba(26,65,115,0.1)' }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.08)'; e.currentTarget.style.color = '#1a4173'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.04)'; e.currentTarget.style.color = '#6b7280'; }}
                      >
                        <X size={13} /> Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveUserEdit} className="space-y-5 max-w-4xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Full Name *">
                          <LuxInput value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} required placeholder="John Doe" minLength={2} maxLength={50} pattern="^[A-Za-z\s]+$" />
                        </Field>
                        <Field label="Email Address *">
                          <LuxInput type="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} required placeholder="john@example.com" maxLength={100} />
                        </Field>
                        <Field label="Company Name">
                          <LuxInput value={userForm.companyName} onChange={e => setUserForm({ ...userForm, companyName: e.target.value })} placeholder="Acme Corporation" maxLength={100} />
                        </Field>
                        <Field label="Contact Number *">
                          <LuxInput value={userForm.contactNumber} onChange={e => setUserForm({ ...userForm, contactNumber: e.target.value })} required placeholder="+91 99999 99999" minLength={10} maxLength={15} pattern="^[0-9\+\-\s]+$" />
                        </Field>
                      </div>

                      {/* Password Reset */}
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(26,65,115,0.03)', border: '1px solid rgba(26,65,115,0.08)' }}>
                        <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-gray-400">Reset Password (Optional)</label>
                        <LuxInput type="password" value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} placeholder="•••••••• (Leave blank to keep current)" />
                        <span className="text-[10px] text-gray-400 font-mono mt-2 block">Only set a new password if this user is locked out or requires override.</span>
                      </div>

                      <Field label="Additional Remarks">
                        <LuxInput textarea value={userForm.additionalRemarks} onChange={e => setUserForm({ ...userForm, additionalRemarks: e.target.value })} placeholder="Custom registry notes or client preferences..." maxLength={500} />
                      </Field>

                      {/* Multi-select Tag Sections */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 rounded-xl" style={{ background: 'rgba(26,65,115,0.03)', border: '1px solid rgba(26,65,115,0.1)' }}>
                          <label className="text-[10px] font-black uppercase tracking-widest block mb-3 pb-2" style={{ color: '#1a4173', borderBottom: '1px solid rgba(26,65,115,0.08)' }}>
                            Interested Product Categories *
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware', 'All'].map((prod) => {
                              const isSel = (userForm.interestedProduct || []).includes(prod);
                              return (
                                <button key={prod} type="button" onClick={() => handleToggleUserEditProduct(prod)}
                                  className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all"
                                  style={{
                                    background: isSel ? '#1a4173' : 'white',
                                    color: isSel ? 'white' : '#6b7280',
                                    border: isSel ? '1.5px solid #1a4173' : '1.5px solid rgba(26,65,115,0.15)',
                                    boxShadow: isSel ? '0 4px 10px rgba(26,65,115,0.2)' : 'none'
                                  }}
                                >{prod}</button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="p-5 rounded-xl" style={{ background: 'rgba(26,65,115,0.03)', border: '1px solid rgba(26,65,115,0.1)' }}>
                          <label className="text-[10px] font-black uppercase tracking-widest block mb-3 pb-2" style={{ color: '#1a4173', borderBottom: '1px solid rgba(26,65,115,0.08)' }}>
                            Nature of Business *
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Wholesale', 'Retail', 'Online', 'All'].map((bus) => {
                              const isSel = (userForm.natureOfBusiness || []).includes(bus);
                              return (
                                <button key={bus} type="button" onClick={() => handleToggleUserEditBusiness(bus)}
                                  className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all"
                                  style={{
                                    background: isSel ? '#1a4173' : 'white',
                                    color: isSel ? 'white' : '#6b7280',
                                    border: isSel ? '1.5px solid #1a4173' : '1.5px solid rgba(26,65,115,0.15)',
                                    boxShadow: isSel ? '0 4px 10px rgba(26,65,115,0.2)' : 'none'
                                  }}
                                >{bus}</button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 flex gap-3" style={{ borderTop: '1px solid rgba(26,65,115,0.08)' }}>
                        <button type="button" onClick={() => setEditUserItem(null)}
                          className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all"
                          style={{ background: 'rgba(26,65,115,0.06)', color: '#6b7280', border: '1px solid rgba(26,65,115,0.1)' }}
                          onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.1)'; e.currentTarget.style.color = '#1a4173'; }}
                          onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#6b7280'; }}
                        >Cancel</button>
                        <button type="submit"
                          className="px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white rounded-xl transition-all"
                          style={{ background: '#1a4173', boxShadow: '0 4px 12px rgba(26,65,115,0.3)', border: 'none' }}
                          onMouseOver={e => { e.currentTarget.style.background = '#0d2140'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                          onMouseOut={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >Save User</button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{users.length} Registered Users</span>
                    </div>

                    {/* Users Table */}
                    <div style={{ background: 'white', border: '1px solid rgba(26,65,115,0.08)', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                          <thead>
                            <tr style={{ borderBottom: '1px solid rgba(26,65,115,0.08)', background: 'rgba(26,65,115,0.02)' }}>
                              {['User Profile', 'Contact & Company', 'Interested Product', 'Nature of Business', 'Remarks', 'Joined', 'Actions'].map(h => (
                                <th key={h} className="p-4 text-[9px] font-black tracking-widest text-gray-400 uppercase">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {users.length === 0 && (
                              <tr>
                                <td colSpan={7} className="p-10 text-center text-sm text-gray-400">No users registered yet</td>
                              </tr>
                            )}
                            {users.map((user, i) => (
                              <tr 
                                key={user.id || user._id} 
                                className="transition-colors"
                                style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(26,65,115,0.05)' : 'none' }}
                                onMouseOver={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.02)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                              >
                                <td className="p-4">
                                  <span className="font-bold text-xs uppercase tracking-wide block" style={{ color: '#1a4173' }}>{user.name}</span>
                                  <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">{user.email}</span>
                                </td>
                                <td className="p-4">
                                  <span className="text-sm font-mono block" style={{ color: '#1a4173' }}>{user.contactNumber || 'N/A'}</span>
                                  {user.companyName 
                                    ? <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5 block">{user.companyName}</span>
                                    : <span className="text-[10px] text-gray-300 italic block mt-0.5">No Company</span>
                                  }
                                </td>
                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                                    {user.interestedProduct?.length > 0 
                                      ? user.interestedProduct.map(p => (
                                          <span key={p} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full" style={{ background: 'rgba(26,65,115,0.08)', color: '#1a4173' }}>{p}</span>
                                        ))
                                      : <span className="text-[10px] text-gray-300">None</span>
                                    }
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1 max-w-[160px]">
                                    {user.natureOfBusiness?.length > 0 
                                      ? user.natureOfBusiness.map(b => (
                                          <span key={b} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full" style={{ background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.15)' }}>{b}</span>
                                        ))
                                      : <span className="text-[10px] text-gray-300">None</span>
                                    }
                                  </div>
                                </td>
                                <td className="p-4 max-w-[180px] truncate" title={user.additionalRemarks}>
                                  <span className="text-xs text-gray-400">{user.additionalRemarks || <em className="text-gray-300">No Remarks</em>}</span>
                                </td>
                                <td className="p-4 text-gray-400 font-mono text-[10px]">
                                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                                </td>
                                <td className="p-4 text-right">
                                  <div className="flex justify-end items-center gap-2">
                                    <button onClick={() => handleOpenUserEdit(user)}
                                      className="p-2 rounded-lg transition-all"
                                      style={{ background: 'rgba(26,65,115,0.06)', color: '#1a4173', border: '1px solid rgba(26,65,115,0.12)' }}
                                      onMouseOver={e => { e.currentTarget.style.background = '#1a4173'; e.currentTarget.style.color = 'white'; }}
                                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(26,65,115,0.06)'; e.currentTarget.style.color = '#1a4173'; }}
                                      title="Edit User"
                                    ><Edit2 size={12} /></button>
                                    <button onClick={() => handleDeleteUser(user.id || user._id)}
                                      className="p-2 rounded-lg transition-all"
                                      style={{ background: 'rgba(220,38,38,0.06)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.12)' }}
                                      onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.color = '#dc2626'; }}
                                      title="Delete User"
                                    ><Trash2 size={12} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* ── TAB: POPUP ── */}
              {activeTab === 'popup' && (
                <div className="space-y-5 max-w-2xl">
                  {/* Popup Toggle Card */}
                  <div style={{ background: 'white', border: '1px solid rgba(26,65,115,0.08)', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 pb-6 mb-6" style={{ borderBottom: '1px solid rgba(26,65,115,0.06)' }}>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-wider mb-1" style={{ color: '#1a4173' }}>5-Second Login Popup</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed max-w-md">
                          Enables the full-screen registration form that appears automatically 5 seconds after a visitor lands on the website.
                        </p>
                      </div>
                      <button 
                        onClick={handlePopupToggle}
                        className="shrink-0 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl px-6 py-3"
                        style={{
                          background: popupEnabled ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                          color: popupEnabled ? '#059669' : '#dc2626',
                          border: `1.5px solid ${popupEnabled ? 'rgba(5,150,105,0.25)' : 'rgba(220,38,38,0.25)'}`
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = popupEnabled ? '#059669' : '#dc2626'; e.currentTarget.style.color = 'white'; }}
                        onMouseOut={e => { e.currentTarget.style.background = popupEnabled ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)'; e.currentTarget.style.color = popupEnabled ? '#059669' : '#dc2626'; }}
                      >
                        {popupEnabled ? '● Enabled' : '○ Disabled'}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 pb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-black uppercase tracking-wider" style={{ color: '#1a4173' }}>Exhibition Mode</h4>
                          <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full bg-red-100 text-red-600 border border-red-200">Strict</span>
                        </div>
                        <p className="text-xs text-gray-400 font-light leading-relaxed max-w-md">
                          Makes registration <span className="font-bold text-gray-600">compulsory</span>. The authentication modal appears immediately on load and cannot be closed without signing in or registering.
                        </p>
                      </div>
                      <button 
                        onClick={handleExhibitionToggle}
                        className="shrink-0 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl px-6 py-3"
                        style={{
                          background: exhibitionMode ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)',
                          color: exhibitionMode ? '#059669' : '#dc2626',
                          border: `1.5px solid ${exhibitionMode ? 'rgba(5,150,105,0.25)' : 'rgba(220,38,38,0.25)'}`
                        }}
                        onMouseOver={e => { e.currentTarget.style.background = exhibitionMode ? '#059669' : '#dc2626'; e.currentTarget.style.color = 'white'; }}
                        onMouseOut={e => { e.currentTarget.style.background = exhibitionMode ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)'; e.currentTarget.style.color = exhibitionMode ? '#059669' : '#dc2626'; }}
                      >
                        {exhibitionMode ? '● Enabled' : '○ Disabled'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;

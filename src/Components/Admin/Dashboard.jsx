import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sliders, 
  ShoppingBag, 
  Image as ImageIcon, 
  ToggleLeft, 
  ArrowUpRight,
  Clock
} from 'lucide-react';

const Dashboard = ({ 
  slidesCount, 
  productsCount, 
  galleryCount, 
  popupEnabled, 
  exhibitionMode,
  users = [] 
}) => {
  const [timeline, setTimeline] = useState('7D'); // '7D' | '30D' | 'AllTime'
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // ─── Standard Stats Counters ────────────────────────────────────────────────
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
    },
    { 
      title: 'Exhibition Mode', 
      value: exhibitionMode ? 'STRICT' : 'OFF', 
      code: 'SYSTEM.EXHIBIT', 
      icon: <ToggleLeft size={18} />, 
      color: exhibitionMode ? '#dc2626' : '#9ca3af',
      lightBg: exhibitionMode ? 'rgba(220,38,38,0.08)' : 'rgba(156,163,175,0.08)',
      border: exhibitionMode ? 'rgba(220,38,38,0.15)' : 'rgba(156,163,175,0.15)'
    }
  ];

  // ─── Fetch Registration Analytics directly from Backend ──────────────────────
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('hos_admin_token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        
        const res = await fetch(`${API_BASE_URL}/users/analytics/registrations?range=${timeline}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data) {
          setChartData(json.data);
        } else {
          // Empty or error fallback
          setChartData([]);
        }
      } catch (err) {
        console.error('Error querying backend analytics:', err);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeline, users]); // re-fetch if users registry updates or timeline changes

  // ─── SVG area and line generator logic ───────────────────────────────────────
  const drawAreaChart = (data) => {
    const width = 700;
    const height = 280;
    
    // Tight spacing parameters for edge-to-edge aesthetics
    const paddingLeft = 32;
    const paddingRight = 10;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Use actual database numbers. Fallback to 0 standard if list is empty
    const values = data.map(d => d.value);
    const minVal = 0;
    const maxVal = Math.max(...values, 5) * 1.15; // headroom

    const points = data.map((d, i) => {
      const x = paddingLeft + (i * (chartWidth / (data.length - 1 || 1)));
      const y = paddingTop + chartHeight - ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
      return { x, y, ...d };
    });

    let linePath = '';
    if (points.length > 0) {
      linePath = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const cp1x = p1.x + (p2.x - p1.x) / 3;
        const cp1y = p1.y;
        const cp2x = p2.x - (p2.x - p1.x) / 3;
        const cp2y = p2.y;
        linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
    }

    let areaPath = '';
    if (points.length > 0) {
      areaPath = linePath + ` L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
    }

    return { points, linePath, areaPath, chartWidth, chartHeight, paddingLeft, paddingTop };
  };

  const { points, linePath, areaPath, chartWidth, chartHeight, paddingLeft, paddingTop } = drawAreaChart(chartData);

  // Handle Mouse Interactive Tooltip Tracker
  const handleMouseMove = (e) => {
    if (!containerRef.current || chartData.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Find the closest point horizontally
    let closestPt = null;
    let minDist = Infinity;

    points.forEach((pt) => {
      const dist = Math.abs(pt.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closestPt = pt;
      }
    });

    if (closestPt && minDist < 35) {
      setHoveredPoint(closestPt);
      setTooltipPos({ x: closestPt.x + 10, y: closestPt.y - 80 });
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="space-y-8 font-outfit">
      
      {/* ─── Metric Counter Cards Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="relative overflow-hidden group"
            style={{
              background: 'white',
              border: `1px solid ${stat.border}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={e => { 
              e.currentTarget.style.boxShadow = `0 12px 30px ${stat.lightBg}`; 
              e.currentTarget.style.transform = 'translateY(-3px)'; 
            }}
            onMouseOut={e => { 
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)'; 
              e.currentTarget.style.transform = 'translateY(0)'; 
            }}
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 transition-transform duration-300 group-hover:scale-125"
              style={{ background: stat.lightBg }} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase font-black">{stat.code}</span>
                <div className="p-2 rounded-xl transition-colors" style={{ background: stat.lightBg, color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <span className="text-4xl font-black block tracking-tight mb-2" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 block">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Full Width Premium Area Chart (Connected to MongoDB Backend) ─────── */}
      <div style={{
        background: 'white',
        border: '1px solid rgba(26,65,115,0.08)',
        borderRadius: '24px',
        padding: '20px 24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)'
      }}>
        
        {/* Graph Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a4173] animate-pulse" />
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1a4173]">Client Registrations</h3>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-0.5">Real-Time MongoDB Analytics Connection</p>
          </div>

          <div className="flex items-center gap-3">
           

            {/* Timeline Toggle Switcher */}
            <div className="flex p-1 rounded-xl bg-gray-100 border border-gray-200">
              {['7D', '30D', 'AllTime'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setTimeline(t); setHoveredPoint(null); }}
                  className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all"
                  style={{
                    background: timeline === t ? 'white' : 'transparent',
                    color: timeline === t ? '#1a4173' : '#6b7280',
                    boxShadow: timeline === t ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t === 'AllTime' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SVG Interactive Area Chart Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative select-none w-full flex items-center justify-center"
          style={{ height: '280px' }}
        >
          {isLoading ? (
            /* Premium Luxury Loading Spinner */
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-rgba(26,65,115,0.1) border-t-[#1a4173] animate-spin" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Querying database...</span>
            </div>
          ) : chartData.length === 0 ? (
            /* No registrations placeholder */
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Clock size={24} className="text-gray-300 mb-2" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">No client registrations logged</span>
              <p className="text-[9px] text-gray-400 mt-1 max-w-xs">New user profiles will dynamically populate this timeline in real-time.</p>
            </div>
          ) : (
            <svg 
              viewBox="0 0 700 280" 
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Linear Fill Gradient */}
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a4173" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.00" />
                </linearGradient>

                {/* Stroke Gradient */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1a4173" />
                  <stop offset="50%" stopColor="#2e62a1" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                {/* Glowing Filter Drop Shadow */}
                <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1a4173" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Horizontal Grid lines */}
              {Array.from({ length: 4 }).map((_, i) => {
                const yVal = paddingTop + (chartHeight / 3) * i;
                return (
                  <line 
                    key={i}
                    x1={paddingLeft} 
                    y1={yVal} 
                    x2={700 - 10} 
                    y2={yVal} 
                    stroke="rgba(26,65,115,0.04)" 
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Shaded Area Fill */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Curved Trend Stroke Line */}
              <path 
                d={linePath} 
                fill="none" 
                stroke="url(#strokeGradient)" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Interactive Points */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint && hoveredPoint.label === pt.label;
                return (
                  <g key={idx}>
                    {/* Invisible hover pad */}
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="15" 
                      fill="transparent" 
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Visual node marker */}
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r={isHovered ? 6 : 4} 
                      fill={isHovered ? '#ffffff' : '#1a4173'} 
                      stroke="#1a4173" 
                      strokeWidth={isHovered ? 3.5 : 2}
                      style={{ transition: 'all 0.15s ease' }}
                    />
                  </g>
                );
              })}

              {/* Hover Y-Axis Indicator Line */}
              {hoveredPoint && (
                <line 
                  x1={hoveredPoint.x} 
                  y1={paddingTop} 
                  x2={hoveredPoint.x} 
                  y2={paddingTop + chartHeight} 
                  stroke="rgba(26,65,115,0.2)" 
                  strokeWidth="1.5" 
                  strokeDasharray="3 3"
                />
              )}

              {/* X-Axis labels */}
              {points.map((pt, idx) => {
                if (timeline === '30D' && idx % 5 !== 0) return null;
                return (
                  <text 
                    key={idx}
                    x={pt.x} 
                    y={280 - 10} 
                    textAnchor="middle" 
                    className="text-[9px] font-black uppercase"
                    fill="#9ca3af"
                  >
                    {pt.label}
                  </text>
                );
              })}
            </svg>
          )}

          {/* Floating Glassmorphic Tooltip */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute z-40 pointer-events-none rounded-xl p-3 border border-white/60 shadow-[0_12px_28px_rgba(26,65,115,0.15)] backdrop-blur-md"
                style={{
                  left: `${Math.min(tooltipPos.x, (containerRef.current ? containerRef.current.clientWidth : 700) - 170)}px`,
                  top: `${tooltipPos.y}px`,
                  background: 'rgba(255, 255, 255, 0.88)'
                }}
              >
                <span className="text-[8px] font-mono text-gray-400 font-bold block uppercase tracking-widest mb-0.5">{hoveredPoint.date}</span>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-black text-[#1a4173]">{hoveredPoint.value} Client Inquiries</span>
                  <span className="flex items-center text-[8px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded font-black">
                    <ArrowUpRight size={8} /> LIVE
                  </span>
                </div>
                <span className="text-[9px] text-[#7c3aed] font-black block uppercase tracking-wide">{hoveredPoint.detail}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

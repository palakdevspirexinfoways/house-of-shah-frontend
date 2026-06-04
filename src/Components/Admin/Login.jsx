import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Shield } from 'lucide-react';

const Login = ({ email, setEmail, password, setPassword, onSubmit, error }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center px-6 min-h-screen font-outfit"
      style={{
        background: 'linear-gradient(135deg, #0d1f3c 0%, #1a4173 50%, #0d2140 100%)'
      }}
    >
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 border border-white" />
      </div>

      <motion.div 
        initial={{ scale: 0.93, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="w-full max-w-md relative"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-12 right-12 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />

        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Shield size={24} className="text-white/80" />
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-white font-bold tracking-[0.35em] uppercase text-sm mb-5">House of Shah</p>
          <h2 className="text-sm font-black tracking-[0.4em] text-white uppercase">ATELIER CONSOLE</h2>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-2">Enter credentials to access the panel</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                color: 'white'
              }}
              className="w-full px-4 py-3.5 outline-none text-sm placeholder-white/25 transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="admin@houseofshah.com" 
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">System Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                color: 'white'
              }}
              className="w-full px-4 py-3.5 outline-none text-sm placeholder-white/25 transition-all focus:border-white/30 focus:bg-white/10"
              placeholder="••••••••" 
              required
              minLength={6}
              maxLength={50}
            />
          </div>

          {/* Validation Alert */}
          {error && (
            <div className="flex items-center gap-2 text-red-300 bg-red-500/10 p-3.5 text-[11px] rounded-xl border border-red-500/20 font-semibold tracking-wide">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 mt-3 relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.92)',
              color: '#1a4173',
              borderRadius: '12px',
              padding: '16px',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
          >
            UNLOCK SYSTEM <ArrowUpRight size={14} />
          </button>
        </form>
      </motion.div>

    </div>
  );
};

export default Login;

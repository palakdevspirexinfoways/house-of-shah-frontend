import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password Recovery Flow State Variables
  const [isForgot, setIsForgot] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Expanded fields for client user registration
  const [companyName, setCompanyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [interestedProduct, setInterestedProduct] = useState([]);
  const [natureOfBusiness, setNatureOfBusiness] = useState([]);
  const [additionalRemarks, setAdditionalRemarks] = useState('');

  // Smooth animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgot(false);
    setIsOtpSent(false);
    setOtp('');
    setNewPassword('');
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setCompanyName('');
    setContactNumber('');
    setInterestedProduct([]);
    setNatureOfBusiness([]);
    setAdditionalRemarks('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || 'Verification OTP sent.');
        setIsOtpSent(true);
        // Developer fallback helper: show OTP inside modal if returned
        if (data.debugOtp) {
          console.log(`[Dev OTP Helper] ${data.debugOtp}`);
          setSuccess(`${data.message || 'OTP sent!'}. Dev OTP: ${data.debugOtp}`);
        }
      } else {
        setError(data.message || 'Failed to request password reset OTP.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !otp.trim() || !newPassword.trim()) {
      setError('Please fill in all recovery fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || 'Password reset successfully.');
        localStorage.setItem('hos_user_token', data.token);
        localStorage.setItem('hos_user_session', 'active');
        localStorage.setItem('hos_user_name', data.user.name);

        window.dispatchEvent(new Event('userSessionChange'));

        setTimeout(() => {
          onClose();
          setIsForgot(false);
          setIsOtpSent(false);
          setOtp('');
          setNewPassword('');
          setName('');
          setEmail('');
          setPassword('');
          setCompanyName('');
          setContactNumber('');
          setInterestedProduct([]);
          setNatureOfBusiness([]);
          setAdditionalRemarks('');
          setSuccess('');
        }, 1200);
      } else {
        setError(data.message || 'Password reset failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleProduct = (prod) => {
    if (prod === 'All') {
      if (interestedProduct.includes('All')) {
        setInterestedProduct([]);
      } else {
        setInterestedProduct(['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware']);
      }
      return;
    }

    let next = [...interestedProduct];
    if (next.includes(prod)) {
      next = next.filter(item => item !== prod && item !== 'All');
    } else {
      next.push(prod);
      const items = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Silverware'];
      const hasAllItems = items.every(i => next.includes(i));
      if (hasAllItems) {
        next.push('All');
      }
    }
    setInterestedProduct(next);
  };

  const handleToggleBusiness = (bus) => {
    if (bus === 'All') {
      if (natureOfBusiness.includes('All')) {
        setNatureOfBusiness([]);
      } else {
        setNatureOfBusiness(['All', 'Wholesale', 'Retail', 'Online']);
      }
      return;
    }

    let next = [...natureOfBusiness];
    if (next.includes(bus)) {
      next = next.filter(item => item !== bus && item !== 'All');
    } else {
      next.push(bus);
      const items = ['Wholesale', 'Retail', 'Online'];
      const hasAllItems = items.every(i => next.includes(i));
      if (hasAllItems) {
        next.push('All');
      }
    }
    setNatureOfBusiness(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (!isLogin) {
      if (!name.trim() || !companyName.trim() || !contactNumber.trim()) {
        setError('Please fill in all mandatory fields (*).');
        return;
      }
    }

    setIsLoading(true);
    const payload = isLogin 
      ? { email, password } 
      : { 
          name, 
          email, 
          password, 
          companyName, 
          contactNumber, 
          interestedProduct: ['All'], 
          natureOfBusiness: ['All'], 
          additionalRemarks: '' 
        };
    const endpoint = isLogin ? '/users/login' : '/users/register';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || 'Operation successful.');
        localStorage.setItem('hos_user_token', data.token);
        localStorage.setItem('hos_user_session', 'active');
        localStorage.setItem('hos_user_name', data.user.name);
        
        // Dispatch custom event to notify other components like Header
        window.dispatchEvent(new Event('userSessionChange'));

        setTimeout(() => {
          onClose();
          setName('');
          setEmail('');
          setPassword('');
          setCompanyName('');
          setContactNumber('');
          setInterestedProduct([]);
          setNatureOfBusiness([]);
          setAdditionalRemarks('');
          setSuccess('');
        }, 1200);
      } else {
        setError(data.message || 'Authentication failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md fixed"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white w-full max-w-6xl min-h-[650px] my-8 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row font-outfit z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 text-black/40 hover:text-black transition-all duration-500"
            >
              <X size={28} strokeWidth={1} />
            </button>

            {/* Left/Image Side */}
            <div className="w-full md:w-[40%] relative hidden md:block overflow-hidden bg-black group shrink-0">
              <img 
                src="https://www.ross-simons.com/dw/image/v2/BKHT_PRD/on/demandware.static/-/Sites-RossSimons-Library/default/dwea3c75da/graphics/education/education-top-images/000160_EDU_D_RingMetals.jpg?sw=1920&q=70" 
                alt="House of Shah Authentication" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[4s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-14 flex flex-col justify-end pb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="w-8 h-[1px] bg-white mb-6" />
                  <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-4 text-white">
                    Enter <br /> The Atelier
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 leading-relaxed max-w-[80%]">
                    Access our exclusive museum-grade collections and personalized bespoke services.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right/Form Side */}
            <div className="w-full md:w-[60%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative overflow-y-auto max-h-[90vh]">
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--primary-blue)] tracking-tighter uppercase mb-2">
                  {isForgot ? (isOtpSent ? 'Verify OTP Code' : 'Recover Password') : (isLogin ? 'Sign In' : 'Register')}
                </h2>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-[0.2em]">
                  {isForgot ? (isOtpSent ? 'Reset your credential password' : 'Recover your luxury account') : (isLogin ? 'Access your personal account' : 'Become a member of our legacy')}
                </p>
              </div>

              {/* Animated Form Container */}
              <AnimatePresence mode="wait">
                {isForgot ? (
                  isOtpSent ? (
                    // Reset Password Form (OTP + New Password)
                    <motion.form 
                      key="reset-password"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6" 
                      onSubmit={handleResetPassword}
                    >
                      {error && (
                        <motion.div variants={itemVariants} className="text-red-500 text-xs font-semibold uppercase tracking-wider">
                          {error}
                        </motion.div>
                      )}
                      {success && (
                        <motion.div variants={itemVariants} className="text-green-600 text-xs font-semibold uppercase tracking-wider">
                          {success}
                        </motion.div>
                      )}

                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Registered Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          disabled
                          className="w-full bg-transparent outline-none text-sm font-medium text-gray-400 placeholder-gray-300 cursor-not-allowed" 
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Verification OTP (6-digits)</label>
                        <input 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          maxLength={6}
                          className="w-full bg-transparent outline-none text-sm font-medium text-black placeholder-gray-300 tracking-[0.3em] font-mono" 
                          placeholder="000000" 
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">New Password</label>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full bg-transparent outline-none text-sm font-medium text-black placeholder-gray-300" 
                          placeholder="••••••••" 
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-4">
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-900 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                          {isLoading ? 'Resetting...' : 'Reset Password & Sign In'} 
                          <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </button>
                      </motion.div>
                    </motion.form>
                  ) : (
                    // Request OTP Form
                    <motion.form 
                      key="forgot-password"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6" 
                      onSubmit={handleSendOtp}
                    >
                      {error && (
                        <motion.div variants={itemVariants} className="text-red-500 text-xs font-semibold uppercase tracking-wider">
                          {error}
                        </motion.div>
                      )}
                      {success && (
                        <motion.div variants={itemVariants} className="text-green-600 text-xs font-semibold uppercase tracking-wider">
                          {success}
                        </motion.div>
                      )}

                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Registered Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-transparent outline-none text-sm font-medium text-black placeholder-gray-300" 
                          placeholder="client@example.com" 
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-4">
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-900 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                          {isLoading ? 'Sending...' : 'Send Verification OTP'} 
                          <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </button>
                      </motion.div>
                    </motion.form>
                  )
                ) : (
                  <motion.form 
                    key={isLogin ? 'login' : 'signup'}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                  >
                    {error && (
                      <motion.div variants={itemVariants} className="text-red-500 text-xs font-semibold uppercase tracking-wider">
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div variants={itemVariants} className="text-green-600 text-xs font-semibold uppercase tracking-wider">
                        {success}
                      </motion.div>
                    )}

                    {isLogin ? (
                    <>
                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-transparent outline-none text-sm font-medium text-black placeholder-gray-300" 
                          placeholder="client@example.com" 
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Password</label>
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full bg-transparent outline-none text-sm font-medium text-black placeholder-gray-300" 
                          placeholder="••••••••" 
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Register Fields Form Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">Full Name *</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-transparent outline-none text-xs font-medium text-black placeholder-gray-300" 
                            placeholder="John Doe" 
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">Company Name *</label>
                          <input 
                            type="text" 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="w-full bg-transparent outline-none text-xs font-medium text-black placeholder-gray-300" 
                            placeholder="Acme Corporation" 
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">Contact Number *</label>
                          <input 
                            type="text" 
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="w-full bg-transparent outline-none text-xs font-medium text-black placeholder-gray-300" 
                            placeholder="+91 99999 99999" 
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">Email Address *</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-transparent outline-none text-xs font-medium text-black placeholder-gray-300" 
                            placeholder="client@example.com" 
                          />
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative border-b border-gray-200 focus-within:border-black transition-colors duration-500 pb-2 col-span-1 sm:col-span-2">
                          <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">Password *</label>
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-transparent outline-none text-xs font-medium text-black placeholder-gray-300" 
                            placeholder="••••••••" 
                          />
                        </motion.div>
                      </div>

                     
                    </>
                  )}

                  {isLogin && (
                    <motion.div variants={itemVariants} className="flex justify-between items-center pt-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-gray-300 group-hover:border-black transition-colors flex items-center justify-center relative">
                          <input type="checkbox" className="opacity-0 absolute w-4 h-4 cursor-pointer" />
                          <div className="absolute inset-0 bg-black scale-0 transition-transform peer-checked:scale-100" />
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium group-hover:text-black transition-colors">Remember me</span>
                      </label>
                      <button 
                        type="button" 
                        onClick={() => { setIsForgot(true); setIsOtpSent(false); setError(''); setSuccess(''); }}
                        className="text-[10px] text-gray-400 uppercase tracking-widest font-medium hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
                      >
                        Recover Password
                      </button>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="pt-4">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-900 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : (isLogin ? 'Sign In To Account' : 'Create Account')} 
                      <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                  </motion.div>

                </motion.form>
              )}
            </AnimatePresence>

              {/* Toggle Login/Signup */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  {isForgot ? "Remembered your credentials?" : (isLogin ? "New to House of Shah?" : "Already a member?")}
                </span>
                <button 
                  onClick={isForgot ? () => { setIsForgot(false); setIsOtpSent(false); setError(''); setSuccess(''); } : handleToggleMode}
                  className="text-[10px] text-black font-bold uppercase tracking-[0.2em] border-b border-black/30 hover:border-black transition-colors pb-1 flex items-center gap-2 group"
                >
                  {isForgot ? 'Back To Sign In' : (isLogin ? 'Register Here' : 'Sign In')}
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginSignupModal;

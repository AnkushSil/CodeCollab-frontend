import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from './GlassPanel';
import NeonButton from './NeonButton';

export const AuthModal = ({ isOpen, onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'developer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: formData.role,
      isOnline: true
    };
    onAuth(user);
    onClose();
  };

  const handleOAuth = (provider) => {
    // Mock OAuth
    const user = {
      id: Date.now().toString(),
      email: `user@${provider}.com`,
      name: `${provider} User`,
      role: 'developer',
      isOnline: true
    };
    onAuth(user);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <GlassPanel glow="blue" className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isLogin ? 'Welcome Back' : 'Join CodeCollab'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-space-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleOAuth('github')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors text-white"
                >
                  Continue with GitHub
                </button>
                <button
                  onClick={() => handleOAuth('google')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors text-white"
                >
                  Continue with Google
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-space-dark text-space-gray-400">or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-space-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-space-gray-400 focus:border-space-blue focus:ring-1 focus:ring-space-blue outline-none transition-colors"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-space-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-space-gray-400 focus:border-space-blue focus:ring-1 focus:ring-space-blue outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-space-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-space-gray-400 focus:border-space-blue focus:ring-1 focus:ring-space-blue outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-space-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-space-blue focus:ring-1 focus:ring-space-blue outline-none transition-colors"
                    >
                      <option value="developer">Developer</option>
                      <option value="senior_dev">Senior Developer</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}

                <NeonButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </NeonButton>
              </form>

              {/* Toggle */}
              <div className="mt-6 text-center">
                <span className="text-space-gray-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-space-blue hover:text-space-green transition-colors font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
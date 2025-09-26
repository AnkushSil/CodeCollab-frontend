import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onSignUpClick, onGetStartedClick, onLogoClick }) => {
  const user = null; // Mock user for now
  const isAuthenticated = false; // Mock authentication state
  const currentPlatform = null; // Mock platform state

  return (
    <motion.header 
      className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-[100]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full px-0">
        <div className="flex items-center justify-between h-16 relative w-full px-4">
          {/* Logo - Left Side */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={onLogoClick}
          >
            <span className="h-8 w-8 text-space-blue">&lt;/&gt;</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-space-blue to-space-green bg-clip-text text-transparent">
              CodeCollab
            </span>
          </motion.div>
          
          {/* Platform Indicator - Center (absolute positioning) */}
          {currentPlatform && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              {currentPlatform === 'codesync' ? (
                <>
                  <span className="h-4 w-4 text-space-blue">&lt;/&gt;</span>
                  <span className="text-sm text-space-blue font-medium">CodeSync</span>
                </>
              ) : (
                <>
                  <span className="h-4 w-4 text-space-green">👥</span>
                  <span className="text-sm text-space-green font-medium">CodeCollab</span>
                </>
              )}
            </div>
          )}
          
          {/* User Menu - Right Side */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 text-white/60 hover:text-space-blue transition-colors rounded-lg hover:bg-white/5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="h-5 w-5">🔔</span>
              </motion.button>
              <motion.button
                className="p-2 text-white/60 hover:text-space-blue transition-colors rounded-lg hover:bg-white/5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="h-5 w-5">⚙️</span>
              </motion.button>
              <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="h-4 w-4 text-space-blue">👤</span>
                <span className="text-sm text-white font-medium">{user.name}</span>
                <div className="w-2 h-2 bg-space-green rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button 
                className="bg-space-blue/20 border border-space-blue hover:bg-space-blue/30 text-space-blue hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                onClick={onSignUpClick}
              >
                Sign Up / Login
              </button>
              <button 
                className="px-6 py-2 border border-space-purple text-space-purple hover:bg-space-purple/20 rounded-lg font-bold hover:scale-105 transition-all"
                onClick={onGetStartedClick}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

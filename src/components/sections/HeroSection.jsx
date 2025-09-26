import React from 'react';
import { motion } from 'framer-motion';
import NeonButton from '../NeonButton';

const HeroSection = ({ onNavigateToEditor }) => {
  const handleKnowMoreClick = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      const elementPosition = featuresSection.offsetTop;
      const offsetPosition = elementPosition - 80; // Adjust this number to control how much higher
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-0">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-space-blue via-space-green to-space-purple bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              backgroundSize: '200% auto'
            }}
          >
            Code Together,
            <br />
            Build Faster
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The ultimate real-time collaborative development platform. 
          </motion.p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <NeonButton 
            variant="primary" 
            size="lg" 
            className="px-8 py-4 text-xl font-bold whitespace-nowrap"
            onClick={onNavigateToEditor}
          >
            Start Programming Together
          </NeonButton>
          <button 
            onClick={handleKnowMoreClick}
            className="px-8 py-4 border border-space-purple text-space-purple hover:bg-space-purple/20 rounded-lg font-bold text-xl hover:scale-105 transition-all whitespace-nowrap"
          >
            Know More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

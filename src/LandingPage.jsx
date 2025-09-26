import { useMemo, useState } from "react";
import { motion } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import GlassPanel from './components/GlassPanel';
import NeonButton from './components/NeonButton';
import Header from './components/sections/Header';
import HeroSection from './components/sections/HeroSection';
import FeatureShowcase from './components/sections/FeatureShowcase';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthModal } from './components/auth';

const LandingPage = ({ onNavigateToEditor }) => {
  const [faqOpen, setFaqOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthOpen = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('auth') === '1';
  }, [location.search]);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleSignUpClick = () => {
    const params = new URLSearchParams(location.search);
    params.set('auth', '1');
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: false });
  };

  const handleGetStartedClick = () => {
    onNavigateToEditor();
  };

  const handleLogoClick = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  const faqs = [
    {
      question: "What is CodeCollab?",
      answer: "CodeCollab is a real-time collaborative coding platform that allows developers to code together, conduct interviews, review code, and collaborate on projects in real-time with live synchronization."
    },
    {
      question: "How does CodeCollab work?",
      answer: "Simply create a room, share the room ID with your team, and start coding together. All changes are synchronized in real-time, and you can see what others are typing as they code."
    },
    {
      question: "Do I need to install anything to use CodeCollab?",
      answer: "No installation required! CodeCollab runs entirely in your web browser. Just visit our website, create an account, and start collaborating immediately."
    },
    {
      question: "Can I use CodeCollab for interviews or team projects?",
      answer: "Absolutely! CodeCollab is perfect for technical interviews, code reviews, team training sessions, and collaborative project development. It supports multiple programming languages and real-time collaboration."
    },
    {
      question: "How do I invite others to my coding session?",
      answer: "Create a room and share the unique room ID with your team members. They can join instantly by entering the room ID on our platform. No complex setup required!"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
    {/* Background gradient behind particles */}
    <div className="fixed inset-0 -z-20 bg-space-gradient" />
    {/* Particle Background above gradient, below content */}
    <SpaceBackground count={220} className="z-10" />

      {/* Foreground content */}
      <div className="relative z-20 text-white font-mono">
      {/* New Header Component */}
      <Header 
        onSignUpClick={handleSignUpClick}
        onGetStartedClick={handleGetStartedClick}
        onLogoClick={handleLogoClick}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => {
          const params = new URLSearchParams(location.search);
          params.delete('auth');
          navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        }}
        onAuth={(user) => {
          // placeholder: handle user state later
          console.log('Authenticated:', user);
        }}
      />

      {/* New Hero Section Component */}
      <HeroSection onNavigateToEditor={onNavigateToEditor} />

      {/* New Feature Showcase Component */}
      <FeatureShowcase />

      {/* Bottom CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers already collaborating more effectively with CodeCollab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <NeonButton 
              variant="primary" 
              size="lg" 
              onClick={onNavigateToEditor}
              className="px-8 py-4 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
            >
              Start Programming Together
            </NeonButton>
            <NeonButton 
              variant="accent" 
              outline 
              size="lg"
              className="px-8 py-4 hover:scale-105 transition-all"
            >
              Watch Live Demo
            </NeonButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <span className={`h-5 w-5 text-space-blue flex-shrink-0 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`}>
                    {faqOpen === index ? '▲' : '▼'}
                  </span>
                </button>
                {faqOpen === index && (
                  <div className="px-6 pb-4 border-t border-white/10">
                    <p className="text-white/80 pt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg 
            className="relative block w-full h-16 sm:h-20 lg:h-24" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(15, 23, 42, 0.8)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 1)" />
              </linearGradient>
            </defs>
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
        
        {/* Main Footer Content */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-md pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-6">
              {/* Brand Section - Left Corner */}
              <div className="lg:flex-shrink-0 lg:w-80">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="h-7 w-7 text-space-blue drop-shadow-lg">&lt;/&gt;</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-space-blue to-space-green bg-clip-text text-transparent drop-shadow-sm">
                    CodeCollab
                  </span>
                </div>
                <p className="text-white/70 text-base leading-relaxed">
                  The ultimate platform for real-time collaborative development. Build the future together.
                </p>
              </div>
              
              {/* Navigation Sections - Equal Spacing */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 lg:max-w-2xl">
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg mb-4 relative">
                    Product
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-space-blue to-transparent"></div>
                  </h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">CodeSync</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">CodeCollab</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Enterprise</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Pricing</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg mb-4 relative">
                    Resources
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-space-green to-transparent"></div>
                  </h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Documentation</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">API Reference</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Tutorials</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Support</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg mb-4 relative">
                    Company
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                  </h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">About</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Blog</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Careers</a></li>
                    <li><a href="#" className="text-white/70 hover:text-space-blue transition-all duration-300 text-sm hover:translate-x-1 transform">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Copyright Section - No Divider */}
            <div className="pt-6 text-center">
              <p className="text-white/60 text-sm leading-relaxed">
                &copy; 2025 CodeCollab. All rights reserved. Built for the future of collaborative development.
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default LandingPage;

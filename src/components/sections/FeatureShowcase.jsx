import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../GlassPanel';

const FeatureShowcase = () => {
  const features = [
    {
      icon: '👥',
      title: 'Coding with Your Peers and Colleagues',
      description: 'Collaborate seamlessly with your team members in real-time. Share ideas, solve problems together, and build amazing projects with synchronized coding sessions that keep everyone in sync.',
      visualContent: (
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">👥</span>
            <div className="space-y-2">
              <div className="w-24 h-2 bg-space-blue/50 rounded mx-auto"></div>
              <div className="w-16 h-2 bg-space-green/50 rounded mx-auto"></div>
              <div className="w-20 h-2 bg-space-purple/50 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: '🎓',
      title: 'Team Training',
      description: 'Conduct interactive training sessions with your development team. Share knowledge, teach best practices, and onboard new developers with hands-on collaborative coding experiences.',
      visualContent: (
        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">🎓</span>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-space-purple/30 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      icon: '👁️',
      title: 'Code Reviews',
      description: 'Streamline your code review process with real-time collaboration. Review code together, discuss improvements, and ensure code quality with interactive review sessions.',
      visualContent: (
        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">👁️</span>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <div className="w-12 h-1 bg-green-400/50 rounded"></div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-8 h-1 bg-yellow-400/50 rounded"></div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                <div className="w-10 h-1 bg-red-400/50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: '⏰',
      title: 'Technical Interviews',
      description: 'Conduct efficient technical interviews with real-time coding assessments. Evaluate candidates effectively with collaborative coding sessions and instant feedback mechanisms.',
      visualContent: (
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">⏰</span>
            <div className="relative">
              <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-8 bg-cyan-400 rounded-full transform rotate-45 origin-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: '📚',
      title: 'College Projects',
      description: 'Perfect for student collaboration on academic projects. Work together on assignments, share learning experiences, and build projects that showcase your skills as a team.',
      visualContent: (
        <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-4 block">📚</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-8 h-8 bg-emerald-400/30 rounded"></div>
              <div className="w-8 h-8 bg-teal-400/30 rounded"></div>
              <div className="w-8 h-8 bg-green-400/30 rounded"></div>
              <div className="w-8 h-8 bg-lime-400/30 rounded"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features-section" className="py-10 px-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-space-blue to-space-green bg-clip-text text-transparent">
            Built for Modern Development Teams
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Everything you need for collaborative development, from instant pair programming 
            to enterprise-grade team management and deployment workflows.
          </p>
        </motion.div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <GlassPanel glow="blue" className="overflow-hidden">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[300px]`}>
                  {/* Visual Content */}
                  <div className="lg:w-1/2 p-8 flex items-center justify-center">
                    {feature.visualContent}
                  </div>
                  
                  {/* Text Content */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{feature.icon}</span>
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

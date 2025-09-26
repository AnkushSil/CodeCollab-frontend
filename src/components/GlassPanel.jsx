import { motion } from 'framer-motion';

const glowMap = {
  blue: 'ring-space-blue shadow-neon-blue',
  green: 'ring-space-green shadow-neon-green',
  purple: 'ring-space-purple shadow-neon-purple',
};

const GlassPanel = ({
  children,
  glow = 'blue',
  className = '',
  animateIn = true,
  ...props
}) => {
  const glowCls = glowMap[glow] ?? glowMap.blue;
  const base = 'bg-white/5 backdrop-blur-xl ring-1 ring-inset border border-white/10 rounded-xl shadow-lg';

  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const Wrapper = animateIn ? motion.div : 'div';

  return (
    <Wrapper
      initial={animateIn ? 'hidden' : undefined}
      whileInView={animateIn ? 'show' : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={animateIn ? variants : undefined}
      className={`${base} ${glowCls} ${className}`}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default GlassPanel;



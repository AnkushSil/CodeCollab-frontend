import { motion } from 'framer-motion';

const colorMap = {
  primary: {
    ring: 'ring-space-blue shadow-neon-blue',
    bg: 'bg-space-blue text-black',
    text: 'text-space-blue',
  },
  secondary: {
    ring: 'ring-space-green shadow-neon-green',
    bg: 'bg-space-green text-black',
    text: 'text-space-green',
  },
  accent: {
    ring: 'ring-space-purple shadow-neon-purple',
    bg: 'bg-space-purple text-white',
    text: 'text-space-purple',
  },
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const NeonButton = ({
  children,
  variant = 'primary',
  size = 'md',
  outline = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const colors = colorMap[variant] ?? colorMap.primary;
  const sizeCls = sizeMap[size] ?? sizeMap.md;
  const base = 'rounded-md font-bold tracking-tight backdrop-blur-md transition-all duration-300';
  const outlineCls = `bg-transparent ${colors.text} ring-1 ring-inset ${colors.ring}`;
  const filledCls = `${colors.bg} ring-1 ring-inset ${colors.ring}`;

  const disabledCls = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={disabled ? {} : { boxShadow: '0 0 20px rgba(0,212,255,0.35)' }}
      className={`${base} ${sizeCls} ${outline ? outlineCls : filledCls} ${disabledCls} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;



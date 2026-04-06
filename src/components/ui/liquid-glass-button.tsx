import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const liquidButtonVariants = cva(
  'relative inline-flex items-center justify-center font-semibold transition-all duration-300 overflow-hidden rounded-lg group',
  {
    variants: {
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
        xxl: 'px-12 py-6 text-2xl',
      },
      variant: {
        default: 'bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-lg hover:shadow-sky-400/50',
        light: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30',
        dark: 'bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/50',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, children, isLoading = false, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <motion.button
        ref={ref}
        className={cn(liquidButtonVariants({ variant, size, className }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

        <motion.div
          className="absolute inset-0"
          animate={isHovered ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 blur-lg" />
        </motion.div>

        <div className="relative z-10 flex items-center gap-2">
          {isLoading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {children}
        </div>

        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0"
          animate={isHovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';

export { LiquidButton, liquidButtonVariants };

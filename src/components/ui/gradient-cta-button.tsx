import React from 'react';
import { cn } from '@/lib/utils';

interface GradientCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GradientCTAButton = React.forwardRef<HTMLButtonElement, GradientCTAButtonProps>(
  ({ className, size = 'md', children, onClick, ...props }, ref) => {
    const [bursts, setBursts] = React.useState<Array<{ id: number; x: number; y: number }>>([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()

        setBursts(prev => [...prev, { id, x, y }])

        setTimeout(() => {
          setBursts(prev => prev.filter(burst => burst.id !== id))
        }, 600)
      }

      onClick?.(e)
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3'
    };

    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          'group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105 flex items-center',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative flex items-center gap-2 whitespace-nowrap">
          {children}
        </span>
        {bursts.map(burst => (
          <React.Fragment key={burst.id}>
            <span
              className="absolute pointer-events-none"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              <span className="absolute w-1 h-10 bg-white/80 -translate-x-1/2 -translate-y-1/2 animate-[burst-right_0.6s_ease-out]" />
            </span>
            <span
              className="absolute pointer-events-none"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              <span className="absolute w-1 h-10 bg-white/80 -translate-x-1/2 -translate-y-1/2 animate-[burst-left_0.6s_ease-out]" />
            </span>
          </React.Fragment>
        ))}
      </button>
    );
  }
);

GradientCTAButton.displayName = 'GradientCTAButton';

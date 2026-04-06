import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-rounded": "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
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

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn("relative overflow-hidden", buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        onClick={handleClick}
        {...props}
      >
        {props.children}
        {bursts.map(burst => (
          <React.Fragment key={burst.id}>
            <span
              className="absolute pointer-events-none"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              <span className="absolute w-1 h-8 bg-white/60 -translate-x-1/2 -translate-y-1/2 animate-[burst-right_0.6s_ease-out]" />
            </span>
            <span
              className="absolute pointer-events-none"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              <span className="absolute w-1 h-8 bg-white/60 -translate-x-1/2 -translate-y-1/2 animate-[burst-left_0.6s_ease-out]" />
            </span>
          </React.Fragment>
        ))}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

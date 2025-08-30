import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forwardRef, memo } from "react";

interface MysticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "mystical" | "gold" | "ethereal";
  size?: "sm" | "default" | "lg";
}

// Memoizar as variantes para evitar recriação
const buttonVariants = {
  mystical: "bg-mystical-gradient text-mystic-gold-bright border-mystic-purple-light hover:shadow-mystical transition-mystical glow-effect",
  gold: "bg-gold-gradient text-mystic-purple border-mystic-gold hover:shadow-gold transition-mystical",
  ethereal: "mystical-card text-mystic-gold border-mystic-purple-light hover:border-mystic-gold transition-mystical"
} as const;

// Memoizar os tamanhos para evitar recriação
const buttonSizes = {
  sm: "px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm h-8 sm:h-10",
  default: "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base h-10 sm:h-12",
  lg: "px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14"
} as const;

const MysticalButton = memo(forwardRef<HTMLButtonElement, MysticalButtonProps>(
  ({ className, variant = "mystical", size = "default", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "font-semibold rounded-lg border-2 transition-mystical min-h-[44px]",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
));

MysticalButton.displayName = "MysticalButton";

export { MysticalButton };
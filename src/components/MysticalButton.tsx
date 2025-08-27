import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface MysticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "mystical" | "gold" | "ethereal";
  size?: "sm" | "default" | "lg";
}

const MysticalButton = forwardRef<HTMLButtonElement, MysticalButtonProps>(
  ({ className, variant = "mystical", size = "default", children, ...props }, ref) => {
    const variants = {
      mystical: "bg-mystical-gradient text-mystic-gold-bright border-mystic-purple-light hover:shadow-mystical transition-mystical glow-effect",
      gold: "bg-gold-gradient text-mystic-purple border-mystic-gold hover:shadow-gold transition-mystical",
      ethereal: "mystical-card text-mystic-gold border-mystic-purple-light hover:border-mystic-gold transition-mystical"
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      default: "px-8 py-3 text-base",
      lg: "px-12 py-4 text-lg"
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "font-semibold rounded-lg border-2 transition-mystical",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MysticalButton.displayName = "MysticalButton";

export { MysticalButton };
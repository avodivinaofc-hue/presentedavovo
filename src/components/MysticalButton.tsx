import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

interface MysticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "mystical" | "gold" | "ethereal" | "green-pulse";
  size?: "sm" | "default" | "lg";
}

const MysticalButton = forwardRef<HTMLButtonElement, MysticalButtonProps>(
  ({ className, variant = "mystical", size = "default", children, ...props }, ref) => {
    const variants = {
      mystical: "bg-mystical-gradient text-mystic-gold-bright border-mystic-purple-light hover:shadow-mystical transition-mystical glow-effect",
      gold: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 border-yellow-400 hover:shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600",
      ethereal: "mystical-card text-mystic-gold border-mystic-purple-light hover:border-mystic-gold transition-mystical",
      "green-pulse": "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 transition-all duration-300 active:bg-green-500/70 active:border-green-500/70 animate-pulse shadow-lg hover:shadow-xl"
    };

    const sizes = {
      sm: "px-4 sm:px-6 md:px-8 py-3 text-xs sm:text-sm h-10 sm:h-12",
      default: "px-6 sm:px-8 md:px-10 py-4 text-sm sm:text-base h-12 sm:h-14",
      lg: "px-8 sm:px-10 md:px-12 py-5 text-base sm:text-lg h-14 sm:h-16 md:h-18"
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "font-bold rounded-lg border-2 transition-all duration-300 min-h-[44px] whitespace-nowrap overflow-hidden text-ellipsis",
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

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { forwardRef } from "react";

interface MysticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glowing" | "ethereal";
}

const MysticalCard = forwardRef<HTMLDivElement, MysticalCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "mystical-card shadow-ethereal",
      glowing: "mystical-card shadow-mystical glow-effect",
      ethereal: "mystical-card shadow-gold backdrop-blur-lg"
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-mystical hover:shadow-mystical",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

MysticalCard.displayName = "MysticalCard";

export { MysticalCard };
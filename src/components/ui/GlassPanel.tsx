import React from "react";
import { clsx } from "clsx";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "subtle" | "active";
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = "default",
  className,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md",
        variant === "default" && "bg-[#0c0e14]/70 border-white/[0.08] hover:border-white/[0.16]",
        variant === "elevated" && "bg-[#11131c]/80 border-white/[0.12] shadow-2xl shadow-black/60",
        variant === "subtle" && "bg-[#08090e]/50 border-white/[0.05]",
        variant === "active" && "bg-[#141824]/90 border-accent-cyan/40 shadow-lg shadow-accent-cyan/10",
        glow && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent-cyan/5 before:via-transparent before:to-accent-violet/5 before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

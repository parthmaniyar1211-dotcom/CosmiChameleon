import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-950 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group",
        // Sizes
        size === "sm" && "text-xs px-3.5 py-1.5 gap-1.5",
        size === "md" && "text-sm px-5 py-2.5 gap-2",
        size === "lg" && "text-base px-7 py-3.5 gap-2.5 font-semibold",
        // Variants
        variant === "primary" &&
          "bg-white text-cosmic-950 hover:bg-neutral-200 shadow-md shadow-white/10 hover:shadow-lg hover:shadow-white/20",
        variant === "secondary" &&
          "bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-md",
        variant === "outline" &&
          "bg-transparent text-neutral-300 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.04]",
        variant === "ghost" &&
          "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.06]",
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>
      )}
    </button>
  );
};

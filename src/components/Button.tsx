"use client";

import React from "react";

type ButtonVariant = "primary" | "premium" | "outline" | "ghost" | "medieval";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary font-outfit",
  premium: "btn-premium font-outfit",
  outline: "btn-outline font-inter",
  ghost: "btn-ghost font-inter",
  medieval: "medieval-btn font-cinzel",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

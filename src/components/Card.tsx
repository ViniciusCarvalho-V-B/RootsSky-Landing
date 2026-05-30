import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-obsidian border border-slate-border rounded-xl p-6
        ${hoverable ? "glass-card" : ""}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

/* Sub-components for structured cards */

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = "" }: CardImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg mb-4 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

interface CardBadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "gold" | "cyan";
}

export function CardBadge({ children, variant = "emerald" }: CardBadgeProps) {
  const colors = {
    emerald: "bg-emerald/10 text-emerald border-emerald/20",
    gold: "bg-gold/10 text-gold border-gold/20",
    cyan: "bg-cyan/10 text-cyan-light border-cyan/20",
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

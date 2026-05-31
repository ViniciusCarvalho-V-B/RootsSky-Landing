import React from "react";
import Image from "next/image";

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
        bg-wood border border-gold/15 rounded-xl p-6
        ${hoverable ? "glass-card" : ""}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CardImage({
  src,
  alt,
  width = 640,
  height = 384,
  className = "",
}: CardImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg mb-4 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

interface CardBadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "gold" | "cyan";
}

export function CardBadge({ children, variant = "gold" }: CardBadgeProps) {
  const colors = {
    emerald: "bg-emerald/10 text-leaf-light border-emerald/20",
    gold: "bg-gold/10 text-gold border-gold/20",
    cyan: "bg-crystal/10 text-crystal border-crystal/20",
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

import React from "react";

interface EarthSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function EarthSection({ children, className = "" }: EarthSectionProps) {
  return (
    <section className={`relative ${className}`}>
      {/* Subtle earth-toned background */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth/[0.04] via-earth/[0.08] to-earth/[0.04] pointer-events-none" />
      {/* Side accents */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-earth/20 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-earth/20 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

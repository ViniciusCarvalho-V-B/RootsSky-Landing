import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — warm blacks & deep browns
        "dark-wood": "#0D0A07",
        wood: "#1A120E",
        "wood-light": "#2A1810",
        "wood-medium": "#3D261A",

        // Browns — earth identity
        bark: "#5D4037",
        "bark-light": "#795548",

        // Golds — primary accent
        gold: {
          DEFAULT: "#C4A265",
          dark: "#8B6914",
          light: "#D4AF37",
        },
        "gold-shine": "#F5D380",

        // Greens — nature/status & Roots identity
        leaf: "#2D5A27",
        "leaf-light": "#4CAF50",
        emerald: "#1B8A5A",
        "forest-deep": "#0A3D1F",
        "forest-glow": "#1B5E3B",
        "roots-green": "#2E7D32",

        // Crystal accent
        crystal: "#4DD0E1",

        // Text colors — warm palette
        warm: "#F5E6D3",
        "warm-muted": "#C4B59B",
        "warm-dim": "#8B7D6B",

        // Legacy aliases for compat with store/battlepass pages
        void: "#0D0A07",
        obsidian: "#1A120E",
        "slate-border": "#3D261A",
        earth: "#5D4037",
        forest: "#2E7D32",
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(196,162,101,0.1)" },
          "50%": { boxShadow: "0 0 25px rgba(196,162,101,0.25)" },
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      typography: (theme: any) => ({
        gold: {
          css: {
            '--tw-prose-body': theme('colors.warm.900'),
            '--tw-prose-headings': theme('colors.gold.DEFAULT'),
            '--tw-prose-links': theme('colors.gold.light'),
            '--tw-prose-bold': theme('colors.gold.DEFAULT'),
            '--tw-prose-counters': theme('colors.gold.dark'),
            '--tw-prose-bullets': theme('colors.gold.DEFAULT'),
            '--tw-prose-hr': theme('colors.gold.dark'),
            '--tw-prose-quotes': theme('colors.warm.muted'),
            '--tw-prose-quote-borders': theme('colors.gold.dark'),
            '--tw-prose-code': theme('colors.warm.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.warm.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.dark-wood'),
            '--tw-prose-invert-body': theme('colors.warm.DEFAULT'),
            '--tw-prose-invert-headings': theme('colors.gold.DEFAULT'),
            '--tw-prose-invert-links': theme('colors.gold.light'),
            '--tw-prose-invert-bold': theme('colors.gold.DEFAULT'),
            '--tw-prose-invert-counters': theme('colors.gold.dark'),
            '--tw-prose-invert-bullets': theme('colors.gold.DEFAULT'),
            '--tw-prose-invert-hr': theme('colors.gold.dark'),
            '--tw-prose-invert-quotes': theme('colors.warm.muted'),
            '--tw-prose-invert-quote-borders': theme('colors.gold.dark'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
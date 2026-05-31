# RootsSky Design System & Architecture

> **Source of Truth** — Este documento governa toda a implementação visual e arquitetural do site RootsSky. Qualquer decisão de design deve ser validada contra este arquivo.
>
> **Stitch Reference:** `projects/12138220670156745553` ("Skyblock Server Home Variant 1")
> **Project Brief:** Servidor brasileiro premium de Minecraft Skyblock — identidade "Roots" (terra/natureza) + "Sky" (celestial/flutuante)
> **Stack:** Next.js 14 (App Router) + Tailwind CSS 3.4 + TypeScript

---

## 1. Design Tokens

### 1.1 Color Palette

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `--color-void` | `#070A13` | `bg-void` | Fundo principal do site |
| `--color-obsidian` | `#0E1322` | `bg-obsidian` | Cards, header, containers de superfície |
| `--color-slate-border` | `#1E293B` | `border-slate-border` | Bordas sutis, divisores, outline buttons |
| `--color-earth` | `#5D4037` | `bg-earth` | Marrom terra — identidade "Roots" |
| `--color-forest` | `#2E7D32` | `bg-forest` | Verde floresta — identidade "Roots" |
| `--color-emerald` | `#10B981` | `text-emerald` / `bg-emerald` | Verde água — cor primária "Sky" |
| `--color-emerald-dark` | `#047857` | `bg-emerald-dark` | Hover/emphasis states emerald |
| `--color-emerald-light` | `#34D399` | `text-emerald-light` | Highlight/glow emerald |
| `--color-cyan` | `#06B6D4` | `text-cyan` / `bg-cyan` | Celestial — cor secundária "Sky" |
| `--color-cyan-dark` | `#1D4ED8` | `bg-cyan-dark` | Deep ethereal blue |
| `--color-cyan-light` | `#22D3EE` | `text-cyan-light` | Celestial glow highlight |
| `--color-gold` | `#F59E0B` | `text-gold` / `bg-gold` | Premium — ranks, CTAs loja, status VIP |
| `--color-gold-dark` | `#D97706` | `bg-gold-dark` | Hover states premium |

### 1.2 CSS Custom Properties (globals.css)

```css
:root {
  --color-void: #070A13;
  --color-obsidian: #0E1322;
  --color-slate-border: #1E293B;
  --color-earth: #5D4037;
  --color-forest: #2E7D32;
  --color-emerald: #10B981;
  --color-emerald-dark: #047857;
  --color-emerald-light: #34D399;
  --color-cyan: #06B6D4;
  --color-cyan-dark: #1D4ED8;
  --color-cyan-light: #22D3EE;
  --color-gold: #F59E0B;
  --color-gold-dark: #D97706;
}
```

### 1.3 Tailwind Config (tailwind.config.ts)

```ts
colors: {
  void: "#070A13",
  obsidian: "#0E1322",
  "slate-border": "#1E293B",
  earth: "#5D4037",
  forest: "#2E7D32",
  emerald: {
    DEFAULT: "#10B981",
    dark: "#047857",
    light: "#34D399",
  },
  cyan: {
    DEFAULT: "#06B6D4",
    dark: "#1D4ED8",
    light: "#22D3EE",
  },
  gold: {
    DEFAULT: "#F59E0B",
    dark: "#D97706",
  },
},
```

---

## 2. Typography

### 2.1 Font Families

| Role | Font | Weights | Variable | next/font import |
|---|---|---|---|---|
| Headings / Hero | **Outfit** | 700, 800 | `--font-outfit` | `Outfit({ subsets: ["latin"], weight: ["700","800"], variable: "--font-outfit", display: "swap" })` |
| Body / UI | **Inter** | 400, 500, 600 | `--font-inter` | `Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-inter", display: "swap" })` |
| Tech / IP / Code | **JetBrains Mono** | 500 | `--font-jetbrains` | `JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" })` |

### 2.2 Tailwind Font Classes

```ts
fontFamily: {
  outfit: ["var(--font-outfit)", "sans-serif"],
  inter: ["var(--font-inter)", "sans-serif"],
  jetbrains: ["var(--font-jetbrains)", "monospace"],
},
```

### 2.3 Type Scale

| Element | Font | Size (Tailwind) | Weight | Letter Spacing |
|---|---|---|---|---|
| Hero Title | Outfit | `text-5xl md:text-6xl lg:text-7xl` | 800 | `tracking-tight` |
| Section Heading | Outfit | `text-3xl md:text-4xl` | 700 | `tracking-tight` |
| Card Title | Outfit | `text-xl md:text-2xl` | 700 | — |
| Body | Inter | `text-base` | 400 | — |
| Body Medium | Inter | `text-sm md:text-base` | 500 | — |
| Label / Caption | Inter | `text-xs md:text-sm` | 600 | `uppercase tracking-wider` |
| Server IP | JetBrains Mono | `text-lg md:text-xl` | 500 | — |

---

## 3. Glassmorphism

### 3.1 Definition

```css
.glass {
  background: rgba(14, 19, 34, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(30, 41, 59, 0.5);
}
```

### 3.2 Tailwind Utility Classes

```css
.glass-card {
  @apply bg-obsidian/60 backdrop-blur-xl border border-slate-border/50 rounded-xl;
}

.glass-header {
  @apply bg-obsidian/80 backdrop-blur-xl border-b border-slate-border/50;
}
```

### 3.3 Usage

- **Header:** `glass-header` — fixo no topo, blur pesado, borda inferior
- **Cards:** `glass-card` — qualquer card de conteúdo (anúncios, store, sidebar)
- **Sidebar widgets:** `glass-card` com padding `p-5`
- **Modal/Overlay:** `bg-obsidian/90 backdrop-blur-2xl`

---

## 4. Gradients

### 4.1 Button Gradients

| Name | Tailwind Classes | CSS Equivalent | Usage |
|---|---|---|---|
| **Primary** | `bg-gradient-to-r from-emerald to-cyan` | `linear-gradient(to right, #10B981, #06B6D4)` | "Play Now", "Join Discord", ações principais |
| **Premium** | `bg-gradient-to-r from-gold to-gold-dark` | `linear-gradient(to right, #F59E0B, #D97706)` | "Purchase Now", store CTAs, VIP |
| **Outline** | `border border-slate-border hover:border-emerald` | — | Botões secundários, cancelar |

### 4.2 Hover Effects

- **Primary hover:** `hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]` — verde glow
- **Premium hover:** `hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]` — gold glow
- **Outline hover:** `hover:bg-white/[0.08] hover:border-emerald`

### 4.3 Decorative Gradients

- **Hero glow:** `bg-emerald/20 blur-[120px]` — esfera difusa atrás do hero
- **Divider glow:** `h-px bg-gradient-to-r from-transparent via-emerald/50 to-transparent` — divisor luminoso

---

## 5. Components

### 5.1 Header

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo RootsSky]  Home  Store  BattlePass  Discord  Vote  │ IP Widget │ [Play Now ▶] │
└─────────────────────────────────────────────────────────────────────┘
```

- **Position:** `fixed top-0 w-full z-50`
- **Style:** `glass-header`
- **Height:** `h-16`
- **Logo:** Texto "RootsSky" em Outfit 700, `text-emerald`
- **Nav Links:** Inter 500, `text-gray-300 hover:text-emerald`, transição `transition-colors`
- **ServerIP Widget:** Componente à parte (ver 5.6), inline no header
- **Play Now Button:** Primary gradient, `px-6 py-2 rounded-lg font-outfit font-bold`
- **Mobile:** Hamburger icon → drawer slide-in com nav vertical

### 5.2 HeroSection

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              ✦ ROOTSSKY ✦                                          │
│         Conquer the Skies                                          │
│   O servidor premium de Skyblock que você merece                   │
│                                                                     │
│   [▶ Play Now]    [💬 Discord]                                     │
│                                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                        │
│   │ 1,247    │  │ 50,000+  │  │ 99.9%    │                        │
│   │ Players  │  │ Islands  │  │ Uptime   │                        │
│   └──────────┘  └──────────┘  └──────────┘                        │
└─────────────────────────────────────────────────────────────────────┘
```

- **Background:** `bg-void` com decorative glow orbs (`bg-emerald/20 blur-[120px]`, `bg-cyan/10 blur-[100px]`)
- **Title:** Outfit 800, `text-5xl md:text-6xl lg:text-7xl`, gradiente `bg-gradient-to-r from-emerald to-cyan bg-clip-text text-transparent`
- **Subtitle:** Inter 400, `text-gray-400 text-lg md:text-xl`
- **Stat Cards:** `glass-card`, grid `grid-cols-3`, valor em `text-emerald font-jetbrains`, label em `text-gray-400`
- **CTA Buttons:** "Play Now" (Primary gradient), "Discord" (Outline)

### 5.3 AnnouncementGrid

```
┌─────────────────────────────────────────────┐
│  📰 Latest Announcements                    │
│  ─────────────────────────────────────────  │
│  ┌───────────────┐ ┌───────────────┐       │
│  │ [Category]    │ │ [Category]    │       │
│  │ Title         │ │ Title         │       │
│  │ Summary...    │ │ Summary...    │       │
│  │ May 30, 2026  │ │ May 28, 2026  │       │
│  │ [Read More →] │ │ [Read More →] │       │
│  └───────────────┘ └───────────────┘       │
└─────────────────────────────────────────────┘
```

- **Layout:** `grid grid-cols-1 md:grid-cols-2 gap-6`
- **Card:** `glass-card p-6 hover:border-emerald/30 transition-all duration-300`
- **Category Badge:** `text-xs font-inter font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald/10 text-emerald`
- **Title:** Outfit 700, `text-xl`, `text-white`
- **Summary:** Inter 400, `text-gray-400 text-sm line-clamp-2`
- **Date:** Inter 500, `text-gray-500 text-xs`
- **Read More:** `text-emerald hover:text-emerald-light text-sm font-medium transition-colors`

### 5.4 Sidebar

```
┌──────────────────┐
│ 🟢 Server Status │
│ Online — 1,247   │
│ play.rootssky.com│
├──────────────────┤
│ 🔗 Quick Links   │
│ • Store          │
│ • BattlePass     │
│ • Vote           │
│ • Rules          │
├──────────────────┤
│ 🏆 Top Players   │
│ 1. PlayerOne     │
│ 2. SkyMaster     │
│ 3. IslandKing    │
└──────────────────┘
```

- **Container:** `space-y-6`
- **Each Widget:** `glass-card p-5`
- **Widget Title:** Inter 600, `text-sm uppercase tracking-wider text-gray-400 mb-3`
- **Server Status:** Dot `w-2.5 h-2.5 rounded-full bg-emerald` + "Online" em `text-emerald`
- **Quick Links:** `text-gray-300 hover:text-emerald transition-colors`, icone + texto
- **Top Players:** Lista numerada, posições 1-3 com `text-gold`/`text-gray-300`/`text-amber-700`

### 5.5 Footer

```
┌──────────────────────────────────────────────────────────────────────┐
│  Server          Community          Legal                            │
│  • Store         • Discord          • Terms of Service               │
│  • BattlePass    • YouTube          • Privacy Policy                 │
│  • Vote          • Twitter/X        • Cookie Policy                  │
│  • Rules         • Instagram                                         │
│                                                                      │
│  ──────────────────────────────────────────────────────────────────  │
│  © 2026 RootsSky. All rights reserved. play.rootssky.com            │
└──────────────────────────────────────────────────────────────────────┘
```

- **Background:** `bg-obsidian border-t border-slate-border`
- **Layout:** `grid grid-cols-1 md:grid-cols-3 gap-8`
- **Column Title:** Outfit 700, `text-white text-lg`
- **Links:** Inter 400, `text-gray-400 hover:text-emerald transition-colors text-sm`
- **Bottom Bar:** `border-t border-slate-border pt-6 mt-8 text-center text-gray-500 text-sm`
- **IP in footer:** JetBrains Mono, `text-emerald`

### 5.6 ServerIP Widget

```
┌──────────────────────────┐
│  🟢 play.rootssky.com 📋│
└──────────────────────────┘
```

- **Font:** JetBrains Mono 500
- **Style:** `glass-card px-4 py-2 inline-flex items-center gap-2`
- **IP Text:** `text-emerald text-sm`
- **Copy Button:** Clipboard icon, `text-gray-400 hover:text-emerald transition-colors`
- **Click behavior:** `navigator.clipboard.writeText()` → toast "IP Copied!"
- **Used in:** Header (desktop), Sidebar (mobile)

### 5.7 Button Component

| Variant | Classes |
|---|---|
| `primary` | `bg-gradient-to-r from-emerald to-cyan text-white font-outfit font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300` |
| `premium` | `bg-gradient-to-r from-gold to-gold-dark text-white font-outfit font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300` |
| `outline` | `border border-slate-border text-gray-300 font-outfit font-semibold px-6 py-3 rounded-lg hover:bg-white/[0.08] hover:border-emerald transition-all duration-300` |
| `ghost` | `text-gray-400 hover:text-emerald transition-colors` |

---

## 6. Pages

### 6.1 Home (`/`)

**Composition:** Header → HeroSection → Divider → (AnnouncementGrid + Sidebar) → Footer

```
┌─────────────────────────────────────────────────────┐
│ Header (fixed, glass)                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│ HeroSection (full viewport, decorative bg)          │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ──── gradient divider ────                          │
│                                                     │
│  ┌────────────────────┐  ┌──────────────┐          │
│  │ AnnouncementGrid   │  │ Sidebar      │          │
│  │ (2/3 width)        │  │ (1/3 width)  │          │
│  └────────────────────┘  └──────────────┘          │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Footer                                              │
└─────────────────────────────────────────────────────┘
```

- **Grid:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10`
- **Announcements:** `lg:col-span-2`
- **Sidebar:** `lg:col-span-1`

### 6.2 Store (`/store`)

**Composition:** Header → Store Hero → Category Tabs → Product Grid → Footer

```
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🛒 RootsSky Store                                 │
│  Enhance your Skyblock experience                   │
│                                                     │
│  [Ranks] [Coins] [Bundles]  ← category tabs        │
│                                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │ Product│ │ Product│ │ Product│ │ Product│      │
│  │  Card  │ │  Card  │ │  Card  │ │  Card  │      │
│  │ R$29.90│ │ R$9.90 │ │ R$49.90│ │ R$99.90│      │
│  │[Buy Now]│ │[Buy Now]│ │[Buy Now]│ │[Buy Now]│      │
│  └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Footer                                              │
└─────────────────────────────────────────────────────┘
```

- **Hero:** Similar ao Home hero mas menor, `py-20`, título "RootsSky Store"
- **Category Tabs:** `flex gap-4 mb-8`, tab ativa `bg-emerald/10 text-emerald border-emerald/30`, inativa `text-gray-400 border-transparent hover:text-gray-200`
- **Product Grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- **Product Card:** `glass-card p-6`, imagem topo, título Outfit 700, preço `text-gold font-jetbrains`, botão "Purchase Now" premium gradient
- **Featured Badge:** `absolute top-3 right-3 bg-gold/20 text-gold text-xs font-semibold px-2 py-1 rounded-full` para "POPULAR", "NEW"

### 6.3 BattlePass (`/battlepass`)

**Composition:** Header → BattlePass Hero → Tier Comparison → Features Grid → Progress Bar → Footer

```
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ⚔️ Season 1 BattlePass                             │
│  Unlock exclusive rewards as you play               │
│                                                     │
│  ┌──────────┐ ┌──────────────┐ ┌────────────────┐  │
│  │  FREE    │ │  PREMIUM     │ │ PREMIUM+       │  │
│  │  50 tiers│ │  100 tiers   │ │  100 tiers     │  │
│  │  Basic   │ │  All rewards │ │  + Exclusive   │  │
│  │  rewards │ │  + cosmetics │ │  cosmetics     │  │
│  │ Free     │ │  R$19.90     │ │  R$34.90       │  │
│  │ [Current]│ │  [Upgrade]   │ │  [Get Premium+]│  │
│  └──────────┘ └──────────────┘ └────────────────┘  │
│                                                     │
│  ──── Your Progress ────                            │
│  Level 42/100  ████████████░░░░░░░  42%            │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Footer                                              │
└─────────────────────────────────────────────────────┘
```

- **Hero:** `py-20`, título "Season 1 BattlePass"
- **Tier Cards:** `grid grid-cols-1 md:grid-cols-3 gap-8`
  - **Free:** `glass-card`, border `border-slate-border`, botão outline "Current Plan"
  - **Premium:** `glass-card border-emerald/30`, badge "POPULAR", preço `text-gold`, botão premium gradient "Upgrade"
  - **Premium+:** `glass-card border-gold/30`, badge "BEST VALUE", preço `text-gold`, botão premium gradient "Get Premium+"
- **Progress Bar:** `w-full h-3 bg-obsidian rounded-full overflow-hidden`, fill `bg-gradient-to-r from-emerald to-cyan h-full rounded-full`
- **Progress Label:** Inter 500, `text-gray-400`, level `text-emerald font-jetbrains`

---

## 7. Responsiveness

### 7.1 Breakpoints

| Breakpoint | Tailwind | Min Width |
|---|---|---|
| Mobile | default | 0px |
| Tablet | `md:` | 768px |
| Desktop | `lg:` | 1024px |
| Wide | `xl:` | 1280px |

### 7.2 Behavior per Breakpoint

**Mobile (< 768px):**
- Header: hamburger menu (3-line icon), drawer lateral
- Hero: `text-5xl`, stack vertical, stat cards `grid-cols-3` compact
- AnnouncementGrid: `grid-cols-1`
- Product Grid: `grid-cols-1`
- Tier Cards: `grid-cols-1`
- Sidebar: empilhado abaixo dos anúncios
- Footer: `grid-cols-1`, links empilhados

**Tablet (768px - 1023px):**
- Header: nav links visíveis, sem hamburger
- Hero: `text-6xl`
- AnnouncementGrid: `grid-cols-2`
- Product Grid: `grid-cols-2`
- Tier Cards: `grid-cols-2` (Premium+ wraps)
- Sidebar: coluna à direita

**Desktop (≥ 1024px):**
- Header: full nav + ServerIP inline + Play Now
- Hero: `text-7xl`
- AnnouncementGrid: `grid-cols-2` (na coluna 2/3)
- Product Grid: `grid-cols-4`
- Tier Cards: `grid-cols-3`
- Content + Sidebar: `grid-cols-3` (2:1)

### 7.3 Mobile Menu

- **Trigger:** Hamburger icon (3 lines), `lg:hidden`
- **Drawer:** `fixed inset-y-0 right-0 w-72 bg-obsidian/95 backdrop-blur-2xl border-l border-slate-border z-50`
- **Animation:** `transform translate-x-full` → `translate-x-0` com `transition-transform duration-300`
- **Overlay:** `fixed inset-0 bg-black/60 z-40`
- **Content:** Nav links verticais + ServerIP + Play Now button

---

## 8. Animations & Transitions

### 8.1 Global Animations

| Name | Tailwind Class | Definition |
|---|---|---|
| Fade In | `animate-fade-in` | `0% { opacity: 0 } → 100% { opacity: 1 }` (0.6s ease-out) |
| Slide Up | `animate-slide-up` | `0% { opacity: 0; transform: translateY(20px) } → 100% { opacity: 1; transform: translateY(0) }` (0.6s ease-out) |

### 8.2 Component Transitions

- **Cards:** `transition-all duration-300`
- **Buttons:** `transition-all duration-300`
- **Nav Links:** `transition-colors duration-200`
- **Mobile Menu:** `transition-transform duration-300`

### 8.3 Stagger Pattern

Cards in grids should stagger their entrance:
```
Card 1: animation-delay: 0ms
Card 2: animation-delay: 100ms
Card 3: animation-delay: 200ms
Card 4: animation-delay: 300ms
```
Apply via inline style `style={{ animationDelay: '${index * 100}ms' }}`.

---

## 9. Performance

### 9.1 Images
- Use `next/image` para todas as imagens com `width`/`height` explícitos
- `loading="lazy"` para imagens below-the-fold (default do Next.js)
- `priority` apenas para hero background / logo
- Formato: WebP preferencial, fallback PNG

### 9.2 Fonts
- Todas via `next/font/google` — zero layout shift
- `display: "swap"` em todas
- `subsets: ["latin"]` — reduz bundle size
- CSS variables para switching (definido em layout.tsx)

### 9.3 CSS
- Tailwind purge automático via `content` config
- Evitar CSS custom fora do Tailwind (usar `@apply` em globals.css quando necessário)
- `globals.css` mínimo — apenas custom properties, glassmorphism classes, e scrollbar styling

### 9.4 JavaScript
- Componentes client apenas quando necessário (`"use client"` para interatividade)
- Header (mobile menu toggle), ServerIP (clipboard), BattlePass (tab switch) = client components
- Restante: server components por padrão

---

## 10. File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, body)
│   ├── page.tsx            # Home page
│   ├── globals.css         # CSS custom properties + glassmorphism + scrollbar
│   ├── favicon.ico
│   ├── store/
│   │   └── page.tsx        # Store page
│   └── battlepass/
│       └── page.tsx        # BattlePass page
├── components/
│   ├── Header.tsx          # Glass header + nav + mobile menu (client)
│   ├── HeroSection.tsx     # Hero with stats + CTA buttons
│   ├── AnnouncementGrid.tsx # News cards grid
│   ├── Sidebar.tsx         # Server status + quick links + top players
│   ├── Footer.tsx          # Footer with link columns
│   ├── ServerIP.tsx        # IP copy widget (client)
│   ├── Button.tsx          # Reusable button component (variants)
│   └── Card.tsx            # Reusable glass card wrapper
```

---

## 11. Stitch Screens Reference

Estas são as telas do projeto Stitch que serviram de referência visual:

| Screen ID | Title | Dimensions | Type |
|---|---|---|---|
| `6e339795...` | Skyblock Server Home Variant 1 | 1376×768 | Desktop Design |
| `b0167728...` | Skyblock Server Home Variant 1 | 1376×768 | Desktop Design |
| `5a9c109b...` | Skyblock Server Home Variant 2 | 1376×768 | Desktop Design |
| `3e726af2...` | Skyblock Server Home Variant 2 | 1376×768 | Desktop Design |
| `474d6678...` | RootsSky Creative Home V2 | 1376×768 | Desktop Design |
| `7d5b91cb...` | RootsSky Premium Landing Page V1 | 1376×768 | Desktop Design |
| `59766645...` | DESIGN.md | 390×884 | Document |
| `176883504...` | (Component instances) | Various | Screen Instance |

---

*Last updated: 2026-05-31 | Source: Stitch MCP + Project Brief*

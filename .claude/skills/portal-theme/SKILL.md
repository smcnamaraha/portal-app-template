---
name: portal-theme
description: >
  Portal v6 theme constraint layer. Ensures all frontend styling uses Portal
  design tokens from public/design-tokens.json via CSS variables in theme.css.
  Provides per-theme creative direction briefs. Auto-invoked alongside
  frontend-design skill during all component and page implementation work.
---

# Portal v6 — Theme-First Design

This skill constrains the frontend-design skill to work through Portal's
design token pipeline. Every aesthetic choice must be expressed via theme
tokens — never arbitrary values.

## Token Pipeline (Non-Negotiable)

All styling flows through this chain:

```
Portal Design System → design-tokens.json → theme.css (CSS vars) → Tailwind config → Components
```

### Hard Rules

1. **ALL colours** must come from theme tokens via Tailwind classes mapped to
   CSS variables. No `bg-[#1a1a2e]`, no `text-[#e2e8f0]`, no inline hex values.
2. **ALL font families** must be set in theme.css from design-tokens.json.
   Components reference fonts via Tailwind's font-heading, font-body classes.
3. **ALL spacing** uses the theme's spacing scale via Tailwind utilities.
4. **ALL border-radius** values use theme tokens (rounded-sm through rounded-full).
5. **ALL shadows** use theme shadow tokens.

If a value exists in design-tokens.json, the component MUST use the CSS variable
or Tailwind token. Hardcoded values are a build failure.

### What You CAN Freestyle

- Layout composition (asymmetry, grid-breaking, overlap)
- Animation timing and easing curves
- Background effects (gradients using theme colours, blur, noise textures)
- Typography scale ratios (using theme fonts)
- Hover/focus state creativity (using theme accent colours)
- Visual hierarchy and spatial rhythm
- Decorative elements (borders, dividers, shapes — in theme colours)

## Google Fonts Selection

Each build must include a distinctive Google Font pair. The fonts are added as
a <link> tag in src/app/layout.tsx and registered in theme.css.

Selection criteria:
- Display font: Characterful, distinctive, NOT Inter/Roboto/Arial/system fonts
- Body font: Readable, refined, complements the display font
- The pair must match the theme's personality (see Theme Briefs below)

After selecting fonts, update theme.css:
```css
--font-heading: 'Your Display Font', sans-serif;
--font-body: 'Your Body Font', sans-serif;
```

## Theme Creative Direction Briefs

When the build plan specifies a theme, use the matching brief to guide all
aesthetic decisions. These briefs channel the frontend-design skill's guidance
into theme-appropriate directions.

### Glass Dark
- **Tone:** Refined futuristic. Think premium dashboard, Bloomberg terminal
  meets luxury brand.
- **Typography:** Geometric sans display (e.g., Outfit, Syne, Josefin Sans)
  paired with a clean technical body font (e.g., IBM Plex Sans, Manrope).
- **Signature effects:** Frosted glass panels with backdrop-filter: blur(12-20px).
  Translucent backgrounds with rgba values from theme. Subtle border glow on
  hover using theme accent. Layered depth with multiple glass layers.
- **Layout:** Clean grid with glass card components. Generous negative space.
  Content floats on glass surfaces over a deep dark background.
- **Motion:** Smooth, deliberate. Fade-in with subtle scale (0.98 → 1).
  Glass panels slide in with staggered delays. No bounce.
- **Avoid:** Flat solid cards, heavy borders, playful elements, warm colours.

### Clean Light
- **Tone:** Editorial precision. Think Stripe docs, Linear app, Apple HIG.
- **Typography:** Elegant serif or sharp geometric for display
  (e.g., Fraunces, Plus Jakarta Sans, General Sans) paired with a
  workhorse body font (e.g., Source Sans 3, Nunito Sans).
- **Signature effects:** Crisp white/off-white cards with hairline borders.
  Typography-forward hierarchy — the fonts do the heavy lifting.
  Subtle shadows (small, tight, barely visible). Generous whitespace as
  a design element, not empty space.
- **Layout:** Asymmetric editorial layouts. Wide margins. Content breathes.
  One strong visual anchor per section. Grid-breaking hero elements.
- **Motion:** Understated. Content fades up on scroll. Micro-interactions
  on buttons (subtle background shift, not scale). Smooth page transitions.
- **Avoid:** Heavy gradients, glass effects, dark surfaces, neon accents,
  visual noise. Let the content and typography dominate.

### Warm Organic
- **Tone:** Handcrafted warmth. Think artisan bakery site, family journal,
  Notion's softer moments.
- **Typography:** Humanist or rounded display font
  (e.g., Playfair Display, Lora, Quicksand, Nunito) paired with a
  friendly body font (e.g., Source Serif 4, Karla, DM Sans).
- **Signature effects:** Warm-tinted backgrounds (cream, linen, soft tan
  from theme tokens). Rounded corners (12-16px from theme border-radius).
  Soft, diffused shadows. Subtle grain or paper texture overlay
  (CSS noise pattern, not an image). Organic shapes — rounded containers,
  pill-shaped buttons, circular avatars.
- **Layout:** Card-based with generous padding. Comfortable reading width
  (max 65ch for body text). Grouped content with clear visual sections.
  Friendly empty states with illustrations or warm messaging.
- **Motion:** Gentle and natural. Ease-out curves (not linear). Elements
  float in softly. Loading states feel cozy, not urgent.
- **Avoid:** Sharp corners, high contrast, dark backgrounds, technical
  aesthetics, monospace fonts, aggressive animations.

### Bold Minimal
- **Tone:** High-impact editorial. Think Swiss design, Bauhaus, modern
  magazine cover.
- **Typography:** Strong, opinionated display font
  (e.g., Instrument Serif, Space Grotesk, Bebas Neue, DM Serif Display)
  paired with a neutral body font (e.g., DM Sans, Outfit, Figtree).
  Oversized headings. Dramatic scale contrast between heading and body.
- **Signature effects:** High contrast palette (near-black on near-white
  or vice versa, from theme tokens). Bold colour blocking — large areas
  of theme accent colour. Sharp, defined edges. Minimal decoration —
  the typography and colour ARE the design.
- **Layout:** Dramatic asymmetry. Oversized elements next to compact ones.
  Full-bleed colour sections. Grid that's deliberately broken for impact.
  Strong vertical rhythm.
- **Motion:** Snappy and confident. Quick transitions (150-200ms).
  Elements clip in rather than fade. Scroll-triggered reveals with
  crisp timing. No easing overshoot.
- **Avoid:** Soft edges, gradients, glass effects, small timid typography,
  evenly-distributed layouts, decorative clutter.

### Nightfall (portal-only, included for completeness)
- **Tone:** Tech command centre. Luminous accents on void.
- **Typography:** Exo 2 display, Inter Tight body, Space Mono data.
- **Signature effects:** Ultra-dark bg (#020203), glass panels with
  backdrop-blur, purple accent glow, squared edges, subtle grid overlay.
- **Layout:** Dense information display. Status-driven. Data tables with
  glass rows. Compact stat cards.
- **Motion:** Pulsing status indicators. Smooth panel transitions. Glow
  effects on hover.

## Anti-Patterns (Explicit Failures)

These are build quality failures. If any appear in output, fix before PR:

- [ ] Inter, Roboto, Arial, or system-ui as the primary font
- [ ] Purple/indigo (#6366f1, #7c3aed) buttons on white background
- [ ] Flat solid white or black backgrounds with no depth
- [ ] Gray text on coloured backgrounds (poor contrast)
- [ ] Cards nested inside cards
- [ ] Generic placeholder copy ("Lorem ipsum", "Welcome to Our Platform")
- [ ] All elements centred with no visual hierarchy
- [ ] No hover states or transitions on interactive elements
- [ ] Bounce or elastic easing on animations
- [ ] Pure black (#000) or pure gray (#666) — always tint toward theme palette
- [ ] Every section looking identical (same card, same spacing, same layout)
- [ ] No empty state design (just "No data" text)
- [ ] Missing responsive considerations (fixed widths, no breakpoints)

## Quality Checklist (Pre-PR Gate)

Before opening the PR, verify every item:

- [ ] Google Font pair loaded in layout.tsx (NOT Inter/Roboto/Arial)
- [ ] All colours sourced from theme tokens (grep for hardcoded hex — zero results)
- [ ] Background has depth (gradient, texture, or layered effect — not flat)
- [ ] At least 3 CSS transitions or animations present
- [ ] Empty states have thoughtful copy and visual treatment
- [ ] Interactive elements have visible hover/focus states
- [ ] Typography hierarchy uses display + body font pairing
- [ ] Layout includes at least one asymmetric or grid-breaking element
- [ ] WCAG AA contrast met on all text (check with theme colours)
- [ ] Mobile responsive (test at 375px width minimum)

---
name: portal-design
description: Create distinctive, themed frontend interfaces using Portal v6 design tokens. Auto-invoked for all frontend and component work. Ensures Penpot theme tokens are applied with bold, intentional aesthetic choices.
---

# Portal v6 Design Skill

This skill guides creation of distinctive, themed interfaces that use the
project's Penpot design tokens. Every app must feel intentionally designed,
not like generic AI output.

## Design Thinking (Before Writing Any Component)

1. Read public/design-tokens.json — understand the theme's personality
2. Choose a tone that matches the token palette:
   - Dark palettes → refined/futuristic, editorial, or luxury
   - Warm palettes → organic/natural, soft/pastel, or handcrafted
   - High-contrast palettes → brutalist, bold/minimal, or industrial
3. Select 2 Google Fonts that complement the theme
   - NEVER use Inter, Roboto, Arial, or system defaults
   - Pair a distinctive display font with a refined body font
4. Plan ONE memorable visual detail per page

## Token-First Styling (CRITICAL)

All styling MUST use theme tokens from design-tokens.json via CSS variables.
- Colors: Use Tailwind classes mapped to CSS vars (bg-primary, text-surface, etc.)
- Typography: Set font families in theme.css from tokens, reference via Tailwind
- Spacing: Use token-based spacing scale
- NO arbitrary colour values (no bg-[#1a1a2e], no text-[#e2e8f0])
- NO hardcoded hex values anywhere in components

## Aesthetic Guidelines

- Typography: Distinctive font pair loaded via Google Fonts CDN link in layout.tsx
- Color: Dominant theme colours with sharp accents. Cohesive, not timid.
- Motion: CSS transitions on interactive elements. One orchestrated page-load
  animation with staggered reveals. Hover states that delight.
- Backgrounds: Depth and atmosphere — gradient meshes, subtle textures,
  layered transparencies. Never flat solid backgrounds.
- Layout: At least one asymmetric or grid-breaking element per page.
  Generous negative space OR controlled density — pick one and commit.

## What to AVOID

- Generic system fonts (Inter, Roboto, Arial)
- Purple gradients on white (the quintessential AI slop look)
- Flat, solid-colour backgrounds with no depth
- Cookie-cutter card grids with no visual hierarchy
- Timid, evenly-distributed colour palettes

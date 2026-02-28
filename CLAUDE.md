# CLAUDE.md

This file provides guidance to Claude Code when working on child applications
created from the Portal v6 app template.

## Design Skills (READ BEFORE IMPLEMENTING)

This project includes two design skills that MUST guide all frontend work:

1. **frontend-design** (.claude/skills/frontend-design/SKILL.md)
   Enhanced design skill from Impeccable with 7 reference files covering typography,
   color, spatial design, motion, interaction, responsive design, and UX writing.
   Read the SKILL.md and consult relevant reference files before implementing.

2. **portal-theme** (.claude/skills/portal-theme/SKILL.md)
   Portal-specific constraints. ALL styling must use design tokens from
   public/design-tokens.json via CSS variables. Contains creative direction
   briefs for each Penpot theme. Check the anti-patterns list - these are
   build failures.

## Critical Design Constraints

## Project Structure

This is a Next.js 15 App Router template with:
- `src/app/` — App Router pages and API routes
- `src/components/` — React components
- `src/lib/` — Shared utilities and ecosystem client
- `src/styles/theme.css` — Design token CSS variables
- `public/design-tokens.json` — Theme tokens from Penpot

## Design Tokens

All styling MUST use theme tokens via Tailwind classes that reference CSS variables:
- Colors: `bg-primary`, `text-surface`, `bg-bg`, `text-muted`, etc.
- Typography: Font families defined in `theme.css`, applied via Tailwind
- Spacing: Token-based spacing scale
- **NO arbitrary color values** (no `bg-[#1a1a2e]`, no `text-[#e2e8f0]`)

## Google Fonts

Select 2 distinctive Google Fonts during Phase 2 (after reading design-tokens.json):
- One display/heading font (bold, distinctive character)
- One body/reading font (refined, readable)
- Add `<link>` import to `src/app/layout.tsx` (before closing `</head>`)
- Update font family tokens in `src/styles/theme.css`

**NEVER use Inter, Roboto, Arial, or system defaults.**

## UI Components (shadcn/ui)

Pre-installed shadcn/ui components are available in `src/components/ui/`:

| Component | Import | Use for |
|-----------|--------|---------|
| `Button` | `@/components/ui/button` | All interactive buttons (variants: default, outline, ghost, secondary, destructive, link) |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `@/components/ui/card` | Content containers, dashboard panels |
| `Badge` | `@/components/ui/badge` | Status labels, tags, counts |
| `Input` | `@/components/ui/input` | Text inputs, search fields |
| `Label` | `@/components/ui/label` | Form field labels |
| `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, etc. | `@/components/ui/select` | Dropdown selects |
| `Separator` | `@/components/ui/separator` | Horizontal/vertical dividers |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `@/components/ui/tabs` | Tabbed navigation |

All components use the project's CSS variable-based theme automatically (via `tailwind.config.ts` aliases).

Use the `cn()` utility from `@/lib/utils` for conditional class merging:
```typescript
import { cn } from "@/lib/utils";
```

**Prefer these components over custom HTML** — they handle accessibility, keyboard navigation, and theme consistency automatically.

## Ecosystem Integration

The template includes `src/lib/ecosystem.ts` (ecosystem client) and
`src/lib/ecosystem-init.ts` (initialization helper). These files are pre-included
for future ecosystem integration.

If this app publishes or consumes ecosystem streams:
1. Create `src/lib/ecosystem-manifest.ts` with stream declarations
2. Call `initEcosystem(ECOSYSTEM_MANIFEST)` in root layout server-side init
3. Use `ecosystem.publish()` and `ecosystem.read()` as needed

Environment variables are auto-injected by portal — DO NOT hardcode.

## Build Constraints

- App Router ONLY (no `pages/` directory)
- Theme tokens ONLY (no arbitrary colours)
- Environment variables for all external config
- DO NOT overwrite `src/app/globals.css` — append custom CSS to the bottom
- DO NOT overwrite `src/app/layout.tsx` — only add Navigation/Footer imports
- DO NOT overwrite `tailwind.config.ts`, `tsconfig.json`, or `next.config.ts`
- DO NOT run `create-next-app` — the repo is pre-scaffolded
- DO NOT run `npm install` or `npm ci` — dependencies are pre-installed

## Git Workflow

- All builds happen on feature branches (`build/{buildId}`)
- DO NOT merge — portal handles merge after human approval
- DO NOT run destructive git commands
- DO NOT delete or replace the `.git` directory

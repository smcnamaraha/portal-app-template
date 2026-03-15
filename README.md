# Portal v6 App Template

This is the base template for all Portal v6 child applications. Do not edit directly.

Apps are built from this template by the Portal build pipeline. Claude Code injects design tokens and implements features on top of this scaffold.

## Pre-installed UI Components

This template includes [shadcn/ui](https://ui.shadcn.com/) components built on Radix UI primitives. These provide accessible, unstyled interactive components that agents style with Tailwind.

**Available components:** Button, Card, Input, Label, Dialog, DropdownMenu, Select, Tabs, Badge, Separator, Skeleton, Toast, Tooltip

**Usage:** Import from `@/components/ui/button`, etc. The `cn()` utility at `@/lib/utils` merges Tailwind classes.

**Adding more components:** Run `npx shadcn@latest add [component-name]` to add additional components as needed during the build.

**Important:** AI agents should use these primitives for all interactive UI. Do NOT write custom modals, dropdowns, date pickers, or combo boxes from scratch.

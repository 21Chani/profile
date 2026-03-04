# Project Conventions

## File Naming
- **kebab-case** for all files and folders (e.g., `navbar.tsx`, `use-breakpoint.ts`)

## Folder Structure
```
src/
  global/          # Shared across the whole app
    components/    # Reusable global components
    hooks/         # Shared hooks
    lib/           # Shared utilities
  ui/              # Feature-specific UI
    components/    # Feature components
    hooks/         # Feature hooks
    lib/           # Feature utilities
```

## Stack
- React 19, TypeScript (strict), Vite 7
- Tailwind CSS v4 with @theme tokens (see src/index.css)
- @react-three/fiber for Three.js
- bun as package manager

## Styling
- Prefer Tailwind utility classes using theme tokens
- Terminal/HUD aesthetic with monospace fonts

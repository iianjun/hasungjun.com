# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio website built with TypeScript, following the Feature-Sliced Design (FSD) architecture. The site supports internationalization (i18n) with English and Korean locales and uses Redux Toolkit for state management.

## Development Commands

### Essential Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle (uses webpack with `--webpack` flag)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler type checking

### Pre-commit Workflow

The repository uses Husky pre-commit hooks that run:

1. `pnpm lint-staged` - Runs import sorting and Prettier on staged files
2. `pnpm lint` - Runs ESLint
3. `pnpm type-check` - Runs TypeScript type checking

All three must pass before commits are allowed.

## Architecture: Feature-Sliced Design (FSD)

The codebase follows FSD methodology with strict layer hierarchy. Layers are located in `src/`:

### Layer Structure (top to bottom dependency flow)

1. **app/** - Application initialization layer
   - `providers/` - React context providers (StoreProvider for Redux)
   - `store/` - Redux store configuration using `@reduxjs/toolkit`
   - `styles/` - Global CSS styles

2. **pages/** - Page composition layer (NOT Next.js pages)
   - Combines widgets and features into complete pages
   - Examples: `home/`, `messages/`, `resume/`

3. **widgets/** - Large, composite UI blocks
   - Examples: `dock/`, `message-panel/`
   - Typically contain multiple features and entities

4. **features/** - User interactions and business features
   - Each feature exports from `index.ts` (Public API pattern)
   - State management via Redux slices when needed
   - Examples: `dock-toggle/`, `message/`, `experience/`

5. **entities/** - Business entities
   - Examples: `locale/`, `resume/`, `message/`
   - Contain models, UI components, hooks, and config

6. **shared/** - Reusable utilities
   - `ui/` - UI components and icons
   - `lib/` - Utilities, hooks, i18n configuration
   - `config/` - Shared configuration

### FSD Rules

- Lower layers cannot import from higher layers
- Each feature/entity should have an `index.ts` that exports its Public API
- Cross-layer imports use path aliases: `@/layer-name/slice-name`

## Routing Structure

Next.js App Router is used with the following structure:

- `app/` - Contains Next.js routing files and configuration
- `app/(app)/` - Route group for main application routes
  - `page.tsx` - Home page
  - `about/` - About page route
  - `messages/` - Messages page route
  - `resume/` - Resume page route
- `app/layout.tsx` - Root layout with metadata, fonts, and providers
- `app/api/` - API routes

## Internationalization (i18n)

- Uses `next-intl` for i18n support
- Locales: English (`en`) and Korean (`ko`)
- Translation files: `messages/en.json`, `messages/ko.json`
- Configuration: `src/shared/lib/i18n/request.ts`
- Locale entity: `src/entities/locale/` handles locale detection and switching

## State Management

- Redux Toolkit (`@reduxjs/toolkit`) with React-Redux
- Store setup: `src/app/store/index.ts`
- Store provider: `src/app/providers/store-provider.tsx`
- Feature slices are defined in their respective feature directories
- Current slices: `dock` (dock visibility), `message` (message state)

## Styling

- Tailwind CSS v4 with `@tailwindcss/postcss`
- Prettier with `prettier-plugin-tailwindcss` for class sorting
- Custom fonts: Inter (sans), IBM Plex Mono (monospace)
- Utility function: `cn()` from `@/shared/lib` for conditional classes
- Global styles: `src/app/styles/globals.css`

## Build Configuration

### Next.js Config (`next.config.ts`)

- React Compiler enabled (`reactCompiler: true`)
- Turbopack for development with custom SVG loader
- SVG handling: SVGR webpack loader converts SVGs to React components
  - Import as component: `import Icon from './icon.svg'`
  - Import as URL: `import iconUrl from './icon.svg?url'`
- Custom `optimizePackageImports`: Auto-generates FSD layer imports for better tree-shaking
- Typed routes enabled (`typedRoutes: true`)

### TypeScript

- Path aliases: `@/*` maps to `./src/*`
- Target: ES2017
- JSX runtime: `react-jsx`

### ESLint

- Configuration: `eslint.config.mjs` (Flat config format)
- Uses Next.js core-web-vitals and TypeScript presets
- Custom rules:
  - `unused-imports/no-unused-imports`: error
  - `no-console`: error (allows warn, error, info, time, timeEnd, trace)
  - Unused vars must be prefixed with `_`

## Package Manager

- **Required**: pnpm 10.13.1+
- Node.js version: 22.x (specified in engines)
- Never use npm or yarn

## Code Quality Tools

- **Import sorting**: `import-sort-cli`
- **Formatting**: Prettier with Tailwind plugin
- **Type checking**: TypeScript strict mode
- **Linting**: ESLint with Next.js presets

## Key Dependencies

- **Framework**: Next.js 16.0.10, React 19.2.3
- **Styling**: Tailwind CSS 4, Framer Motion for animations
- **State**: Redux Toolkit, React-Redux
- **i18n**: next-intl
- **Utilities**: clsx, dayjs
- **PDF**: react-pdf
- **Email**: resend

## Important Notes

- SVG files are automatically converted to React components via SVGR
- The build uses webpack (not Turbopack for production) via `--webpack` flag
- Pre-commit hooks are strict and must pass for commits
- React strict mode is disabled (`reactStrictMode: false`)

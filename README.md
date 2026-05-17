# Oleo Kit Research

A technical Next.js site for the Oleo Kit concept: an RC boat that tows reusable oleophilic sponge modules through oil slicks. The site explains the research basis for sponge geometry, traversal strategy, fabrication routes, and recovery through squeezing and an output air knife.

## What The Site Covers

- **Oleo sponge shape:** an interactive Three.js model of a flattened puck, with KaTeX equations for uptake distance, capacity, surface area, and drag tradeoffs.
- **Path traversal:** a Three.js animation of a boat towing a shallow V or herringbone sponge array through an oil slick, using weighted coverage path logic instead of perimeter loops.
- **Fabrication research:** reticulated foam, SIS or silanization routes, cutting and sleeving methods, and prototype test metrics.
- **Recovery cycle:** a squeezer and air-knife scene for wringing absorbed oil and preparing the sponge for reuse.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS with shadcn/ui tokens
- Radix/shadcn base components
- Three.js for interactive technical scenes
- KaTeX for research formulas
- Lucide icons

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Useful Scripts

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm build` creates a production build and verifies the Next.js routes, including the app icon and web manifest routes.

## Project Structure

```text
app/
  icon.svg            Source app icon used by Next.js metadata routes
  apple-icon.png      Apple touch icon
  favicon.ico         Browser favicon
  manifest.ts         PWA manifest metadata
  globals.css         Theme tokens, layout utilities, and custom visual styles
  layout.tsx          Fonts, metadata, icon declarations, and app shell
  page.tsx            Main route

components/
  oleo-research-site.tsx  Research content, hamburger navigation, tab state
  three-scenes.tsx        Puck, boat traversal, and squeezer scenes
  ui/button.tsx           shadcn button component
```

## Navigation

The site uses a single animated hamburger menu for section navigation. The visible tab trigger stack was removed so mobile users do not lose vertical space to duplicated navigation. Menu links close the menu first, then scroll to the target with the sticky nav height accounted for.

## Icons And PWA Assets

The favicon and install icons use a circular oleo sponge mark. Assets include:

- `app/icon.svg`
- `app/favicon.ico`
- `app/apple-icon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/icon-maskable-512.png`

The manifest is generated from `app/manifest.ts`.

## Design Notes

The visual language is a technical research deck: restrained borders, grid fields, muted green and foam tones, compact labels, and high-contrast sponge/oil visuals. The interface avoids marketing-page structure and keeps the research content primary.

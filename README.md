# polis-blog

Personal blog built with Astro 5. Deployed at [blog.ismapolis.com](https://blog.ismapolis.com).

## Tech Stack

- **Astro 5** + **MDX** + **Tailwind CSS** + **TypeScript**
- **Content Collections** with Zod schemas for type-safe posts and finds
- **Playform/Compress** for CSS/image optimization at build time
- **Multi-stage Docker** build (Node → Nginx Alpine)
- **GitHub Actions** CI/CD: verify (lint → typecheck → build) → Docker push (ARM64)
- **Vitest** for unit tests, **Husky** + **lint-staged** for pre-commit hooks

## Quick Start

```bash
npm install
npm run dev          # Dev server at localhost:4321
npm run build        # Static build → dist/
npm run preview      # Preview production build
```

## Development Scripts

```bash
npm run lint         # ESLint (.js, .ts only — .astro validated by tsc)
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier write
npm run format:check # Prettier check
npm run type-check   # `astro check` (Astro-aware TS diagnostics)
npm run test         # Vitest watch mode
npm run test:run     # Vitest once (CI-friendly)
```

## Structure

```
src/content/posts/   # Blog posts (Markdown + frontmatter)
src/content/finds/   # "Relacionado" link cards (Markdown + frontmatter)
src/pages/           # Astro file-based routing
src/components/      # Reusable Astro + TS components
src/layouts/         # Layout wrappers
src/config.ts        # Site metadata — edit for customization
src/content.config.ts # Content collection schemas (Zod)
```

**Content schemas:**

- **Posts**: `{title, slug, author?, description, tags[], publicationDate, public?, editDate?}`
- **Finds**: `{title, link, description, type, publicationDate, public?}` — type is `video | article | book | website`

## Content Management

Posts and finds are plain Markdown files. Add a file to `src/content/posts/` or `src/content/finds/` with the required frontmatter fields. The `public` field defaults to `true`; set it to `false` to hide from listings.

## Docker

**Development** (hot reload, bind-mount content):

```bash
docker compose up
# → localhost:3000
```

**Production** (pre-built image from GitHub Actions):

```bash
# Uses docker-compose.prod.yaml or Arcane deployment
# Image: docker.io/ismapolis/polis-blog:latest
```

## CI/CD

Push to `main` triggers:

1. **Verify** — `lint` → `type-check` → `build`
2. **Docker build & push** — ARM64 image tagged with commit SHA + `latest`
3. **Build cache** pushed to registry for faster subsequent builds
4. Concurrent builds on the same branch are cancelled automatically

Requires secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD`.

## Theming

Colors are CSS custom properties in `tailwind.config.mjs`. Theme toggle persists to localStorage with system preference fallback. Dark/light `theme-color` meta tags update per scheme.

## License

MIT

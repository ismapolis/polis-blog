# AGENTS.md — polis-blog

Repo: Astro 5 static blog (Glyptodon theme). TypeScript + Tailwind CSS + MDX.

## Quick Commands

```bash
npm run dev          # Dev server at localhost:4321
npm run build        # Static build → dist/
npm run preview      # Preview prod build
npm run lint         # ESLint (.js,.ts,.astro)
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check
npm run type-check   # tsc --noEmit
npm run test         # Vitest watch
npm run test:run     # Vitest once (CI-friendly)
npm run test:coverage # Vitest + coverage
```

Pre-commit hooks (lint-staged):

- `*.{js,ts}` → `eslint --fix` + `prettier --write`
- `*.{json,md,yml,yaml,css,scss}` → `prettier --write`

## Structure

```
astro.config.mjs          # Integrations: sitemap, mdx, tailwind, playform/compress
tailwind.config.mjs       # Theme: CSS vars for all colors, typography scale, animations
src/config.ts             # Site metadata (title, url, author) — edit for customization
src/content.config.ts     # Astro content collections: posts + finds schemas
src/content/posts/        # Blog posts (Markdown)
src/content/finds/        # "Today I Found…" links (Markdown)
src/pages/                # Astro pages (routing = file-based)
src/components/           # Astro + TS components
src/layouts/              # Layout components
src/test/                 # Vitest setup + tests
public/                   # Static assets (favicons, manifest, sw.js)
```

Path aliases (tsconfig.json): `@content/*`, `@layouts/*`, `@components/*`, `@scripts/*`, `@styles/*`

## Gotchas

- **Dev port**: 4321. Docker maps `3000:4321`.
- **Docker volumes** (docker-compose.yaml): Mounts `../polis-blog-content/posts` and `../polis-blog-content/finds` for live content editing outside the repo.
- **Tests**: `src/test/setup.ts` mocks localStorage, matchMedia, IntersectionObserver, ResizeObserver. Currently **not wired into vitest.config.ts** — add `setupFiles` if writing new tests.
- **Content schemas**: Posts need `{title, slug, description, tags[], publicationDate, public?}`. Finds need `{title, link, description, type, publicationDate, public?}`. Type is `video|article|book|website`.
- **Astro types**: Generated at `.astro/types.d.ts`. Don't edit manually.
- **Build**: Multi-stage Docker — `node:20-bullseye` builder → `nginx:alpine` runtime serving `dist/`.
- **CI/CD**: Pushes to Docker Hub on `main` push, then dispatches `update-blog-image` event to `ismapolis/cluster-deployment` repo. Requires `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `REPO_DISPATCH_TOKEN` secrets.
- **Nginx**: SPA-style `try_files` fallback to `/index.html`. Assets/fonts served directly.
- **ESLint**: `.astro` files linted via `eslint-plugin-astro` but `astro.config.mjs` does not declare the ESLint integration — lint works because of the `--ext .astro` flag, not Astro's ESLint tooling.
- **Shiki**: Code highlighting theme is `material-theme-darker`.

# polis-blog

Personal blog built with 11ty v3. Deployed at [blog.ismapolis.com](https://blog.ismapolis.com).

## Tech Stack

- **11ty v3** (Eleventy) + **Liquid** templates
- **Content** stored as Markdown files with YAML frontmatter
- **markdown-it** for rendering, with syntax highlighting via `@11ty/eleventy-plugin-syntaxhighlight`
- **RSS** feeds via `@11ty/eleventy-plugin-rss`
- **Multi-stage Docker** build (Node → Nginx Alpine)
- **GitHub Actions** CI/CD: verify (lint → typecheck → build) → Docker push (ARM64)
- **Vitest** for unit tests, **Husky** + **lint-staged** for pre-commit hooks

## Quick Start

```bash
npm install
npm run dev          # Dev server at localhost:8080
npm run build        # Static build → _site/
npm run preview      # Preview production build
```

## Development Scripts

```bash
npm run lint         # ESLint (.js, .ts only)
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier write
npm run format:check # Prettier check
npm run type-check   # `tsc --noEmit`
npm run test         # Vitest watch mode
npm run test:run     # Vitest once (CI-friendly)
```

## Structure

```
_content/posts/     # Blog posts (Markdown + frontmatter)
_content/finds/     # "Relacionado" link cards (Markdown + frontmatter)
src/pages/          # 11ty pages (Liquid templates + Markdown)
src/_includes/      # Layouts, partials, CSS, JS
src/_data/          # Global data files (CommonJS .cjs)
eleventy.config.cjs # 11ty configuration
```

**Note:** Content is stored in `_content/` (root level), not `src/content/`, to prevent 11ty from processing it as templates.

### Content schemas

- **Posts**: `{title, slug, author?, description, tags[], publicationDate, public?, permalink, layout}`
- **Finds**: `{title, link, description, type, publicationDate, public?, permalink, layout}` — type is `video | article | book | website`

## Content Management

Posts and finds are plain Markdown files in `_content/posts/` and `_content/finds/`. Add a file with the required frontmatter fields:

- `public: false` hides the item from listings
- `permalink` defines the output URL
- `layout: base.liquid` wraps content in the site shell

Example post frontmatter:

```yaml
---
title: 'My Post Title'
slug: 'my-post-slug'
description: 'A short description'
tags: [tag1, tag2]
publicationDate: 2025-01-15
permalink: /posts/my-post-slug/
layout: base.liquid
---
Post content here...
```

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

Colors are CSS custom properties. Theme toggle persists to localStorage with system preference fallback. Dark/light `theme-color` meta tags update per scheme.

## Known Issues

- 11ty v3 has a bug in `TemplateMap.js:getTagTarget()` where it calls `.startsWith()` on non-string values during pagination. A patch in `node_modules/@11ty/eleventy/src/TemplateMap.js` adds a `typeof str !== "string"` guard. This is a temporary workaround until upstream fixes it.

## License

MIT

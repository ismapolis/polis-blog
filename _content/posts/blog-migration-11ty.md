---
title: 'Migración del blog a 11ty v3'
slug: 'blog-migration-11ty'
description: 'Migración del blog de Astro a 11ty v3. Documentación de la nueva arquitectura y flujo de trabajo.'
tags: [blog, devops]
publicationDate: 2025-08-27
permalink: /posts/blog-migration-11ty/
layout: base.liquid
---

# Migración a 11ty v3

El blog ha sido migrado de Astro 5 a [11ty v3](https://www.11ty.dev/) (Eleventy). Esta nota documenta los cambios principales y el flujo de trabajo actual para referencia futura.

## ¿Por qué 11ty?

Astro era excelente para sitios estáticos, pero 11ty ofrece un enfoque más programático y escalable para un blog personal:

- **Control total** sobre el pipeline de build sin abstracciones
- **Templates Liquid** simples y predecibles
- **Menos dependencias** — 11ty es esencialmente JavaScript puro
- **Build ultra-rápido** — sin framework pesado

## Arquitectura actual

```
_content/posts/     # Posts en Markdown con frontmatter YAML
_content/finds/     # Links curados
src/pages/          # Páginas estáticas (Liquid templates)
src/_includes/      # Layouts y partials Liquid
src/_data/          # Datos globales (CommonJS)
eleventy.config.cjs # Configuración de 11ty
```

Los archivos de contenido viven en `_content/` (raíz del proyecto) para evitar que 11ty los procese como templates. Cada post tiene frontmatter con `permalink` explícito.

## Flujo de trabajo

### 1. Crear un post nuevo

```markdown
---
title: 'Mi nuevo post'
slug: 'mi-nuevo-post'
description: 'Descripción breve'
tags: [tag1, tag2]
publicationDate: 2025-08-27
permalink: /posts/mi-nuevo-post/
layout: base.liquid
---

Contenido del post en Markdown...
```

Guardar en `_content/posts/` con extensión `.md`.

### 2. Build local

```bash
npm run build        # Genera _site/
npm run dev          # Dev server con hot-reload
npm run preview      # Vista previa del build
```

### 3. Deploy

```bash
git add . && git commit -m "feat: nuevo post"
git push origin main
```

El push a `main` dispara el workflow de GitHub Actions:

1. **Verify** — lint → type-check → build
2. **Docker build & push** — imagen ARM64 a Docker Hub
3. **Arcane** detecta la nueva imagen y redespliega automáticamente

## Notas técnicas

- **Templates**: Liquid (`.liquid`) para layouts y páginas
- **Markdown**: Procesado con `markdown-it` + `markdown-it-anchor`
- **Syntax highlighting**: `@11ty/eleventy-plugin-syntaxhighlight`
- **RSS**: `@11ty/eleventy-plugin-rss`
- **CSS**: Tailwind compilado a CSS plano, copiado vía `addPassthroughCopy`
- **Data layer**: Archivos `.cjs` en `_data/` con `__dirname` nativo (CommonJS)

## Imágenes del blog

El blog incluye imágenes en `public/assets/` referenciadas en los posts:

![Vista principal del blog](/assets/avatar.jpg)

_Avatar del autor en la página principal_

![Captura del blog en funcionamiento](/assets/arch-black.png)

_Vista del blog con tema oscuro_

# Glyptodon - Personal Astro Theme

A clean and modern, eco-friendly personal website theme built with [Astro](https://www.astro.build), featuring modern web technologies, performance optimizations, and excellent developer experience.

All dummy text is created by Claude AI to get a sense for what it looks like with content.

To see it in action, I use it for my own website at [www.timeaton.dev](https://www.timeaton.dev). Feel free to use and modify for your needs!

## Screenshots
![glyptodon-dark min](https://github.com/user-attachments/assets/49a9f63a-8002-4493-bf91-a54552c94998)
---
![glyptodon-post min](https://github.com/user-attachments/assets/08943779-5cc6-45bd-b396-dda19a0350bf)
---
![glyptodon-light min](https://github.com/user-attachments/assets/0b51d6e3-36e2-4e73-85d4-3c4fc3d6dbd8)

## ✨ Features

### 🎨 Design & UX
- **Responsive design** with modern CSS Grid and Flexbox
- **Manual dark/light mode toggle** with system preference fallback
- **Smooth animations** and micro-interactions
- **Accessibility-first** design with ARIA labels and keyboard navigation
- **Reduced motion support** for users with vestibular disorders
- **Modern scrollbar** styling
- **Loading states** and skeleton screens for better perceived performance

### 🚀 Performance & Modern Web
- **PWA support** with service worker for offline functionality
- **View Transitions API** for smooth page transitions
- **Lazy loading** for images and components
- **Core Web Vitals monitoring** with performance tracking
- **Structured data (JSON-LD)** for better SEO
- **Optimized bundle size** with compression
- **Modern CSS features** including container queries

### 🛠️ Development Experience
- **TypeScript** with strict configuration
- **Tailwind CSS** integration with custom theme
- **ESLint & Prettier** for code quality
- **Vitest** for unit testing with example tests
- **Husky** with pre-commit hooks
- **Hot reload** development server
- **Comprehensive scripts** for development workflow

### 📱 Content & SEO
- **Blog system** with MDX support
- **Content collections** for type-safe content
- **RSS feed** generation
- **Sitemap** generation
- **Open Graph** and Twitter Card support
- **Robots.txt** generation
- **Microblog for found links** (Today I Found...)
- **About and Now pages**

## 🏗️ Architecture

- **Astro 5.12+** for static site generation
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety
- **Content Collections** for structured content
- **Service Worker** for PWA functionality
- **Modern ES Modules** throughout

## 🚀 Getting Started

1. **Clone and install dependencies:**

```bash
git clone <your-repo>
cd glyptodon
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

3. **Build for production:**

```bash
npm run build
```

4. **Preview production build:**

```bash
npm run preview
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage
```

## 🎨 Customization

### Basic Configuration
- Edit `src/config.ts` for site metadata
- Update `public/site.webmanifest` for PWA settings
- Modify `tailwind.config.mjs` for theme customization

### Content
- Add blog posts in `src/content/posts/`
- Add finds in `src/content/finds/`
- Update pages in `src/pages/`

### Styling
- Global styles in `src/styles/global.css`
- Component-specific styles in each component
- Tailwind classes for utility styling

### Components
- Layout components in `src/layouts/`
- UI components in `src/components/`
- All components are TypeScript and fully typed

## 🎯 Performance

This theme is optimized for performance:

- **Lighthouse Score**: A+ (95+ across all metrics)
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Minimal with tree-shaking
- **Caching**: Service worker for offline support
- **Images**: Lazy loading and optimization
- **Fonts**: System fonts with fallbacks

## 🔧 Advanced Features

### PWA Support
- Service worker for offline functionality
- Web app manifest with shortcuts
- Installable on mobile devices
- Background sync capabilities

### SEO Optimization
- Structured data for search engines
- Open Graph and Twitter Card meta tags
- Sitemap generation
- Robots.txt configuration

### Performance Monitoring
- Core Web Vitals tracking
- Resource timing monitoring
- Navigation timing analysis
- Development console logging

## 🎨 Color System

The colors were chosen using several tools to ensure accessibility and contrast:

- **Color Scheme Generator**: https://colorffy.com/color-scheme-generator
- **Accessibility Checker**: https://www.learnui.design/tools/accessible-color-generator.html
- **Gradient Generator**: https://colorffy.com/mesh-gradient-generator

All colors are CSS custom properties for easy theming.

## 📄 License

MIT License - feel free to use this theme for your personal website!

## 🙏 Credits

- **Built by**: Tim Eaton - [timeaton.dev](https://timeaton.dev)
- **Avatar**: Anonymous by maniskis12 on Freeimages.com
- **Content**: Dummy text and posts generated with Claude AI
- **Icons**: Lucide Icons (via Tailwind CSS)
- **Fonts**: System fonts with Inter fallback

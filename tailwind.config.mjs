/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'text-base': 'var(--color-text-base)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)',
        'card-muted': 'var(--color-card-muted)',
        border: 'var(--color-border)',
        'button-primary': 'var(--color-button-primary)',
        'button-primary-hover': 'var(--color-button-primary-hover)',
        'button-border': 'var(--color-button-border)',
        'list-video': 'var(--color-list-video)',
        'list-article': 'var(--color-list-article)',
        'list-website': 'var(--color-list-website)',
        'list-book': 'var(--color-list-book)',
        link: 'var(--color-link)',
        'link-bg': 'var(--color-link-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'step--2': 'var(--step--2)',
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

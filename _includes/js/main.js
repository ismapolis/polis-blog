// Theme Toggle
class ThemeToggle {
  constructor() {
    this.button = document.getElementById('theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  init() {
    this.setTheme(this.currentTheme);

    this.button?.addEventListener('click', () => {
      this.toggleTheme();
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }
}

// Lazy Image
class LazyImage {
  constructor() {
    this.images = document.querySelectorAll(
      '.lazy-image:not([loading="eager"])'
    );
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    this.images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    const alt = img.dataset.alt;

    if (src) {
      img.src = src;
      if (alt) img.alt = alt;

      img.onload = () => {
        img.classList.add('loaded');
      };

      img.onerror = () => {
        // Silent fallback: image already shows as loaded
        img.classList.add('loaded');
      };
    }
  }

  loadAllImages() {
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Scroll To Top
class ScrollToTop {
  constructor() {
    this.button = document.getElementById('scroll-to-top');
    this.scrollThreshold = 300;
    this.init();
  }

  init() {
    if (!this.button) return;

    window.addEventListener('scroll', () => {
      this.toggleVisibility();
    });

    this.button.addEventListener('click', () => {
      this.scrollToTop();
    });

    this.button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.scrollToTop();
      }
    });
  }

  toggleVisibility() {
    if (!this.button) return;

    const isVisible = window.scrollY > this.scrollThreshold;

    if (isVisible) {
      this.button.classList.add('visible');
      this.button.style.display = 'flex';
    } else {
      this.button.classList.remove('visible');
      setTimeout(() => {
        if (window.scrollY <= this.scrollThreshold) {
          this.button.style.display = 'none';
        }
      }, 300);
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// Header Hamburger
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  hamburger?.addEventListener('click', e => {
    e.stopPropagation();
    menu?.classList.toggle('active');
  });

  document.addEventListener('click', event => {
    const target = event.target;
    if (!target) return;

    if (!target.closest('.nav') && !target.closest('.hamburger')) {
      menu?.classList.remove('active');
    }
  });
}

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          // SW registered successfully
        })
        .catch(() => {
          // SW registration failed silently
        });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
  new LazyImage();
  new ScrollToTop();
  initHamburger();
  registerServiceWorker();
});

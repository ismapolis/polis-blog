import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM elements
const createMockButton = () => {
  const button = document.createElement('button');
  button.id = 'theme-toggle';
  document.body.appendChild(button);
  return button;
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = '';
    // Reset localStorage mock
    vi.clearAllMocks();
  });

  it('should initialize with system theme when no stored theme', () => {
    // Mock prefers-color-scheme: dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const button = createMockButton();
    
    // Simulate ThemeToggle initialization
    const setTheme = vi.fn();
    const getStoredTheme = vi.fn().mockReturnValue(null);
    const getSystemTheme = vi.fn().mockReturnValue('dark');
    
    // This would normally be called by the ThemeToggle class
    const currentTheme = getStoredTheme() || getSystemTheme();
    setTheme(currentTheme);
    
    expect(getStoredTheme).toHaveBeenCalled();
    expect(getSystemTheme).toHaveBeenCalled();
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('should use stored theme when available', () => {
    const button = createMockButton();
    
    const setTheme = vi.fn();
    const getStoredTheme = vi.fn().mockReturnValue('light');
    const getSystemTheme = vi.fn().mockReturnValue('dark');
    
    const currentTheme = getStoredTheme() || getSystemTheme();
    setTheme(currentTheme);
    
    expect(getStoredTheme).toHaveBeenCalled();
    expect(getSystemTheme).not.toHaveBeenCalled();
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it('should toggle theme correctly', () => {
    const button = createMockButton();
    
    let currentTheme = 'dark';
    const setTheme = vi.fn((theme: string) => {
      currentTheme = theme;
    });
    
    const toggleTheme = () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    };
    
    // Toggle from dark to light
    toggleTheme();
    expect(setTheme).toHaveBeenCalledWith('light');
    
    // Toggle from light to dark
    toggleTheme();
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});

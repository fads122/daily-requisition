import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  // Signal to track dark mode state - initialize with false for SSR safety
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Initialize theme in browser environment only
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Set initial theme from storage or system preference
      const initialTheme = this.getInitialTheme();
      this.isDarkMode.set(initialTheme);
      this.applyTheme(initialTheme);

      // Watch for theme changes and apply them
      effect(() => {
        const isDark = this.isDarkMode();
        this.applyTheme(isDark);
        this.saveTheme(isDark);
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(mode => !mode);
  }

  private getInitialTheme(): boolean {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false; // Default to light mode for SSR
    }

    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === this.DARK_THEME;
    }

    // Check system preference
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Default to light mode
    return false;
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add(this.DARK_THEME);
        html.classList.remove(this.LIGHT_THEME);
      } else {
        html.classList.add(this.LIGHT_THEME);
        html.classList.remove(this.DARK_THEME);
      }
    }
  }

  private saveTheme(isDark: boolean): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, isDark ? this.DARK_THEME : this.LIGHT_THEME);
    }
  }
}

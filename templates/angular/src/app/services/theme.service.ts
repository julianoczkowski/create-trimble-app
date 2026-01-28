import { Injectable, signal } from '@angular/core';

export type ThemeName = 'modus-classic' | 'modus-modern' | 'connect';
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  theme: ThemeName;
  mode: ThemeMode;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'modus-theme-config';

  // Current theme state
  private _theme = signal<ThemeName>('modus-modern');
  private _mode = signal<ThemeMode>('light');

  // Public signals for components to react to
  readonly theme = this._theme.asReadonly();
  readonly mode = this._mode.asReadonly();

  constructor() {
    this.loadTheme();
    this.watchSystemTheme();
  }

  /**
   * Initialize theme from localStorage or use default
   */
  private loadTheme(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const config: ThemeConfig = JSON.parse(stored);
        this.setTheme(config.theme, config.mode);
        return;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }

    // Default theme
    this.setTheme('modus-modern', 'light');
  }

  /**
   * Watch system theme preference and update if user hasn't set a preference
   */
  private watchSystemTheme(): void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Only apply system theme if no user preference is stored
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this._mode.set(e.matches ? 'dark' : 'light');
        this.updateThemeAttributes();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
  }

  /**
   * Set theme and mode
   */
  setTheme(theme: ThemeName, mode?: ThemeMode): void {
    this._theme.set(theme);
    if (mode) {
      this._mode.set(mode);
    }
    this.updateThemeAttributes();
    this.saveTheme();
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    this._mode.set(this._mode() === 'light' ? 'dark' : 'light');
    this.updateThemeAttributes();
    this.saveTheme();
  }

  /**
   * Set theme name
   */
  setThemeName(theme: ThemeName): void {
    this._theme.set(theme);
    this.updateThemeAttributes();
    this.saveTheme();
  }

  /**
   * Set mode
   */
  setMode(mode: ThemeMode): void {
    this._mode.set(mode);
    this.updateThemeAttributes();
    this.saveTheme();
  }

  /**
   * Update HTML attributes for theme
   * This matches the behavior of modus-wc-theme-provider
   */
  private updateThemeAttributes(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const theme = this._theme();
    const mode = this._mode();

    // Update data-theme attribute (e.g., "modus-modern-light")
    // This matches how modus-wc-theme-provider sets it
    root.setAttribute('data-theme', `${theme}-${mode}`);
    root.setAttribute('data-mode', mode);

    // Update class for light/dark
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(): void {
    try {
      const config: ThemeConfig = {
        theme: this._theme(),
        mode: this._mode(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Get full theme name (e.g., "modus-modern-light")
   */
  getFullThemeName(): string {
    return `${this._theme()}-${this._mode()}`;
  }

  /**
   * Get current theme config
   */
  getThemeConfig(): ThemeConfig {
    return {
      theme: this._theme(),
      mode: this._mode(),
    };
  }
}

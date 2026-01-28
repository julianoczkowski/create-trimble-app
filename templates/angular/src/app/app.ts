import { Component, OnInit, computed, signal, effect } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  ModusNavbarComponent,
  ModusDropdownMenuComponent,
  ModusMenuComponent,
  ModusMenuItemComponent,
  ModusButtonComponent,
  type INavbarUserCard,
} from './components';
import { ThemeService, type ThemeName, type ThemeMode } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ModusNavbarComponent,
    ModusDropdownMenuComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
    ModusButtonComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('angular-vite');

  // User card data for navbar
  readonly userCard: INavbarUserCard = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarSrc: 'https://via.placeholder.com/64',
    avatarAlt: 'User avatar',
  };

  // Theme state from service
  readonly currentTheme = computed(() => this.themeService.theme());
  readonly currentMode = computed(() => this.themeService.mode());

  // Search input state
  readonly searchInputOpen = signal(false);

  constructor(private themeService: ThemeService) {
    // React to theme changes
    effect(() => {
      this.themeService.theme();
      this.themeService.mode();
    });
  }

  ngOnInit(): void {
    // Initialize theme service - this will load theme from localStorage
    // and apply it to the document
    this.themeService.getThemeConfig();
  }

  onButtonClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Button clicked!', event);
  }

  /**
   * Handle search button click - toggle search input manually
   */
  onSearchClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Search button clicked, toggling');
    // Toggle the search input state
    this.searchInputOpen.set(!this.searchInputOpen());
  }

  /**
   * Handle search input open state change - sync our state with navbar
   */
  onSearchInputOpenChange(isOpen: boolean): void {
    console.log('Search input open changed to:', isOpen);
    // Keep state in sync
    if (this.searchInputOpen() !== isOpen) {
      this.searchInputOpen.set(isOpen);
    }
  }

  /**
   * Handle search input value change
   */
  onSearchChange(event: { value: string }): void {
    console.log('Search value:', event.value);
  }

  /**
   * Handle theme selection from dropdown menu
   * Parses values like "modus-classic-light", "modus-modern-dark", "connect-light"
   */
  onThemeSelect(value: string): void {
    // Split by '-' and take the last part as mode, rest as theme
    const parts = value.split('-');
    if (parts.length < 2) {
      console.warn('Invalid theme value:', value);
      return;
    }

    const mode = parts[parts.length - 1] as ThemeMode;
    const theme = parts.slice(0, -1).join('-') as ThemeName;

    if (theme && mode && (mode === 'light' || mode === 'dark')) {
      this.themeService.setTheme(theme, mode);
    } else {
      console.warn('Invalid theme or mode:', { theme, mode, value });
    }
  }

  /**
   * Check if a theme-mode combination is currently selected
   */
  isThemeSelected(theme: ThemeName, mode: ThemeMode): boolean {
    return this.currentTheme() === theme && this.currentMode() === mode;
  }

  /**
   * Get display label for theme
   */
  getThemeLabel(theme: ThemeName): string {
    switch (theme) {
      case 'modus-classic':
        return 'Modus Classic';
      case 'modus-modern':
        return 'Modus Modern';
      case 'connect':
        return 'Connect';
      default:
        return theme;
    }
  }

  /**
   * Get display label for current theme (theme + mode)
   * Matches React version format: "Classic Light", "Modern Dark", etc.
   */
  getCurrentThemeLabel(): string {
    const theme = this.currentTheme();
    const mode = this.currentMode();

    // Short theme labels to match React version
    let themeLabel: string;
    switch (theme) {
      case 'modus-classic':
        themeLabel = 'Classic';
        break;
      case 'modus-modern':
        themeLabel = 'Modern';
        break;
      case 'connect':
        themeLabel = 'Connect';
        break;
      default:
        themeLabel = theme;
    }

    const modeLabel = mode === 'light' ? 'Light' : 'Dark';

    return `${themeLabel} ${modeLabel}`;
  }
}

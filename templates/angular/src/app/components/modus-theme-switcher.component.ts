import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcThemeSwitcher } from '@trimble-oss/moduswebcomponents-angular';
import { ThemeMode, ThemeName, ThemeConfig } from '../services/theme.service';

/**
 * Angular wrapper component for Modus Theme Switcher.
 *
 * A component that allows users to toggle between light and dark themes.
 */
@Component({
  selector: 'modus-theme-switcher',
  standalone: true,
  imports: [CommonModule, ModusWcThemeSwitcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-theme-switcher
      [customClass]="className()"
      [attr.aria-label]="ariaLabel()"
      (themeChange)="onThemeChange($event)"
    ></modus-wc-theme-switcher>
  `,
})
export class ModusThemeSwitcherComponent {
  /** Custom CSS class applied to the theme switcher element. */
  readonly className = input<string | undefined>();

  /** Accessible label for the theme switcher */
  readonly ariaLabel = input<string | undefined>('Toggle theme');

  /** Event emitted when theme is changed */
  readonly themeChange = output<ThemeConfig>();

  onThemeChange(event: Event): void {
    const customEvent = event as CustomEvent<{ theme: string; mode: string }>;
    if (customEvent && customEvent.detail) {
      // The event detail contains { theme, mode }
      const config: ThemeConfig = {
        theme: customEvent.detail.theme as ThemeName,
        mode: customEvent.detail.mode as ThemeMode,
      };
      this.themeChange.emit(config);
    }
  }
}

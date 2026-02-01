import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService, ThemeMode, ThemeName } from '../../services/theme.service';
import { ModusDropdownMenuComponent } from '../../components/modus-dropdown-menu.component';
import { ModusMenuComponent } from '../../components/modus-menu.component';
import { ModusMenuItemComponent } from '../../components/modus-menu-item.component';

interface ThemeOption {
  value: string;
  label: string;
  description: string;
}

/**
 * Theme switcher dropdown for the Dev Panel.
 *
 * Provides a dropdown menu with all 6 Modus themes:
 * - Classic Light/Dark
 * - Modern Light/Dark
 * - Connect Light/Dark
 */
@Component({
  selector: 'app-theme-switcher-dropdown',
  standalone: true,
  imports: [ModusDropdownMenuComponent, ModusMenuComponent, ModusMenuItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-dropdown-menu
      buttonAriaLabel="Theme selection menu"
      [buttonColor]="'tertiary'"
      [buttonVariant]="'filled'"
      [menuPlacement]="'bottom-end'"
    >
      <div slot="button" class="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2">
        <div class="flex-1 text-left text-base font-medium">
          {{ getCurrentThemeLabel() }}
        </div>
        <i class="modus-icons text-base shrink-0">expand_more</i>
      </div>
      <div slot="menu">
        <modus-menu>
          @for (theme of themes; track theme.value) {
            <modus-menu-item
              [label]="theme.label"
              [value]="theme.value"
              [selected]="isThemeSelected(theme.value)"
              (itemSelect)="onThemeSelect(theme.value)"
            />
          }
        </modus-menu>
      </div>
    </modus-dropdown-menu>
  `,
})
export class ThemeSwitcherDropdownComponent {
  private readonly themeService = inject(ThemeService);

  readonly currentTheme = computed(() => this.themeService.theme());
  readonly currentMode = computed(() => this.themeService.mode());

  readonly themes: ThemeOption[] = [
    {
      value: 'modus-classic-light',
      label: 'Classic Light',
      description: 'Traditional light theme',
    },
    {
      value: 'modus-classic-dark',
      label: 'Classic Dark',
      description: 'Traditional dark theme',
    },
    {
      value: 'modus-modern-light',
      label: 'Modern Light',
      description: 'Contemporary light theme',
    },
    {
      value: 'modus-modern-dark',
      label: 'Modern Dark',
      description: 'Contemporary dark theme',
    },
    {
      value: 'connect-light',
      label: 'Connect Light',
      description: 'Connect light theme',
    },
    {
      value: 'connect-dark',
      label: 'Connect Dark',
      description: 'Connect dark theme',
    },
  ];

  getCurrentThemeLabel(): string {
    const theme = this.currentTheme();
    const mode = this.currentMode();

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

  isThemeSelected(value: string): boolean {
    const fullTheme = `${this.currentTheme()}-${this.currentMode()}`;
    return fullTheme === value;
  }

  onThemeSelect(value: string): void {
    const parts = value.split('-');
    if (parts.length < 2) {
      return;
    }

    const mode = parts[parts.length - 1] as ThemeMode;
    const theme = parts.slice(0, -1).join('-') as ThemeName;

    if (theme && mode && (mode === 'light' || mode === 'dark')) {
      this.themeService.setTheme(theme, mode);
    }
  }
}

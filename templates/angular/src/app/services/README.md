# Theme Service

The `ThemeService` manages Modus theme switching in the Angular application.

## Features

- **Theme Management**: Switch between Modus Classic, Modern, and Connect themes
- **Mode Toggle**: Toggle between light and dark modes
- **Persistence**: Theme preferences are saved to localStorage
- **System Theme Detection**: Automatically detects and applies system theme preference if no user preference is set
- **Reactive**: Uses Angular signals for reactive theme updates

## Available Themes

- `modus-classic` (Classic theme)
- `modus-modern` (Modern theme)
- `connect` (Connect theme)

Each theme supports both `light` and `dark` modes.

## Usage

```typescript
import { ThemeService } from './services/theme.service';

export class MyComponent {
  constructor(private themeService: ThemeService) {
    // Get current theme
    const theme = this.themeService.theme();
    const mode = this.themeService.mode();
    
    // Set theme
    this.themeService.setTheme('modus-modern', 'dark');
    
    // Toggle mode
    this.themeService.toggleMode();
    
    // Set theme name only
    this.themeService.setThemeName('modus-classic');
    
    // Set mode only
    this.themeService.setMode('light');
  }
}
```

## Theme Service API

- `theme: Signal<ThemeName>` - Current theme name signal
- `mode: Signal<ThemeMode>` - Current mode signal
- `setTheme(theme: ThemeName, mode?: ThemeMode): void` - Set theme and mode
- `setThemeName(theme: ThemeName): void` - Set theme name
- `setMode(mode: ThemeMode): void` - Set mode
- `toggleMode(): void` - Toggle between light and dark
- `getThemeConfig(): ThemeConfig` - Get current theme configuration
- `getFullThemeName(): string` - Get full theme name (e.g., "modus-modern-light")


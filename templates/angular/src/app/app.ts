import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { DevPanelService, DevPanelComponent } from './dev';

/**
 * Main Application Component.
 *
 * Structure:
 * - Router outlet for application pages
 * - DevPanel (floating, development-only)
 *
 * Getting Started:
 * 1. Edit src/app/pages/home/home.component.ts for your landing page
 * 2. Add new pages in src/app/pages/
 * 3. Add routes in src/app/app.routes.ts
 * 4. Use Ctrl+Shift+D to open the Dev Panel for component reference
 *
 * The Dev Panel provides access to:
 * - Theme switcher (6 Modus themes)
 * - Color palette reference
 * - Icon library browser
 * - Component demos
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevPanelComponent],
  template: `
    <router-outlet />
    @if (devPanelService.isEnabled()) {
      <app-dev-panel />
    }
  `,
  host: {
    class: 'min-h-screen flex flex-col',
  },
})
export class App implements OnInit {
  readonly devPanelService = inject(DevPanelService);
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize theme service - this will load theme from localStorage
    // and apply it to the document
    this.themeService.getThemeConfig();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusThemeSwitcherComponent } from '../../components/modus-theme-switcher.component';

/**
 * Demo page showcasing the Modus Theme Switcher component.
 *
 * Demonstrates theme switching functionality including:
 * - Basic theme toggle between light and dark modes
 * - System preference detection
 * - Theme change event handling
 */
@Component({
  selector: 'app-theme-switcher-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <demo-page
      title="Modus Theme Switcher"
      description="The theme switcher toggles between Modus light and dark modes. Place it in the header or settings where users expect personalization controls."
      [showBackButton]="false"
    >
      <demo-example
        title="Theme toggle"
        description="Use the default configuration to respect system preferences and allow quick switching."
      >
        <div class="flex items-center gap-4">
          <modus-theme-switcher [ariaLabel]="'Switch theme'" />
          <div class="text-sm text-foreground-80">Toggle between light and dark experiences.</div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ThemeSwitcherDemoPageComponent {}

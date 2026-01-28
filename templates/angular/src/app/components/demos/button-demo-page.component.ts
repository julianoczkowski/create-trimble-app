import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusButtonComponent } from '../modus-button.component';

/**
 * Demo page showcasing the Modus Button component.
 *
 * Demonstrates all button features including:
 * - Variants (primary, secondary, tertiary, warning, danger)
 * - Styles (filled, outlined, borderless)
 * - Sizes (xs, sm, md, lg)
 * - Icons (left, right, only positions)
 * - States (normal, disabled, pressed, fullWidth)
 * - Interactive examples with event handling
 */
@Component({
  selector: 'app-button-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusButtonComponent],
  template: `
    <demo-page
      title="Modus Button"
      description="Buttons trigger actions and provide clear call-to-action elements. Use primary buttons for the main action, secondary for supporting actions, and tertiary for subtle actions."
    >
      <demo-example
        title="Button Variants"
        description="Different button styles for various use cases and visual hierarchy."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button color="primary">Primary</modus-button>
          <modus-button color="secondary">Secondary</modus-button>
          <modus-button color="tertiary">Tertiary</modus-button>
          <modus-button color="warning">Warning</modus-button>
          <modus-button color="danger">Danger</modus-button>
        </div>
      </demo-example>

      <demo-example
        title="Button Styles"
        description="Different visual styles to match your design needs."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button variant="filled">Filled</modus-button>
          <modus-button variant="outlined">Outlined</modus-button>
          <modus-button variant="borderless">Borderless</modus-button>
        </div>
      </demo-example>

      <demo-example
        title="Button Sizes"
        description="Various sizes for different contexts and touch targets."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-button size="xs">Extra Small</modus-button>
          <modus-button size="sm">Small</modus-button>
          <modus-button size="md">Medium</modus-button>
          <modus-button size="lg">Large</modus-button>
        </div>
      </demo-example>

      <demo-example
        title="Buttons with Icons"
        description="Enhance buttons with icons for better visual communication."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button icon="save_disk" iconPosition="left">Save File</modus-button>
          <modus-button icon="download" iconPosition="right">Download</modus-button>
          <modus-button icon="settings" iconPosition="only" ariaLabel="Settings" />
        </div>
      </demo-example>

      <demo-example
        title="Button Icon Sizes"
        description="Icon sizes automatically adapt to button size, or can be explicitly controlled."
      >
        <div class="space-y-6">
          <!-- Automatic sizing based on button size -->
          <div>
            <h4 class="text-base font-semibold mb-3">Automatic Icon Sizing (by Button Size)</h4>
            <div class="flex flex-wrap items-center gap-4">
              <modus-button size="xs" icon="star" iconPosition="left">Extra Small</modus-button>
              <modus-button size="sm" icon="star" iconPosition="left">Small</modus-button>
              <modus-button size="md" icon="star" iconPosition="left">Medium</modus-button>
              <modus-button size="lg" icon="star" iconPosition="left">Large</modus-button>
            </div>
          </div>

          <!-- Icon-only buttons with automatic sizing -->
          <div>
            <h4 class="text-base font-semibold mb-3">Icon-Only Buttons (Automatic Sizing)</h4>
            <div class="flex flex-wrap items-center gap-4">
              <modus-button
                size="xs"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (XS)"
              />
              <modus-button
                size="sm"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (SM)"
              />
              <modus-button
                size="md"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (MD)"
              />
              <modus-button
                size="lg"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (LG)"
              />
            </div>
          </div>

          <!-- Custom icon sizes -->
          <div>
            <h4 class="text-base font-semibold mb-3">Custom Icon Sizes (Explicit Control)</h4>
            <div class="flex flex-wrap items-center gap-4">
              <modus-button icon="star" iconSize="text-xs" iconPosition="left"
                >Tiny Icon</modus-button
              >
              <modus-button icon="star" iconSize="text-sm" iconPosition="left"
                >Small Icon</modus-button
              >
              <modus-button icon="star" iconSize="text-lg" iconPosition="left"
                >Large Icon</modus-button
              >
              <modus-button icon="star" iconSize="text-2xl" iconPosition="left"
                >XL Icon</modus-button
              >
            </div>
          </div>

          <!-- Mixed sizes for comparison -->
          <div>
            <h4 class="text-base font-semibold mb-3">Size Comparison</h4>
            <div class="flex flex-wrap items-center gap-4">
              <modus-button size="lg" icon="download" iconSize="text-sm" iconPosition="left"
                >Large Button, Small Icon</modus-button
              >
              <modus-button size="sm" icon="download" iconSize="text-xl" iconPosition="left"
                >Small Button, Large Icon</modus-button
              >
              <modus-button
                size="md"
                icon="check_circle"
                iconSize="text-3xl"
                iconPosition="only"
                ariaLabel="Success (Huge Icon)"
              />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Icon Sizes"
        description="Different icon sizes using Modus font scale for various contexts."
      >
        <div class="flex flex-wrap items-center gap-6">
          <!-- Micro icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xs">star</i>
            <span class="text-xs text-muted-foreground">2xs (8px)</span>
          </div>

          <!-- Small icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-xs">star</i>
            <span class="text-xs text-muted-foreground">xs (10px)</span>
          </div>

          <!-- Secondary icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-sm">star</i>
            <span class="text-xs text-muted-foreground">sm (12px)</span>
          </div>

          <!-- Base icons (Modus default) -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-base">star</i>
            <span class="text-xs text-muted-foreground">base (14px)</span>
          </div>

          <!-- Standard icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-lg">star</i>
            <span class="text-xs text-muted-foreground">lg (16px)</span>
          </div>

          <!-- Large icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-xl">star</i>
            <span class="text-xs text-muted-foreground">xl (18px)</span>
          </div>

          <!-- Prominent icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl">star</i>
            <span class="text-xs text-muted-foreground">2xl (20px)</span>
          </div>

          <!-- Display icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-3xl">star</i>
            <span class="text-xs text-muted-foreground">3xl (24px)</span>
          </div>

          <!-- Hero icons -->
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-4xl">star</i>
            <span class="text-xs text-muted-foreground">4xl (30px)</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Colored Icons"
        description="Icons with different semantic colors from the 9-color design system."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl text-primary">info</i>
            <span class="text-xs text-muted-foreground">Primary</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl text-success">check_circle</i>
            <span class="text-xs text-muted-foreground">Success</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl text-warning">warning</i>
            <span class="text-xs text-muted-foreground">Warning</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl text-destructive">alert</i>
            <span class="text-xs text-muted-foreground">Error</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <i class="modus-icons text-2xl text-muted-foreground">help</i>
            <span class="text-xs text-muted-foreground">Muted</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Button States"
        description="Different states to communicate interaction feedback."
      >
        <div class="flex flex-wrap gap-4">
          <modus-button>Normal</modus-button>
          <modus-button [disabled]="true">Disabled</modus-button>
          <modus-button [pressed]="true">Pressed</modus-button>
          <modus-button [fullWidth]="true">Full Width</modus-button>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Click the button to see event handling in action."
      >
        <div class="p-6 rounded-lg bg-card text-card-foreground border-default">
          <div class="text-lg mb-4 text-card-foreground">
            Click the button to see the event handler in action:
          </div>
          <modus-button color="primary" icon="add" (buttonClick)="handleButtonClick()">
            Click Me
          </modus-button>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ButtonDemoPageComponent {
  /**
   * Handles button click events for the interactive example.
   */
  handleButtonClick(): void {
    alert('Button clicked!');
  }
}

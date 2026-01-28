import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusIconComponent } from '../modus-icon.component';

/**
 * Demo page showcasing the Modus Icon component.
 *
 * Demonstrates icon features including:
 * - Icon variants (outlined, solid)
 * - Icon sizes
 * - Icon colors
 * - Accessibility features
 * - Custom styling
 */
@Component({
  selector: 'app-icon-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusIconComponent],
  template: `
    <demo-page
      title="Modus Icon"
      description="Icons provide visual communication and enhance user understanding. Use icons consistently to reinforce meaning and improve usability."
    >
      <demo-example
        title="Icon Variants"
        description="Icons come in two variants: outlined (default) and solid."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="alert" variant="outlined" size="lg" />
            <span class="text-sm text-muted-foreground">Outlined</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="alert" variant="solid" size="lg" />
            <span class="text-sm text-muted-foreground">Solid</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="check_circle" variant="outlined" size="lg" />
            <span class="text-sm text-muted-foreground">Outlined</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="check_circle" variant="solid" size="lg" />
            <span class="text-sm text-muted-foreground">Solid</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="info" variant="outlined" size="lg" />
            <span class="text-sm text-muted-foreground">Outlined</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="info" variant="solid" size="lg" />
            <span class="text-sm text-muted-foreground">Solid</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Icon Sizes"
        description="Different icon sizes using the Modus font scale."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="sm" />
            <span class="text-xs text-muted-foreground">Small (sm)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="md" />
            <span class="text-xs text-muted-foreground">Medium (md)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="star" size="lg" />
            <span class="text-xs text-muted-foreground">Large (lg)</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Icon Colors"
        description="Icons with different semantic colors from the design system."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="info" size="lg" className="text-primary" />
            <span class="text-xs text-muted-foreground">Primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="check_circle" size="lg" className="text-success" />
            <span class="text-xs text-muted-foreground">Success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="warning" size="lg" className="text-warning" />
            <span class="text-xs text-muted-foreground">Warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="alert" size="lg" className="text-destructive" />
            <span class="text-xs text-muted-foreground">Error</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="help" size="lg" className="text-muted-foreground" />
            <span class="text-xs text-muted-foreground">Muted</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Accessibility"
        description="Icons with proper accessibility attributes for screen readers."
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <modus-icon
              name="accessibility_circle"
              variant="solid"
              size="md"
              [decorative]="false"
              ariaLabel="Accessibility features"
            />
            <span class="text-sm text-muted-foreground">
              Informational icon with aria-label (announced by screen readers)
            </span>
          </div>
          <div class="flex items-center gap-4">
            <modus-icon name="info" variant="outlined" size="md" [decorative]="true" />
            <span class="text-sm text-muted-foreground">
              Decorative icon (hidden from screen readers)
            </span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Common Icons"
        description="Examples of commonly used icons across the application."
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="add" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Add</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="file_edit" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Edit</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="delete" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Delete</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="save_disk" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Save</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="download" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Download</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="upload" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Upload</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="settings" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">Settings</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="user_account" variant="outlined" size="lg" />
            <span class="text-xs text-muted-foreground">User</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Status Icons"
        description="Icons commonly used to indicate status or state."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="check_circle" variant="solid" size="lg" className="text-success" />
            <span class="text-xs text-muted-foreground">Success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="info" variant="solid" size="lg" className="text-primary" />
            <span class="text-xs text-muted-foreground">Info</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="warning" variant="solid" size="lg" className="text-warning" />
            <span class="text-xs text-muted-foreground">Warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-icon name="alert" variant="solid" size="lg" className="text-destructive" />
            <span class="text-xs text-muted-foreground">Error</span>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class IconDemoPageComponent {}

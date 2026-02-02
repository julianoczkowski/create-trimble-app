import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoExampleCleanComponent } from '../../demos/shared/demo-example-clean.component';

interface ColorInfo {
  name: string;
  cssVar: string;
  tailwindClass: string;
}

interface ColorGroup {
  title: string;
  description: string;
  colors: ColorInfo[];
}

/**
 * Color palette page component.
 *
 * Displays a comprehensive view of all colors in the Modus Design System,
 * including semantic colors, base colors, and their various opacity variants.
 */
@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule, DemoExampleCleanComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-6xl mx-auto p-8">
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">
          Color Palette
        </div>
        <div class="text-lg leading-relaxed text-foreground text-center">
          Visual reference for all colors in the Modus Design System. These colors automatically adapt to the current theme (Classic Light/Dark, Modern Light/Dark).
        </div>
      </div>

      <div class="flex flex-col gap-6">
        @for (group of colorGroups; track group.title) {
          <demo-example-clean [title]="group.title" [description]="group.description">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              @for (color of group.colors; track color.name) {
                <div class="bg-card rounded-lg p-6 color-card border-thick-dashed">
                  <!-- Color Swatch -->
                  <div
                    class="rounded-lg w-full h-24 mb-4 flex items-center justify-center text-2xl font-bold"
                    [class]="getSwatchClass(color)"
                    [style]="getSwatchStyle(color)"
                  >
                    @if (color.name.includes('foreground')) {
                      Aa
                    }
                  </div>

                  <!-- Color Info -->
                  <div class="space-y-2">
                    <div class="text-sm font-medium text-foreground">{{ color.name }}</div>
                    <div class="text-xs text-foreground opacity-70 font-mono">{{ color.cssVar }}</div>
                    <div class="text-xs text-foreground opacity-70 font-mono">
                      {{ color.tailwindClass }}
                    </div>
                  </div>
                </div>
              }
            </div>
          </demo-example-clean>
        }

        <demo-example-clean
          title="Modus Web Component Colors"
          description="These are the original Modus Web Component colors that our design system maps to."
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (color of modusColors; track color.name) {
              <div class="bg-card rounded-lg p-4 border-default">
                <div
                  class="w-full h-16 rounded mb-3"
                  [style.background-color]="'var(--' + color.name + ')'"
                ></div>
                <div class="text-sm font-medium text-foreground">{{ color.name }}</div>
                <div class="text-xs text-foreground opacity-70">{{ color.description }}</div>
              </div>
            }
          </div>
        </demo-example-clean>
      </div>

      <!-- Footer -->
      <div class="text-center pt-8 box-content">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img
            src="/angular-icon.svg"
            alt="Angular"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </div>
        <div class="text-sm font-mono text-foreground-40">
          2026 Modus Angular App v1.0.0 + Angular 20 + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>
    </div>
  `,
})
export class ColorPaletteComponent {
  readonly colorGroups: ColorGroup[] = [
    {
      title: 'Base Colors',
      description: 'Core background and content colors',
      colors: [
        { name: 'background', cssVar: '--background', tailwindClass: 'bg-background' },
        { name: 'foreground', cssVar: '--foreground', tailwindClass: 'text-foreground' },
        { name: 'card', cssVar: '--card', tailwindClass: 'bg-card' },
        {
          name: 'card-foreground',
          cssVar: '--card-foreground',
          tailwindClass: 'text-card-foreground',
        },
      ],
    },
    {
      title: 'Primary Colors',
      description: 'Main brand and accent colors',
      colors: [
        { name: 'primary', cssVar: '--primary', tailwindClass: 'bg-primary' },
        {
          name: 'primary-foreground',
          cssVar: '--primary-foreground',
          tailwindClass: 'text-primary-foreground',
        },
        { name: 'secondary', cssVar: '--secondary', tailwindClass: 'bg-secondary' },
        {
          name: 'secondary-foreground',
          cssVar: '--secondary-foreground',
          tailwindClass: 'text-secondary-foreground',
        },
      ],
    },
    {
      title: 'Utility Colors',
      description: 'Muted, destructive, and border colors',
      colors: [
        { name: 'muted', cssVar: '--muted', tailwindClass: 'bg-muted' },
        {
          name: 'muted-foreground',
          cssVar: '--muted-foreground',
          tailwindClass: 'text-muted-foreground',
        },
        { name: 'destructive', cssVar: '--destructive', tailwindClass: 'bg-destructive' },
        {
          name: 'destructive-foreground',
          cssVar: '--destructive-foreground',
          tailwindClass: 'text-destructive-foreground',
        },
        { name: 'border', cssVar: '--border', tailwindClass: 'border-border' },
        { name: 'warning', cssVar: '--warning', tailwindClass: 'bg-warning' },
        {
          name: 'warning-foreground',
          cssVar: '--warning-foreground',
          tailwindClass: 'text-warning-foreground',
        },
        { name: 'success', cssVar: '--success', tailwindClass: 'bg-success' },
        {
          name: 'success-foreground',
          cssVar: '--success-foreground',
          tailwindClass: 'text-success-foreground',
        },
      ],
    },
  ];

  readonly modusColors = [
    { name: 'modus-wc-color-base-page', description: 'Page background' },
    { name: 'modus-wc-color-base-100', description: 'Light background' },
    { name: 'modus-wc-color-base-200', description: 'Medium background' },
    { name: 'modus-wc-color-base-300', description: 'Dark background' },
    { name: 'modus-wc-color-base-content', description: 'Text content' },
    { name: 'modus-wc-color-info', description: 'Info/primary' },
    { name: 'modus-wc-color-success', description: 'Success' },
    { name: 'modus-wc-color-warning', description: 'Warning' },
    { name: 'modus-wc-color-error', description: 'Error/danger' },
  ];

  getSwatchClass(color: ColorInfo): string {
    if (color.name.includes('foreground')) {
      return '';
    }
    if (color.name === 'border') {
      return '';
    }
    return color.tailwindClass;
  }

  getSwatchStyle(color: ColorInfo): Record<string, string> {
    const styles: Record<string, string> = {
      border: '1px solid var(--border)',
    };

    if (color.name === 'border') {
      styles['backgroundColor'] = `var(${color.cssVar})`;
      styles['border'] = `1px solid var(${color.cssVar})`;
    } else if (color.name.includes('foreground')) {
      // For foreground colors, show a background that demonstrates the text color
      if (color.name === 'destructive-foreground') {
        styles['backgroundColor'] = 'var(--destructive)';
      } else if (color.name === 'success-foreground') {
        styles['backgroundColor'] = 'var(--success)';
      } else if (color.name === 'warning-foreground') {
        styles['backgroundColor'] = 'var(--warning)';
      } else if (color.name === 'primary-foreground') {
        styles['backgroundColor'] = 'var(--primary)';
      } else {
        styles['backgroundColor'] = 'var(--background)';
      }
      styles['color'] = `var(${color.cssVar})`;
    }

    return styles;
  }
}

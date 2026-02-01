import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoExampleComponent } from '../../demos/shared/demo-example.component';
import { ModusAlertComponent } from '../../components/modus-alert.component';
import { modusIcons, totalIconCount, categoryCount } from '../../data/modus-icons';

/**
 * Icons page component.
 *
 * Displays a comprehensive view of all available Modus icons organized by category.
 * Includes click-to-copy functionality for easy icon usage.
 */
@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, DemoExampleComponent, ModusAlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-6xl mx-auto p-8">
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">
          Modus Icons Gallery
        </div>
        <div class="text-lg leading-relaxed text-foreground text-center">
          Complete showcase of all available Modus icons organized by category. Click on any icon to copy its name.
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <demo-example
          title="Icon Usage"
          description="All icons use the modus-icons class with underscore_case names. Size with Tailwind classes and color with design system colors."
        >
          <div class="flex flex-col gap-4">
            <div class="text-sm text-muted-foreground">
              Total Icons:
              <div class="font-semibold text-foreground inline">{{ totalIconCount }}</div>
            </div>
            <div class="text-sm text-muted-foreground">
              Categories:
              <div class="font-semibold text-foreground inline">{{ categoryCount }}</div>
            </div>
            <div class="text-xs text-muted-foreground mt-2">
              Click on any icon below to copy its name to your clipboard.
            </div>
          </div>
        </demo-example>

        @for (category of iconCategories; track category) {
          <demo-example
            [title]="category"
            [description]="getIconCount(category) + ' icons in this category'"
          >
            <div class="grid grid-cols-5 gap-4">
              @for (iconName of getIcons(category); track iconName) {
                <div
                  class="flex flex-col items-center gap-2 p-3 rounded-lg border-default hover:border-primary hover:scale-105 hover:shadow-md transition-all cursor-pointer group"
                  (click)="copyIconName(iconName)"
                  [title]="'Click to copy: ' + iconName"
                >
                  <i
                    class="modus-icons text-2xl text-foreground group-hover:text-primary transition-colors"
                  >
                    {{ iconName }}
                  </i>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-foreground text-center break-all leading-tight transition-colors"
                  >
                    {{ iconName }}
                  </div>
                </div>
              }
            </div>
          </demo-example>
        }
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
          <div class="text-foreground-40">+</div>
          <img
            src="/vite.svg"
            alt="Vite"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </div>
        <div class="text-sm font-mono text-foreground-40">
          2026 Modus Angular App v1.0.0 + Angular 20 + Vite + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>
    </div>

    <!-- Alert notification for copy feedback - fixed at bottom -->
    @if (showAlert()) {
      <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <modus-alert
          alertTitle="Icon name copied!"
          variant="success"
          [dismissible]="true"
          [delay]="2000"
          (dismiss)="hideAlert()"
        />
      </div>
    }
  `,
})
export class IconsComponent {
  readonly totalIconCount = totalIconCount;
  readonly categoryCount = categoryCount;
  readonly iconCategories = Object.keys(modusIcons);
  readonly showAlert = signal(false);

  getIcons(category: string): string[] {
    return modusIcons[category] || [];
  }

  getIconCount(category: string): number {
    return this.getIcons(category).length;
  }

  copyIconName(iconName: string): void {
    navigator.clipboard.writeText(iconName).then(
      () => {
        // Show alert notification
        this.showAlert.set(true);
        // Hide alert after delay
        setTimeout(() => {
          this.showAlert.set(false);
        }, 2000);
      },
      (err) => {
        console.error('Failed to copy:', err);
      },
    );
  }

  hideAlert(): void {
    this.showAlert.set(false);
  }
}

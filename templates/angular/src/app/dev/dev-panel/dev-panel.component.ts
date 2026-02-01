import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DevPanelService } from '../dev-panel.service';
import { devNavItems, demoCategories } from '../dev-config';
import { ThemeSwitcherDropdownComponent } from '../theme-switcher-dropdown/theme-switcher-dropdown.component';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Floating Dev Panel component.
 *
 * Provides access to development tools, demos, and theme switching.
 * Only renders in development mode when devPanel environment flag is true.
 *
 * Features:
 * - Floating toggle button (bottom-right)
 * - Slide-out panel from right
 * - Theme switcher
 * - Navigation to reference pages (Colors, Icons, Components)
 * - Accordion navigation to component demos
 * - Keyboard shortcuts (Ctrl+Shift+D toggle, Escape close)
 */
@Component({
  selector: 'app-dev-panel',
  standalone: true,
  imports: [RouterModule, ModusButtonComponent, ThemeSwitcherDropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Floating Toggle Button - always visible -->
    <div class="fixed bottom-4 right-4 z-[9999]">
      <modus-button color="primary" size="lg" (buttonClick)="toggle()">
        <div class="flex items-center gap-2">
          <i class="modus-icons text-xl">{{ isOpen() ? 'close' : 'code' }}</i>
          <div class="hidden sm:block">Dev</div>
        </div>
      </modus-button>
    </div>

    <!-- Panel - Only render when open to avoid blocking clicks -->
    @if (isOpen()) {
      <div class="fixed inset-0 z-[9998]">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-foreground-20 animate-fade-in" (click)="close()"></div>

        <!-- Panel -->
        <div
          class="absolute top-0 right-0 h-full w-[360px] max-w-[90vw] bg-card shadow-xl animate-slide-in-right overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-bottom-default shrink-0">
            <div class="text-lg font-semibold text-foreground">Dev Panel</div>
            <modus-button
              variant="borderless"
              color="secondary"
              size="sm"
              (buttonClick)="close()"
              ariaLabel="Close Dev Panel"
            >
              <i class="modus-icons">close</i>
            </modus-button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-4">
            <div class="space-y-6">
              <!-- Theme Switcher Section -->
              <div class="space-y-2">
                <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
                  Theme
                </div>
                <app-theme-switcher-dropdown />
              </div>

              <!-- Main Navigation -->
              <div class="space-y-2">
                <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
                  Reference
                </div>
                <div class="space-y-1">
                  <!-- Home Button -->
                  <div
                    role="button"
                    tabindex="0"
                    (click)="handleNavClick('/')"
                    (keydown.enter)="handleNavClick('/')"
                    class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer"
                    [class.bg-primary]="isActive('/')"
                    [class.text-primary-foreground]="isActive('/')"
                    [class.hover:bg-muted]="!isActive('/')"
                    [class.text-foreground]="!isActive('/')"
                  >
                    <i class="modus-icons text-lg">home</i>
                    <div>Home</div>
                  </div>

                  @for (item of navItems; track item.path) {
                    <div
                      role="button"
                      tabindex="0"
                      (click)="handleNavClick(item.path)"
                      (keydown.enter)="handleNavClick(item.path)"
                      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer"
                      [class.bg-primary]="isActive(item.path)"
                      [class.text-primary-foreground]="isActive(item.path)"
                      [class.hover:bg-muted]="!isActive(item.path)"
                      [class.text-foreground]="!isActive(item.path)"
                    >
                      @if (item.icon) {
                        <i class="modus-icons text-lg">{{ item.icon }}</i>
                      }
                      <div>{{ item.label }}</div>
                    </div>
                  }
                </div>
              </div>

              <!-- Component Demos -->
              <div class="space-y-2">
                <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
                  Component Demos
                </div>
                <div class="border-default rounded-lg overflow-hidden">
                  @for (category of demoCategories; track category.label) {
                    <div class="border-bottom-default last:border-b-0">
                      <div
                        role="button"
                        tabindex="0"
                        (click)="toggleCategory(category.label)"
                        (keydown.enter)="toggleCategory(category.label)"
                        class="w-full flex items-center justify-between px-3 py-2 hover:bg-muted transition-colors text-left cursor-pointer"
                      >
                        <div class="font-medium text-foreground">{{ category.label }}</div>
                        <i class="modus-icons text-foreground-60">
                          {{ isCategoryExpanded(category.label) ? 'expand_less' : 'expand_more' }}
                        </i>
                      </div>
                      @if (isCategoryExpanded(category.label)) {
                        <div class="pl-4 pb-2 space-y-1">
                          @for (item of category.items; track item.path) {
                            <div
                              role="button"
                              tabindex="0"
                              (click)="handleNavClick(item.path)"
                              (keydown.enter)="handleNavClick(item.path)"
                              class="w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left transition-colors cursor-pointer"
                              [class.bg-primary]="isActive(item.path)"
                              [class.text-primary-foreground]="isActive(item.path)"
                              [class.hover:bg-muted]="!isActive(item.path)"
                              [class.text-foreground]="!isActive(item.path)"
                            >
                              {{ item.label }}
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Keyboard Shortcut Hint -->
              <div class="pt-4 border-top-default">
                <div class="text-xs text-foreground-60 text-center">
                  Press
                  <span class="inline px-1.5 py-0.5 bg-muted rounded text-foreground text-xs font-mono"
                    >Ctrl+Shift+D</span
                  >
                  to toggle
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class DevPanelComponent {
  private readonly devPanelService = inject(DevPanelService);
  private readonly router = inject(Router);

  readonly isOpen = this.devPanelService.isOpen;
  readonly navItems = devNavItems;
  readonly demoCategories = demoCategories;

  private readonly expandedCategories = signal<string[]>([]);

  toggle(): void {
    this.devPanelService.toggle();
  }

  close(): void {
    this.devPanelService.close();
  }

  handleNavClick(path: string): void {
    this.router.navigate([path]);
    this.close();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleCategory(label: string): void {
    this.expandedCategories.update((categories) =>
      categories.includes(label)
        ? categories.filter((l) => l !== label)
        : [...categories, label],
    );
  }

  isCategoryExpanded(label: string): boolean {
    return this.expandedCategories().includes(label);
  }
}

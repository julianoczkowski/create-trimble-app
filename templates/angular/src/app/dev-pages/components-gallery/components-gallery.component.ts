import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusBadgeComponent } from '../../components/modus-badge.component';

interface ComponentDemo {
  name: string;
  description: string;
  url: string;
  category: string;
  status: 'ready' | 'demo';
}

interface Category {
  name: string;
  value: string;
}

const componentDemos: ComponentDemo[] = [
  {
    name: 'Accordion',
    description: 'Collapsible content sections with expand/collapse functionality',
    url: '/dev/demos/accordion',
    category: 'Layout',
    status: 'demo',
  },
  {
    name: 'Alert',
    description: 'Notifications and messages with different variants and dismissible options',
    url: '/dev/demos/alert',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Autocomplete',
    description: 'Input field with suggestions and multi-select capabilities',
    url: '/dev/demos/autocomplete',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Avatar',
    description: 'User profile images with different sizes and shapes',
    url: '/dev/demos/avatar',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Badge',
    description: 'Labels and counters for status indicators and notifications',
    url: '/dev/demos/badge',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Breadcrumbs',
    description: 'Navigation breadcrumb trails for hierarchical navigation',
    url: '/dev/demos/breadcrumbs',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Button',
    description: 'Action buttons with various styles, sizes, and states',
    url: '/dev/demos/button',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Button Group',
    description: 'Grouped buttons with shared styling and single or multiple selection modes',
    url: '/dev/demos/button-group',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Card',
    description: 'Content containers with headers, content, and action areas',
    url: '/dev/demos/card',
    category: 'Layout',
    status: 'demo',
  },
  {
    name: 'Checkbox',
    description: 'Form controls for multiple selections and boolean inputs',
    url: '/dev/demos/checkbox',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Chip',
    description: 'Compact elements for tags, filters, and removable items',
    url: '/dev/demos/chip',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Date',
    description: 'Date input controls with validation and formatting',
    url: '/dev/demos/date',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Dropdown Menu',
    description: 'Contextual menus with various placement and sizing options',
    url: '/dev/demos/dropdown',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'File Dropzone',
    description: 'Drag-and-drop file uploads with validation and custom messaging',
    url: '/dev/demos/file-dropzone',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Handle',
    description: 'Draggable resizer for adjacent panels with horizontal and vertical layouts',
    url: '/dev/demos/handle',
    category: 'Layout',
    status: 'demo',
  },
  {
    name: 'Icon',
    description: 'Icon component with various sizes, accessibility options, and styling',
    url: '/dev/demos/icon',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Input Feedback',
    description:
      'Contextual feedback for form fields with error, success, warning, and info messages',
    url: '/dev/demos/input-feedback',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Input Label',
    description:
      'Labels for form controls with sub-labels, required indicators, and custom content',
    url: '/dev/demos/input-label',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Loader',
    description: 'Visual loading indicators with 6 animation variants, 4 sizes, and 8 colors',
    url: '/dev/demos/loader',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Logo',
    description: 'Trimble and Viewpoint product logos with full and emblem variants',
    url: '/dev/demos/logo',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Menu',
    description: 'Integrated menu system with container and menu items for navigation and toolbars',
    url: '/dev/demos/menu',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Modal',
    description: 'Blocking dialog overlays for forms, confirmations, and detailed content',
    url: '/dev/demos/modal',
    category: 'Overlays',
    status: 'demo',
  },
  {
    name: 'Navbar',
    description:
      'Full-width application bar with navigation menus, search, notifications, apps launcher, AI button and user profile controls',
    url: '/dev/demos/navbar',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Number Input',
    description:
      'Numeric input controls with validation, currency support, range sliders, and comprehensive form integration',
    url: '/dev/demos/number-input',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Pagination',
    description:
      'Page navigation control with first, previous, number, next, and last actions plus accessibility customization',
    url: '/dev/demos/pagination',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Panel',
    description: 'Structured layout container with header, body, and footer slots',
    url: '/dev/demos/panel',
    category: 'Layout',
    status: 'demo',
  },
  {
    name: 'Progress',
    description: 'Linear and radial progress indicators for task completion and live updates',
    url: '/dev/demos/progress',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Radio',
    description:
      'Exclusive choice control with multiple sizes, required state, and layout customization',
    url: '/dev/demos/radio',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Rating',
    description:
      'Star, smiley, heart, and thumb ratings with events, half-steps, and accessibility helpers',
    url: '/dev/demos/rating',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Select',
    description:
      'Single-select dropdown with dynamic options arrays, validation feedback, and async loading patterns',
    url: '/dev/demos/select',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Side Navigation',
    description:
      'Collapsible left navigation with controlled expansion and Modus navbar integration',
    url: '/dev/demos/side-navigation',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Skeleton',
    description: 'Animated loading placeholders for typography, cards, and dashboards',
    url: '/dev/demos/skeleton',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Slider',
    description: 'Interactive range input with min/max bounds, step control, and live feedback',
    url: '/dev/demos/slider',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Stepper',
    description:
      'Progress indicator for multi-step workflows with horizontal and vertical orientations',
    url: '/dev/demos/stepper',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Switch',
    description: 'Binary toggle control with required, disabled, and indeterminate states',
    url: '/dev/demos/switch',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Table',
    description: 'Data tables with sorting, pagination, selection, and inline editing',
    url: '/dev/demos/table',
    category: 'Data',
    status: 'demo',
  },
  {
    name: 'Tabs',
    description:
      'Organize content into logical sections with bordered, boxed, icon-only, and disabled tab variants',
    url: '/dev/demos/tabs',
    category: 'Navigation',
    status: 'demo',
  },
  {
    name: 'Textarea',
    description: 'Multi-line text field with helper messages, validation, and clearable controls',
    url: '/dev/demos/textarea',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Text Input',
    description: 'Single-line text fields with various types, validation, and interactive features',
    url: '/dev/demos/text-input',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Theme Switcher',
    description: 'Toggle between light and dark themes with system preference detection',
    url: '/dev/demos/theme-switcher',
    category: 'Display',
    status: 'demo',
  },
  {
    name: 'Time Input',
    description:
      'Single-field time picker with min/max limits, seconds support, and datalist suggestions',
    url: '/dev/demos/time-input',
    category: 'Forms',
    status: 'demo',
  },
  {
    name: 'Toast',
    description:
      'Lightweight confirmations or alerts that appear briefly without disrupting workflow',
    url: '/dev/demos/toast',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Toolbar',
    description:
      'Organize actions for a focused context with start, center, and end slots for commands',
    url: '/dev/demos/toolbar',
    category: 'Layout',
    status: 'demo',
  },
  {
    name: 'Tooltip',
    description: 'Contextual helper messages that appear on hover or focus around any trigger',
    url: '/dev/demos/tooltip',
    category: 'Feedback',
    status: 'demo',
  },
  {
    name: 'Utility Panel',
    description: 'Collapsible side panel for contextual tools and secondary content',
    url: '/dev/demos/utility-panel',
    category: 'Layout',
    status: 'demo',
  },
];

const categories: Category[] = [
  { name: 'All', value: 'all' },
  { name: 'Forms', value: 'forms' },
  { name: 'Layout', value: 'layout' },
  { name: 'Navigation', value: 'navigation' },
  { name: 'Display', value: 'display' },
  { name: 'Feedback', value: 'feedback' },
  { name: 'Overlays', value: 'overlays' },
  { name: 'Data', value: 'data' },
];

/**
 * Components gallery page.
 *
 * Provides a navigation hub listing all available Modus component demos
 * organized by category with filtering and card grid layout.
 */
@Component({
  selector: 'app-components-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, ModusButtonComponent, ModusBadgeComponent],
  template: `
    <div class="max-w-6xl mx-auto p-8">
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">Modus Web Components</div>
        <div class="text-lg leading-relaxed text-foreground text-center">
          Explore all available Angular Modus Web Components.
        </div>
      </div>

      <!-- Category Filter -->
      <div class="mb-12 p-8 bg-card rounded-lg border-default">
        <div class="text-2xl font-semibold mb-4 text-foreground">Filter by Category</div>
        <div class="flex flex-wrap gap-2">
          @for (category of categories; track category.value) {
            <modus-button
              [color]="selectedCategory() === category.value ? 'secondary' : 'secondary'"
              [variant]="selectedCategory() === category.value ? 'filled' : 'outlined'"
              size="md"
              (buttonClick)="setCategory(category.value)"
            >
              {{ category.name }}
            </modus-button>
          }
        </div>
      </div>

      <!-- Components Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (component of filteredComponents(); track component.url) {
          <div
            class="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-200 border-default"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="text-xl font-semibold text-foreground mb-2">{{ component.name }}</div>
                <div class="text-sm text-muted-foreground mb-2">{{ component.category }}</div>
              </div>
              <div class="flex items-center gap-2">
                <modus-badge
                  [color]="component.status === 'ready' ? 'success' : 'warning'"
                  size="md"
                  variant="filled"
                >
                  {{ component.status === 'ready' ? 'Ready' : 'Demo' }}
                </modus-badge>
              </div>
            </div>

            <div class="text-foreground mb-4 text-sm leading-relaxed">
              {{ component.description }}
            </div>

            <div class="w-full">
              <modus-button
                color="primary"
                variant="filled"
                size="md"
                [fullWidth]="true"
                (buttonClick)="navigateTo(component.url)"
              >
                View Demo
              </modus-button>
            </div>
          </div>
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
  `,
})
export class ComponentsGalleryComponent {
  private readonly router = inject(Router);

  readonly categories = categories;
  readonly selectedCategory = signal<string>('all');

  readonly filteredComponents = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return componentDemos;
    }
    return componentDemos.filter((component) => component.category.toLowerCase() === category);
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}

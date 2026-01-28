import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusChipComponent } from '../modus-chip.component';

/**
 * Demo page showcasing the Modus Chip component.
 *
 * Demonstrates chip features including:
 * - Basic chips with labels
 * - Chip variants (filled, outline)
 * - Chip shapes (rectangle, circle)
 * - Different sizes (sm, md, lg)
 * - Active state
 * - Disabled state
 * - Chips with remove button
 * - Error state
 */
@Component({
  selector: 'app-chip-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusChipComponent],
  template: `
    <demo-page
      title="Modus Chip"
      description="Chips are compact elements for displaying selections, filters, or tags. Use chips to represent user choices, filter selections, or categorical information."
    >
      <demo-example
        title="Basic Chips"
        description="Simple chips with labels for displaying information."
      >
        <div class="flex flex-wrap gap-3">
          <modus-chip label="Technology" />
          <modus-chip label="Design" />
          <modus-chip label="Marketing" />
          <modus-chip label="Business" />
        </div>
      </demo-example>

      <demo-example
        title="Chip Variants"
        description="Different visual styles for chips: filled and outline."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Filled (Default)</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Filled Chip" variant="filled" />
              <modus-chip label="Active" variant="filled" [active]="true" />
            </div>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Outline</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Outline Chip" variant="outline" />
              <modus-chip label="Active" variant="outline" [active]="true" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Chip Shapes"
        description="Rectangle and circle shapes for different design styles."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Rectangle (Default)</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Rectangle" shape="rectangle" />
              <modus-chip label="Active" shape="rectangle" [active]="true" />
            </div>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Circle</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Circle" shape="circle" />
              <modus-chip label="Active" shape="circle" [active]="true" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Chip Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-chip label="Small" size="sm" />
          <modus-chip label="Medium (Default)" size="md" />
          <modus-chip label="Large" size="lg" />
        </div>
      </demo-example>

      <demo-example
        title="Chips with Remove Button"
        description="Chips that can be removed with a close button."
      >
        <div class="flex flex-wrap gap-3">
          <modus-chip
            label="Remove me"
            [showRemove]="true"
            (chipRemove)="handleChipRemove('chip1', $event)"
          />
          <modus-chip
            label="Click X to remove"
            [showRemove]="true"
            (chipRemove)="handleChipRemove('chip2', $event)"
          />
          <modus-chip
            label="Deletable chip"
            [showRemove]="true"
            (chipRemove)="handleChipRemove('chip3', $event)"
          />
        </div>
        @if (removedChips().length > 0) {
        <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
          <div class="font-semibold mb-2">Removed Chips:</div>
          <div class="text-sm">{{ removedChips().join(', ') }}</div>
        </div>
        }
      </demo-example>

      <demo-example
        title="Active and Disabled States"
        description="Chips in active and disabled states."
      >
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Active Chips</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Active" [active]="true" />
              <modus-chip label="Selected" [active]="true" variant="outline" />
            </div>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-3 text-foreground">Disabled Chips</h4>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Disabled" [disabled]="true" />
              <modus-chip label="Unavailable" [disabled]="true" variant="outline" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Error State" description="Chips with error styling to indicate issues.">
        <div class="flex flex-wrap gap-3">
          <modus-chip label="Invalid" [hasError]="true" />
          <modus-chip label="Error" [hasError]="true" variant="outline" />
          <modus-chip label="Failed" [hasError]="true" [showRemove]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Chips with click handlers for interactive filtering or selection."
      >
        <div class="p-6 rounded-lg bg-card text-card-foreground border-default">
          <div class="text-base font-semibold mb-3 text-foreground">Filter Options:</div>
          <div class="flex flex-wrap gap-3">
            @for (filter of filterOptions(); track filter.id) {
            <modus-chip
              [label]="filter.label"
              [active]="selectedFilters().includes(filter.id)"
              (chipClick)="toggleFilter(filter.id)"
            />
            }
          </div>
          @if (selectedFilters().length > 0) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Active Filters:</div>
            <div class="text-sm">{{ getFilterLabels() }}</div>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ChipDemoPageComponent {
  readonly removedChips = signal<string[]>([]);
  readonly selectedFilters = signal<string[]>([]);

  readonly filterOptions = signal<Array<{ id: string; label: string }>>([
    { id: 'featured', label: 'Featured' },
    { id: 'new', label: 'New' },
    { id: 'sale', label: 'On Sale' },
    { id: 'popular', label: 'Popular' },
  ]);

  handleChipRemove(chipId: string, event: MouseEvent | KeyboardEvent): void {
    this.removedChips.update((chips) => [...chips, chipId]);
    console.log('Chip removed:', chipId);
  }

  toggleFilter(filterId: string): void {
    this.selectedFilters.update((filters) => {
      if (filters.includes(filterId)) {
        return filters.filter((id) => id !== filterId);
      } else {
        return [...filters, filterId];
      }
    });
    console.log('Filters selected:', this.selectedFilters());
  }

  getFilterLabels(): string {
    return this.selectedFilters()
      .map((id) => this.filterOptions().find((f) => f.id === id)?.label)
      .filter((label): label is string => !!label)
      .join(', ');
  }
}

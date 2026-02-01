import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusChipComponent } from '../../components/modus-chip.component';

/**
 * Demo page showcasing the Modus Chip component.
 *
 * Demonstrates chip features including:
 * - Basic chips with labels
 * - Chip variants (filled, outline)
 * - Different sizes (sm, md, lg)
 * - Active state for selections
 * - Disabled state
 * - Chips with remove button
 * - Error state for validation
 * - Interactive toggle/filter patterns
 * - Deletable tag patterns
 */
@Component({
  selector: 'app-chip-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusChipComponent],
  template: `
    <demo-page
      title="Modus Chip"
      description="Compact visual elements for tags, selections, or status pills. Chips support filled/outline variants, three sizes, active/error/disabled states, and optional remove buttons."
    >
      <demo-example
        title="Removable Tags"
        description="Chips with remove buttons for deletable items like tags, filters, or selections."
      >
        <div class="p-6 rounded-lg bg-card border-default">
          <div class="text-base font-semibold mb-2 text-foreground">Applied Tags</div>
          <div class="text-sm text-muted-foreground mb-4">Click the X to remove tags</div>
          @if (activeTags().length > 0) {
            <div class="flex flex-wrap gap-3">
              @for (tag of activeTags(); track tag.id) {
                <modus-chip
                  [label]="tag.label"
                  [showRemove]="true"
                  (chipRemove)="removeTag(tag.id)"
                />
              }
            </div>
          } @else {
            <div class="text-sm text-muted-foreground italic">No tags applied</div>
          }
          @if (removedTags().length > 0) {
            <div class="mt-4 pt-4 border-top-default flex items-center gap-3">
              <div class="text-sm text-muted-foreground">Removed:</div>
              @for (tag of removedTags(); track tag.id) {
                <modus-chip [label]="tag.label" [disabled]="true" size="sm" />
              }
              <button class="text-sm text-primary hover:underline ml-2" (click)="restoreTags()">
                Restore all
              </button>
            </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Chip Variants"
        description="Two visual styles: filled (solid background) and outline (transparent with border)."
      >
        <div class="flex flex-col gap-6">
          <div>
            <div class="text-sm font-medium mb-3 text-muted-foreground">Filled (Default)</div>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Default" variant="filled" />
              <modus-chip label="Active" variant="filled" [active]="true" />
              <modus-chip label="Removable" variant="filled" [showRemove]="true" />
            </div>
          </div>
          <div>
            <div class="text-sm font-medium mb-3 text-muted-foreground">Outline</div>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Default" variant="outline" />
              <modus-chip label="Active" variant="outline" [active]="true" />
              <modus-chip label="Removable" variant="outline" [showRemove]="true" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Chip Sizes"
        description="Three size options: sm (20px), md (24px), and lg (28px) for different contexts."
      >
        <div class="flex flex-wrap items-center gap-4">
          <modus-chip label="Small" size="sm" />
          <modus-chip label="Medium" size="md" />
          <modus-chip label="Large" size="lg" />
        </div>
        <div class="flex flex-wrap items-center gap-4 mt-4">
          <modus-chip label="Small" size="sm" variant="outline" [active]="true" />
          <modus-chip label="Medium" size="md" variant="outline" [active]="true" />
          <modus-chip label="Large" size="lg" variant="outline" [active]="true" />
        </div>
      </demo-example>

      <demo-example
        title="States"
        description="Active state for selections, disabled state for unavailable options, and error state for validation."
      >
        <div class="flex flex-col gap-6">
          <div>
            <div class="text-sm font-medium mb-3 text-muted-foreground">Active State</div>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Selected" [active]="true" />
              <modus-chip label="Pressed" [active]="true" variant="outline" />
            </div>
          </div>
          <div>
            <div class="text-sm font-medium mb-3 text-muted-foreground">Disabled State</div>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Disabled" [disabled]="true" />
              <modus-chip label="Disabled Outline" [disabled]="true" variant="outline" />
              <modus-chip label="Disabled Active" [disabled]="true" [active]="true" />
            </div>
          </div>
          <div>
            <div class="text-sm font-medium mb-3 text-muted-foreground">Error State</div>
            <div class="flex flex-wrap gap-3">
              <modus-chip label="Invalid" [hasError]="true" />
              <modus-chip label="Error" [hasError]="true" variant="outline" />
              <modus-chip label="Remove Error" [hasError]="true" [showRemove]="true" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Status Pills"
        description="Use chips as status indicators with appropriate styling."
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="w-24 text-sm text-muted-foreground">Order Status:</div>
            <modus-chip label="Pending" variant="outline" />
          </div>
          <div class="flex items-center gap-4">
            <div class="w-24 text-sm text-muted-foreground">Active:</div>
            <modus-chip label="In Progress" [active]="true" />
          </div>
          <div class="flex items-center gap-4">
            <div class="w-24 text-sm text-muted-foreground">Completed:</div>
            <modus-chip label="Done" variant="filled" />
          </div>
          <div class="flex items-center gap-4">
            <div class="w-24 text-sm text-muted-foreground">Error:</div>
            <modus-chip label="Failed" [hasError]="true" />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ChipDemoPageComponent {
  // Removable tags demo
  readonly activeTags = signal([
    { id: 'urgent', label: 'Urgent' },
    { id: 'review', label: 'Needs Review' },
    { id: 'approved', label: 'Approved' },
    { id: 'archived', label: 'Archived' },
  ]);
  readonly removedTags = signal<Array<{ id: string; label: string }>>([]);

  removeTag(tagId: string): void {
    const tag = this.activeTags().find((t) => t.id === tagId);
    if (tag) {
      this.activeTags.update((tags) => tags.filter((t) => t.id !== tagId));
      this.removedTags.update((tags) => [...tags, tag]);
    }
  }

  restoreTags(): void {
    this.activeTags.update((tags) => [...tags, ...this.removedTags()]);
    this.removedTags.set([]);
  }
}

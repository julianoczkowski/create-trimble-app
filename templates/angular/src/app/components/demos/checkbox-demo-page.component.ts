import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusCheckboxComponent } from '../modus-checkbox.component';

/**
 * Demo page showcasing the Modus Checkbox component.
 *
 * Demonstrates checkbox features including:
 * - Basic checkbox with labels
 * - Checked and unchecked states
 * - Indeterminate state
 * - Different sizes (sm, md, lg)
 * - Disabled state
 * - Required checkbox
 * - Interactive examples with event handling
 */
@Component({
  selector: 'app-checkbox-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusCheckboxComponent],
  template: `
    <demo-page
      title="Modus Checkbox"
      description="Checkboxes allow users to select one or more options from a list. Use checkboxes for multiple selections and when users need to toggle individual options."
    >
      <demo-example
        title="Basic Checkbox"
        description="Simple checkbox with label for user selection."
      >
        <div class="flex flex-col gap-4">
          <modus-checkbox label="Accept terms and conditions" />
          <modus-checkbox label="Subscribe to newsletter" />
          <modus-checkbox label="Enable notifications" />
        </div>
      </demo-example>

      <demo-example
        title="Checkbox States"
        description="Different checkbox states: unchecked, checked, and indeterminate."
      >
        <div class="flex flex-col gap-4">
          <modus-checkbox label="Unchecked" [value]="false" />
          <modus-checkbox label="Checked" [value]="true" />
          <modus-checkbox label="Indeterminate" [indeterminate]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Checkbox Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-col gap-4">
          <modus-checkbox label="Small checkbox" size="sm" [value]="true" />
          <modus-checkbox label="Medium checkbox (default)" size="md" [value]="true" />
          <modus-checkbox label="Large checkbox" size="lg" [value]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Disabled State"
        description="Checkboxes in disabled state for unavailable options."
      >
        <div class="flex flex-col gap-4">
          <modus-checkbox label="Disabled unchecked" [disabled]="true" [value]="false" />
          <modus-checkbox label="Disabled checked" [disabled]="true" [value]="true" />
          <modus-checkbox label="Disabled indeterminate" [disabled]="true" [indeterminate]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Required Checkbox"
        description="Mark checkboxes as required for form validation."
      >
        <div class="flex flex-col gap-4">
          <modus-checkbox label="I agree to the terms (required)" [required]="true" />
          <modus-checkbox label="Confirm email subscription (required)" [required]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Checkbox Group"
        description="Group multiple checkboxes together for related options."
      >
        <div class="flex flex-col gap-3">
          <div class="text-base font-semibold text-foreground mb-2">Select your interests:</div>
          <modus-checkbox label="Technology" [value]="selectedInterests().includes('tech')" />
          <modus-checkbox label="Design" [value]="selectedInterests().includes('design')" />
          <modus-checkbox label="Marketing" [value]="selectedInterests().includes('marketing')" />
          <modus-checkbox label="Business" [value]="selectedInterests().includes('business')" />
          @if (selectedInterests().length > 0) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Selected Interests:</div>
            <div class="text-sm">{{ selectedInterests().join(', ') }}</div>
          </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Checkbox with event handling to track state changes."
      >
        <div class="p-6 rounded-lg bg-card text-card-foreground border-default">
          <modus-checkbox
            label="Enable feature"
            [value]="featureEnabled()"
            (inputChange)="handleCheckboxChange($event)"
          />
          @if (featureEnabled()) {
          <div class="mt-4 p-4 rounded-lg bg-success text-success-foreground">
            <div class="font-semibold">Feature Enabled!</div>
            <div class="text-sm mt-1">The checkbox is checked.</div>
          </div>
          } @else {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold">Feature Disabled</div>
            <div class="text-sm mt-1">The checkbox is unchecked.</div>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class CheckboxDemoPageComponent {
  readonly featureEnabled = signal<boolean>(false);
  readonly selectedInterests = signal<string[]>([]);

  handleCheckboxChange(event: InputEvent): void {
    this.featureEnabled.update((current) => !current);
    console.log('Checkbox changed:', this.featureEnabled());
  }
}

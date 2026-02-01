import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusCheckboxComponent } from '../../components/modus-checkbox.component';

/**
 * Demo page showcasing the Modus Checkbox component.
 *
 * Demonstrates checkbox features including:
 * - Checked and unchecked states
 * - Indeterminate state
 * - Different sizes (sm, md, lg)
 * - Disabled state
 * - Required checkbox
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
    </demo-page>
  `,
})
export class CheckboxDemoPageComponent {}

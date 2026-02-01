import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusRadioComponent } from '../../components/modus-radio.component';
import { ModusInputLabelComponent } from '../../components/modus-input-label.component';

/**
 * Demo page showcasing the Modus Radio component.
 *
 * Demonstrates radio button features including:
 * - Basic radio groups
 * - Sizes
 * - Disabled state
 * - Required fields
 * - With labels
 */
@Component({
  selector: 'app-radio-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusRadioComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Radio"
      description="Radio buttons allow users to select a single option from a group. Use radio buttons when only one option can be selected at a time."
    >
      <demo-example
        title="Basic Radio Group"
        description="Simple radio button group with multiple options."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="option-a" labelText="Select Option" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="option-a" label="Option A" name="basic-group" [value]="true" />
              <modus-radio inputId="option-b" label="Option B" name="basic-group" [value]="false" />
              <modus-radio inputId="option-c" label="Option C" name="basic-group" [value]="false" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Radio Button Sizes"
        description="Radio buttons in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-radio" labelText="Small" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="small-radio" label="Small Option" name="small-group" size="sm" [value]="true" />
              <modus-radio inputId="small-radio-b" label="Another Small Option" name="small-group" size="sm" [value]="false" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-radio" labelText="Medium (Default)" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="medium-radio" label="Medium Option" name="medium-group" size="md" [value]="true" />
              <modus-radio inputId="medium-radio-b" label="Another Medium Option" name="medium-group" size="md" [value]="false" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-radio" labelText="Large" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="large-radio" label="Large Option" name="large-group" size="lg" [value]="true" />
              <modus-radio inputId="large-radio-b" label="Another Large Option" name="large-group" size="lg" [value]="false" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required Radio Group"
        description="Radio buttons marked as required."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-a" labelText="Required Selection" [required]="true" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="required-a" label="Yes" name="required-group" [required]="true" [value]="true" />
              <modus-radio inputId="required-b" label="No" name="required-group" [required]="true" [value]="false" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Disabled Radio Buttons"
        description="Radio buttons in disabled state."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-a" labelText="Disabled Options" />
            <div class="flex flex-col gap-2">
              <modus-radio inputId="disabled-a" label="Disabled Option 1" name="disabled-group" [disabled]="true" [value]="true" />
              <modus-radio inputId="disabled-b" label="Disabled Option 2" name="disabled-group" [disabled]="true" [value]="false" />
              <modus-radio inputId="disabled-c" label="Enabled Option" name="disabled-group" [disabled]="false" [value]="false" />
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Radio buttons with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-a" labelText="Choose Your Plan" />
            <div class="flex flex-col gap-2">
              <modus-radio
                inputId="interactive-a"
                label="Free Plan"
                name="interactive-group"
                [value]="selectedOption() === 'free'"
                (inputChange)="handleRadioChange('free')"
              />
              <modus-radio
                inputId="interactive-b"
                label="Pro Plan"
                name="interactive-group"
                [value]="selectedOption() === 'pro'"
                (inputChange)="handleRadioChange('pro')"
              />
              <modus-radio
                inputId="interactive-c"
                label="Enterprise Plan"
                name="interactive-group"
                [value]="selectedOption() === 'enterprise'"
                (inputChange)="handleRadioChange('enterprise')"
              />
            </div>
          </div>
          @if (selectedOption()) {
            <div class="p-4 rounded-lg bg-card border-default">
              <p class="text-sm text-foreground">
                <strong>Selected Option:</strong> {{ selectedOption() }}
              </p>
            </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class RadioDemoPageComponent {
  readonly selectedOption = signal<string | null>(null);

  handleRadioChange(value: string): void {
    this.selectedOption.set(value);
  }
}


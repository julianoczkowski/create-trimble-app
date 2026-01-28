import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusSelectComponent } from '../modus-select.component';
import { ModusInputLabelComponent } from '../modus-input-label.component';
import type { ISelectOption } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Select component.
 *
 * Demonstrates select features including:
 * - Basic select
 * - Sizes
 * - Required fields
 * - With labels
 * - Interactive examples
 */
@Component({
  selector: 'app-select-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusSelectComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Select"
      description="Select components provide a dropdown menu for choosing from a list of options. Use selects when you have multiple options and want to save space compared to radio buttons."
    >
      <demo-example
        title="Basic Select"
        description="Simple select dropdown with options."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="country-select" labelText="Choose a Country" />
            <modus-select
              inputId="country-select"
              label="Choose a country"
              [options]="countryOptions"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="language-select" labelText="Select Language" />
            <modus-select
              inputId="language-select"
              label="Select Language"
              [options]="languageOptions"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Select Sizes"
        description="Select dropdowns in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-select" labelText="Small" />
            <modus-select
              inputId="small-select"
              label="Small"
              [options]="sizeOptions"
              size="sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-select" labelText="Medium (Default)" />
            <modus-select
              inputId="medium-select"
              label="Medium"
              [options]="sizeOptions"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-select" labelText="Large" />
            <modus-select
              inputId="large-select"
              label="Large"
              [options]="sizeOptions"
              size="lg"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required Select"
        description="Select dropdowns marked as required fields."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-select" labelText="Required Field" [required]="true" />
            <modus-select
              inputId="required-select"
              label="Required Field"
              [options]="countryOptions"
              [required]="true"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Disabled Select"
        description="Select dropdowns in disabled state."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-select" labelText="Disabled" />
            <modus-select
              inputId="disabled-select"
              label="Disabled"
              [options]="countryOptions"
              [disabled]="true"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Select with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-select" labelText="Choose Your Country" />
            <modus-select
              inputId="interactive-select"
              label="Choose Your Country"
              [options]="countryOptions"
              [value]="selectedCountry()"
              (inputChange)="handleCountryChange($event)"
            />
          </div>
          @if (selectedCountry()) {
            <div class="p-4 rounded-lg bg-card border-default">
              <p class="text-sm text-foreground">
                <strong>Selected Country:</strong> {{ selectedCountry() }}
              </p>
            </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SelectDemoPageComponent {
  readonly countryOptions: ISelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ];

  readonly languageOptions: ISelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Japanese', value: 'ja' },
  ];

  readonly sizeOptions: ISelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  readonly selectedCountry = signal<string>('');

  handleCountryChange(event: InputEvent): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCountry.set(target.value);
  }
}


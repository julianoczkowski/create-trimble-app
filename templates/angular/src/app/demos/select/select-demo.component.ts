import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusSelectComponent } from '../../components/modus-select.component';
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
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusSelectComponent],
  template: `
    <demo-page
      title="Modus Select"
      description="Select components provide a dropdown menu for choosing from a list of options. Use selects when you have multiple options and want to save space compared to radio buttons."
    >
      <demo-example title="Basic Select" description="Simple select dropdown with options.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-select
              inputId="country-select"
              label="Choose a country"
              [options]="countryOptions"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-select
              inputId="language-select"
              label="Select Language"
              [options]="languageOptions"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Select Sizes" description="Select dropdowns in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-select inputId="small-select" label="Small" [options]="sizeOptions" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-select
              inputId="medium-select"
              label="Medium"
              [options]="sizeOptions"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-select inputId="large-select" label="Large" [options]="sizeOptions" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example title="Disabled Select" description="Select dropdowns in disabled state.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-select
              inputId="disabled-select"
              label="Disabled"
              [options]="countryOptions"
              [disabled]="true"
            />
          </div>
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
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusAutocompleteComponent } from '../../components/modus-autocomplete.component';
import type { IAutocompleteItem } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Autocomplete component.
 *
 * Demonstrates autocomplete features including:
 * - Basic single-select autocomplete
 * - Multi-select with chips
 * - Different sizes and states
 * - Custom no-results content
 * - Loading states with spinner
 * - Debounce and minimum character examples
 */
@Component({
  selector: 'app-autocomplete-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusAutocompleteComponent],
  template: `
    <demo-page
      title="Modus Autocomplete"
      description="Autocomplete provides input suggestions as users type. Use autocomplete to help users find and select from a list of options quickly and efficiently."
    >
      <demo-example
        title="Basic Autocomplete"
        description="Simple single-select autocomplete with a list of options."
      >
        <modus-autocomplete
          label="Search Countries"
          placeholder="Type to search..."
          [items]="countryItems()"
          [value]="selectedCountry()"
          (itemSelect)="handleCountrySelect($event)"
        />
      </demo-example>

      <demo-example
        title="Multi-Select Autocomplete"
        description="Allow users to select multiple items with chips displayed for selected values."
      >
        <modus-autocomplete
          label="Select Skills"
          placeholder="Type to search skills..."
          [items]="skillItems()"
          [multiSelect]="true"
          (itemSelect)="handleSkillSelect($event)"
        />
        @if (selectedSkills().length > 0) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Selected Skills:</div>
            <div class="text-sm">{{ selectedSkills().join(', ') }}</div>
          </div>
        }
      </demo-example>

      <demo-example
        title="Autocomplete Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-col gap-4">
          <modus-autocomplete
            label="Small Autocomplete"
            placeholder="Small size..."
            [items]="sizeItems()"
            size="sm"
          />
          <modus-autocomplete
            label="Medium Autocomplete"
            placeholder="Medium size..."
            [items]="sizeItems()"
            size="md"
          />
          <modus-autocomplete
            label="Large Autocomplete"
            placeholder="Large size..."
            [items]="sizeItems()"
            size="lg"
          />
        </div>
      </demo-example>

      <demo-example
        title="Disabled and Read-Only States"
        description="Autocomplete in disabled and read-only states."
      >
        <div class="flex flex-col gap-4">
          <modus-autocomplete
            label="Disabled Autocomplete"
            placeholder="This is disabled"
            [items]="stateItems()"
            [disabled]="true"
          />
          <modus-autocomplete
            label="Read-Only Autocomplete"
            placeholder="This is read-only"
            [items]="stateItems()"
            value="Read-only value"
            [readOnly]="true"
          />
        </div>
      </demo-example>

      <demo-example
        title="Loading State"
        description="Show a spinner while fetching or processing autocomplete results."
      >
        <modus-autocomplete
          label="Search with Loading"
          placeholder="Type to search..."
          [items]="loadingItems()"
        />
      </demo-example>
    </demo-page>
  `,
})
export class AutocompleteDemoPageComponent {
  readonly selectedCountry = signal<string>('');
  readonly selectedSkills = signal<string[]>([]);

  readonly countryItems = signal<IAutocompleteItem[]>([
    { label: 'United States', value: 'us', visibleInMenu: true },
    { label: 'Canada', value: 'ca', visibleInMenu: true },
    { label: 'United Kingdom', value: 'uk', visibleInMenu: true },
    { label: 'Australia', value: 'au', visibleInMenu: true },
    { label: 'Germany', value: 'de', visibleInMenu: true },
    { label: 'France', value: 'fr', visibleInMenu: true },
    { label: 'Japan', value: 'jp', visibleInMenu: true },
  ]);

  readonly skillItems = signal<IAutocompleteItem[]>([
    { label: 'Angular', value: 'angular', visibleInMenu: true },
    { label: 'React', value: 'react', visibleInMenu: true },
    { label: 'Vue.js', value: 'vue', visibleInMenu: true },
    { label: 'TypeScript', value: 'typescript', visibleInMenu: true },
    { label: 'JavaScript', value: 'javascript', visibleInMenu: true },
    { label: 'Node.js', value: 'nodejs', visibleInMenu: true },
    { label: 'Python', value: 'python', visibleInMenu: true },
  ]);

  readonly sizeItems = signal<IAutocompleteItem[]>([
    { label: 'Option 1', value: '1', visibleInMenu: true },
    { label: 'Option 2', value: '2', visibleInMenu: true },
    { label: 'Option 3', value: '3', visibleInMenu: true },
  ]);

  readonly stateItems = signal<IAutocompleteItem[]>([
    { label: 'Option A', value: 'a', visibleInMenu: true },
    { label: 'Option B', value: 'b', visibleInMenu: true },
  ]);

  readonly loadingItems = signal<IAutocompleteItem[]>([
    { label: 'Result 1', value: '1', visibleInMenu: true },
    { label: 'Result 2', value: '2', visibleInMenu: true },
  ]);

  handleCountrySelect(item: IAutocompleteItem): void {
    this.selectedCountry.set(item.value);
    console.log('Selected country:', item);
  }

  handleSkillSelect(item: IAutocompleteItem): void {
    const current = this.selectedSkills();
    if (current.includes(item.value)) {
      this.selectedSkills.set(current.filter((v) => v !== item.value));
    } else {
      this.selectedSkills.set([...current, item.value]);
    }
    console.log('Selected skills:', this.selectedSkills());
  }
}

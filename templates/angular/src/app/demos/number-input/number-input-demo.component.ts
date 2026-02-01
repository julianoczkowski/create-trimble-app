import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusNumberInputComponent } from '../../components/modus-number-input.component';

/**
 * Demo page showcasing the Modus Number Input component.
 *
 * Demonstrates number input features including:
 * - Basic number input
 * - Sizes
 * - Min/max/step validation
 * - Currency symbol
 * - With labels and feedback
 */
@Component({
  selector: 'app-number-input-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusNumberInputComponent,
  ],
  template: `
    <demo-page
      title="Modus Number Input"
      description="Number inputs provide a controlled way to enter numeric values. Use number inputs for quantities, amounts, ratings, or any numeric data entry."
    >
      <demo-example title="Basic Number Input" description="Simple number input with label.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="quantity-input"
              label="Quantity"
              placeholder="0"
              [step]="1"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="price-input"
              label="Price"
              placeholder="0.00"
              [step]="0.01"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Number Input Sizes" description="Number inputs in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-number-input inputId="small-number" label="Small" size="sm" placeholder="0" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input inputId="medium-number" label="Medium" size="md" placeholder="0" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input inputId="large-number" label="Large" size="lg" placeholder="0" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Number Input with Constraints"
        description="Number inputs with min, max, and step values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="age-input"
              label="Age"
              placeholder="Enter age"
              [min]="1"
              [max]="120"
              [step]="1"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="percentage-input"
              label="Percentage"
              placeholder="0"
              [min]="0"
              [max]="100"
              [step]="1"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="decimal-input"
              label="Decimal"
              placeholder="0.0"
              [min]="0"
              [max]="10"
              [step]="0.1"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Currency Number Input" description="Number input with currency symbol.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="usd-input"
              label="USD Amount"
              placeholder="0.00"
              currencySymbol="$"
              [step]="0.01"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="eur-input"
              label="EUR Amount"
              placeholder="0.00"
              currencySymbol="€"
              [step]="0.01"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Number input with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="interactive-number"
              label="Enter a Number"
              placeholder="0"
              [value]="numberValue()"
              [step]="1"
              (inputChange)="handleNumberChange($event)"
            />
          </div>
          @if (numberValue() !== null && numberValue() !== '') {
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground mb-2">
              <strong>Current Value:</strong> {{ numberValue() }}
            </p>
            <p class="text-sm text-foreground">
              <strong>Double Value:</strong> {{ getDoubleValue() }}
            </p>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class NumberInputDemoPageComponent {
  readonly numberValue = signal<string>('');

  handleNumberChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.numberValue.set(target.value);
  }

  getDoubleValue(): number {
    const num = parseFloat(this.numberValue());
    return isNaN(num) ? 0 : num * 2;
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusSliderComponent } from '../modus-slider.component';
import { ModusInputLabelComponent } from '../modus-input-label.component';

/**
 * Demo page showcasing the Modus Slider component.
 *
 * Demonstrates slider features including:
 * - Basic slider
 * - Sizes
 * - Min/max/step constraints
 * - Interactive examples
 */
@Component({
  selector: 'app-slider-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusSliderComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Slider"
      description="Slider components allow users to select a numeric value by dragging a handle along a track. Use sliders for volume, brightness, or any continuous numeric input."
    >
      <demo-example
        title="Basic Slider"
        description="Simple slider with default range."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="volume-slider" labelText="Volume" />
            <modus-slider inputId="volume-slider" label="Volume" [min]="0" [max]="100" [value]="50" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="temperature-slider" labelText="Temperature" />
            <modus-slider inputId="temperature-slider" label="Temperature" [min]="0" [max]="100" [value]="25" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Slider Sizes"
        description="Sliders in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-slider" labelText="Small" />
            <modus-slider inputId="small-slider" label="Small" [min]="0" [max]="100" [value]="50" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-slider" labelText="Medium (Default)" />
            <modus-slider inputId="medium-slider" label="Medium" [min]="0" [max]="100" [value]="50" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-slider" labelText="Large" />
            <modus-slider inputId="large-slider" label="Large" [min]="0" [max]="100" [value]="50" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Slider with Step Values"
        description="Sliders with custom step increments."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="step5-slider" labelText="Volume (Step 5)" />
            <modus-slider
              inputId="step5-slider"
              label="Volume"
              [min]="0"
              [max]="100"
              [value]="50"
              [step]="5"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="step10-slider" labelText="Brightness (Step 10)" />
            <modus-slider
              inputId="step10-slider"
              label="Brightness"
              [min]="0"
              [max]="100"
              [value]="50"
              [step]="10"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Slider with Custom Range"
        description="Sliders with non-standard min/max values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="range-0-10-slider" labelText="Scale (0-10)" />
            <modus-slider inputId="range-0-10-slider" label="Scale" [min]="0" [max]="10" [value]="5" [step]="1" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="range-100-200-slider" labelText="Price Range ($100-$200)" />
            <modus-slider
              inputId="range-100-200-slider"
              label="Price Range"
              [min]="100"
              [max]="200"
              [value]="150"
              [step]="10"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Slider with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-slider" labelText="Volume Control" />
            <modus-slider
              inputId="interactive-slider"
              label="Volume"
              [min]="0"
              [max]="100"
              [value]="sliderValue()"
              [step]="1"
              (inputChange)="handleSliderChange($event)"
            />
          </div>
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground">
              <strong>Current Value:</strong> {{ sliderValue() }}%
            </p>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SliderDemoPageComponent {
  readonly sliderValue = signal<number>(50);

  handleSliderChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.sliderValue.set(parseInt(target.value, 10));
  }
}


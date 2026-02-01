import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusSliderComponent } from '../../components/modus-slider.component';

/**
 * Demo page showcasing the Modus Slider component.
 *
 * Demonstrates slider features including:
 * - Basic slider
 * - Sizes
 */
@Component({
  selector: 'app-slider-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusSliderComponent],
  template: `
    <demo-page
      title="Modus Slider"
      description="Slider components allow users to select a numeric value by dragging a handle along a track. Use sliders for volume, brightness, or any continuous numeric input."
    >
      <demo-example title="Basic Slider" description="Simple slider with default range.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-slider
              inputId="volume-slider"
              label="Volume"
              [min]="0"
              [max]="100"
              [value]="50"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Slider Sizes" description="Sliders in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-slider
              inputId="small-slider"
              label="Small"
              [min]="0"
              [max]="100"
              [value]="50"
              size="sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-slider
              inputId="medium-slider"
              label="Medium"
              [min]="0"
              [max]="100"
              [value]="50"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-slider
              inputId="large-slider"
              label="Large"
              [min]="0"
              [max]="100"
              [value]="50"
              size="lg"
            />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SliderDemoPageComponent {}

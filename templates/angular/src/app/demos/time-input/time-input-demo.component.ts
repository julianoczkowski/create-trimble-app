import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTimeInputComponent } from '../../components/modus-time-input.component';

/**
 * Demo page showcasing the Modus Time Input component.
 *
 * Demonstrates time input features including:
 * - Basic time input
 * - Sizes
 * - With seconds
 * - Min/max constraints
 * - Interactive examples
 */
@Component({
  selector: 'app-time-input-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusTimeInputComponent],
  template: `
    <demo-page
      title="Modus Time Input"
      description="Time input components allow users to enter or select a time value. Use time inputs for scheduling, appointments, or any scenario requiring time selection."
    >
      <demo-example title="Basic Time Input" description="Simple time input with label.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-time-input inputId="start-time-input" label="Start time" value="09:00" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input inputId="end-time-input" label="End time" value="17:00" />
          </div>
        </div>
      </demo-example>

      <demo-example title="Time Input Sizes" description="Time inputs in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-time-input inputId="small-time-input" label="Small" value="09:00" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input inputId="medium-time-input" label="Medium" value="09:00" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input inputId="large-time-input" label="Large" value="09:00" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example title="Time Input with Seconds" description="Time inputs displaying seconds.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="seconds-time-input"
              label="Time with Seconds"
              value="09:30:45"
              [showSeconds]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="seconds-default-time-input"
              label="Default Format"
              value="09:30"
              [showSeconds]="false"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Time Input with Constraints"
        description="Time inputs with min and max values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="min-max-time-input"
              label="Business Hours"
              value="09:00"
              min="09:00"
              max="17:00"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="afternoon-time-input"
              label="Afternoon Hours"
              value="14:00"
              min="12:00"
              max="18:00"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required and Disabled States"
        description="Time inputs in required and disabled states."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="required-time-input"
              label="Required"
              value="09:00"
              [required]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-time-input
              inputId="disabled-time-input"
              label="Disabled"
              value="09:00"
              [disabled]="true"
            />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TimeInputDemoPageComponent {}

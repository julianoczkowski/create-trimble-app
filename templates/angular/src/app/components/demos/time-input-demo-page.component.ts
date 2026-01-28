import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusTimeInputComponent } from '../modus-time-input.component';
import { ModusInputLabelComponent } from '../modus-input-label.component';

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
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusTimeInputComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Time Input"
      description="Time input components allow users to enter or select a time value. Use time inputs for scheduling, appointments, or any scenario requiring time selection."
    >
      <demo-example
        title="Basic Time Input"
        description="Simple time input with label."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="start-time-input" labelText="Start Time" />
            <modus-time-input inputId="start-time-input" label="Start time" value="09:00" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="end-time-input" labelText="End Time" />
            <modus-time-input inputId="end-time-input" label="End time" value="17:00" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Time Input Sizes"
        description="Time inputs in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-time-input" labelText="Small" />
            <modus-time-input inputId="small-time-input" label="Small" value="09:00" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-time-input" labelText="Medium (Default)" />
            <modus-time-input inputId="medium-time-input" label="Medium" value="09:00" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-time-input" labelText="Large" />
            <modus-time-input inputId="large-time-input" label="Large" value="09:00" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Time Input with Seconds"
        description="Time inputs displaying seconds."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="seconds-time-input" labelText="Time with Seconds" />
            <modus-time-input inputId="seconds-time-input" label="Time with Seconds" value="09:30:45" [showSeconds]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="seconds-default-time-input" labelText="Default Format (HH:mm)" />
            <modus-time-input inputId="seconds-default-time-input" label="Default Format" value="09:30" [showSeconds]="false" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Time Input with Constraints"
        description="Time inputs with min and max values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="min-max-time-input" labelText="Business Hours (9:00 - 17:00)" />
            <modus-time-input
              inputId="min-max-time-input"
              label="Business Hours"
              value="09:00"
              min="09:00"
              max="17:00"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="afternoon-time-input" labelText="Afternoon Hours (12:00 - 18:00)" />
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
            <modus-input-label forId="required-time-input" labelText="Required Field" [required]="true" />
            <modus-time-input inputId="required-time-input" label="Required" value="09:00" [required]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-time-input" labelText="Disabled Field" />
            <modus-time-input
              inputId="disabled-time-input"
              label="Disabled"
              value="09:00"
              [disabled]="true"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Time input with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-time-input" labelText="Select Appointment Time" />
            <modus-time-input
              inputId="interactive-time-input"
              label="Select Appointment Time"
              [value]="timeValue()"
              (inputChange)="handleTimeChange($event)"
            />
          </div>
          @if (timeValue()) {
            <div class="p-4 rounded-lg bg-card border-default">
              <p class="text-sm text-foreground">
                <strong>Selected Time:</strong> {{ timeValue() }}
              </p>
            </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TimeInputDemoPageComponent {
  readonly timeValue = signal<string>('09:00');

  handleTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.timeValue.set(target.value);
  }
}


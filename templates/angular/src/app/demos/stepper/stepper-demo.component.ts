import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusStepperComponent, IStepperItem } from '../../components/modus-stepper.component';

/**
 * Demo page showcasing the Modus Stepper component.
 *
 * Demonstrates stepper features including:
 * - Horizontal stepper
 * - Vertical stepper
 * - Step colors
 * - Custom content
 */
@Component({
  selector: 'app-stepper-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusStepperComponent],
  template: `
    <demo-page
      title="Modus Stepper"
      description="Stepper components display a list of steps in a process or workflow. Use steppers to guide users through multi-step forms, wizards, or sequential processes."
    >
      <demo-example title="Horizontal Stepper" description="Stepper displayed horizontally.">
        <div class="flex flex-col gap-6">
          <modus-stepper [steps]="horizontalSteps" orientation="horizontal" />
        </div>
      </demo-example>

      <demo-example title="Vertical Stepper" description="Stepper displayed vertically.">
        <div class="flex flex-col gap-6">
          <modus-stepper [steps]="verticalSteps" orientation="vertical" />
        </div>
      </demo-example>

      <demo-example title="Stepper with Colors" description="Steps with different color themes.">
        <div class="flex flex-col gap-6">
          <modus-stepper [steps]="coloredSteps" orientation="horizontal" />
        </div>
      </demo-example>

      <demo-example
        title="Stepper with Custom Content"
        description="Steps with custom content in indicators."
      >
        <div class="flex flex-col gap-6">
          <modus-stepper [steps]="customContentSteps" orientation="horizontal" />
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class StepperDemoPageComponent {
  readonly horizontalSteps: IStepperItem[] = [
    { label: 'Step 1', color: 'primary' },
    { label: 'Step 2', color: 'info' },
    { label: 'Step 3' },
  ];

  readonly verticalSteps: IStepperItem[] = [
    { label: 'Setup', color: 'success' },
    { label: 'Configure', color: 'warning' },
    { label: 'Deploy', color: 'error' },
  ];

  readonly coloredSteps: IStepperItem[] = [
    { label: 'Primary', color: 'primary' },
    { label: 'Success', color: 'success' },
    { label: 'Warning', color: 'warning' },
    { label: 'Error', color: 'error' },
  ];

  readonly customContentSteps: IStepperItem[] = [
    { label: 'Step 1', content: '1' },
    { label: 'Step 2', content: '✓' },
    { label: 'Step 3', content: '3' },
  ];
}

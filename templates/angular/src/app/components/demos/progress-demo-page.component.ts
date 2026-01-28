import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusProgressComponent } from '../modus-progress.component';
import { ModusButtonComponent } from '../modus-button.component';

/**
 * Demo page showcasing the Modus Progress component.
 *
 * Demonstrates progress features including:
 * - Basic progress bars
 * - Different values
 * - Radial progress
 * - Indeterminate progress
 * - With labels
 */
@Component({
  selector: 'app-progress-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusProgressComponent,
    ModusButtonComponent,
  ],
  template: `
    <demo-page
      title="Modus Progress"
      description="Progress components indicate the completion status of a task or process. Use progress bars for file uploads, form completion, or any process with measurable progress."
    >
      <demo-example
        title="Basic Progress Bar"
        description="Simple progress bars with different values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">0%</p>
            <modus-progress [value]="0" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">25%</p>
            <modus-progress [value]="25" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">50%</p>
            <modus-progress [value]="50" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">75%</p>
            <modus-progress [value]="75" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">100%</p>
            <modus-progress [value]="100" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Progress with Labels"
        description="Progress bars with custom labels."
      >
        <div class="flex flex-col gap-6">
          <modus-progress [value]="45" [label]="'45% complete'" />
          <modus-progress [value]="72" [label]="'72%'" />
          <modus-progress [value]="90" [label]="'Almost done'" />
        </div>
      </demo-example>

      <demo-example
        title="Radial Progress"
        description="Radial progress indicators for compact spaces."
      >
        <div class="flex flex-wrap gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">25%</p>
            <modus-progress variant="radial" [value]="25" [label]="'25%'" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">50%</p>
            <modus-progress variant="radial" [value]="50" [label]="'50%'" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">75%</p>
            <modus-progress variant="radial" [value]="75" [label]="'75%'" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">100%</p>
            <modus-progress variant="radial" [value]="100" [label]="'100%'" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Radial Progress with Custom Content"
        description="Radial progress with custom content in the center."
      >
        <div class="flex flex-wrap gap-6">
          <modus-progress variant="radial" [value]="72" [label]="'72%'">
            <strong class="text-lg text-foreground">72%</strong>
          </modus-progress>
          <modus-progress variant="radial" [value]="90" [label]="'90%'">
            <div class="text-center">
              <strong class="text-lg text-foreground">90%</strong>
              <p class="text-xs text-muted-foreground">Complete</p>
            </div>
          </modus-progress>
        </div>
      </demo-example>

      <demo-example
        title="Indeterminate Progress"
        description="Progress bars for tasks with unknown duration."
      >
        <div class="flex flex-col gap-6">
          <modus-progress [indeterminate]="true" />
          <p class="text-sm text-muted-foreground">
            Use indeterminate progress when the duration of a task is unknown.
          </p>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Dynamic progress bar that updates over time."
      >
        <div class="flex flex-col gap-6">
          <modus-progress [value]="progressValue()" [label]="progressLabel()" />
          <div class="flex gap-2">
            <modus-button color="primary" size="sm" (buttonClick)="startProgress()">
              Start Progress
            </modus-button>
            <modus-button color="secondary" size="sm" (buttonClick)="resetProgress()">
              Reset
            </modus-button>
          </div>
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground">
              <strong>Current Value:</strong> {{ progressValue() }}%
            </p>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class ProgressDemoPageComponent {
  readonly progressValue = signal<number>(0);
  private progressInterval: ReturnType<typeof setInterval> | null = null;

  readonly progressLabel = signal<string>('0%');

  startProgress(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progressValue.set(0);
    this.progressInterval = setInterval(() => {
      this.progressValue.update((value) => {
        const newValue = Math.min(value + 5, 100);
        this.progressLabel.set(`${newValue}%`);
        if (newValue >= 100 && this.progressInterval) {
          clearInterval(this.progressInterval);
          this.progressInterval = null;
        }
        return newValue;
      });
    }, 200);
  }

  resetProgress(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progressValue.set(0);
    this.progressLabel.set('0%');
  }
}


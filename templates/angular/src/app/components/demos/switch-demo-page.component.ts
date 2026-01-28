import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusSwitchComponent } from '../modus-switch.component';
import { ModusInputLabelComponent } from '../modus-input-label.component';

/**
 * Demo page showcasing the Modus Switch component.
 *
 * Demonstrates switch features including:
 * - Basic switch
 * - Sizes
 * - Required fields
 * - Disabled state
 * - Interactive examples
 */
@Component({
  selector: 'app-switch-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusSwitchComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Switch"
      description="Switch components allow users to toggle between on and off states. Use switches for binary settings like enabling/disabling features or turning notifications on/off."
    >
      <demo-example
        title="Basic Switch"
        description="Simple switch toggle controls."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="notifications-switch" labelText="Notifications" />
            <modus-switch inputId="notifications-switch" label="Enable notifications" [value]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="dark-mode-switch" labelText="Dark Mode" />
            <modus-switch inputId="dark-mode-switch" label="Dark mode" [value]="false" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Switch Sizes"
        description="Switches in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-switch" labelText="Small" />
            <modus-switch inputId="small-switch" label="Small switch" size="sm" [value]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-switch" labelText="Medium (Default)" />
            <modus-switch inputId="medium-switch" label="Medium switch" size="md" [value]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-switch" labelText="Large" />
            <modus-switch inputId="large-switch" label="Large switch" size="lg" [value]="true" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required Switch"
        description="Switches marked as required fields."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-switch" labelText="Terms Agreement" [required]="true" />
            <modus-switch
              inputId="required-switch"
              label="I agree to the terms and conditions"
              [required]="true"
              [value]="false"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Disabled Switch"
        description="Switches in disabled state."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-on-switch" labelText="Disabled (On)" />
            <modus-switch inputId="disabled-on-switch" label="Disabled switch (on)" [disabled]="true" [value]="true" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-off-switch" labelText="Disabled (Off)" />
            <modus-switch
              inputId="disabled-off-switch"
              label="Disabled switch (off)"
              [disabled]="true"
              [value]="false"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Switches with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-switch" labelText="Settings" />
            <modus-switch
              inputId="interactive-switch"
              label="Enable email notifications"
              [value]="notificationsEnabled()"
              (inputChange)="handleSwitchChange($event)"
            />
          </div>
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground">
              <strong>Notifications:</strong> {{ notificationsEnabled() ? 'Enabled' : 'Disabled' }}
            </p>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SwitchDemoPageComponent {
  readonly notificationsEnabled = signal<boolean>(false);

  handleSwitchChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.notificationsEnabled.set(target.checked);
  }
}


import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusAlertComponent } from '../modus-alert.component';

/**
 * Demo page showcasing the Modus Alert component.
 *
 * Demonstrates alert features including:
 * - Alert variants (info, success, warning, error)
 * - Dismissible vs persistent alerts
 * - With and without custom icons
 * - Different roles (alert, status, etc.)
 * - Interactive examples with dismiss handling
 */
@Component({
  selector: 'app-alert-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusAlertComponent],
  template: `
    <demo-page
      title="Modus Alert"
      description="Alerts communicate important messages to users. Use alerts to notify users about success, warnings, errors, or informational messages."
    >
      <demo-example
        title="Alert Variants"
        description="Different alert variants for various message types and contexts."
      >
        <div class="flex flex-col gap-4">
          <modus-alert
            alertTitle="Info Alert"
            alertDescription="This is an informational message."
            variant="info"
          />
          <modus-alert
            alertTitle="Success Alert"
            alertDescription="Your action was completed successfully."
            variant="success"
          />
          <modus-alert
            alertTitle="Warning Alert"
            alertDescription="Please review this important warning."
            variant="warning"
          />
          <modus-alert
            alertTitle="Error Alert"
            alertDescription="An error occurred. Please try again."
            variant="error"
          />
        </div>
      </demo-example>

      <demo-example
        title="Dismissible Alerts"
        description="Alerts that can be dismissed by users with a close button."
      >
        <div class="flex flex-col gap-4">
          <modus-alert
            alertTitle="Dismissible Info Alert"
            alertDescription="You can close this alert."
            variant="info"
            [dismissible]="true"
          />
          <modus-alert
            alertTitle="Dismissible Success Alert"
            alertDescription="This alert can be dismissed."
            variant="success"
            [dismissible]="true"
          />
          <modus-alert
            alertTitle="Dismissible Warning Alert"
            alertDescription="Close this alert when you're done."
            variant="warning"
            [dismissible]="true"
          />
          <modus-alert
            alertTitle="Dismissible Error Alert"
            alertDescription="Dismiss this error alert after reviewing."
            variant="error"
            [dismissible]="true"
          />
        </div>
      </demo-example>

      <demo-example
        title="Alerts with Custom Icons"
        description="Enhance alerts with custom icons for better visual communication."
      >
        <div class="flex flex-col gap-4">
          <modus-alert
            alertTitle="Notification"
            alertDescription="You have new messages."
            variant="info"
            icon="notifications"
          />
          <modus-alert
            alertTitle="File Uploaded"
            alertDescription="Your file has been uploaded successfully."
            variant="success"
            icon="upload"
          />
          <modus-alert
            alertTitle="System Maintenance"
            alertDescription="Scheduled maintenance in 2 hours."
            variant="warning"
            icon="warning"
          />
          <modus-alert
            alertTitle="Connection Failed"
            alertDescription="Unable to connect to the server."
            variant="error"
          />
        </div>
      </demo-example>

      <demo-example
        title="Alert Roles"
        description="Different ARIA roles for various alert purposes and accessibility."
      >
        <div class="flex flex-col gap-4">
          <modus-alert
            alertTitle="Alert Role"
            alertDescription="Use role='alert' for important, time-sensitive messages."
            variant="error"
            role="alert"
          />
          <modus-alert
            alertTitle="Status Role"
            alertDescription="Use role='status' for advisory messages that don't require immediate attention."
            variant="info"
            role="status"
          />
          <modus-alert
            alertTitle="Log Role"
            alertDescription="Use role='log' for sequential messages like chat or activity logs."
            variant="info"
            role="log"
          />
        </div>
      </demo-example>

      <demo-example
        title="Alerts Without Descriptions"
        description="Simple alerts with just a title for concise messaging."
      >
        <div class="flex flex-col gap-4">
          <modus-alert alertTitle="Short message" variant="info" />
          <modus-alert alertTitle="Operation complete" variant="success" />
          <modus-alert alertTitle="Action required" variant="warning" />
          <modus-alert alertTitle="Something went wrong" variant="error" />
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Alert with dismiss handling to track user interactions."
      >
        <div class="p-6 rounded-lg bg-card text-card-foreground border-default">
          <modus-alert
            alertTitle="Dismiss Me"
            alertDescription="Click the close button to see the event handler in action."
            variant="info"
            [dismissible]="true"
            (dismiss)="handleDismiss()"
          />
          @if (dismissCount() > 0) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Alert Dismissed!</div>
            <div class="text-sm">
              This alert has been dismissed {{ dismissCount() }}
              {{ dismissCount() === 1 ? 'time' : 'times' }}.
            </div>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class AlertDemoPageComponent {
  readonly dismissCount = signal<number>(0);

  handleDismiss(): void {
    this.dismissCount.update((count) => count + 1);
    console.log('Alert dismissed');
  }
}

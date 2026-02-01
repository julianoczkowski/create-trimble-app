import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusAlertComponent } from '../../components/modus-alert.component';

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
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class AlertDemoPageComponent {}

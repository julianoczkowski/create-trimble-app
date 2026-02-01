import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusTextInputComponent } from '../../components/modus-text-input.component';
import { ModusSwitchComponent } from '../../components/modus-switch.component';
import { ModusUtilityPanelComponent } from '../../components/modus-utility-panel.component';

interface UtilityPanelFormState {
  projectName: string;
  email: string;
  notifications: boolean;
  autoSave: boolean;
}

/**
 * Demo page showcasing the Modus Utility Panel component.
 */
@Component({
  selector: 'app-utility-panel-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusButtonComponent,
    ModusTextInputComponent,
    ModusSwitchComponent,
    ModusUtilityPanelComponent,
  ],
  template: `
    <demo-page
      title="Modus Utility Panel"
      description="Utility panels slide in contextual information or controls without leaving the page. Keep content focused and provide clear actions."
    >
      <demo-example
        title="Settings Panel with Form Controls"
        description="A utility panel containing form inputs and controls. The panel can be toggled to show or hide additional settings without leaving the main workspace."
      >
        <div class="space-y-6">
          <!-- Toggle controls section -->
          <div class="flex gap-4 items-center">
            <modus-button
              color="primary"
              size="sm"
              (buttonClick)="togglePanel()"
            >
              {{ expanded() ? 'Close' : 'Open' }} Settings Panel
            </modus-button>
            <div class="text-sm text-muted-foreground">
              Panel state: {{ expanded() ? 'Open' : 'Closed' }}
            </div>
          </div>

          <!-- Main content area -->
          <div class="p-6 bg-card rounded-lg border-default">
            <div class="text-xl font-semibold text-foreground mb-3">Main Workspace</div>
            <div class="text-muted-foreground mb-4">
              This is the primary content area. The utility panel slides in from the right to
              provide additional controls and settings without leaving this workspace.
            </div>
            <div class="space-y-2 text-sm">
              <div class="text-foreground">
                Panel Position: <span class="text-muted-foreground">Right side (default)</span>
              </div>
              <div class="text-foreground">
                Panel Width: <span class="text-muted-foreground">312px (default)</span>
              </div>
              <div class="text-foreground">
                Overlay Mode: <span class="text-muted-foreground">Yes</span>
              </div>
              <div class="text-foreground">
                Current Form Data:
                <div class="text-muted-foreground mt-2 bg-muted rounded-lg p-3 border-default">
                  {{ formData() | json }}
                </div>
              </div>
            </div>
          </div>

          @if (saveMessage()) {
            <div class="text-sm text-success">{{ saveMessage() }}</div>
          }
        </div>
      </demo-example>
    </demo-page>

    <!-- Fixed positioned utility panel - outside the demo content flow -->
    <modus-utility-panel
      [expanded]="expanded()"
      position="right"
      panelWidth="312px"
      ariaLabel="Project settings panel"
      className="fixed-utility-panel"
    >
      <div
        slot="header"
        class="flex items-center justify-between w-full min-w-full max-w-full"
      >
        <div class="text-xl font-bold text-foreground">Project Settings</div>
        <modus-button
          size="sm"
          color="secondary"
          variant="borderless"
          shape="circle"
          icon="close"
          iconPosition="only"
          ariaLabel="Close panel"
          (buttonClick)="closePanel()"
        />
      </div>

      <div class="space-y-4">
        <div>
          <modus-text-input
            label="Project Name"
            [value]="formData().projectName"
            placeholder="Enter project name"
            (inputChange)="handleInputChange('projectName', $event)"
          />
        </div>

        <div>
          <modus-text-input
            label="Email"
            type="email"
            [value]="formData().email"
            placeholder="Enter email address"
            (inputChange)="handleInputChange('email', $event)"
          />
        </div>

        <div class="space-y-3">
          <modus-switch
            label="Enable Notifications"
            [value]="formData().notifications"
            (inputChange)="handleSwitchChange('notifications', $event)"
          />

          <modus-switch
            label="Auto-save Changes"
            [value]="formData().autoSave"
            (inputChange)="handleSwitchChange('autoSave', $event)"
          />
        </div>

        <div class="pt-2 text-xs text-muted-foreground">
          <div>• Panel slides over main content</div>
          <div>• Form state is preserved when toggling</div>
          <div>• Settings are applied immediately</div>
        </div>
      </div>

      <div slot="footer" class="flex gap-2 justify-end">
        <modus-button size="md" color="secondary" (buttonClick)="closePanel()">
          Close
        </modus-button>
        <modus-button size="md" color="primary" (buttonClick)="handleSave()">
          Save Settings
        </modus-button>
      </div>
    </modus-utility-panel>
  `,
})
export class UtilityPanelDemoPageComponent {
  readonly expanded = signal<boolean>(false);
  readonly saveMessage = signal<string>('');
  readonly formData = signal<UtilityPanelFormState>({
    projectName: '',
    email: '',
    notifications: true,
    autoSave: false,
  });

  togglePanel(): void {
    this.expanded.set(!this.expanded());
  }

  closePanel(): void {
    this.expanded.set(false);
  }

  handleInputChange(field: 'projectName' | 'email', event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.formData.update((data) => ({ ...data, [field]: target.value }));
  }

  handleSwitchChange(field: 'notifications' | 'autoSave', event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.formData.update((data) => ({ ...data, [field]: target.checked }));
  }

  handleSave(): void {
    this.saveMessage.set('Settings saved. Check the form data above for current values.');
  }
}

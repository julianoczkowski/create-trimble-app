import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusPanelComponent } from '../../components/modus-panel.component';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusMenuComponent } from '../../components/modus-menu.component';
import { ModusMenuItemComponent } from '../../components/modus-menu-item.component';

/**
 * Demo page showcasing the Modus Panel component.
 */
@Component({
  selector: 'app-panel-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusPanelComponent,
    ModusButtonComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
  ],
  template: `
    <demo-page
      title="Modus Panel"
      description="Panel is a layout component for organizing content with header, body, and footer sections. Ideal for side navigation, structured forms, and sectioned content areas."
    >
      <demo-example title="Basic Panel" description="A panel with header, body, and footer slots.">
        <modus-panel width="280px" height="400px">
          <div slot="header" class="p-4 border-bottom-default">
            <div class="text-lg font-medium text-foreground">Panel Header</div>
          </div>
          <div slot="body" class="p-4">
            <div class="text-sm text-foreground">
              This is the body content of the panel. You can add any content here.
            </div>
            <div class="mt-4 text-sm text-muted-foreground">
              Panels are great for organizing related content into distinct sections.
            </div>
          </div>
          <div slot="footer" class="p-4 border-top-default flex gap-2">
            <modus-button variant="outlined" color="secondary" size="sm">Cancel</modus-button>
            <modus-button variant="filled" color="primary" size="sm">Save</modus-button>
          </div>
        </modus-panel>
      </demo-example>

      <demo-example
        title="Floating Panel"
        description="A floating panel with elevated shadow for overlay appearance."
      >
        <div class="p-8 bg-muted rounded-lg">
          <modus-panel width="300px" height="auto" [floating]="true">
            <div slot="header" class="p-4 border-bottom-default">
              <div class="text-lg font-medium text-foreground">Quick Actions</div>
            </div>
            <div slot="body" class="p-4 flex flex-col gap-2">
              <modus-button variant="outlined" color="primary" [fullWidth]="true" icon="add" iconPosition="left">
                New Document
              </modus-button>
              <modus-button
                variant="outlined"
                color="primary"
                [fullWidth]="true"
                icon="upload"
                iconPosition="left"
              >
                Upload File
              </modus-button>
              <modus-button
                variant="outlined"
                color="primary"
                [fullWidth]="true"
                icon="folder_new"
                iconPosition="left"
              >
                Create Folder
              </modus-button>
            </div>
          </modus-panel>
        </div>
      </demo-example>

      <demo-example title="Navigation Panel" description="A panel configured as a side navigation.">
        <modus-panel width="260px" height="450px">
          <div slot="header" class="p-3 border-bottom-default flex items-center gap-2">
            <i class="modus-icons text-lg text-foreground" aria-hidden="true">apps</i>
            <div class="text-sm font-medium text-foreground">Application</div>
          </div>
          <div slot="body">
            <modus-menu size="lg">
              <modus-menu-item label="Dashboard" value="dashboard" startIcon="dashboard" />
              <modus-menu-item label="Projects" value="projects" startIcon="folder_open" />
              <modus-menu-item label="Team" value="team" startIcon="people_group" />
              <modus-menu-item label="Calendar" value="calendar" startIcon="calendar" />
              <modus-menu-item label="Documents" value="documents" startIcon="description" />
              <modus-menu-item label="Reports" value="reports" startIcon="bar_graph" />
            </modus-menu>
          </div>
          <div slot="footer" class="border-top-default">
            <modus-menu>
              <modus-menu-item label="Settings" value="settings" startIcon="settings" />
              <modus-menu-item label="Help" value="help" startIcon="help" />
            </modus-menu>
          </div>
        </modus-panel>
      </demo-example>

      <demo-example title="Body-Only Panel" description="A panel with only body content.">
        <modus-panel width="250px" height="auto">
          <modus-menu size="lg">
            <modus-menu-item label="Dashboard" value="dashboard" />
            <modus-menu-item label="Projects" value="projects" />
            <modus-menu-item label="Team" value="team" />
            <modus-menu-item label="Calendar" value="calendar" />
          </modus-menu>
        </modus-panel>
      </demo-example>

      <demo-example title="Panel Dimensions" description="Panels can have custom width and height values.">
        <div class="flex flex-wrap gap-4">
          <modus-panel width="200px" height="200px">
            <div slot="header" class="p-3 border-bottom-default text-sm font-medium text-foreground">
              200x200
            </div>
            <div slot="body" class="p-3 text-xs text-muted-foreground">Small square panel</div>
          </modus-panel>
          <modus-panel width="300px" height="200px">
            <div slot="header" class="p-3 border-bottom-default text-sm font-medium text-foreground">
              300x200
            </div>
            <div slot="body" class="p-3 text-xs text-muted-foreground">Wide panel</div>
          </modus-panel>
          <modus-panel width="200px" height="300px">
            <div slot="header" class="p-3 border-bottom-default text-sm font-medium text-foreground">
              200x300
            </div>
            <div slot="body" class="p-3 text-xs text-muted-foreground">Tall panel</div>
          </modus-panel>
        </div>
      </demo-example>

      <demo-example title="Auto Height Panel" description="Panel with automatic height based on content.">
        <modus-panel width="300px" height="auto">
          <div slot="header" class="p-4 border-bottom-default">
            <div class="text-lg font-medium text-foreground">Auto Height</div>
          </div>
          <div slot="body" class="p-4">
            <div class="text-sm text-foreground mb-4">This panel grows to fit its content.</div>
            <div class="text-sm text-muted-foreground space-y-2">
              <div>Item 1 - First item in the list</div>
              <div>Item 2 - Second item in the list</div>
              <div>Item 3 - Third item in the list</div>
            </div>
          </div>
          <div slot="footer" class="p-4 border-top-default">
            <modus-button variant="filled" color="primary" [fullWidth]="true">Submit</modus-button>
          </div>
        </modus-panel>
      </demo-example>

      <demo-example title="Custom Content Panel" description="Panel with rich custom content in all slots.">
        <modus-panel width="320px" height="auto">
          <div slot="header" class="p-4 bg-primary">
            <div class="text-lg font-semibold text-primary-foreground">Featured Content</div>
            <div class="text-sm text-primary-foreground">Latest updates</div>
          </div>
          <div slot="body" class="p-4">
            <div class="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <i class="modus-icons text-4xl text-muted-foreground" aria-hidden="true">image</i>
            </div>
            <div class="text-base font-medium text-foreground mb-2">Article Title</div>
            <div class="text-sm text-muted-foreground mb-4">
              This is a brief description of the article content that gives readers an idea of what to
              expect.
            </div>
            <div class="flex gap-2">
              <div class="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">Tag 1</div>
              <div class="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">Tag 2</div>
            </div>
          </div>
          <div slot="footer" class="p-4 border-top-default flex justify-between items-center">
            <div class="text-xs text-muted-foreground">5 min read</div>
            <modus-button variant="borderless" color="primary" size="sm">Read More</modus-button>
          </div>
        </modus-panel>
      </demo-example>

      <demo-example title="Full Width Panel" description="Panel that spans the full width of its container.">
        <modus-panel width="100%" height="auto">
          <div slot="header" class="p-4 border-bottom-default flex justify-between items-center">
            <div class="text-lg font-medium text-foreground">Full Width Panel</div>
            <modus-button
              variant="outlined"
              color="secondary"
              size="sm"
              icon="close"
              iconPosition="only"
              ariaLabel="Close"
            />
          </div>
          <div slot="body" class="p-4">
            <div class="text-sm text-foreground">
              This panel uses 100% width to span its container. Useful for responsive layouts where the
              panel should adapt to its parent element.
            </div>
          </div>
        </modus-panel>
      </demo-example>

      <demo-example
        title="Floating vs Non-Floating"
        description="Comparison of floating and non-floating panel styles."
      >
        <div class="flex flex-wrap gap-6 p-6 bg-muted rounded-lg">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Non-Floating</div>
            <modus-panel width="200px" height="150px">
              <div slot="body" class="p-4 text-sm text-foreground">Standard panel without shadow</div>
            </modus-panel>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Floating</div>
            <modus-panel width="200px" height="150px" [floating]="true">
              <div slot="body" class="p-4 text-sm text-foreground">Elevated panel with shadow</div>
            </modus-panel>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class PanelDemoPageComponent {}

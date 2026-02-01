import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusToolbarComponent } from '../../components/modus-toolbar.component';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Demo page showcasing the Modus Toolbar component.
 *
 * Demonstrates toolbar features including:
 * - Document toolbar with start, center, and end slots
 * - Icon buttons with text labels
 * - Different button variants and sizes
 */
@Component({
  selector: 'app-toolbar-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusToolbarComponent,
    ModusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <demo-page
      title="Modus Toolbar"
      description="Toolbars organize actions for a focused context. Keep primary commands on the left, secondary options on the right, and maintain consistent spacing."
    >
      <demo-example
        title="Document Toolbar"
        description="Pair icon buttons with text labels when space allows."
      >
        <modus-toolbar>
          <div slot="start" class="flex items-center gap-3 text-sm text-foreground">
            <i class="modus-icons text-primary">pencil</i>
            <div class="font-medium">Proposal draft</div>
          </div>
          <div slot="center" class="flex gap-2">
            <modus-button size="sm" icon="undo" iconPosition="left">Undo</modus-button>
            <modus-button size="sm" icon="redo" iconPosition="left">Redo</modus-button>
          </div>
          <div slot="end" class="flex gap-2">
            <modus-button size="sm" variant="borderless">Share</modus-button>
            <modus-button size="sm" color="primary">Publish</modus-button>
          </div>
        </modus-toolbar>
      </demo-example>
    </demo-page>
  `,
})
export class ToolbarDemoPageComponent {}

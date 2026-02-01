import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTooltipComponent } from '../../components/modus-tooltip.component';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusIconComponent } from '../../components/modus-icon.component';

/**
 * Demo page showcasing the Modus Tooltip component.
 *
 * Demonstrates tooltip features including:
 * - Basic tooltip
 * - Different positions
 * - With buttons
 * - With icons
 * - Force open state
 */
@Component({
  selector: 'app-tooltip-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusTooltipComponent,
    ModusButtonComponent,
    ModusIconComponent,
  ],
  template: `
    <demo-page
      title="Modus Tooltip"
      description="Tooltip components provide contextual information when users hover over or focus on elements. Use tooltips to provide helpful hints, additional context, or brief explanations."
    >
      <demo-example
        title="Basic Tooltip"
        description="Simple tooltip with text content."
      >
        <div class="flex flex-wrap gap-4">
          <modus-tooltip content="This is a helpful tooltip">
            <modus-button color="primary">Hover me</modus-button>
          </modus-tooltip>

          <modus-tooltip content="Click to save your changes">
            <modus-button color="secondary" icon="save_disk" iconPosition="left">Save</modus-button>
          </modus-tooltip>
        </div>
      </demo-example>

      <demo-example
        title="Tooltip Positions"
        description="Tooltips in different positions relative to the element."
      >
        <div class="flex flex-wrap gap-4">
          <modus-tooltip content="Tooltip on top" position="top">
            <modus-button color="primary">Top</modus-button>
          </modus-tooltip>

          <modus-tooltip content="Tooltip on right" position="right">
            <modus-button color="primary">Right</modus-button>
          </modus-tooltip>

          <modus-tooltip content="Tooltip on bottom" position="bottom">
            <modus-button color="primary">Bottom</modus-button>
          </modus-tooltip>

          <modus-tooltip content="Tooltip on left" position="left">
            <modus-button color="primary">Left</modus-button>
          </modus-tooltip>
        </div>
      </demo-example>

      <demo-example
        title="Tooltip with Icons"
        description="Tooltips on icon buttons and icon-only elements."
      >
        <div class="flex flex-wrap gap-4">
          <modus-tooltip content="Settings menu">
            <modus-button color="tertiary" icon="settings" iconPosition="only" ariaLabel="Settings" />
          </modus-tooltip>

          <modus-tooltip content="Edit item">
            <modus-button color="tertiary" icon="file_edit" iconPosition="only" ariaLabel="Edit" />
          </modus-tooltip>

          <modus-tooltip content="Delete item">
            <modus-button color="danger" icon="delete" iconPosition="only" ariaLabel="Delete" />
          </modus-tooltip>

          <modus-tooltip content="Information icon">
            <modus-icon name="info" variant="outlined" size="lg" [decorative]="false" ariaLabel="Information" />
          </modus-tooltip>

          <modus-tooltip content="Help and support">
            <modus-icon name="help" variant="outlined" size="lg" [decorative]="false" ariaLabel="Help" />
          </modus-tooltip>
        </div>
      </demo-example>

      <demo-example
        title="Tooltip with Text Content"
        description="Tooltips on text and other content elements."
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-foreground">Hover over the</span>
            <modus-tooltip content="This term provides additional context when hovered">
              <span class="text-sm text-primary underline cursor-help">highlighted term</span>
            </modus-tooltip>
            <span class="text-sm text-foreground">for more information.</span>
          </div>

          <div class="flex items-center gap-2">
            <modus-tooltip content="This is a required field that must be completed">
              <span class="text-sm text-foreground flex items-center gap-1">
                Required Field
                <i class="modus-icons text-xs text-destructive" aria-hidden="true">alert</i>
              </span>
            </modus-tooltip>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Auto Position Tooltip"
        description="Tooltip with automatic position detection."
      >
        <div class="flex flex-wrap gap-4">
          <modus-tooltip content="Auto position adjusts based on available space" position="auto">
            <modus-button color="primary">Auto Position</modus-button>
          </modus-tooltip>
        </div>
      </demo-example>

      <demo-example
        title="Real-World Example"
        description="Tooltips in a typical UI context."
      >
        <div class="flex flex-col gap-6 p-6 rounded-lg bg-card border-default">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base font-medium text-foreground">Document Editor</span>
              <modus-tooltip content="Save your document (Ctrl+S)">
                <modus-button color="tertiary" icon="save_disk" iconPosition="only" ariaLabel="Save" size="sm" />
              </modus-tooltip>
              <modus-tooltip content="Print document (Ctrl+P)">
                <modus-button color="tertiary" icon="printer" iconPosition="only" ariaLabel="Print" size="sm" />
              </modus-tooltip>
              <modus-tooltip content="Share document">
                <modus-button color="tertiary" icon="share" iconPosition="only" ariaLabel="Share" size="sm" />
              </modus-tooltip>
            </div>
            <modus-tooltip content="Open settings menu">
              <modus-button color="tertiary" icon="settings" iconPosition="only" ariaLabel="Settings" size="sm" />
            </modus-tooltip>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TooltipDemoPageComponent {}


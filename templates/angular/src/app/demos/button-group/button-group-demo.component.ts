import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusButtonGroupComponent } from '../../components/modus-button-group.component';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Demo page showcasing the Modus Button Group component.
 */
@Component({
  selector: 'app-button-group-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusButtonGroupComponent, ModusButtonComponent],
  template: `
    <demo-page
      title="Modus Button Group"
      description="Button groups organize multiple buttons together with support for single or multiple selection modes. Use them for toolbar actions, segmented controls, and toggle groups."
    >
      <demo-example title="Button Variants" description="Different visual styles for button groups.">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Outlined (default)</div>
            <modus-button-group variant="outlined" color="primary">
              <modus-button variant="outlined" color="primary">Button 1</modus-button>
              <modus-button variant="outlined" color="primary">Button 2</modus-button>
              <modus-button variant="outlined" color="primary">Button 3</modus-button>
            </modus-button-group>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Filled</div>
            <modus-button-group variant="filled" color="primary">
              <modus-button variant="filled" color="primary">Button 1</modus-button>
              <modus-button variant="filled" color="primary">Button 2</modus-button>
              <modus-button variant="filled" color="primary">Button 3</modus-button>
            </modus-button-group>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Borderless</div>
            <modus-button-group variant="borderless" color="primary">
              <modus-button variant="borderless" color="primary">Button 1</modus-button>
              <modus-button variant="borderless" color="primary">Button 2</modus-button>
              <modus-button variant="borderless" color="primary">Button 3</modus-button>
            </modus-button-group>
          </div>
        </div>
      </demo-example>

      <demo-example title="Button Colors" description="Apply consistent colors across all buttons in the group.">
        <div class="flex flex-wrap gap-4">
          <modus-button-group variant="outlined" color="primary">
            <modus-button variant="outlined" color="primary">Primary</modus-button>
            <modus-button variant="outlined" color="primary">Buttons</modus-button>
          </modus-button-group>
          <modus-button-group variant="outlined" color="secondary">
            <modus-button variant="outlined" color="secondary">Secondary</modus-button>
            <modus-button variant="outlined" color="secondary">Buttons</modus-button>
          </modus-button-group>
          <modus-button-group variant="outlined" color="tertiary">
            <modus-button variant="outlined" color="tertiary">Tertiary</modus-button>
            <modus-button variant="outlined" color="tertiary">Buttons</modus-button>
          </modus-button-group>
          <modus-button-group variant="outlined" color="warning">
            <modus-button variant="outlined" color="warning">Warning</modus-button>
            <modus-button variant="outlined" color="warning">Buttons</modus-button>
          </modus-button-group>
          <modus-button-group variant="outlined" color="danger">
            <modus-button variant="outlined" color="danger">Danger</modus-button>
            <modus-button variant="outlined" color="danger">Buttons</modus-button>
          </modus-button-group>
        </div>
      </demo-example>

      <demo-example title="Orientation" description="Button groups can be arranged horizontally or vertically.">
        <div class="flex flex-wrap gap-8">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Horizontal (default)</div>
            <modus-button-group orientation="horizontal" variant="outlined">
              <modus-button variant="outlined">Option 1</modus-button>
              <modus-button variant="outlined">Option 2</modus-button>
              <modus-button variant="outlined">Option 3</modus-button>
            </modus-button-group>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Vertical</div>
            <modus-button-group orientation="vertical" variant="outlined">
              <modus-button variant="outlined">Option 1</modus-button>
              <modus-button variant="outlined">Option 2</modus-button>
              <modus-button variant="outlined">Option 3</modus-button>
            </modus-button-group>
          </div>
        </div>
      </demo-example>

      <demo-example title="Single Selection (Radio-like)" description="Only one button can be selected at a time.">
        <modus-button-group selectionType="single" variant="outlined" color="primary">
          <modus-button variant="outlined" color="primary" [pressed]="true">Option A</modus-button>
          <modus-button variant="outlined" color="primary">Option B</modus-button>
          <modus-button variant="outlined" color="primary">Option C</modus-button>
        </modus-button-group>
      </demo-example>

      <demo-example
        title="Multiple Selection (Checkbox-like)"
        description="Multiple buttons can be selected simultaneously."
      >
        <div class="flex flex-col gap-4">
          <modus-button-group
            selectionType="multiple"
            variant="outlined"
            color="primary"
            (buttonSelectionChange)="handleSelectionChange($event)"
          >
            <modus-button variant="outlined" color="primary" [pressed]="true">Bold</modus-button>
            <modus-button variant="outlined" color="primary">Italic</modus-button>
            <modus-button variant="outlined" color="primary" [pressed]="true">Underline</modus-button>
          </modus-button-group>
          <div class="text-sm text-muted-foreground">
            Selected: {{ selectedButtons().length > 0 ? selectedButtons().join(', ') : 'None' }}
          </div>
        </div>
      </demo-example>

      <demo-example title="Icon-Only Buttons" description="Compact toolbar actions with icon-only buttons.">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Text Alignment</div>
            <modus-button-group selectionType="single" variant="outlined" color="primary">
              <modus-button
                icon="align_left"
                iconPosition="only"
                ariaLabel="Align left"
                variant="outlined"
                color="primary"
                [pressed]="true"
              />
              <modus-button
                icon="text_centered"
                iconPosition="only"
                ariaLabel="Align center"
                variant="outlined"
                color="primary"
              />
              <modus-button
                icon="align_right"
                iconPosition="only"
                ariaLabel="Align right"
                variant="outlined"
                color="primary"
              />
            </modus-button-group>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Text Formatting</div>
            <modus-button-group selectionType="multiple" variant="outlined" color="secondary">
              <modus-button
                icon="text_bold"
                iconPosition="only"
                ariaLabel="Bold"
                variant="outlined"
                color="secondary"
              />
              <modus-button
                icon="text_italic"
                iconPosition="only"
                ariaLabel="Italic"
                variant="outlined"
                color="secondary"
              />
              <modus-button
                icon="text_underlined"
                iconPosition="only"
                ariaLabel="Underline"
                variant="outlined"
                color="secondary"
              />
            </modus-button-group>
          </div>
        </div>
      </demo-example>

      <demo-example title="Disabled State" description="Disable all buttons in the group at once.">
        <modus-button-group variant="outlined" color="primary" [disabled]="true">
          <modus-button variant="outlined" color="primary">Disabled</modus-button>
          <modus-button variant="outlined" color="primary">Button</modus-button>
          <modus-button variant="outlined" color="primary">Group</modus-button>
        </modus-button-group>
      </demo-example>

      <demo-example title="Mixed Content" description="Button groups can contain buttons with text and icons.">
        <modus-button-group variant="outlined" color="primary">
          <modus-button icon="save_disk" iconPosition="left" variant="outlined" color="primary">
            Save
          </modus-button>
          <modus-button icon="download" iconPosition="left" variant="outlined" color="primary">
            Download
          </modus-button>
          <modus-button icon="share" iconPosition="left" variant="outlined" color="primary">
            Share
          </modus-button>
        </modus-button-group>
      </demo-example>
    </demo-page>
  `,
})
export class ButtonGroupDemoPageComponent {
  readonly selectedButtons = signal<string[]>([]);

  handleSelectionChange(event: { selectedButtons: HTMLElement[] }): void {
    const values = event.selectedButtons
      .map((button) => button.textContent?.trim())
      .filter((value): value is string => Boolean(value));
    this.selectedButtons.set(values);
  }
}

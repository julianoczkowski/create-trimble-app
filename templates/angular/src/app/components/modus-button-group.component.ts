import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcButtonGroup } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusButtonGroupComponent}.
 */
export interface ModusButtonGroupProps {
  /** Variant applied to all buttons within the group. */
  variant?: Components.ModusWcButtonGroup['variant'];
  /** Color applied to all buttons within the group. */
  color?: Components.ModusWcButtonGroup['color'];
  /** Disable all buttons within the group. */
  disabled?: Components.ModusWcButtonGroup['disabled'];
  /** Layout orientation for the group. */
  orientation?: Components.ModusWcButtonGroup['orientation'];
  /** Selection behavior for the group. */
  selectionType?: Components.ModusWcButtonGroup['selectionType'];
  /** Accessible label for the group. */
  ariaLabel?: string;
}

/**
 * Angular wrapper for the Modus button group web component.
 */
@Component({
  selector: 'modus-button-group',
  imports: [CommonModule, ModusWcButtonGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-button-group
      [variant]="variant()"
      [color]="color()"
      [disabled]="disabled()"
      [orientation]="orientation()"
      [selectionType]="selectionType()"
      [attr.aria-label]="ariaLabel()"
      (buttonGroupClick)="handleButtonGroupClick($event)"
      (buttonSelectionChange)="handleButtonSelectionChange($event)"
    >
      <ng-content />
    </modus-wc-button-group>
  `,
})
export class ModusButtonGroupComponent {
  /** Variant applied to all buttons within the group. */
  readonly variant = input<Components.ModusWcButtonGroup['variant'] | undefined>('outlined');

  /** Color applied to all buttons within the group. */
  readonly color = input<Components.ModusWcButtonGroup['color'] | undefined>();

  /** Disable all buttons within the group. */
  readonly disabled = input<Components.ModusWcButtonGroup['disabled'] | undefined>(false);

  /** Layout orientation for the group. */
  readonly orientation = input<Components.ModusWcButtonGroup['orientation'] | undefined>('horizontal');

  /** Selection behavior for the group. */
  readonly selectionType = input<Components.ModusWcButtonGroup['selectionType'] | undefined>('default');

  /** Accessible label for the group. */
  readonly ariaLabel = input<string | undefined>();

  /** Emits when a button in the group is clicked. */
  readonly buttonGroupClick = output<{ button: HTMLElement; isSelected: boolean }>();

  /** Emits when the group selection changes. */
  readonly buttonSelectionChange = output<{ selectedButtons: HTMLElement[] }>();

  handleButtonGroupClick(
    event: CustomEvent<{ button: HTMLElement; isSelected: boolean }>,
  ): void {
    this.buttonGroupClick.emit(event.detail);
  }

  handleButtonSelectionChange(
    event: CustomEvent<{ selectedButtons: HTMLElement[] }>,
  ): void {
    this.buttonSelectionChange.emit(event.detail);
  }
}

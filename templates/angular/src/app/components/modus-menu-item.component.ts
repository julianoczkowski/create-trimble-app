import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcMenuItem } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusMenuItemComponent}.
 */
export interface ModusMenuItemProps {
  /** Adds a border to the menu item. */
  bordered?: Components.ModusWcMenuItem['bordered'];
  /** Displays a checkbox at the start of the menu item. */
  checkbox?: Components.ModusWcMenuItem['checkbox'];
  /** Custom CSS class applied to the menu item. */
  className?: Components.ModusWcMenuItem['customClass'];
  /** Disables the item. */
  disabled?: Components.ModusWcMenuItem['disabled'];
  /** Highlights the item as focused. */
  focused?: Components.ModusWcMenuItem['focused'];
  /** Text label rendered inside the item. */
  label: Components.ModusWcMenuItem['label'];
  /** Icon name displayed before the label. */
  startIcon?: Components.ModusWcMenuItem['startIcon'];
  /** Marks the item as selected. */
  selected?: Components.ModusWcMenuItem['selected'];
  /** Item size token. */
  size?: ModusSize;
  /** Sub-label text displayed beneath the label. */
  subLabel?: Components.ModusWcMenuItem['subLabel'];
  /** Tooltip content shown on hover. */
  tooltipContent?: Components.ModusWcMenuItem['tooltipContent'];
  /** Tooltip position relative to the item. */
  tooltipPosition?: Components.ModusWcMenuItem['tooltipPosition'];
  /** Unique value emitted when the item is selected. */
  value: Components.ModusWcMenuItem['value'];
}

/**
 * Angular wrapper for the Modus menu item web component.
 */
@Component({
  selector: 'modus-menu-item',
  imports: [CommonModule, ModusWcMenuItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-menu-item
      [bordered]="bordered()"
      [checkbox]="checkbox()"
      [customClass]="className()"
      [disabled]="disabled()"
      [focused]="focused()"
      [label]="label()"
      [startIcon]="startIcon()"
      [attr.start-icon]="startIcon()"
      [selected]="selected()"
      [attr.selected]="selected() ? '' : null"
      [size]="size()"
      [subLabel]="subLabel()"
      [tooltipContent]="tooltipContent()"
      [tooltipPosition]="tooltipPosition()"
      [value]="value()"
      (itemSelect)="handleItemSelect($event)"
    >
      <ng-content select="[slot='start-icon']" slot="start-icon" />
    </modus-wc-menu-item>
  `,
})
export class ModusMenuItemComponent {
  /** Adds a border to the menu item. */
  readonly bordered = input<boolean | undefined>(false);

  /** Displays a checkbox at the start of the menu item. */
  readonly checkbox = input<boolean | undefined>(false);

  /** Custom CSS class applied to the menu item. */
  readonly className = input<string | undefined>();

  /** Disables the item. */
  readonly disabled = input<boolean | undefined>(false);

  /** Highlights the item as focused. */
  readonly focused = input<boolean | undefined>(false);

  /** Text label rendered inside the item. */
  readonly label = input.required<string>();

  /** Icon name displayed before the label. */
  readonly startIcon = input<string | undefined>();

  /** Marks the item as selected. */
  readonly selected = input<boolean | undefined>(false);

  /** Item size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Sub-label text displayed beneath the label. */
  readonly subLabel = input<string | undefined>();

  /** Tooltip content shown on hover. */
  readonly tooltipContent = input<string | undefined>();

  /** Tooltip position relative to the item. */
  readonly tooltipPosition = input<'auto' | 'top' | 'right' | 'bottom' | 'left' | undefined>(
    'auto'
  );

  /** Unique value emitted when the item is selected. */
  readonly value = input.required<string>();

  /** Emits when the item is selected. */
  readonly itemSelect = output<{ value: string }>();

  handleItemSelect(event: CustomEvent<{ value: string }>): void {
    this.itemSelect.emit(event.detail);
  }
}

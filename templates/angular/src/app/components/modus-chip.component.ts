import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcChip } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusChipComponent}.
 */
export interface ModusChipProps {
  /** Marks the chip as active. */
  active?: Components.ModusWcChip['active'];
  /** Custom CSS class applied to the chip wrapper. */
  className?: Components.ModusWcChip['customClass'];
  /** Disables user interaction. */
  disabled?: Components.ModusWcChip['disabled'];
  /** Highlights the chip error state. */
  hasError?: Components.ModusWcChip['hasError'];
  /** Text label rendered inside the chip. */
  label?: Components.ModusWcChip['label'];
  /** Visual shape of the chip. */
  shape?: Components.ModusWcChip['shape'];
  /** Displays the remove icon button. */
  showRemove?: Components.ModusWcChip['showRemove'];
  /** Size token controlling chip dimensions. */
  size?: ModusSize;
  /** Visual variant controlling background and outline. */
  variant?: Components.ModusWcChip['variant'];
}

/**
 * Angular wrapper for the Modus chip web component.
 *
 * Chips are compact elements for displaying selections or filters. Use the
 * `(chipClick)` and `(chipRemove)` outputs to respond to user interaction.
 */
@Component({
  selector: 'modus-chip',
  imports: [CommonModule, ModusWcChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-chip
      [active]="active()"
      [customClass]="className()"
      [disabled]="disabled()"
      [hasError]="hasError()"
      [label]="label()"
      [shape]="shape()"
      [showRemove]="showRemove()"
      [size]="size()"
      [variant]="variant()"
      (chipClick)="handleChipClick($event)"
      (chipRemove)="handleChipRemove($event)"
    />
  `,
})
export class ModusChipComponent {
  /** Marks the chip as active. */
  readonly active = input<boolean | undefined>(false);

  /** Custom CSS class applied to the chip wrapper. */
  readonly className = input<string | undefined>();

  /** Disables user interaction. */
  readonly disabled = input<boolean | undefined>(false);

  /** Highlights the chip error state. */
  readonly hasError = input<boolean | undefined>(false);

  /** Text label rendered inside the chip. */
  readonly label = input<string | undefined>();

  /** Visual shape of the chip. */
  readonly shape = input<'rectangle' | 'circle' | undefined>('rectangle');

  /** Displays the remove icon button. */
  readonly showRemove = input<boolean | undefined>(false);

  /** Size token controlling chip dimensions. */
  readonly size = input<ModusSize | undefined>('md');

  /** Visual variant controlling background and outline. */
  readonly variant = input<'filled' | 'outline' | undefined>('filled');

  /** Emits when the chip is clicked. */
  readonly chipClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the remove icon is activated. */
  readonly chipRemove = output<MouseEvent | KeyboardEvent>();

  handleChipClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.chipClick.emit(event.detail);
  }

  handleChipRemove(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.chipRemove.emit(event.detail);
  }
}

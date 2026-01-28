import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcInputLabel } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusInputLabelComponent}.
 */
export interface ModusInputLabelProps {
  /** Additional classes for custom styling. */
  className?: Components.ModusWcInputLabel['customClass'];
  /** The `for` attribute mapping to the associated input id. */
  forId?: Components.ModusWcInputLabel['forId'];
  /** The primary label text. */
  labelText?: Components.ModusWcInputLabel['labelText'];
  /** Indicates whether the label represents a required field. */
  required?: Components.ModusWcInputLabel['required'];
  /** Label size token. */
  size?: ModusSize;
  /** Optional secondary text displayed beneath the label. */
  subLabelText?: Components.ModusWcInputLabel['subLabelText'];
}

/**
 * Angular wrapper for the Modus input label web component.
 */
@Component({
  selector: 'modus-input-label',
  imports: [CommonModule, ModusWcInputLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-input-label
      [customClass]="className()"
      [forId]="forId()"
      [labelText]="labelText()"
      [required]="required()"
      [size]="size()"
      [subLabelText]="subLabelText()"
    >
      <ng-content />
    </modus-wc-input-label>
  `,
})
export class ModusInputLabelComponent {
  /** Additional classes for custom styling. */
  readonly className = input<string | undefined>();

  /** The `for` attribute mapping to the associated input id. */
  readonly forId = input<string | undefined>();

  /** The primary label text. */
  readonly labelText = input<string | undefined>();

  /** Indicates whether the label represents a required field. */
  readonly required = input<boolean | undefined>(false);

  /** Label size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Optional secondary text displayed beneath the label. */
  readonly subLabelText = input<string | undefined>();
}

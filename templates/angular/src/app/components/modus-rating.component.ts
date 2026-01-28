import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcRating } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IRatingChange, ModusSize, ModusWcRatingVariant } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusRatingComponent}.
 */
export interface ModusRatingProps {
  /** Enables half step ratings for supported variants. */
  allowHalf?: Components.ModusWcRating['allowHalf'];
  /** Number of rating items displayed. */
  count?: Components.ModusWcRating['count'];
  /** Optional CSS class applied to the rating container. */
  className?: Components.ModusWcRating['customClass'];
  /** Disables user interaction. */
  disabled?: Components.ModusWcRating['disabled'];
  /** Function providing accessible labels for each rating value. */
  getAriaLabelText?: Components.ModusWcRating['getAriaLabelText'];
  /** Control size token. */
  size?: ModusSize;
  /** Current rating value. */
  value?: Components.ModusWcRating['value'];
  /** Rating visualization variant. */
  variant?: ModusWcRatingVariant;
}

/**
 * Angular wrapper for the Modus rating web component.
 */
@Component({
  selector: 'modus-rating',
  imports: [CommonModule, ModusWcRating],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-rating
      [allowHalf]="allowHalf()"
      [count]="count()"
      [customClass]="className()"
      [disabled]="disabled()"
      [getAriaLabelText]="getAriaLabelText()"
      [size]="size()"
      [value]="value()"
      [variant]="variant()"
      (ratingChange)="handleRatingChange($event)"
    />
  `,
})
export class ModusRatingComponent {
  /** Enables half step ratings for supported variants. */
  readonly allowHalf = input<boolean | undefined>(false);

  /** Number of rating items displayed. */
  readonly count = input<number | undefined>(5);

  /** Optional CSS class applied to the rating container. */
  readonly className = input<string | undefined>();

  /** Disables user interaction. */
  readonly disabled = input<boolean | undefined>(false);

  /** Function providing accessible labels for each rating value. */
  readonly getAriaLabelText = input<((ratingValue: number) => string) | undefined>();

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Current rating value. */
  readonly value = input<number | undefined>(0);

  /** Rating visualization variant. */
  readonly variant = input<ModusWcRatingVariant | undefined>('smiley');

  /** Emits when the rating changes. */
  readonly ratingChange = output<IRatingChange>();

  handleRatingChange(event: CustomEvent<IRatingChange>): void {
    this.ratingChange.emit(event.detail);
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcPagination } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IAriaLabelValues, IPageChange, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusPaginationComponent}.
 */
export interface ModusPaginationProps {
  /** ARIA label values for navigation controls. */
  ariaLabelValues?: IAriaLabelValues;
  /** Total number of pages. */
  count: Components.ModusWcPagination['count'];
  /** Custom CSS class applied to the root element. */
  className?: Components.ModusWcPagination['customClass'];
  /** Text label for the next button. */
  nextButtonText?: Components.ModusWcPagination['nextButtonText'];
  /** Current active page number. */
  page: Components.ModusWcPagination['page'];
  /** Text label for the previous button. */
  prevButtonText?: Components.ModusWcPagination['prevButtonText'];
  /** Pagination size token. */
  size?: ModusSize;
}

/**
 * Angular wrapper for the Modus pagination web component.
 */
@Component({
  selector: 'modus-pagination',
  imports: [CommonModule, ModusWcPagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-pagination
      [ariaLabelValues]="ariaLabelValues()"
      [count]="count()"
      [customClass]="className()"
      [nextButtonText]="nextButtonText()"
      [page]="page()"
      [prevButtonText]="prevButtonText()"
      [size]="size()"
      (pageChange)="handlePageChange($event)"
    />
  `,
})
export class ModusPaginationComponent {
  /** ARIA label values for navigation controls. */
  readonly ariaLabelValues = input<IAriaLabelValues | undefined>();

  /** Total number of pages. */
  readonly count = input.required<number>();

  /** Custom CSS class applied to the root element. */
  readonly className = input<string | undefined>();

  /** Text label for the next button. */
  readonly nextButtonText = input<string | undefined>();

  /** Current active page number. */
  readonly page = input.required<number>();

  /** Text label for the previous button. */
  readonly prevButtonText = input<string | undefined>();

  /** Pagination size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Emits when the page changes. */
  readonly pageChange = output<IPageChange>();

  handlePageChange(event: CustomEvent<IPageChange>): void {
    this.pageChange.emit(event.detail);
  }
}

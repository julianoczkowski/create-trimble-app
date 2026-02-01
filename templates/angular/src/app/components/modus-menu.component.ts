import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcMenu } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ModusSize, Orientation } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusMenuComponent}.
 */
export interface ModusMenuProps {
  /** Indicates that the menu should have a border. */
  bordered?: Components.ModusWcMenu['bordered'];
  /** Custom CSS class applied to the menu element. */
  className?: Components.ModusWcMenu['customClass'];
  /** Menu orientation. */
  orientation?: Orientation;
  /** Menu size token. */
  size?: ModusSize;
}

/**
 * Angular wrapper for the Modus menu web component.
 */
@Component({
  selector: 'modus-menu',
  imports: [CommonModule, ModusWcMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-menu
      [bordered]="bordered()"
      [customClass]="className()"
      [orientation]="orientation()"
      [size]="size()"
      (menuFocusout)="handleFocusOut($event)"
    >
      <ng-content />
    </modus-wc-menu>
  `,
})
export class ModusMenuComponent {
  /** Indicates that the menu should have a border. */
  readonly bordered = input<boolean | undefined>(false);

  /** Custom CSS class applied to the menu element. */
  readonly className = input<string | undefined>();

  /** Menu orientation. */
  readonly orientation = input<Orientation | undefined>('vertical');

  /** Menu size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Emits when focus leaves the menu. */
  readonly menuFocusout = output<FocusEvent>();

  handleFocusOut(event: CustomEvent<FocusEvent>): void {
    this.menuFocusout.emit(event.detail);
  }
}

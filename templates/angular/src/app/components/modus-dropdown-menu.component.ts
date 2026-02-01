import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcDropdownMenu, ModusWcMenu } from '@trimble-oss/moduswebcomponents-angular';
import type {
  Components,
  DaisySize,
  ModusSize,
  PopoverPlacement,
} from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusDropdownMenuComponent}.
 */
export interface ModusDropdownMenuProps {
  /** Accessible label for the trigger button. */
  buttonAriaLabel?: Components.ModusWcDropdownMenu['buttonAriaLabel'];
  /** Button color token. */
  buttonColor?: Components.ModusWcDropdownMenu['buttonColor'];
  /** Button size token. */
  buttonSize?: DaisySize;
  /** Button visual variant. */
  buttonVariant?: Components.ModusWcDropdownMenu['buttonVariant'];
  /** CSS class applied to the host element. */
  className?: Components.ModusWcDropdownMenu['customClass'];
  /** Disables the dropdown trigger. */
  disabled?: Components.ModusWcDropdownMenu['disabled'];
  /** Adds a border to the menu panel. */
  menuBordered?: Components.ModusWcDropdownMenu['menuBordered'];
  /** Pixel offset between the button and menu. */
  menuOffset?: Components.ModusWcDropdownMenu['menuOffset'];
  /** Menu placement relative to the button. */
  menuPlacement?: PopoverPlacement;
  /** Menu size token. */
  menuSize?: ModusSize;
  /** Controls menu visibility. */
  menuVisible?: Components.ModusWcDropdownMenu['menuVisible'];
}

/**
 * Angular wrapper for the Modus dropdown menu web component.
 */
@Component({
  selector: 'modus-dropdown-menu',
  imports: [CommonModule, ModusWcDropdownMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-dropdown-menu
      [buttonAriaLabel]="buttonAriaLabel()"
      [buttonColor]="buttonColor()"
      [buttonSize]="buttonSize()"
      [buttonVariant]="buttonVariant()"
      [customClass]="className()"
      [disabled]="disabled()"
      [menuBordered]="menuBordered()"
      [menuOffset]="menuOffset()"
      [menuPlacement]="menuPlacement()"
      [menuSize]="menuSize()"
      [menuVisible]="menuVisible()"
      (menuVisibilityChange)="handleVisibilityChange($event)"
    >
      <ng-content select="[slot='button']" slot="button" />
      <ng-content select="[slot='menu']" slot="menu" />
    </modus-wc-dropdown-menu>
  `,
})
export class ModusDropdownMenuComponent {
  /** Accessible label for the trigger button. */
  readonly buttonAriaLabel = input<string | undefined>();

  /** Button color token. */
  readonly buttonColor = input<Components.ModusWcDropdownMenu['buttonColor'] | undefined>(
    'primary'
  );

  /** Button size token. */
  readonly buttonSize = input<DaisySize | undefined>('md');

  /** Button visual variant. */
  readonly buttonVariant = input<'borderless' | 'filled' | 'outlined' | undefined>('filled');

  /** CSS class applied to the host element. */
  readonly className = input<string | undefined>();

  /** Disables the dropdown trigger. */
  readonly disabled = input<boolean | undefined>(false);

  /** Adds a border to the menu panel. */
  readonly menuBordered = input<boolean | undefined>(true);

  /** Pixel offset between the button and menu. */
  readonly menuOffset = input<number | undefined>(10);

  /** Menu placement relative to the button. */
  readonly menuPlacement = input<PopoverPlacement | undefined>('bottom-start');

  /** Menu size token. */
  readonly menuSize = input<ModusSize | undefined>('md');

  /** Controls menu visibility. */
  readonly menuVisible = input<boolean | undefined>(false);

  /** Emits when the menu visibility changes. */
  readonly menuVisibilityChange = output<{ isVisible: boolean }>();

  handleVisibilityChange(event: CustomEvent<{ isVisible: boolean }>): void {
    this.menuVisibilityChange.emit(event.detail);
  }
}

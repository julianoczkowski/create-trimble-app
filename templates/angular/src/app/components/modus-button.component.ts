import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcButton } from '@trimble-oss/moduswebcomponents-angular';

/**
 * Button color variant
 */
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';

/**
 * Button style variant
 */
export type ButtonVariant = 'filled' | 'outlined' | 'borderless';

/**
 * Button size
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Button shape
 */
export type ButtonShape = 'rectangle' | 'square' | 'circle';

/**
 * Icon position relative to button text
 */
export type IconPosition = 'left' | 'right' | 'only';

/**
 * Props for the ModusButton component
 */
export interface ModusButtonProps {
  /** The color of the button */
  color?: ButtonColor;
  /** The variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** The shape of the button */
  shape?: ButtonShape;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take up the full width */
  fullWidth?: boolean;
  /** Whether the button is pressed (for toggle buttons) */
  pressed?: boolean;
  /** The type of the button */
  type?: 'button' | 'submit' | 'reset';
  /** An icon to display in the button */
  icon?: string;
  /** The position of the icon relative to the button text */
  iconPosition?: IconPosition;
  /** Icon size using Tailwind text utilities. If not provided, size is determined by button size and icon position */
  iconSize?:
    | 'text-2xs'
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl';
  /** The ARIA label for the button */
  ariaLabel?: string;
  /** A callback function to handle button clicks */
  onButtonClick?: () => void;
  /** A custom CSS class to apply to the button */
  className?: string;
}

/**
 * Renders a Modus button component with full customization support.
 *
 * @example
 * ```html
 * <!-- Basic button -->
 * <modus-button>Click me</modus-button>
 * ```
 *
 * @example
 * ```html
 * <!-- Icon button with custom styling -->
 * <modus-button
 *   icon="add"
 *   iconPosition="left"
 *   color="primary"
 *   size="lg"
 *   (buttonClick)="handleClick()"
 * >
 *   Add Item
 * </modus-button>
 * ```
 *
 * @example
 * ```html
 * <!-- Icon-only button with accessibility -->
 * <modus-button
 *   icon="settings"
 *   iconPosition="only"
 *   ariaLabel="Open settings"
 *   (buttonClick)="openSettings()"
 * ></modus-button>
 * ```
 */
@Component({
  selector: 'modus-button',
  standalone: true,
  imports: [CommonModule, ModusWcButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-button
      [color]="color()"
      [variant]="variant()"
      [size]="size()"
      [shape]="shape()"
      [disabled]="disabled()"
      [fullWidth]="fullWidth()"
      [pressed]="pressed()"
      [type]="type()"
      [customClass]="className()"
      [attr.aria-label]="getAriaLabel()"
      (buttonClick)="handleButtonClick($event)"
    >
      @if (icon() && iconPosition() === 'left') {
      <i class="modus-icons {{ getIconSize() }} mr-2">{{ icon() }}</i>
      }
      <ng-content></ng-content>
      @if (icon() && iconPosition() === 'right') {
      <i class="modus-icons {{ getIconSize() }} ml-2">{{ icon() }}</i>
      } @if (icon() && iconPosition() === 'only') {
      <i class="modus-icons {{ getIconSize() }}">{{ icon() }}</i>
      }
    </modus-wc-button>
  `,
})
export class ModusButtonComponent {
  /** The color of the button */
  readonly color = input<ButtonColor>('primary');

  /** The variant of the button */
  readonly variant = input<ButtonVariant>('filled');

  /** The size of the button */
  readonly size = input<ButtonSize>('md');

  /** The shape of the button */
  readonly shape = input<ButtonShape>('rectangle');

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether the button should take up the full width */
  readonly fullWidth = input<boolean>(false);

  /** Whether the button is pressed (for toggle buttons) */
  readonly pressed = input<boolean>(false);

  /** The type of the button */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** An icon to display in the button */
  readonly icon = input<string | undefined>();

  /** The position of the icon relative to the button text */
  readonly iconPosition = input<IconPosition>('left');

  /** Icon size using Tailwind text utilities. If not provided, size is determined by button size and icon position */
  readonly iconSize = input<
    | 'text-2xs'
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
  >();

  /** The ARIA label for the button */
  readonly ariaLabel = input<string | undefined>();

  /** A custom CSS class to apply to the button */
  readonly className = input<string | undefined>();

  /** Callback function for button clicks (optional) */
  readonly onButtonClick = input<(() => void) | undefined>();

  /** Event emitter for button clicks */
  readonly buttonClick = output<MouseEvent | KeyboardEvent>();

  /**
   * Handles button click events from the Modus Web Component
   *
   * Emits the event to parent components and calls the optional callback
   *
   * @param event - The click or keyboard event from the button (from Stencil CustomEvent)
   */
  handleButtonClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    if (!this.disabled()) {
      // Extract the actual event from CustomEvent detail
      const actualEvent = event.detail;

      // Emit Angular event
      this.buttonClick.emit(actualEvent);

      // Call React-like callback if provided
      const callback = this.onButtonClick();
      if (callback) {
        callback();
      }
    }
  }

  /**
   * Determines the appropriate icon size based on button size, icon position, and explicit iconSize input.
   *
   * @returns The Tailwind text utility class for icon sizing
   */
  getIconSize(): string {
    // If iconSize is explicitly provided, use it
    const explicitSize = this.iconSize();
    if (explicitSize) {
      return explicitSize;
    }

    // Determine size based on button size and icon position
    const buttonSize = this.size();
    const position = this.iconPosition();

    // Icon-only buttons are generally larger
    if (position === 'only') {
      switch (buttonSize) {
        case 'xs':
          return 'text-sm'; // 12px
        case 'sm':
          return 'text-base'; // 14px
        case 'md':
          return 'text-xl'; // 18px (current default)
        case 'lg':
          return 'text-2xl'; // 20px
        default:
          return 'text-xl'; // 18px default
      }
    }

    // Icons with text (left/right position)
    switch (buttonSize) {
      case 'xs':
        return 'text-xs'; // 10px
      case 'sm':
        return 'text-sm'; // 12px
      case 'md':
        return 'text-lg'; // 16px (current default)
      case 'lg':
        return 'text-xl'; // 18px
      default:
        return 'text-lg'; // 16px default
    }
  }

  /**
   * Generates appropriate ARIA label for accessibility.
   *
   * For icon-only buttons, ensures proper accessibility by returning
   * the provided ariaLabel or falling back to undefined.
   *
   * @returns The appropriate ARIA label or undefined
   */
  getAriaLabel(): string | undefined {
    const ariaLabelValue = this.ariaLabel();
    if (ariaLabelValue) {
      return ariaLabelValue;
    }

    // For icon-only buttons, ariaLabel should be provided
    // If not provided, the component will rely on default ARIA behavior
    if (this.iconPosition() === 'only' && !ariaLabelValue) {
      // Note: In a production app, you might want to extract text content
      // from ng-content as a fallback, but that requires ViewChild and
      // content projection which is more complex
      return undefined;
    }

    return undefined;
  }
}

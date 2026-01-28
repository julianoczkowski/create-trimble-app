import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcInputFeedback } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, IInputFeedbackLevel, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusInputFeedbackComponent}.
 */
export interface ModusInputFeedbackProps {
  /** Custom CSS class applied to the container. */
  className?: Components.ModusWcInputFeedback['customClass'];
  /** Icon override rendered before the message. */
  icon?: Components.ModusWcInputFeedback['icon'];
  /** Feedback level controlling icon and color. */
  level: IInputFeedbackLevel;
  /** Feedback message text. */
  message?: Components.ModusWcInputFeedback['message'];
  /** Control size token. */
  size?: ModusSize;
}

/**
 * Angular wrapper for the Modus input feedback web component.
 */
@Component({
  selector: 'modus-input-feedback',
  imports: [CommonModule, ModusWcInputFeedback],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-input-feedback
      [customClass]="className()"
      [icon]="icon()"
      [level]="level()"
      [message]="message()"
      [size]="size()"
    />
  `,
})
export class ModusInputFeedbackComponent {
  /** Custom CSS class applied to the container. */
  readonly className = input<string | undefined>();

  /** Icon override rendered before the message. */
  readonly icon = input<string | undefined>();

  /** Feedback level controlling icon and color. */
  readonly level = input.required<IInputFeedbackLevel>();

  /** Feedback message text. */
  readonly message = input<string | undefined>();

  /** Control size token. */
  readonly size = input<ModusSize | undefined>('md');
}

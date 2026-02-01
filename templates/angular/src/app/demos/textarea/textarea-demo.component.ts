import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTextareaComponent } from '../../components/modus-textarea.component';
import type { IInputFeedbackProp } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Textarea component.
 *
 * Demonstrates textarea features including:
 * - Customer feedback (default size)
 * - Detailed notes (increased height with info feedback)
 * - Feedback states (info, success, error)
 */
@Component({
  selector: 'app-textarea-demo-page',
  imports: [DemoPageComponent, DemoExampleComponent, ModusTextareaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <demo-page
      title="Modus Textarea"
      description="Textareas support longer responses or feedback. Offer guidance on what to include and set an appropriate height."
    >
      <!-- Customer Feedback Example (from React) -->
      <demo-example
        title="Customer Feedback"
        description="Use the default size for two to three sentence responses."
      >
        <modus-textarea
          label="Share feedback"
          placeholder="Tell us what worked well and what can improve."
          [rows]="4"
        />
      </demo-example>

      <!-- Detailed Notes Example (from React) -->
      <demo-example
        title="Detailed Notes"
        description="Increase the height when expecting longer entries."
      >
        <modus-textarea label="Site visit notes" [rows]="6" [feedback]="siteVisitFeedback" />
      </demo-example>

      <!-- Feedback States -->
      <demo-example
        title="Feedback States"
        description="Display validation feedback with info, success, and error states."
      >
        <div class="flex flex-col gap-6">
          <modus-textarea
            label="Info feedback"
            placeholder="Enter details..."
            [rows]="3"
            [feedback]="infoFeedback"
          />
          <modus-textarea
            label="Success feedback"
            placeholder="Enter details..."
            [rows]="3"
            value="Valid input provided."
            [feedback]="successFeedback"
          />
          <modus-textarea
            label="Error feedback"
            placeholder="Enter details..."
            [rows]="3"
            [feedback]="errorFeedback"
          />
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TextareaDemoPageComponent {
  // Feedback configurations
  readonly siteVisitFeedback: IInputFeedbackProp = {
    level: 'info',
    message: 'Include location details and follow-up actions.',
  };

  readonly infoFeedback: IInputFeedbackProp = {
    level: 'info',
    message: 'This is helpful information about the field.',
  };

  readonly successFeedback: IInputFeedbackProp = {
    level: 'success',
    message: 'Great! Your input looks good.',
  };

  readonly errorFeedback: IInputFeedbackProp = {
    level: 'error',
    message: 'This field is required. Please enter a value.',
  };
}

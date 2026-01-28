import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusInputFeedbackComponent } from '../modus-input-feedback.component';
import { ModusTextInputComponent } from '../modus-text-input.component';
import { ModusTextareaComponent } from '../modus-textarea.component';

/**
 * Demo page showcasing the Modus Input Feedback component.
 *
 * Demonstrates input feedback features including:
 * - Feedback levels (success, error, warning, info)
 * - Feedback with different form inputs
 * - Feedback messages
 * - Feedback sizes
 * - Custom feedback icons
 */
@Component({
  selector: 'app-input-feedback-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusInputFeedbackComponent,
    ModusTextInputComponent,
    ModusTextareaComponent,
  ],
  template: `
    <demo-page
      title="Modus Input Feedback"
      description="Input feedback provides validation messages and guidance to users for form inputs. Use feedback to communicate validation state and helpful information."
    >
      <demo-example
        title="Feedback Levels"
        description="Different feedback levels to indicate validation state."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Email"
              type="email"
              placeholder="user@example.com"
              value="user@example.com"
            />
            <modus-input-feedback level="success" message="Email address is valid." />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Password"
              type="password"
              placeholder="Enter password"
              value=""
            />
            <modus-input-feedback level="error" message="Password is required." />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Username"
              placeholder="Enter username"
              value="test123"
            />
            <modus-input-feedback level="warning" message="Username should be at least 8 characters." />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Website"
              placeholder="https://example.com"
              value=""
            />
            <modus-input-feedback
              level="info"
              message="Enter the full URL including http:// or https://"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Feedback with Textarea"
        description="Input feedback can be used with textarea inputs."
      >
        <div class="flex flex-col gap-2">
          <modus-textarea
            label="Comments"
            placeholder="Enter your comments..."
            [rows]="4"
            value="This is a comment."
          />
          <modus-input-feedback level="success" message="Comment saved successfully." />
        </div>
      </demo-example>

      <demo-example
        title="Feedback Sizes"
        description="Input feedback in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input label="Small Feedback" placeholder="Enter text" />
            <modus-input-feedback level="info" message="Small feedback message." size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input label="Medium Feedback (Default)" placeholder="Enter text" />
            <modus-input-feedback level="info" message="Medium feedback message (default)." size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input label="Large Feedback" placeholder="Enter text" />
            <modus-input-feedback level="info" message="Large feedback message." size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Custom Feedback Icons"
        description="Feedback with custom icons."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input label="Custom Success Icon" placeholder="Enter text" />
            <modus-input-feedback
              level="success"
              message="Custom success message."
              icon="check_circle"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input label="Custom Error Icon" placeholder="Enter text" />
            <modus-input-feedback level="error" message="Custom error message." icon="alert" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Real-World Examples"
        description="Common validation scenarios in forms."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              [required]="true"
            />
            <modus-input-feedback
              level="info"
              message="We'll never share your email with anyone else."
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              label="Password"
              type="password"
              placeholder="Enter password"
              [required]="true"
            />
            <modus-input-feedback
              level="warning"
              message="Password must be at least 8 characters long."
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-textarea
              label="Feedback"
              placeholder="Enter your feedback..."
              [rows]="4"
              [maxLength]="200"
            />
            <modus-input-feedback
              level="info"
              message="Maximum 200 characters allowed."
            />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class InputFeedbackDemoPageComponent {}

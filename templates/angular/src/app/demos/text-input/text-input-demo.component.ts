import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTextInputComponent } from '../../components/modus-text-input.component';

/**
 * Demo page showcasing the Modus Text Input component.
 *
 * Demonstrates text input features including:
 * - Basic text input
 * - Input types (email, password, etc.)
 * - Sizes
 * - With clear button
 * - With search icon
 * - Interactive examples
 */
@Component({
  selector: 'app-text-input-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusTextInputComponent],
  template: `
    <demo-page
      title="Modus Text Input"
      description="Text input components provide a way for users to enter text data. Use text inputs for names, emails, passwords, and any other text-based form data."
    >
      <demo-example title="Input Types" description="Text inputs with different input types.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="text-type-input"
              label="Text"
              type="text"
              placeholder="Enter text"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="email-type-input"
              label="Email"
              type="email"
              placeholder="user@example.com"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="password-type-input"
              label="Password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="url-type-input"
              label="URL"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="tel-type-input"
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Text Input Sizes" description="Text inputs in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="small-text-input"
              label="Small"
              placeholder="Enter text"
              size="sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="medium-text-input"
              label="Medium"
              placeholder="Enter text"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="large-text-input"
              label="Large"
              placeholder="Enter text"
              size="lg"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Text Input with Icons"
        description="Text inputs with clear button or search icon."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="clear-input"
              label="With Clear"
              placeholder="Type to search..."
              [includeClear]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="search-input"
              label="Search"
              placeholder="Search..."
              [includeSearch]="true"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required and Disabled States"
        description="Text inputs in required and disabled states."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="required-input"
              label="Required"
              placeholder="This field is required"
              [required]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-text-input
              inputId="disabled-input"
              label="Disabled"
              placeholder="Cannot edit"
              [disabled]="true"
              value="Disabled value"
            />
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TextInputDemoPageComponent {}

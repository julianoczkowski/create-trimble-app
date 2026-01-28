import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusTextareaComponent } from '../modus-textarea.component';
import { ModusInputLabelComponent } from '../modus-input-label.component';

/**
 * Demo page showcasing the Modus Textarea component.
 *
 * Demonstrates textarea features including:
 * - Basic textarea
 * - Sizes
 * - Row count
 * - Max length
 * - Interactive examples
 */
@Component({
  selector: 'app-textarea-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusTextareaComponent,
    ModusInputLabelComponent,
  ],
  template: `
    <demo-page
      title="Modus Textarea"
      description="Textarea components provide a multi-line text input for longer content. Use textareas for comments, descriptions, or any content that requires multiple lines of text."
    >
      <demo-example
        title="Basic Textarea"
        description="Simple textarea with label and placeholder."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="comments-textarea" labelText="Comments" />
            <modus-textarea
              inputId="comments-textarea"
              label="Comments"
              placeholder="Enter your comments here..."
              [rows]="4"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="description-textarea" labelText="Description" />
            <modus-textarea
              inputId="description-textarea"
              label="Description"
              placeholder="Enter description..."
              [rows]="3"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Textarea Sizes"
        description="Textareas in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-textarea" labelText="Small" />
            <modus-textarea
              inputId="small-textarea"
              label="Small"
              placeholder="Enter text..."
              size="sm"
              [rows]="3"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-textarea" labelText="Medium (Default)" />
            <modus-textarea
              inputId="medium-textarea"
              label="Medium"
              placeholder="Enter text..."
              size="md"
              [rows]="3"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-textarea" labelText="Large" />
            <modus-textarea
              inputId="large-textarea"
              label="Large"
              placeholder="Enter text..."
              size="lg"
              [rows]="3"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Textarea with Row Count"
        description="Textareas with different row counts."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="rows3-textarea" labelText="3 Rows" />
            <modus-textarea inputId="rows3-textarea" label="3 Rows" placeholder="Enter text..." [rows]="3" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="rows5-textarea" labelText="5 Rows" />
            <modus-textarea inputId="rows5-textarea" label="5 Rows" placeholder="Enter text..." [rows]="5" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="rows8-textarea" labelText="8 Rows" />
            <modus-textarea inputId="rows8-textarea" label="8 Rows" placeholder="Enter text..." [rows]="8" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Textarea with Max Length"
        description="Textareas with character limit validation."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="max200-textarea" labelText="Max 200 Characters" />
            <modus-textarea
              inputId="max200-textarea"
              label="Description"
              placeholder="Max 200 characters"
              [maxLength]="200"
              [rows]="4"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="max500-textarea" labelText="Max 500 Characters" />
            <modus-textarea
              inputId="max500-textarea"
              label="Comments"
              placeholder="Max 500 characters"
              [maxLength]="500"
              [rows]="6"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Required and Disabled States"
        description="Textareas in required and disabled states."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-textarea" labelText="Required Field" [required]="true" />
            <modus-textarea
              inputId="required-textarea"
              label="Required"
              placeholder="This field is required"
              [required]="true"
              [rows]="4"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="disabled-textarea" labelText="Disabled Field" />
            <modus-textarea
              inputId="disabled-textarea"
              label="Disabled"
              placeholder="Cannot edit"
              [disabled]="true"
              [rows]="4"
              value="This is a disabled textarea with some content."
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Textarea with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="interactive-textarea" labelText="Enter Your Message" />
            <modus-textarea
              inputId="interactive-textarea"
              label="Enter Your Message"
              placeholder="Type your message here..."
              [value]="textareaValue()"
              [rows]="4"
              [maxLength]="500"
              (inputChange)="handleTextareaChange($event)"
            />
          </div>
          @if (textareaValue()) {
            <div class="p-4 rounded-lg bg-card border-default">
              <p class="text-sm text-foreground mb-2">
                <strong>Character Count:</strong> {{ textareaValue().length }} / 500
              </p>
              <p class="text-sm text-muted-foreground">
                <strong>Word Count:</strong> {{ getWordCount() }}
              </p>
            </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class TextareaDemoPageComponent {
  readonly textareaValue = signal<string>('');

  handleTextareaChange(event: InputEvent): void {
    const target = event.target as HTMLTextAreaElement;
    this.textareaValue.set(target.value);
  }

  getWordCount(): number {
    const text = this.textareaValue().trim();
    return text ? text.split(/\s+/).length : 0;
  }
}


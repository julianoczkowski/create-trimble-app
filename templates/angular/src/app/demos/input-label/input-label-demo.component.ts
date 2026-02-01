import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusInputLabelComponent } from '../../components/modus-input-label.component';
import { ModusTextInputComponent } from '../../components/modus-text-input.component';
import { ModusCheckboxComponent } from '../../components/modus-checkbox.component';
import { ModusRadioComponent } from '../../components/modus-radio.component';
import { ModusDateComponent } from '../../components/modus-date.component';
import { ModusNumberInputComponent } from '../../components/modus-number-input.component';
import { ModusInputFeedbackComponent } from '../../components/modus-input-feedback.component';
import type { IInputFeedbackProp } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Input Label component.
 *
 * Demonstrates input label features including:
 * - Basic labels
 * - Required labels
 * - Labels with different form controls
 * - Label sizes
 * - Label accessibility
 */
@Component({
  selector: 'app-input-label-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusInputLabelComponent,
    ModusTextInputComponent,
    ModusCheckboxComponent,
    ModusRadioComponent,
    ModusDateComponent,
    ModusNumberInputComponent,
    ModusInputFeedbackComponent,
  ],
  template: `
    <demo-page
      title="Modus Input Label"
      description="Input labels provide clear identification for form controls. Always use labels to make forms accessible and user-friendly."
    >
      <demo-example title="Basic Label" description="Simple label for form inputs.">
        <div class="flex flex-col gap-2">
          <modus-input-label forId="basic-input" labelText="Email Address" />
          <modus-text-input inputId="basic-input" placeholder="user@example.com" />
        </div>
      </demo-example>

      <demo-example
        title="Required Label"
        description="Labels with required indicator for mandatory fields."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-input" labelText="First Name" [required]="true" />
            <modus-text-input
              inputId="required-input"
              placeholder="Enter first name"
              [required]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="required-email" labelText="Email" [required]="true" />
            <modus-text-input
              inputId="required-email"
              type="email"
              placeholder="user@example.com"
              [required]="true"
            />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Labels with Different Form Controls"
        description="Input labels work with various form control types."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="checkbox-input" labelText="Accept Terms" [required]="true" />
            <modus-checkbox
              inputId="checkbox-input"
              label="I agree to the terms and conditions"
              [required]="true"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="radio-input" labelText="Select Option" />
            <div class="flex flex-col gap-2">
              <modus-radio
                inputId="radio-input"
                label="Option A"
                name="radio-demo"
                [value]="true"
              />
              <modus-radio
                inputId="radio-input-b"
                label="Option B"
                name="radio-demo"
                [value]="false"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <modus-date inputId="date-input" label="Pick a date" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-number-input
              inputId="number-input"
              label="Quantity"
              placeholder="0"
              [step]="1"
            />
          </div>
        </div>
      </demo-example>

      <demo-example title="Label Sizes" description="Input labels in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="small-label" labelText="Small Label" size="sm" />
            <modus-text-input inputId="small-label" placeholder="Enter text" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="medium-label" labelText="Medium Label (Default)" size="md" />
            <modus-text-input inputId="medium-label" placeholder="Enter text" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="large-label" labelText="Large Label" size="lg" />
            <modus-text-input inputId="large-label" placeholder="Enter text" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Real-World Form Example"
        description="Complete form example with proper labels and validation feedback."
      >
        <div class="flex flex-col gap-6 p-6 rounded-lg bg-card border-default">
          <div class="flex flex-col gap-2">
            <modus-input-label forId="form-first-name" labelText="First Name" [required]="true" />
            <modus-text-input
              inputId="form-first-name"
              placeholder="Enter first name"
              [required]="true"
              [value]="form.controls.firstName.value ?? ''"
              [feedback]="firstNameFeedback()"
              (inputChange)="handleFirstNameChange($event)"
              (inputBlur)="handleFirstNameBlur()"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="form-last-name" labelText="Last Name" [required]="true" />
            <modus-text-input
              inputId="form-last-name"
              placeholder="Enter last name"
              [required]="true"
              [value]="form.controls.lastName.value ?? ''"
              [feedback]="lastNameFeedback()"
              (inputChange)="handleLastNameChange($event)"
              (inputBlur)="handleLastNameBlur()"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="form-email" labelText="Email Address" [required]="true" />
            <modus-text-input
              inputId="form-email"
              type="email"
              placeholder="user@example.com"
              [required]="true"
              [value]="form.controls.email.value ?? ''"
              [feedback]="emailFeedback()"
              (inputChange)="handleEmailChange($event)"
              (inputBlur)="handleEmailBlur()"
            />
          </div>

          <div class="flex flex-col gap-2">
            <modus-input-label forId="form-checkbox" labelText="Agreement" [required]="true" />
            <modus-checkbox
              inputId="form-checkbox"
              label="I agree to the terms and conditions"
              [required]="true"
              [value]="form.controls.agreement.value ?? false"
              (inputChange)="handleAgreementChange($event)"
              (inputBlur)="handleAgreementBlur()"
            />
            @if (agreementFeedback()) {
            <modus-input-feedback
              [level]="agreementFeedback()!.level"
              [message]="agreementFeedback()!.message"
            />
            }
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class InputLabelDemoPageComponent {
  private readonly fb = new FormBuilder();

  readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    agreement: [false, Validators.requiredTrue],
  });

  // Track touched state for each field
  readonly touchedFields = signal<Set<string>>(new Set());

  // Computed feedback for firstName
  readonly firstNameFeedback = computed<IInputFeedbackProp | undefined>(() => {
    const control = this.form.controls.firstName;
    const isTouched = this.touchedFields().has('firstName');
    if (!isTouched || !control.errors) return undefined;

    if (control.errors['required']) {
      return { level: 'error', message: 'First name is required.' };
    }
    if (control.errors['minlength']) {
      return { level: 'error', message: 'First name must be at least 2 characters.' };
    }
    return undefined;
  });

  // Computed feedback for lastName
  readonly lastNameFeedback = computed<IInputFeedbackProp | undefined>(() => {
    const control = this.form.controls.lastName;
    const isTouched = this.touchedFields().has('lastName');
    if (!isTouched || !control.errors) return undefined;

    if (control.errors['required']) {
      return { level: 'error', message: 'Last name is required.' };
    }
    if (control.errors['minlength']) {
      return { level: 'error', message: 'Last name must be at least 2 characters.' };
    }
    return undefined;
  });

  // Computed feedback for email
  readonly emailFeedback = computed<IInputFeedbackProp | undefined>(() => {
    const control = this.form.controls.email;
    const isTouched = this.touchedFields().has('email');
    if (!isTouched || !control.errors) return undefined;

    if (control.errors['required']) {
      return { level: 'error', message: 'Email address is required.' };
    }
    if (control.errors['email']) {
      return { level: 'error', message: 'Please enter a valid email address.' };
    }
    return undefined;
  });

  // Computed feedback for agreement checkbox
  readonly agreementFeedback = computed<IInputFeedbackProp | undefined>(() => {
    const control = this.form.controls.agreement;
    const isTouched = this.touchedFields().has('agreement');
    if (!isTouched || !control.errors) return undefined;

    if (control.errors['required']) {
      return { level: 'error', message: 'You must agree to the terms and conditions.' };
    }
    return undefined;
  });

  handleFirstNameChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.form.controls.firstName.setValue(target.value);
    this.markFieldTouched('firstName');
  }

  handleFirstNameBlur(): void {
    this.markFieldTouched('firstName');
  }

  handleLastNameChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.form.controls.lastName.setValue(target.value);
    this.markFieldTouched('lastName');
  }

  handleLastNameBlur(): void {
    this.markFieldTouched('lastName');
  }

  handleEmailChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.form.controls.email.setValue(target.value);
    this.markFieldTouched('email');
  }

  handleEmailBlur(): void {
    this.markFieldTouched('email');
  }

  handleAgreementChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    const checked = target.type === 'checkbox' ? target.checked : Boolean(target.value);
    this.form.controls.agreement.setValue(checked);
    this.markFieldTouched('agreement');
  }

  handleAgreementBlur(): void {
    this.markFieldTouched('agreement');
  }

  private markFieldTouched(fieldName: string): void {
    this.touchedFields.update((fields) => {
      const newFields = new Set(fields);
      newFields.add(fieldName);
      return newFields;
    });
  }
}

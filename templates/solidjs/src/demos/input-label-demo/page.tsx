import { createSignal } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusInputLabel from "../../components/ModusInputLabel";
import ModusTextInput from "../../components/ModusTextInput";
import ModusCheckbox from "../../components/ModusCheckbox";
import ModusRadio from "../../components/ModusRadio";
import ModusDate from "../../components/ModusDate";
import ModusNumberInput from "../../components/ModusNumberInput";
import ModusInputFeedback from "../../components/ModusInputFeedback";
import type { InputFeedbackProp } from "../../components/ModusInputFeedback";
import { Show } from "solid-js";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  agreement: boolean;
}

interface TouchedFields {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  agreement: boolean;
}

export default function InputLabelDemoPage() {
  const [formState, setFormState] = createSignal<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    agreement: false,
  });

  const [touchedFields, setTouchedFields] = createSignal<TouchedFields>({
    firstName: false,
    lastName: false,
    email: false,
    agreement: false,
  });

  const markFieldTouched = (fieldName: keyof TouchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const validateFirstName = (): InputFeedbackProp | undefined => {
    const touched = touchedFields();
    const state = formState();
    if (!touched.firstName) return undefined;
    if (!state.firstName) {
      return { level: "error", message: "First name is required." };
    }
    if (state.firstName.length < 2) {
      return {
        level: "error",
        message: "First name must be at least 2 characters.",
      };
    }
    return undefined;
  };

  const validateLastName = (): InputFeedbackProp | undefined => {
    const touched = touchedFields();
    const state = formState();
    if (!touched.lastName) return undefined;
    if (!state.lastName) {
      return { level: "error", message: "Last name is required." };
    }
    if (state.lastName.length < 2) {
      return {
        level: "error",
        message: "Last name must be at least 2 characters.",
      };
    }
    return undefined;
  };

  const validateEmail = (): InputFeedbackProp | undefined => {
    const touched = touchedFields();
    const state = formState();
    if (!touched.email) return undefined;
    if (!state.email) {
      return { level: "error", message: "Email address is required." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      return { level: "error", message: "Please enter a valid email address." };
    }
    return undefined;
  };

  const validateAgreement = (): InputFeedbackProp | undefined => {
    const touched = touchedFields();
    const state = formState();
    if (!touched.agreement) return undefined;
    if (!state.agreement) {
      return {
        level: "error",
        message: "You must agree to the terms and conditions.",
      };
    }
    return undefined;
  };

  const handleFirstNameChange = (event: CustomEvent<InputEvent>) => {
    const target = (event as unknown as { detail?: { target?: HTMLInputElement }; target?: HTMLInputElement }).detail?.target ?? (event as unknown as { target: HTMLInputElement }).target;
    if (target) {
      setFormState((prev) => ({ ...prev, firstName: target.value }));
      markFieldTouched("firstName");
    }
  };

  const handleLastNameChange = (event: CustomEvent<InputEvent>) => {
    const target = (event as unknown as { detail?: { target?: HTMLInputElement }; target?: HTMLInputElement }).detail?.target ?? (event as unknown as { target: HTMLInputElement }).target;
    if (target) {
      setFormState((prev) => ({ ...prev, lastName: target.value }));
      markFieldTouched("lastName");
    }
  };

  const handleEmailChange = (event: CustomEvent<InputEvent>) => {
    const target = (event as unknown as { detail?: { target?: HTMLInputElement }; target?: HTMLInputElement }).detail?.target ?? (event as unknown as { target: HTMLInputElement }).target;
    if (target) {
      setFormState((prev) => ({ ...prev, email: target.value }));
      markFieldTouched("email");
    }
  };

  const handleAgreementChange = (event: CustomEvent<boolean>) => {
    setFormState((prev) => ({ ...prev, agreement: event.detail }));
    markFieldTouched("agreement");
  };

  return (
    <DemoPage
      title="Modus Input Label"
      description="Input labels provide clear identification for form controls. Always use labels to make forms accessible and user-friendly."
    >
      <DemoExample
        title="Basic Label"
        description="Simple label for form inputs."
      >
        <div class="flex flex-col gap-2">
          <ModusInputLabel forId="basic-input" labelText="Email Address" />
          <ModusTextInput
            inputId="basic-input"
            placeholder="user@example.com"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Required Label"
        description="Labels with required indicator for mandatory fields."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="required-input"
              labelText="First Name"
              required
            />
            <ModusTextInput
              inputId="required-input"
              placeholder="Enter first name"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="required-email"
              labelText="Email"
              required
            />
            <ModusTextInput
              inputId="required-email"
              type="email"
              placeholder="user@example.com"
              required
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Labels with Different Form Controls"
        description="Input labels work with various form control types."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="checkbox-input"
              labelText="Accept Terms"
              required
            />
            <ModusCheckbox
              inputId="checkbox-input"
              label="I agree to the terms and conditions"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel forId="radio-input" labelText="Select Option" />
            <div class="flex flex-col gap-2">
              <ModusRadio
                inputId="radio-input"
                label="Option A"
                name="radio-demo"
                value={true}
              />
              <ModusRadio
                inputId="radio-input-b"
                label="Option B"
                name="radio-demo"
                value={false}
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <ModusDate inputId="date-input" label="Pick a date" />
          </div>

          <div class="flex flex-col gap-2">
            <ModusNumberInput
              inputId="number-input"
              label="Quantity"
              placeholder="0"
              step={1}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Label Sizes"
        description="Input labels in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="small-label"
              labelText="Small Label"
              size="sm"
            />
            <ModusTextInput
              inputId="small-label"
              placeholder="Enter text"
              size="sm"
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="medium-label"
              labelText="Medium Label (Default)"
              size="md"
            />
            <ModusTextInput
              inputId="medium-label"
              placeholder="Enter text"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="large-label"
              labelText="Large Label"
              size="lg"
            />
            <ModusTextInput
              inputId="large-label"
              placeholder="Enter text"
              size="lg"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Real-World Form Example"
        description="Complete form example with proper labels and validation feedback."
      >
        <div class="flex flex-col gap-6 p-6 rounded-lg bg-card border-default">
          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="form-first-name"
              labelText="First Name"
              required
            />
            <ModusTextInput
              inputId="form-first-name"
              placeholder="Enter first name"
              required
              value={formState().firstName}
              feedback={validateFirstName()}
              onInputChange={handleFirstNameChange}
              onInputBlur={() => markFieldTouched("firstName")}
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="form-last-name"
              labelText="Last Name"
              required
            />
            <ModusTextInput
              inputId="form-last-name"
              placeholder="Enter last name"
              required
              value={formState().lastName}
              feedback={validateLastName()}
              onInputChange={handleLastNameChange}
              onInputBlur={() => markFieldTouched("lastName")}
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="form-email"
              labelText="Email Address"
              required
            />
            <ModusTextInput
              inputId="form-email"
              type="email"
              placeholder="user@example.com"
              required
              value={formState().email}
              feedback={validateEmail()}
              onInputChange={handleEmailChange}
              onInputBlur={() => markFieldTouched("email")}
            />
          </div>

          <div class="flex flex-col gap-2">
            <ModusInputLabel
              forId="form-checkbox"
              labelText="Agreement"
              required
            />
            <ModusCheckbox
              inputId="form-checkbox"
              label="I agree to the terms and conditions"
              required
              value={formState().agreement}
              onValueChange={handleAgreementChange}
              onInputBlur={() => markFieldTouched("agreement")}
            />
            <Show when={validateAgreement()}>
              {(feedback) => (
                <ModusInputFeedback
                  level={feedback.level}
                  message={feedback.message}
                />
              )}
            </Show>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

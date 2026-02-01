"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTextInput from "../../components/ModusTextInput";

export default function TextInputDemoPage() {
  return (
    <DemoPage
      title="Modus Text Input"
      description="Text input components provide a way for users to enter text data. Use text inputs for names, emails, passwords, and any other text-based form data."
    >
      <DemoExample
        title="Input Types"
        description="Text inputs with different input types."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="text-type-input"
              label="Text"
              type="text"
              placeholder="Enter text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="email-type-input"
              label="Email"
              type="email"
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="password-type-input"
              label="Password"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="url-type-input"
              label="URL"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="tel-type-input"
              label="Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Text Input Sizes"
        description="Text inputs in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="small-text-input"
              label="Small"
              placeholder="Enter text"
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="medium-text-input"
              label="Medium"
              placeholder="Enter text"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="large-text-input"
              label="Large"
              placeholder="Enter text"
              size="lg"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Text Input with Icons"
        description="Text inputs with clear button or search icon."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="clear-input"
              label="With Clear"
              placeholder="Type to search..."
              includeClear={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="search-input"
              label="Search"
              placeholder="Search..."
              includeSearch={true}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Required and Disabled States"
        description="Text inputs in required and disabled states."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="required-input"
              label="Required"
              placeholder="This field is required"
              required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              inputId="disabled-input"
              label="Disabled"
              placeholder="Cannot edit"
              disabled={true}
              value="Disabled value"
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

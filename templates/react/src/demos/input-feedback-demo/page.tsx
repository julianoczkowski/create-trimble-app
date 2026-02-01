"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusInputFeedback from "../../components/ModusInputFeedback";
import ModusTextInput from "../../components/ModusTextInput";
import ModusTextarea from "../../components/ModusTextarea";

export default function InputFeedbackDemoPage() {
  return (
    <DemoPage
      title="Modus Input Feedback"
      description="Input feedback provides validation messages and guidance to users for form inputs. Use feedback to communicate validation state and helpful information."
    >
      <DemoExample
        title="Feedback Levels"
        description="Different feedback levels to indicate validation state."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Email"
              type="email"
              placeholder="user@example.com"
              value="user@example.com"
            />
            <ModusInputFeedback
              level="success"
              message="Email address is valid."
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Password"
              type="password"
              placeholder="Enter password"
              value=""
            />
            <ModusInputFeedback level="error" message="Password is required." />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Username"
              placeholder="Enter username"
              value="test123"
            />
            <ModusInputFeedback
              level="warning"
              message="Username should be at least 8 characters."
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Website"
              placeholder="https://example.com"
              value=""
            />
            <ModusInputFeedback
              level="info"
              message="Enter the full URL including http:// or https://"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Feedback with Textarea"
        description="Input feedback can be used with textarea inputs."
      >
        <div className="flex flex-col gap-2">
          <ModusTextarea
            label="Comments"
            placeholder="Enter your comments..."
            rows={4}
            value="This is a comment."
          />
          <ModusInputFeedback
            level="success"
            message="Comment saved successfully."
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Feedback Sizes"
        description="Input feedback in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput label="Small Feedback" placeholder="Enter text" />
            <ModusInputFeedback
              level="info"
              message="Small feedback message."
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Medium Feedback (Default)"
              placeholder="Enter text"
            />
            <ModusInputFeedback
              level="info"
              message="Medium feedback message (default)."
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput label="Large Feedback" placeholder="Enter text" />
            <ModusInputFeedback
              level="info"
              message="Large feedback message."
              size="lg"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Feedback Icons"
        description="Feedback with custom icons."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Custom Success Icon"
              placeholder="Enter text"
            />
            <ModusInputFeedback
              level="success"
              message="Custom success message."
              icon="check_circle"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Custom Error Icon"
              placeholder="Enter text"
            />
            <ModusInputFeedback
              level="error"
              message="Custom error message."
              icon="alert"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Real-World Examples"
        description="Common validation scenarios in forms."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              required={true}
            />
            <ModusInputFeedback
              level="info"
              message="We'll never share your email with anyone else."
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextInput
              label="Password"
              type="password"
              placeholder="Enter password"
              required={true}
            />
            <ModusInputFeedback
              level="warning"
              message="Password must be at least 8 characters long."
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusTextarea
              label="Feedback"
              placeholder="Enter your feedback..."
              rows={4}
              maxLength={200}
            />
            <ModusInputFeedback
              level="info"
              message="Maximum 200 characters allowed."
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

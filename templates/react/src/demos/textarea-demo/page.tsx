"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusTextarea from "../../components/ModusTextarea";

export default function TextareaDemoPage() {
  return (
    <DemoPage
      title="Modus Textarea"
      description="Textareas support longer responses or feedback. Offer guidance on what to include and set an appropriate height."
    >
      <DemoExample
        title="Customer feedback"
        description="Use the default size for two to three sentence responses."
      >
        <ModusTextarea
          label="Share feedback"
          placeholder="Tell us what worked well and what can improve."
          rows={4}
        />
      </DemoExample>
      <DemoExample
        title="Detailed notes"
        description="Increase the height when expecting longer entries."
      >
        <ModusTextarea
          label="Site visit notes"
          rows={6}
          feedback={{
            level: "info",
            message: "Include location details and follow-up actions.",
          }}
        />
      </DemoExample>
      <DemoExample
        title="Feedback States"
        description="Display validation feedback with info, success, and error states."
      >
        <div className="flex flex-col gap-6">
          <ModusTextarea
            label="Info feedback"
            placeholder="Enter details..."
            rows={3}
            feedback={{
              level: "info",
              message: "This is helpful information about the field.",
            }}
          />
          <ModusTextarea
            label="Success feedback"
            placeholder="Enter details..."
            rows={3}
            value="Valid input provided."
            feedback={{
              level: "success",
              message: "Great! Your input looks good.",
            }}
          />
          <ModusTextarea
            label="Error feedback"
            placeholder="Enter details..."
            rows={3}
            feedback={{
              level: "error",
              message: "This field is required. Please enter a value.",
            }}
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

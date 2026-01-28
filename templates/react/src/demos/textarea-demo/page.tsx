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
    </DemoPage>
  );
}

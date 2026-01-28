"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusInputLabel from "../../components/ModusInputLabel";
import ModusTextInput from "../../components/ModusTextInput";

export default function InputLabelDemoPage() {
  return (
    <DemoPage
      title="Modus Input Label"
      description="Labels tie form controls to clear instructions. Use a short primary label and an optional sublabel for details."
    >
      <DemoExample
        title="Standard label"
        description="Pair labels with text inputs to maintain clarity."
      >
        <div className="flex flex-col gap-2">
          <ModusInputLabel labelText="Workspace name" required />
          <ModusTextInput placeholder="e.g. Field Services" />
        </div>
      </DemoExample>
      <DemoExample
        title="Label with helper text"
        description="Sublabels explain formatting or constraints without overwhelming the main instruction."
      >
        <div className="flex flex-col gap-2">
          <ModusInputLabel
            labelText="Public slug"
            subLabelText="Use lowercase letters, numbers, or dashes."
          />
          <ModusTextInput placeholder="field-services" size="sm" />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

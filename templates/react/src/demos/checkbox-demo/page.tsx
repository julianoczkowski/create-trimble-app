"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusCheckbox from "../../components/ModusCheckbox";

export default function CheckboxDemoPage() {
  return (
    <DemoPage
      title="Modus Checkbox"
      description="Checkboxes allow users to select one or more options from a list. Use checkboxes for multiple selections and when users need to toggle individual options."
    >
      <DemoExample
        title="Checkbox States"
        description="Different checkbox states: unchecked, checked, and indeterminate."
      >
        <div className="flex flex-col gap-4">
          <ModusCheckbox label="Unchecked" value={false} />
          <ModusCheckbox label="Checked" value={true} />
          <ModusCheckbox label="Indeterminate" indeterminate={true} />
        </div>
      </DemoExample>

      <DemoExample
        title="Checkbox Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div className="flex flex-col gap-4">
          <ModusCheckbox label="Small checkbox" size="sm" value={true} />
          <ModusCheckbox
            label="Medium checkbox (default)"
            size="md"
            value={true}
          />
          <ModusCheckbox label="Large checkbox" size="lg" value={true} />
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled State"
        description="Checkboxes in disabled state for unavailable options."
      >
        <div className="flex flex-col gap-4">
          <ModusCheckbox
            label="Disabled unchecked"
            disabled={true}
            value={false}
          />
          <ModusCheckbox
            label="Disabled checked"
            disabled={true}
            value={true}
          />
          <ModusCheckbox
            label="Disabled indeterminate"
            disabled={true}
            indeterminate={true}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Required Checkbox"
        description="Mark checkboxes as required for form validation."
      >
        <div className="flex flex-col gap-4">
          <ModusCheckbox
            label="I agree to the terms (required)"
            required={true}
          />
          <ModusCheckbox
            label="Confirm email subscription (required)"
            required={true}
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

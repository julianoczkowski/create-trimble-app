"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNumberInput from "../../components/ModusNumberInput";

export default function NumberInputDemoPage() {
  return (
    <DemoPage
      title="Modus Number Input"
      description="Number inputs gather numeric values with optional constraints. Display units or ranges directly in the control."
    >
      <DemoExample
        title="Quantity"
        description="Use min and step values to prevent invalid entries."
      >
        <ModusNumberInput label="Seats" value="12" min={1} max={50} step={1} />
      </DemoExample>
      <DemoExample
        title="Currency"
        description="Prefix the input with a currency symbol for cost-related fields."
      >
        <ModusNumberInput
          label="Budget"
          value="12500"
          min={0}
          step={100}
          currencySymbol="$"
          size="sm"
        />
      </DemoExample>
    </DemoPage>
  );
}

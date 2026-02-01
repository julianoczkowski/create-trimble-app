"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNumberInput from "../../components/ModusNumberInput";

export default function NumberInputDemoPage() {
  const [numberValue, setNumberValue] = useState<string>("");

  const handleNumberChange = (value: string) => {
    setNumberValue(value);
  };

  const getDoubleValue = (): number => {
    const num = parseFloat(numberValue);
    return isNaN(num) ? 0 : num * 2;
  };

  return (
    <DemoPage
      title="Modus Number Input"
      description="Number inputs provide a controlled way to enter numeric values. Use number inputs for quantities, amounts, ratings, or any numeric data entry."
    >
      <DemoExample
        title="Basic Number Input"
        description="Simple number input with label."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="quantity-input"
              label="Quantity"
              placeholder="0"
              step={1}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="price-input"
              label="Price"
              placeholder="0.00"
              step={0.01}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Number Input Sizes"
        description="Number inputs in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="small-number"
              label="Small"
              size="sm"
              placeholder="0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="medium-number"
              label="Medium"
              size="md"
              placeholder="0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="large-number"
              label="Large"
              size="lg"
              placeholder="0"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Number Input with Constraints"
        description="Number inputs with min, max, and step values."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="age-input"
              label="Age"
              placeholder="Enter age"
              min={1}
              max={120}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="percentage-input"
              label="Percentage"
              placeholder="0"
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="decimal-input"
              label="Decimal"
              placeholder="0.0"
              min={0}
              max={10}
              step={0.1}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Currency Number Input"
        description="Number input with currency symbol."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="usd-input"
              label="USD Amount"
              placeholder="0.00"
              currencySymbol="$"
              step={0.01}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="eur-input"
              label="EUR Amount"
              placeholder="0.00"
              currencySymbol="€"
              step={0.01}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Interactive Example"
        description="Number input with two-way binding and event handling."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusNumberInput
              inputId="interactive-number"
              label="Enter a Number"
              placeholder="0"
              value={numberValue}
              step={1}
              onInputChange={handleNumberChange}
            />
          </div>
          {numberValue !== null && numberValue !== "" && (
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-foreground mb-2">
                <strong>Current Value:</strong> {numberValue}
              </div>
              <div className="text-sm text-foreground">
                <strong>Double Value:</strong> {getDoubleValue()}
              </div>
            </div>
          )}
        </div>
      </DemoExample>
    </DemoPage>
  );
}

"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusRadio from "../../components/ModusRadio";
import ModusInputLabel from "../../components/ModusInputLabel";

/**
 * Demo page showcasing the Modus Radio component.
 *
 * Demonstrates radio button features including:
 * - Basic radio groups
 * - Sizes
 * - Disabled state
 * - Required fields
 * - With labels
 */
export default function RadioDemoPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <DemoPage
      title="Modus Radio"
      description="Radio buttons allow users to select a single option from a group. Use radio buttons when only one option can be selected at a time."
    >
      <DemoExample
        title="Basic Radio Group"
        description="Simple radio button group with multiple options."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="option-a" labelText="Select Option" />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="option-a"
                label="Option A"
                name="basic-group"
                value={true}
              />
              <ModusRadio
                inputId="option-b"
                label="Option B"
                name="basic-group"
                value={false}
              />
              <ModusRadio
                inputId="option-c"
                label="Option C"
                name="basic-group"
                value={false}
              />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Radio Button Sizes"
        description="Radio buttons in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="small-radio" labelText="Small" />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="small-radio"
                label="Small Option"
                name="small-group"
                size="sm"
                value={true}
              />
              <ModusRadio
                inputId="small-radio-b"
                label="Another Small Option"
                name="small-group"
                size="sm"
                value={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="medium-radio"
              labelText="Medium (Default)"
            />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="medium-radio"
                label="Medium Option"
                name="medium-group"
                size="md"
                value={true}
              />
              <ModusRadio
                inputId="medium-radio-b"
                label="Another Medium Option"
                name="medium-group"
                size="md"
                value={false}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="large-radio" labelText="Large" />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="large-radio"
                label="Large Option"
                name="large-group"
                size="lg"
                value={true}
              />
              <ModusRadio
                inputId="large-radio-b"
                label="Another Large Option"
                name="large-group"
                size="lg"
                value={false}
              />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Required Radio Group"
        description="Radio buttons marked as required."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="required-a"
              labelText="Required Selection"
              required={true}
            />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="required-a"
                label="Yes"
                name="required-group"
                required={true}
                value={true}
              />
              <ModusRadio
                inputId="required-b"
                label="No"
                name="required-group"
                required={true}
                value={false}
              />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled Radio Buttons"
        description="Radio buttons in disabled state."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="disabled-a" labelText="Disabled Options" />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="disabled-a"
                label="Disabled Option 1"
                name="disabled-group"
                disabled={true}
                value={true}
              />
              <ModusRadio
                inputId="disabled-b"
                label="Disabled Option 2"
                name="disabled-group"
                disabled={true}
                value={false}
              />
              <ModusRadio
                inputId="disabled-c"
                label="Enabled Option"
                name="disabled-group"
                disabled={false}
                value={false}
              />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Interactive Example"
        description="Radio buttons with two-way binding and event handling."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="interactive-a"
              labelText="Choose Your Plan"
            />
            <div className="flex flex-col gap-2">
              <ModusRadio
                inputId="interactive-a"
                label="Free Plan"
                name="interactive-group"
                value={selectedOption === "free"}
                onInputChange={() => handleRadioChange("free")}
              />
              <ModusRadio
                inputId="interactive-b"
                label="Pro Plan"
                name="interactive-group"
                value={selectedOption === "pro"}
                onInputChange={() => handleRadioChange("pro")}
              />
              <ModusRadio
                inputId="interactive-c"
                label="Enterprise Plan"
                name="interactive-group"
                value={selectedOption === "enterprise"}
                onInputChange={() => handleRadioChange("enterprise")}
              />
            </div>
          </div>
          {selectedOption && (
            <div className="p-4 rounded-lg bg-card border-default">
              <div className="text-sm text-foreground">
                <strong>Selected Option:</strong> {selectedOption}
              </div>
            </div>
          )}
        </div>
      </DemoExample>
    </DemoPage>
  );
}

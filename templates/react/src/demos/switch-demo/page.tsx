"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSwitch from "../../components/ModusSwitch";
import ModusInputLabel from "../../components/ModusInputLabel";

/**
 * Demo page showcasing the Modus Switch component.
 *
 * Demonstrates switch features including:
 * - Basic switch
 * - Sizes
 * - Required fields
 * - Disabled state
 */
export default function SwitchDemoPage() {
  return (
    <DemoPage
      title="Modus Switch"
      description="Switch components allow users to toggle between on and off states. Use switches for binary settings like enabling/disabling features or turning notifications on/off."
    >
      <DemoExample
        title="Basic Switch"
        description="Simple switch toggle controls."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="notifications-switch"
              labelText="Notifications"
            />
            <ModusSwitch
              inputId="notifications-switch"
              label="Enable notifications"
              value={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="dark-mode-switch" labelText="Dark Mode" />
            <ModusSwitch
              inputId="dark-mode-switch"
              label="Dark mode"
              value={false}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Switch Sizes"
        description="Switches in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="small-switch" labelText="Small" />
            <ModusSwitch
              inputId="small-switch"
              label="Small switch"
              size="sm"
              value={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="medium-switch"
              labelText="Medium (Default)"
            />
            <ModusSwitch
              inputId="medium-switch"
              label="Medium switch"
              size="md"
              value={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel forId="large-switch" labelText="Large" />
            <ModusSwitch
              inputId="large-switch"
              label="Large switch"
              size="lg"
              value={true}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Required Switch"
        description="Switches marked as required fields."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="required-switch"
              labelText="Terms Agreement"
              required={true}
            />
            <ModusSwitch
              inputId="required-switch"
              label="I agree to the terms and conditions"
              required={true}
              value={false}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled Switch"
        description="Switches in disabled state."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="disabled-on-switch"
              labelText="Disabled (On)"
            />
            <ModusSwitch
              inputId="disabled-on-switch"
              label="Disabled switch (on)"
              disabled={true}
              value={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusInputLabel
              forId="disabled-off-switch"
              labelText="Disabled (Off)"
            />
            <ModusSwitch
              inputId="disabled-off-switch"
              label="Disabled switch (off)"
              disabled={true}
              value={false}
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

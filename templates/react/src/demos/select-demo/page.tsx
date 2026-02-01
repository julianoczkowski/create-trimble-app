"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSelect from "../../components/ModusSelect";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
];

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Japanese", value: "ja" },
];

const sizeOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export default function SelectDemoPage() {
  return (
    <DemoPage
      title="Modus Select"
      description="Select components provide a dropdown menu for choosing from a list of options. Use selects when you have multiple options and want to save space compared to radio buttons."
    >
      <DemoExample
        title="Basic Select"
        description="Simple select dropdown with options."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="country-select"
              label="Choose a country"
              options={countryOptions}
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="language-select"
              label="Select Language"
              options={languageOptions}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Select Sizes"
        description="Select dropdowns in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="small-select"
              label="Small"
              options={sizeOptions}
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="medium-select"
              label="Medium"
              options={sizeOptions}
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="large-select"
              label="Large"
              options={sizeOptions}
              size="lg"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled Select"
        description="Select dropdowns in disabled state."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusSelect
              inputId="disabled-select"
              label="Disabled"
              options={countryOptions}
              disabled
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

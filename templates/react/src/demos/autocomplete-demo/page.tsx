"use client";

import { useState, useEffect } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAutocomplete from "../../components/ModusAutocomplete";
import type { AutocompleteItem } from "../../components/ModusAutocomplete";

const countryItems: AutocompleteItem[] = [
  { label: "United States", value: "us", visibleInMenu: true },
  { label: "Canada", value: "ca", visibleInMenu: true },
  { label: "United Kingdom", value: "uk", visibleInMenu: true },
  { label: "Australia", value: "au", visibleInMenu: true },
  { label: "Germany", value: "de", visibleInMenu: true },
  { label: "France", value: "fr", visibleInMenu: true },
  { label: "Japan", value: "jp", visibleInMenu: true },
];

const skillItems: AutocompleteItem[] = [
  { label: "Angular", value: "angular", visibleInMenu: true },
  { label: "React", value: "react", visibleInMenu: true },
  { label: "Vue.js", value: "vue", visibleInMenu: true },
  { label: "TypeScript", value: "typescript", visibleInMenu: true },
  { label: "JavaScript", value: "javascript", visibleInMenu: true },
  { label: "Node.js", value: "nodejs", visibleInMenu: true },
  { label: "Python", value: "python", visibleInMenu: true },
];

const sizeItems: AutocompleteItem[] = [
  { label: "Option 1", value: "1", visibleInMenu: true },
  { label: "Option 2", value: "2", visibleInMenu: true },
  { label: "Option 3", value: "3", visibleInMenu: true },
];

const stateItems: AutocompleteItem[] = [
  { label: "Option A", value: "a", visibleInMenu: true },
  { label: "Option B", value: "b", visibleInMenu: true },
];

const loadingItems: AutocompleteItem[] = [
  { label: "Result 1", value: "1", visibleInMenu: true },
  { label: "Result 2", value: "2", visibleInMenu: true },
];

export default function AutocompleteDemoPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleCountrySelect = (event: CustomEvent<AutocompleteItem>) => {
    setSelectedCountry(event.detail.value);
    console.log("Selected country:", event.detail);
  };

  const handleSkillSelect = (event: CustomEvent<AutocompleteItem>) => {
    const value = event.detail.value;
    setSelectedSkills((current) => {
      if (current.includes(value)) {
        return current.filter((v) => v !== value);
      } else {
        return [...current, value];
      }
    });
  };

  useEffect(() => {
    console.log("Selected skills:", selectedSkills);
  }, [selectedSkills]);

  return (
    <DemoPage
      title="Modus Autocomplete"
      description="Autocomplete provides input suggestions as users type. Use autocomplete to help users find and select from a list of options quickly and efficiently."
    >
      <DemoExample
        title="Basic Autocomplete"
        description="Simple single-select autocomplete with a list of options."
      >
        <ModusAutocomplete
          label="Search Countries"
          placeholder="Type to search..."
          items={countryItems}
          value={selectedCountry}
          onItemSelect={handleCountrySelect}
        />
      </DemoExample>

      <DemoExample
        title="Multi-Select Autocomplete"
        description="Allow users to select multiple items with chips displayed for selected values."
      >
        <ModusAutocomplete
          label="Select Skills"
          placeholder="Type to search skills..."
          items={skillItems}
          multiSelect
          onItemSelect={handleSkillSelect}
        />
        {selectedSkills.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div className="font-semibold mb-2">Selected Skills:</div>
            <div className="text-sm">{selectedSkills.join(", ")}</div>
          </div>
        )}
      </DemoExample>

      <DemoExample
        title="Autocomplete Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div className="flex flex-col gap-4">
          <ModusAutocomplete
            label="Small Autocomplete"
            placeholder="Small size..."
            items={sizeItems}
            size="sm"
          />
          <ModusAutocomplete
            label="Medium Autocomplete"
            placeholder="Medium size..."
            items={sizeItems}
            size="md"
          />
          <ModusAutocomplete
            label="Large Autocomplete"
            placeholder="Large size..."
            items={sizeItems}
            size="lg"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled and Read-Only States"
        description="Autocomplete in disabled and read-only states."
      >
        <div className="flex flex-col gap-4">
          <ModusAutocomplete
            label="Disabled Autocomplete"
            placeholder="This is disabled"
            items={stateItems}
            disabled
          />
          <ModusAutocomplete
            label="Read-Only Autocomplete"
            placeholder="This is read-only"
            items={stateItems}
            value="Read-only value"
            readOnly
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Loading State"
        description="Show a spinner while fetching or processing autocomplete results."
      >
        <ModusAutocomplete
          label="Search with Loading"
          placeholder="Type to search..."
          items={loadingItems}
          showSpinner
        />
      </DemoExample>
    </DemoPage>
  );
}

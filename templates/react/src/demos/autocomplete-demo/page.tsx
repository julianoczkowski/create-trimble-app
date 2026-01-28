"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAutocomplete from "../../components/ModusAutocomplete";

const cityItems = [
  { label: "Austin", value: "austin", visibleInMenu: true },
  { label: "Berlin", value: "berlin", visibleInMenu: true },
  { label: "Denver", value: "denver", visibleInMenu: true },
  { label: "Portland", value: "portland", visibleInMenu: true },
  { label: "Singapore", value: "singapore", visibleInMenu: true },
];

const teammateItems = [
  { label: "Alex Rivera", value: "alex", visibleInMenu: true, selected: true },
  { label: "Brianna Lee", value: "brianna", visibleInMenu: true },
  { label: "Chris Patel", value: "chris", visibleInMenu: true },
  { label: "Morgan Diaz", value: "morgan", visibleInMenu: true },
  { label: "Taylor Chen", value: "taylor", visibleInMenu: true },
];

export default function AutocompleteDemoPage() {
  return (
    <DemoPage
      title="Modus Autocomplete"
      description="Autocomplete fields help people find options quickly. Offer short, familiar labels and only surface items that map to a real action."
    >
      <DemoExample
        title="City selector"
        description="Use a single-select autocomplete when the list is long but the user only needs one answer."
      >
        <ModusAutocomplete
          items={cityItems}
          placeholder="Search cities"
          label="Office location"
        />
      </DemoExample>
      <DemoExample
        title="Invite teammates"
        description="Multi-select autocomplete keeps collaboration lists compact while still supporting search."
      >
        <ModusAutocomplete
          items={teammateItems}
          placeholder="Add teammates"
          label="Project members"
          multiSelect
          bordered
        />
      </DemoExample>
    </DemoPage>
  );
}

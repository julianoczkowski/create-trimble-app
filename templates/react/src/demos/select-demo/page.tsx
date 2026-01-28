"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSelect from "../../components/ModusSelect";

const planOptions = [
  { label: "Starter", value: "starter" },
  { label: "Team", value: "team" },
  { label: "Enterprise", value: "enterprise" },
];

const timezoneOptions = [
  { label: "Pacific (UTC−08:00)", value: "pst" },
  { label: "Central (UTC−06:00)", value: "cst" },
  { label: "Greenwich (UTC+00:00)", value: "gmt" },
  { label: "Central Europe (UTC+01:00)", value: "cet" },
];

export default function SelectDemoPage() {
  return (
    <DemoPage
      title="Modus Select"
      description="Select menus provide a compact way to choose from predefined values. List options alphabetically and group long lists into logical sections."
    >
      <DemoExample
        title="Plan selection"
        description="Keep the label short and set a sensible default."
      >
        <ModusSelect label="Plan" value="team" options={planOptions} />
      </DemoExample>
      <DemoExample
        title="Timezone"
        description="Wide menus benefit from the large size for improved readability."
      >
        <ModusSelect label="Timezone" options={timezoneOptions} size="lg" />
      </DemoExample>
    </DemoPage>
  );
}

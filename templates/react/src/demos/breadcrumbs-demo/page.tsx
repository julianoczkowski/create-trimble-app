"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusBreadcrumbs from "../../components/ModusBreadcrumbs";
import type { BreadcrumbItem } from "../../components/ModusBreadcrumbs";

const basicItems: BreadcrumbItem[] = [
  { label: "Home", url: "/" },
  { label: "Components", url: "/components" },
  { label: "Breadcrumbs" },
];

const sizeItems: BreadcrumbItem[] = [
  { label: "Home", url: "/" },
  { label: "Library", url: "/library" },
  { label: "Data" },
];

const deepPathItems: BreadcrumbItem[] = [
  { label: "Home", url: "/" },
  { label: "Projects", url: "/projects" },
  { label: "Project Alpha", url: "/projects/alpha" },
  { label: "Settings", url: "/projects/alpha/settings" },
  { label: "Team" },
];

const longLabelItems: BreadcrumbItem[] = [
  { label: "Home", url: "/" },
  { label: "This is a very long breadcrumb label", url: "/long" },
  { label: "Another extremely long breadcrumb item name here" },
];

export default function BreadcrumbsDemoPage() {
  return (
    <DemoPage
      title="Modus Breadcrumbs"
      description="Breadcrumbs show the hierarchical path to the current page. Use breadcrumbs to help users understand their location and navigate back through the application structure."
    >
      <DemoExample
        title="Basic Breadcrumbs"
        description="Simple breadcrumb navigation showing the current path."
      >
        <ModusBreadcrumbs items={basicItems} />
      </DemoExample>

      <DemoExample
        title="Breadcrumb Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-base font-semibold mb-2 text-foreground">
              Small (sm)
            </div>
            <ModusBreadcrumbs items={sizeItems} size="sm" />
          </div>
          <div>
            <div className="text-base font-semibold mb-2 text-foreground">
              Medium (md)
            </div>
            <ModusBreadcrumbs items={sizeItems} size="md" />
          </div>
          <div>
            <div className="text-base font-semibold mb-2 text-foreground">
              Large (lg)
            </div>
            <ModusBreadcrumbs items={sizeItems} size="lg" />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Deep Navigation Path"
        description="Breadcrumbs showing a deep navigation hierarchy."
      >
        <ModusBreadcrumbs items={deepPathItems} />
      </DemoExample>

      <DemoExample
        title="Breadcrumbs with Long Labels"
        description="Breadcrumbs handle long labels gracefully with truncation."
      >
        <ModusBreadcrumbs items={longLabelItems} />
      </DemoExample>
    </DemoPage>
  );
}

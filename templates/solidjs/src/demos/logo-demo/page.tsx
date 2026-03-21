import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusLogo, { type LogoName } from "../../components/ModusLogo";
import { For } from "solid-js";

const trimbleLogos: { name: LogoName; displayName: string }[] = [
  { name: "trimble", displayName: "Trimble" },
  { name: "siteworks", displayName: "Trimble Siteworks" },
  { name: "earthworks", displayName: "Trimble Earthworks" },
  { name: "financials", displayName: "Trimble Financials" },
  { name: "worksmanager", displayName: "Trimble WorksManager" },
  { name: "connect", displayName: "Trimble Connect" },
  { name: "unity_construct", displayName: "Trimble Unity Construct" },
  { name: "trade_servicelive", displayName: "Trade ServiceLive" },
  { name: "buildable", displayName: "Buildable" },
  { name: "livecount", displayName: "LiveCount" },
  { name: "supplier_xchange", displayName: "Supplier Xchange" },
  { name: "app_xchange", displayName: "App Xchange" },
  { name: "trimble_unity", displayName: "Trimble Unity" },
  { name: "sketchup", displayName: "SketchUp" },
  { name: "pc_miler", displayName: "PC Miler" },
  { name: "copilot", displayName: "CoPilot" },
  { name: "trimble_pay", displayName: "Trimble Pay" },
  { name: "projectsight", displayName: "ProjectSight" },
  { name: "demand_planning", displayName: "Demand Planning" },
];

const viewpointLogos: { name: LogoName; displayName: string }[] = [
  { name: "viewpoint", displayName: "Viewpoint" },
  { name: "viewpoint_analytics", displayName: "Viewpoint Analytics" },
  { name: "viewpoint_epayments", displayName: "Viewpoint ePayments" },
  { name: "viewpoint_estimating", displayName: "Viewpoint Estimating" },
  { name: "viewpoint_field_management", displayName: "Viewpoint Field Management" },
  { name: "viewpoint_field_time", displayName: "Viewpoint Field Time" },
  { name: "viewpoint_financial_controls", displayName: "Viewpoint Financial Controls" },
  { name: "viewpoint_hr_management", displayName: "Viewpoint HR Management" },
  { name: "viewpoint_jobpac_connect", displayName: "Viewpoint Jobpac Connect" },
  { name: "viewpoint_procontractor", displayName: "Viewpoint ProContractor" },
  { name: "viewpoint_spectrum", displayName: "Viewpoint Spectrum" },
  { name: "viewpoint_team", displayName: "Viewpoint Team" },
  { name: "viewpoint_vista", displayName: "Viewpoint Vista" },
  { name: "viewpoint_spectrum_service_tech", displayName: "Viewpoint Spectrum Service Tech" },
  { name: "viewpoint_for_projects", displayName: "Viewpoint For Projects" },
  { name: "viewpoint_vista_field_service", displayName: "Viewpoint Vista Field Service" },
  { name: "viewpoint_field_view", displayName: "Viewpoint Field View" },
];

const sampleLogos: LogoName[] = ["trimble", "connect", "viewpoint", "sketchup"];

export default function LogoDemoPage() {
  return (
    <DemoPage
      title="Modus Logo"
      description="Logo component displays Trimble and Viewpoint product logos with automatic theme-aware light/dark switching. Use the component for consistent branding across applications."
    >
      <DemoExample
        title="Trimble Product Logos (19)"
        description="All available Trimble product logos."
      >
        <div class="grid grid-cols-2 gap-8">
          <For each={trimbleLogos}>
            {(logo) => (
              <div class="flex flex-col items-center gap-4 p-6 bg-background rounded-lg border-thick-dashed">
                <div class="h-20 flex items-center justify-center">
                  <ModusLogo name={logo.name} customClass="max-h-20 max-w-64" />
                </div>
                <div class="text-sm text-muted-foreground text-center">
                  {logo.displayName}
                </div>
                <code class="text-xs bg-muted px-2 py-1 rounded">
                  {logo.name}
                </code>
              </div>
            )}
          </For>
        </div>
      </DemoExample>

      <DemoExample
        title="Viewpoint Product Logos (17)"
        description="All available Viewpoint product logos."
      >
        <div class="grid grid-cols-2 gap-8">
          <For each={viewpointLogos}>
            {(logo) => (
              <div class="flex flex-col items-center gap-4 p-6 bg-background rounded-lg border-thick-dashed">
                <div class="h-20 flex items-center justify-center">
                  <ModusLogo name={logo.name} customClass="max-h-20 max-w-64" />
                </div>
                <div class="text-sm text-muted-foreground text-center">
                  {logo.displayName}
                </div>
                <code class="text-xs bg-muted px-2 py-1 rounded">
                  {logo.name}
                </code>
              </div>
            )}
          </For>
        </div>
      </DemoExample>

      <DemoExample
        title="Emblem Variants (Icon-Only)"
        description="Compact emblem versions of logos for use in limited space."
      >
        <div class="flex flex-wrap gap-8 items-end">
          <For each={sampleLogos}>
            {(logoName) => (
              <div class="flex flex-col items-center gap-2">
                <div class="h-16 w-16 flex items-center justify-center bg-muted rounded-lg p-2">
                  <ModusLogo name={logoName} emblem />
                </div>
                <code class="text-xs text-muted-foreground">{logoName}</code>
              </div>
            )}
          </For>
        </div>
      </DemoExample>

      <DemoExample
        title="Logo Sizes"
        description="Control logo size using custom CSS classes."
      >
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Small (w-20)</div>
            <div class="flex flex-wrap gap-4 items-center">
              <ModusLogo name="trimble" customClass="w-20" />
              <ModusLogo name="connect" customClass="w-20" />
              <ModusLogo name="viewpoint" customClass="w-20" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Medium (w-32)</div>
            <div class="flex flex-wrap gap-4 items-center">
              <ModusLogo name="trimble" customClass="w-32" />
              <ModusLogo name="connect" customClass="w-32" />
              <ModusLogo name="viewpoint" customClass="w-32" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">Large (w-48)</div>
            <div class="flex flex-wrap gap-4 items-center">
              <ModusLogo name="trimble" customClass="w-48" />
              <ModusLogo name="connect" customClass="w-48" />
              <ModusLogo name="viewpoint" customClass="w-48" />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Emblem Sizes"
        description="Sized emblem variants for different use cases."
      >
        <div class="flex flex-wrap gap-8 items-end">
          <div class="flex flex-col items-center gap-2">
            <div class="h-8 w-8 flex items-center justify-center bg-muted rounded p-1">
              <ModusLogo name="trimble" emblem customClass="w-6 h-6" />
            </div>
            <div class="text-xs text-muted-foreground">Small</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-12 w-12 flex items-center justify-center bg-muted rounded-lg p-2">
              <ModusLogo name="trimble" emblem customClass="w-8 h-8" />
            </div>
            <div class="text-xs text-muted-foreground">Medium</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-16 w-16 flex items-center justify-center bg-muted rounded-lg p-2">
              <ModusLogo name="trimble" emblem customClass="w-12 h-12" />
            </div>
            <div class="text-xs text-muted-foreground">Large</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="h-24 w-24 flex items-center justify-center bg-muted rounded-lg p-2">
              <ModusLogo name="trimble" emblem customClass="w-20 h-20" />
            </div>
            <div class="text-xs text-muted-foreground">Extra Large</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Alt Text"
        description="Provide custom alt text for better accessibility."
      >
        <div class="flex flex-wrap gap-6">
          <div class="flex flex-col items-center gap-2">
            <ModusLogo
              name="connect"
              alt="Trimble Connect - Cloud-based collaboration platform"
              customClass="w-32"
            />
            <div class="text-xs text-muted-foreground">Custom alt text</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ModusLogo name="viewpoint_vista" customClass="w-32" />
            <div class="text-xs text-muted-foreground">
              Default alt (logo name)
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Theme Awareness"
        description="Logos automatically switch between light and dark variants based on the current theme."
      >
        <div class="p-6 bg-muted rounded-lg">
          <div class="text-sm text-foreground mb-4">
            The logo component observes the{" "}
            <code class="bg-background px-2 py-1 rounded">data-theme</code>{" "}
            attribute on the{" "}
            <code class="bg-background px-2 py-1 rounded">&lt;html&gt;</code>{" "}
            element and automatically updates when the theme changes. Try
            switching themes using the theme toggle in the header.
          </div>
          <div class="flex flex-wrap gap-6">
            <ModusLogo name="trimble" customClass="w-32" />
            <ModusLogo name="viewpoint" customClass="w-32" />
            <ModusLogo name="sketchup" customClass="w-32" />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Full Logo vs Emblem Comparison"
        description="Side-by-side comparison of full logos and their emblem variants."
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-3 px-4 font-medium text-foreground">
                  Product
                </th>
                <th class="text-center py-3 px-4 font-medium text-foreground">
                  Full Logo
                </th>
                <th class="text-center py-3 px-4 font-medium text-foreground">
                  Emblem
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={sampleLogos}>
                {(logoName) => (
                  <tr class="border-b border-border">
                    <td class="py-4 px-4 text-muted-foreground capitalize">
                      {logoName.replace(/_/g, " ")}
                    </td>
                    <td class="py-4 px-4 text-center">
                      <div class="flex justify-center">
                        <ModusLogo name={logoName} customClass="h-8" />
                      </div>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <div class="flex justify-center">
                        <ModusLogo name={logoName} emblem customClass="h-8 w-8" />
                      </div>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

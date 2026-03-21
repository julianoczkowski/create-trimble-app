import { createSignal } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusTextInput from "../../components/ModusTextInput";
import ModusSwitch from "../../components/ModusSwitch";
import ModusUtilityPanel from "../../components/ModusUtilityPanel";

export default function UtilityPanelDemoPage() {
  const [expanded, setExpanded] = createSignal(false);
  const [formData, setFormData] = createSignal({
    projectName: "",
    email: "",
    notifications: true,
    autoSave: false,
  });

  const handleToggle = (collapsed: boolean) => {
    setExpanded(!collapsed);
  };

  const handleInputChange =
    (field: string) => (event: CustomEvent<InputEvent>) => {
      const target = (event as unknown as { target?: HTMLInputElement }).target;
      const value = target?.value ?? "";
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSwitchChange =
    (field: string) => (event: CustomEvent<InputEvent>) => {
      const ev = event as unknown as {
        detail?: { value?: boolean };
        target?: { value?: boolean };
      };
      const value = ev.detail?.value ?? ev.target?.value ?? false;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSave = () => {
    console.log("Saving form data:", formData());
    alert("Form data saved! Check console for details.");
  };

  return (
    <DemoPage
      title="Modus Utility Panel"
      description="Utility panels slide in contextual information or controls without leaving the page. Keep content focused and provide clear actions."
    >
      <DemoExample
        title="Settings Panel with Form Controls"
        description="A utility panel containing form inputs and controls. The panel can be toggled to show/hide additional settings without leaving the main workspace."
      >
        <div class="space-y-6">
          <div class="flex gap-4 items-center">
            <ModusButton
              color="primary"
              size="sm"
              onButtonClick={() => setExpanded((e) => !e)}
            >
              <span>{expanded() ? "Close" : "Open"} Settings Panel</span>
            </ModusButton>
            <div class="text-sm text-muted-foreground">
              Panel state: {expanded() ? "Open" : "Closed"}
            </div>
          </div>

          <div class="flex gap-4 items-start">
            <div
              class="flex-1 p-6 bg-card rounded-lg"
              style={{
                border: "1px solid var(--border)",
                "margin-right": expanded() ? "312px" : "0px",
                transition: "margin-right 0.2s ease-out",
              }}
            >
              <div class="text-xl font-semibold text-foreground mb-3">
                Main Workspace
              </div>
              <div class="text-muted-foreground mb-4">
                This is the primary content area. The utility panel slides in
                from the right to provide additional controls and settings
                without leaving this workspace.
              </div>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>Panel Position:</strong> Right side (default)
                </div>
                <div>
                  <strong>Panel Width:</strong> 312px (default)
                </div>
                <div>
                  <strong>Content Push:</strong> {expanded() ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Current Form Data:</strong>{" "}
                  {JSON.stringify(formData(), null, 2)}
                </div>
              </div>
            </div>

            <div class="flex-shrink-0">
              <ModusUtilityPanel
                expanded={expanded()}
                headerSlot={
                  <div class="flex items-center justify-between w-full min-w-full max-w-full">
                    <div class="text-xl font-bold text-foreground">
                      Project Settings
                    </div>
                    <ModusButton
                      size="sm"
                      color="secondary"
                      variant="borderless"
                      shape="circle"
                      icon="close"
                      iconPosition="only"
                      ariaLabel="Close panel"
                      onButtonClick={() => setExpanded(false)}
                    />
                  </div>
                }
                position="right"
                panelWidth="312px"
                pushContent={true}
                onToggle={handleToggle}
                footerSlot={
                  <div class="flex gap-2 justify-end">
                    <ModusButton
                      size="md"
                      color="secondary"
                      onButtonClick={() => setExpanded(false)}
                    >
                      Close
                    </ModusButton>
                    <ModusButton
                      size="md"
                      color="primary"
                      onButtonClick={handleSave}
                    >
                      Save Settings
                    </ModusButton>
                  </div>
                }
              >
                <div class="space-y-4">
                  <div>
                    <ModusTextInput
                      label="Project Name"
                      value={formData().projectName}
                      placeholder="Enter project name"
                      onInputChange={handleInputChange("projectName")}
                    />
                  </div>

                  <div>
                    <ModusTextInput
                      label="Email"
                      type="email"
                      value={formData().email}
                      placeholder="Enter email address"
                      onInputChange={handleInputChange("email")}
                    />
                  </div>

                  <div class="space-y-3">
                    <ModusSwitch
                      label="Enable Notifications"
                      value={formData().notifications}
                      onInputChange={handleSwitchChange("notifications")}
                    />

                    <ModusSwitch
                      label="Auto-save Changes"
                      value={formData().autoSave}
                      onInputChange={handleSwitchChange("autoSave")}
                    />
                  </div>

                  <div class="pt-2 text-xs text-muted-foreground">
                    <div>• Panel slides over main content</div>
                    <div>• Form state is preserved when toggling</div>
                    <div>• Settings are applied immediately</div>
                  </div>
                </div>
              </ModusUtilityPanel>
            </div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

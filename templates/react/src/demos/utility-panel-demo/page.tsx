"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusTextInput from "../../components/ModusTextInput";
import ModusSwitch from "../../components/ModusSwitch";
import ModusUtilityPanel from "../../components/ModusUtilityPanel";

export default function UtilityPanelDemoPage() {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    email: "",
    notifications: true,
    autoSave: false,
  });

  const handleToggle = (collapsed: boolean) => {
    setExpanded(!collapsed);
    console.log("Panel toggled:", collapsed ? "collapsed" : "expanded");
  };

  const handleInputChange =
    (field: string) => (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [field]: target.value,
      }));
    };

  const handleSwitchChange =
    (field: string) => (event: CustomEvent<InputEvent>) => {
      const target = event.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [field]: target.checked,
      }));
    };

  const handleSave = () => {
    console.log("Saving form data:", formData);
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
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex gap-4 items-center">
            <ModusButton
              color="primary"
              size="sm"
              onButtonClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Close" : "Open"} Settings Panel
            </ModusButton>
            <div className="text-sm text-muted-foreground">
              Panel state: {expanded ? "Open" : "Closed"}
            </div>
          </div>

          {/* Main content with utility panel */}
          <div className="flex gap-4 items-start">
            <div
              className="flex-1 p-6 bg-card rounded-lg"
              style={{
                border: "1px solid var(--border)",
                marginRight: expanded ? "312px" : "0px",
                transition: "margin-right 0.2s ease-out",
              }}
            >
              <div className="text-xl font-semibold text-foreground mb-3">
                Main Workspace
              </div>
              <div className="text-muted-foreground mb-4">
                This is the primary content area. The utility panel slides in
                from the right to provide additional controls and settings
                without leaving this workspace.
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Panel Position:</strong> Right side (default)
                </div>
                <div>
                  <strong>Panel Width:</strong> 312px (default)
                </div>
                <div>
                  <strong>Content Push:</strong> {expanded ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Current Form Data:</strong>{" "}
                  {JSON.stringify(formData, null, 2)}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <ModusUtilityPanel
                expanded={expanded}
                headerSlot={
                  <div className="flex items-center justify-between w-full min-w-full max-w-full">
                    <div className="text-xl font-bold text-foreground">
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
                  <div className="flex gap-2 justify-end">
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
                <div className="space-y-4">
                  <div>
                    <ModusTextInput
                      label="Project Name"
                      value={formData.projectName}
                      placeholder="Enter project name"
                      onInputChange={handleInputChange("projectName")}
                    />
                  </div>

                  <div>
                    <ModusTextInput
                      label="Email"
                      type="email"
                      value={formData.email}
                      placeholder="Enter email address"
                      onInputChange={handleInputChange("email")}
                    />
                  </div>

                  <div className="space-y-3">
                    <ModusSwitch
                      label="Enable Notifications"
                      value={formData.notifications}
                      onInputChange={handleSwitchChange("notifications")}
                    />

                    <ModusSwitch
                      label="Auto-save Changes"
                      value={formData.autoSave}
                      onInputChange={handleSwitchChange("autoSave")}
                    />
                  </div>

                  <div className="pt-2 text-xs text-muted-foreground">
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

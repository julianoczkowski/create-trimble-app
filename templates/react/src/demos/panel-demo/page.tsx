import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusPanel from "../../components/ModusPanel";
import ModusButton from "../../components/ModusButton";
import ModusMenu from "../../components/ModusMenu";
import ModusLogo from "../../components/ModusLogo";

export default function PanelDemoPage() {
  return (
    <DemoPage
      title="Modus Panel"
      description="Panel is a layout component for organizing content with header, body, and footer sections. Ideal for side navigation, structured forms, and sectioned content areas."
    >
      <DemoExample
        title="Basic Panel"
        description="A panel with header, body, and footer slots."
      >
        <ModusPanel
          width="280px"
          height="400px"
          header={
            <div className="p-4 border-b border-border">
              <div className="text-lg font-medium text-foreground">
                Panel Header
              </div>
            </div>
          }
          body={
            <div className="p-4">
              <div className="text-sm text-foreground">
                This is the body content of the panel. You can add any content
                here.
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Panels are great for organizing related content into distinct
                sections.
              </div>
            </div>
          }
          footer={
            <div className="p-4 border-t border-border flex gap-2">
              <ModusButton variant="outlined" color="secondary" size="sm">
                Cancel
              </ModusButton>
              <ModusButton variant="filled" color="primary" size="sm">
                Save
              </ModusButton>
            </div>
          }
        />
      </DemoExample>

      <DemoExample
        title="Floating Panel"
        description="A floating panel with elevated shadow for overlay appearance."
      >
        <div className="p-8 bg-background rounded-lg">
          <ModusPanel
            width="300px"
            height="auto"
            floating
            header={
              <div className="p-4 border-b border-border">
                <div className="text-lg font-medium text-foreground">
                  Quick Actions
                </div>
              </div>
            }
            body={
              <div className="p-4 flex flex-col gap-2">
                <ModusButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  icon="add"
                  iconPosition="left"
                >
                  New Document
                </ModusButton>
                <ModusButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  icon="upload"
                  iconPosition="left"
                >
                  Upload File
                </ModusButton>
                <ModusButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  icon="folder_new"
                  iconPosition="left"
                >
                  Create Folder
                </ModusButton>
              </div>
            }
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Navigation Panel"
        description="A panel configured as a side navigation with menu items."
      >
        <ModusPanel
          width="260px"
          height="450px"
          header={
            <div className="flex items-center gap-2 p-2">
              <ModusLogo name="trimble" emblem customClass="w-6 h-6" />
              <div className="text-sm font-medium">Application</div>
            </div>
          }
          body={
            <ModusMenu
              size="lg"
              items={[
                {
                  label: "Dashboard",
                  value: "dashboard",
                  startIcon: "dashboard",
                },
                {
                  label: "Projects",
                  value: "projects",
                  startIcon: "folder_open",
                },
                { label: "Team", value: "team", startIcon: "people_group" },
                { label: "Calendar", value: "calendar", startIcon: "calendar" },
                {
                  label: "Documents",
                  value: "documents",
                  startIcon: "description",
                },
                { label: "Reports", value: "reports", startIcon: "bar_graph" },
              ]}
            />
          }
          footer={
            <ModusMenu
              items={[
                { label: "Settings", value: "settings", startIcon: "settings" },
                { label: "Help", value: "help", startIcon: "help" },
              ]}
            />
          }
        />
      </DemoExample>

      <DemoExample
        title="Body-Only Panel"
        description="A panel with only body content, no header or footer."
      >
        <ModusPanel width="250px" height="auto">
          <ModusMenu
            size="lg"
            items={[
              { label: "Dashboard", value: "dashboard" },
              { label: "Projects", value: "projects" },
              { label: "Team", value: "team" },
              { label: "Calendar", value: "calendar" },
            ]}
          />
        </ModusPanel>
      </DemoExample>

      <DemoExample
        title="Panel Dimensions"
        description="Panels can have custom width and height values."
      >
        <div className="flex flex-wrap gap-4">
          <ModusPanel
            width="200px"
            height="200px"
            header={
              <div className="p-3 border-b border-border text-sm font-medium text-foreground">
                200x200
              </div>
            }
            body={
              <div className="p-3 text-xs text-muted-foreground">
                Small square panel
              </div>
            }
          />
          <ModusPanel
            width="300px"
            height="200px"
            header={
              <div className="p-3 border-b border-border text-sm font-medium text-foreground">
                300x200
              </div>
            }
            body={
              <div className="p-3 text-xs text-muted-foreground">
                Wide panel
              </div>
            }
          />
          <ModusPanel
            width="200px"
            height="300px"
            header={
              <div className="p-3 border-b border-border text-sm font-medium text-foreground">
                200x300
              </div>
            }
            body={
              <div className="p-3 text-xs text-muted-foreground">
                Tall panel
              </div>
            }
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Auto Height Panel"
        description="Panel with automatic height based on content."
      >
        <ModusPanel
          width="300px"
          height="auto"
          header={
            <div className="p-4 border-b border-border">
              <div className="text-lg font-medium text-foreground">
                Auto Height
              </div>
            </div>
          }
          body={
            <div className="p-4">
              <div className="text-sm text-foreground mb-4">
                This panel grows to fit its content.
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <div>Item 1 - First item in the list</div>
                <div>Item 2 - Second item in the list</div>
                <div>Item 3 - Third item in the list</div>
              </div>
            </div>
          }
          footer={
            <div className="p-4 border-t border-border">
              <ModusButton variant="filled" color="primary" fullWidth>
                Submit
              </ModusButton>
            </div>
          }
        />
      </DemoExample>

      <DemoExample
        title="Custom Content Panel"
        description="Panel with rich custom content in all slots."
      >
        <ModusPanel
          width="320px"
          height="auto"
          header={
            <div className="p-4 bg-primary">
              <div className="text-lg font-semibold text-primary-foreground">
                Featured Content
              </div>
              <div className="text-sm text-primary-foreground opacity-80">
                Latest updates
              </div>
            </div>
          }
          body={
            <div className="p-4">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <i className="modus-icons text-4xl text-muted-foreground">
                  image
                </i>
              </div>
              <div className="text-base font-medium text-foreground mb-2">
                Article Title
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                This is a brief description of the article content that gives
                readers an idea of what to expect.
              </div>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                  Tag 1
                </div>
                <div className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                  Tag 2
                </div>
              </div>
            </div>
          }
          footer={
            <div className="p-4 border-t border-border flex justify-between items-center">
              <div className="text-xs text-muted-foreground">5 min read</div>
              <ModusButton variant="borderless" color="primary" size="sm">
                Read More
              </ModusButton>
            </div>
          }
        />
      </DemoExample>

      <DemoExample
        title="Full Width Panel"
        description="Panel that spans the full width of its container."
      >
        <ModusPanel
          width="100%"
          height="auto"
          header={
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div className="text-lg font-medium text-foreground">
                Full Width Panel
              </div>
              <ModusButton
                variant="outlined"
                color="secondary"
                size="sm"
                icon="close"
                iconPosition="only"
                ariaLabel="Close"
              />
            </div>
          }
          body={
            <div className="p-4">
              <div className="text-sm text-foreground">
                This panel uses 100% width to span its container. Useful for
                responsive layouts where the panel should adapt to its parent
                element.
              </div>
            </div>
          }
        />
      </DemoExample>

      <DemoExample
        title="Floating vs Non-Floating"
        description="Comparison of floating and non-floating panel styles."
      >
        <div className="flex flex-wrap gap-6 p-6 bg-background rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Non-Floating</div>
            <ModusPanel
              width="200px"
              height="150px"
              body={
                <div className="p-4 text-sm text-foreground">
                  Standard panel without shadow
                </div>
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Floating</div>
            <ModusPanel
              width="200px"
              height="150px"
              floating
              body={
                <div className="p-4 text-sm text-foreground">
                  Elevated panel with shadow
                </div>
              }
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

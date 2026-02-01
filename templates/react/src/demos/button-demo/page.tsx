import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";

export default function ButtonDemoPage() {
  return (
    <DemoPage
      title="Modus Button"
      description="Buttons trigger actions and provide clear call-to-action elements. Use primary buttons for the main action, secondary for supporting actions, and tertiary for subtle actions."
    >
      <DemoExample
        title="Button Variants"
        description="Different button styles for various use cases and visual hierarchy."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButton color="primary">Primary</ModusButton>
          <ModusButton color="secondary">Secondary</ModusButton>
          <ModusButton color="tertiary">Tertiary</ModusButton>
          <ModusButton color="warning">Warning</ModusButton>
          <ModusButton color="danger">Danger</ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Button Styles"
        description="Different visual styles to match your design needs."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButton variant="filled">Filled</ModusButton>
          <ModusButton variant="outlined">Outlined</ModusButton>
          <ModusButton variant="borderless">Borderless</ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Button Sizes"
        description="Various sizes for different contexts and touch targets."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusButton size="xs">Extra Small</ModusButton>
          <ModusButton size="sm">Small</ModusButton>
          <ModusButton size="md">Medium</ModusButton>
          <ModusButton size="lg">Large</ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Buttons with Icons"
        description="Enhance buttons with icons for better visual communication."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButton icon="save_disk" iconPosition="left">
            Save File
          </ModusButton>
          <ModusButton icon="download" iconPosition="right">
            Download
          </ModusButton>
          <ModusButton
            icon="settings"
            iconPosition="only"
            ariaLabel="Settings"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Button Icon Sizes"
        description="Icon sizes automatically adapt to button size, or can be explicitly controlled."
      >
        <div className="space-y-6">
          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Automatic Icon Sizing (by Button Size)
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ModusButton size="xs" icon="star" iconPosition="left">
                Extra Small
              </ModusButton>
              <ModusButton size="sm" icon="star" iconPosition="left">
                Small
              </ModusButton>
              <ModusButton size="md" icon="star" iconPosition="left">
                Medium
              </ModusButton>
              <ModusButton size="lg" icon="star" iconPosition="left">
                Large
              </ModusButton>
            </div>
          </div>

          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Icon-Only Buttons (Automatic Sizing)
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ModusButton
                size="xs"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (XS)"
              />
              <ModusButton
                size="sm"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (SM)"
              />
              <ModusButton
                size="md"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (MD)"
              />
              <ModusButton
                size="lg"
                icon="settings"
                iconPosition="only"
                ariaLabel="Settings (LG)"
              />
            </div>
          </div>

          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Custom Icon Sizes (Explicit Control)
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ModusButton icon="star" iconSize="text-xs" iconPosition="left">
                Tiny Icon
              </ModusButton>
              <ModusButton icon="star" iconSize="text-sm" iconPosition="left">
                Small Icon
              </ModusButton>
              <ModusButton icon="star" iconSize="text-lg" iconPosition="left">
                Large Icon
              </ModusButton>
              <ModusButton icon="star" iconSize="text-2xl" iconPosition="left">
                XL Icon
              </ModusButton>
            </div>
          </div>

          <div>
            <div className="text-base font-semibold mb-3 text-foreground">
              Size Comparison
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ModusButton
                size="lg"
                icon="download"
                iconSize="text-sm"
                iconPosition="left"
              >
                Large Button, Small Icon
              </ModusButton>
              <ModusButton
                size="sm"
                icon="download"
                iconSize="text-xl"
                iconPosition="left"
              >
                Small Button, Large Icon
              </ModusButton>
              <ModusButton
                size="md"
                icon="check_circle"
                iconSize="text-3xl"
                iconPosition="only"
                ariaLabel="Success (Huge Icon)"
              />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Icon Sizes"
        description="Different icon sizes using Modus font scale for various contexts."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xs">star</i>
            <div className="text-xs text-muted-foreground">2xs (8px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-xs">star</i>
            <div className="text-xs text-muted-foreground">xs (10px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-sm">star</i>
            <div className="text-xs text-muted-foreground">sm (12px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-base">star</i>
            <div className="text-xs text-muted-foreground">base (14px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-lg">star</i>
            <div className="text-xs text-muted-foreground">lg (16px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-xl">star</i>
            <div className="text-xs text-muted-foreground">xl (18px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl">star</i>
            <div className="text-xs text-muted-foreground">2xl (20px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-3xl">star</i>
            <div className="text-xs text-muted-foreground">3xl (24px)</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-4xl">star</i>
            <div className="text-xs text-muted-foreground">4xl (30px)</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Colored Icons"
        description="Icons with different semantic colors from the 9-color design system."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl text-primary">info</i>
            <div className="text-xs text-muted-foreground">Primary</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl text-success">check_circle</i>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl text-warning">warning</i>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl text-destructive">alert</i>
            <div className="text-xs text-muted-foreground">Error</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <i className="modus-icons text-2xl text-muted-foreground">help</i>
            <div className="text-xs text-muted-foreground">Muted</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

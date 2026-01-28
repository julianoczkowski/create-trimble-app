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
        title="Button States"
        description="Different states to communicate interaction feedback."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButton>Normal</ModusButton>
          <ModusButton disabled>Disabled</ModusButton>
          <ModusButton pressed>Pressed</ModusButton>
          <ModusButton fullWidth>Full Width</ModusButton>
        </div>
      </DemoExample>

      <DemoExample
        title="Interactive Example"
        description="Click the button to see event handling in action."
      >
        <div className="p-6 rounded-lg bg-card text-card-foreground border border-border">
          <div className="text-lg mb-4 text-card-foreground">
            Click the button to see the event handler in action:
          </div>
          <ModusButton
            color="primary"
            icon="add"
            onButtonClick={() => alert("Button clicked!")}
          >
            Click Me
          </ModusButton>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

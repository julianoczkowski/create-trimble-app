import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButtonGroup from "../../components/ModusButtonGroup";
import ModusButton from "../../components/ModusButton";

export default function ButtonGroupDemoPage() {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  return (
    <DemoPage
      title="Modus Button Group"
      description="Button groups organize multiple buttons together with support for single or multiple selection modes. Use them for toolbar actions, segmented controls, and toggle groups."
    >
      <DemoExample
        title="Button Variants"
        description="Different visual styles for button groups."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Outlined (default)
            </div>
            <ModusButtonGroup variant="outlined" color="primary">
              <ModusButton>Button 1</ModusButton>
              <ModusButton>Button 2</ModusButton>
              <ModusButton>Button 3</ModusButton>
            </ModusButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Filled</div>
            <ModusButtonGroup variant="filled" color="primary">
              <ModusButton>Button 1</ModusButton>
              <ModusButton>Button 2</ModusButton>
              <ModusButton>Button 3</ModusButton>
            </ModusButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Borderless</div>
            <ModusButtonGroup variant="borderless" color="primary">
              <ModusButton>Button 1</ModusButton>
              <ModusButton>Button 2</ModusButton>
              <ModusButton>Button 3</ModusButton>
            </ModusButtonGroup>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Button Colors"
        description="Apply consistent colors across all buttons in the group."
      >
        <div className="flex flex-wrap gap-4">
          <ModusButtonGroup variant="outlined" color="primary">
            <ModusButton>Primary</ModusButton>
            <ModusButton>Buttons</ModusButton>
          </ModusButtonGroup>
          <ModusButtonGroup variant="outlined" color="secondary">
            <ModusButton>Secondary</ModusButton>
            <ModusButton>Buttons</ModusButton>
          </ModusButtonGroup>
          <ModusButtonGroup variant="outlined" color="tertiary">
            <ModusButton>Tertiary</ModusButton>
            <ModusButton>Buttons</ModusButton>
          </ModusButtonGroup>
          <ModusButtonGroup variant="outlined" color="warning">
            <ModusButton>Warning</ModusButton>
            <ModusButton>Buttons</ModusButton>
          </ModusButtonGroup>
          <ModusButtonGroup variant="outlined" color="danger">
            <ModusButton>Danger</ModusButton>
            <ModusButton>Buttons</ModusButton>
          </ModusButtonGroup>
        </div>
      </DemoExample>

      <DemoExample
        title="Orientation"
        description="Button groups can be arranged horizontally or vertically."
      >
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Horizontal (default)
            </div>
            <ModusButtonGroup orientation="horizontal" variant="outlined">
              <ModusButton>Option 1</ModusButton>
              <ModusButton>Option 2</ModusButton>
              <ModusButton>Option 3</ModusButton>
            </ModusButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Vertical</div>
            <ModusButtonGroup orientation="vertical" variant="outlined">
              <ModusButton>Option 1</ModusButton>
              <ModusButton>Option 2</ModusButton>
              <ModusButton>Option 3</ModusButton>
            </ModusButtonGroup>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Single Selection (Radio-like)"
        description="Only one button can be selected at a time, similar to radio buttons."
      >
        <ModusButtonGroup
          selectionType="single"
          variant="outlined"
          color="primary"
        >
          <ModusButton pressed>Option A</ModusButton>
          <ModusButton>Option B</ModusButton>
          <ModusButton>Option C</ModusButton>
        </ModusButtonGroup>
      </DemoExample>

      <DemoExample
        title="Multiple Selection (Checkbox-like)"
        description="Multiple buttons can be selected simultaneously, similar to checkboxes."
      >
        <div className="flex flex-col gap-4">
          <ModusButtonGroup
            selectionType="multiple"
            variant="outlined"
            color="primary"
            onButtonSelectionChange={(e) => {
              const buttons = e.detail.selectedButtons;
              setSelectedButtons(
                buttons.map((btn) => btn.textContent?.trim() || ""),
              );
            }}
          >
            <ModusButton pressed>Bold</ModusButton>
            <ModusButton>Italic</ModusButton>
            <ModusButton pressed>Underline</ModusButton>
          </ModusButtonGroup>
          <div className="text-sm text-muted-foreground">
            Selected:{" "}
            {selectedButtons.length > 0 ? selectedButtons.join(", ") : "None"}
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Icon-Only Buttons"
        description="Button groups with icon-only buttons for compact toolbar actions."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Text Alignment</div>
            <ModusButtonGroup
              selectionType="single"
              variant="outlined"
              color="primary"
            >
              <ModusButton
                icon="align_left"
                iconPosition="only"
                ariaLabel="Align left"
                pressed
              />
              <ModusButton
                icon="text_centered"
                iconPosition="only"
                ariaLabel="Align center"
              />
              <ModusButton
                icon="align_right"
                iconPosition="only"
                ariaLabel="Align right"
              />
            </ModusButtonGroup>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Text Formatting</div>
            <ModusButtonGroup
              selectionType="multiple"
              variant="outlined"
              color="secondary"
            >
              <ModusButton
                icon="text_bold"
                iconPosition="only"
                ariaLabel="Bold"
              />
              <ModusButton
                icon="text_italic"
                iconPosition="only"
                ariaLabel="Italic"
              />
              <ModusButton
                icon="text_underlined"
                iconPosition="only"
                ariaLabel="Underline"
              />
            </ModusButtonGroup>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled State"
        description="Disable all buttons in the group at once."
      >
        <ModusButtonGroup variant="outlined" color="primary" disabled>
          <ModusButton>Disabled</ModusButton>
          <ModusButton>Button</ModusButton>
          <ModusButton>Group</ModusButton>
        </ModusButtonGroup>
      </DemoExample>

      <DemoExample
        title="Mixed Content"
        description="Button groups can contain buttons with both text and icons."
      >
        <ModusButtonGroup variant="outlined" color="primary">
          <ModusButton icon="save_disk" iconPosition="left">
            Save
          </ModusButton>
          <ModusButton icon="download" iconPosition="left">
            Download
          </ModusButton>
          <ModusButton icon="share" iconPosition="left">
            Share
          </ModusButton>
        </ModusButtonGroup>
      </DemoExample>
    </DemoPage>
  );
}

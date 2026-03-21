import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusStepper, {
  type ModusStepperItem,
} from "../../components/ModusStepper";

const horizontalSteps: ModusStepperItem[] = [
  { label: "Step 1", color: "primary" },
  { label: "Step 2", color: "info" },
  { label: "Step 3" },
];

const verticalSteps: ModusStepperItem[] = [
  { label: "Setup", color: "success" },
  { label: "Configure", color: "warning" },
  { label: "Deploy", color: "error" },
];

const coloredSteps: ModusStepperItem[] = [
  { label: "Primary", color: "primary" },
  { label: "Success", color: "success" },
  { label: "Warning", color: "warning" },
  { label: "Error", color: "error" },
];

const customContentSteps: ModusStepperItem[] = [
  { label: "Step 1", content: "1" },
  { label: "Step 2", content: "✓" },
  { label: "Step 3", content: "3" },
];

export default function StepperDemoPage() {
  return (
    <DemoPage
      title="Modus Stepper"
      description="Stepper components display a list of steps in a process or workflow. Use steppers to guide users through multi-step forms, wizards, or sequential processes."
    >
      <DemoExample
        title="Horizontal Stepper"
        description="Stepper displayed horizontally."
      >
        <div class="flex flex-col gap-6">
          <ModusStepper steps={horizontalSteps} orientation="horizontal" />
        </div>
      </DemoExample>

      <DemoExample
        title="Vertical Stepper"
        description="Stepper displayed vertically."
      >
        <div class="flex flex-col gap-6">
          <ModusStepper steps={verticalSteps} orientation="vertical" />
        </div>
      </DemoExample>

      <DemoExample
        title="Stepper with Colors"
        description="Steps with different color themes."
      >
        <div class="flex flex-col gap-6">
          <ModusStepper steps={coloredSteps} orientation="horizontal" />
        </div>
      </DemoExample>

      <DemoExample
        title="Stepper with Custom Content"
        description="Steps with custom content in indicators."
      >
        <div class="flex flex-col gap-6">
          <ModusStepper steps={customContentSteps} orientation="horizontal" />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

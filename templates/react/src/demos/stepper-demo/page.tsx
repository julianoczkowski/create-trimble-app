"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusStepper, {
  type ModusStepperItem,
} from "../../components/ModusStepper";

const onboardingSteps: ModusStepperItem[] = [
  {
    label: "Account",
    content: "1",
    color: "primary",
  },
  {
    label: "Workspace",
    content: "2",
    color: "primary",
  },
  {
    label: "Invite",
    content: "3",
    color: "primary",
  },
  {
    label: "Launch",
    content: "4",
    color: "accent",
  },
];

const verticalSteps: ModusStepperItem[] = [
  {
    label: "Draft",
    content: "✏", // Unicode pencil
    color: "info",
  },
  {
    label: "Review",
    content: "👁", // Unicode eye
    color: "warning",
  },
  {
    label: "Approved",
    content: "✓", // Unicode checkmark
    color: "success",
  },
];

export default function StepperDemoPage() {
  return (
    <DemoPage
      title="Modus Stepper"
      description="Steppers communicate progress through a multi-step workflow. Keep step titles short and describe what happens at each stage."
    >
      <DemoExample
        title="Horizontal stepper"
        description={
          <div className="flex items-center gap-2">
            Use for onboarding or processes that follow a left-to-right
            progression.
          </div>
        }
      >
        <ModusStepper steps={onboardingSteps} />
      </DemoExample>
      <DemoExample
        title="Vertical stepper"
        description={
          <div className="flex items-center gap-2">
            Great for status-driven flows such as approvals.
          </div>
        }
      >
        <ModusStepper steps={verticalSteps} orientation="vertical" />
      </DemoExample>
    </DemoPage>
  );
}

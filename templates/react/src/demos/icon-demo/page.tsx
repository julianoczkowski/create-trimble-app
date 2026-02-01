"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusIcon from "../../components/ModusIcon";

export default function IconDemoPage() {
  return (
    <DemoPage
      title="Modus Icon"
      description="Icons provide visual communication and enhance user understanding. Use icons consistently to reinforce meaning and improve usability."
    >
      <DemoExample
        title="Icon Sizes"
        description="Different icon sizes using the Modus font scale."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="sm" />
            <div className="text-xs text-muted-foreground">Small (sm)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="md" />
            <div className="text-xs text-muted-foreground">Medium (md)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="lg" />
            <div className="text-xs text-muted-foreground">Large (lg)</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Status Icons"
        description="Icons commonly used to indicate status or state."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusIcon
              name="check_circle"
              size="lg"
              decorative={false}
              ariaLabel="Success"
              customClass="text-success"
            />
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusIcon
              name="info"
              size="lg"
              decorative={false}
              ariaLabel="Info"
              customClass="text-primary"
            />
            <div className="text-xs text-muted-foreground">Info</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusIcon
              name="warning"
              size="lg"
              decorative={false}
              ariaLabel="Warning"
              customClass="text-warning"
            />
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

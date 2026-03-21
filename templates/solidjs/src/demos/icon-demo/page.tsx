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
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="sm" />
            <div class="text-xs text-muted-foreground">Small (sm)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="md" />
            <div class="text-xs text-muted-foreground">Medium (md)</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ModusIcon name="star" size="lg" />
            <div class="text-xs text-muted-foreground">Large (lg)</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Status Icons"
        description="Icons commonly used to indicate status or state."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <ModusIcon
              name="check_circle"
              size="lg"
              decorative={false}
              ariaLabel="Success"
              customClass="text-success"
            />
            <div class="text-xs text-muted-foreground">Success</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ModusIcon
              name="info"
              size="lg"
              decorative={false}
              ariaLabel="Info"
              customClass="text-primary"
            />
            <div class="text-xs text-muted-foreground">Info</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ModusIcon
              name="warning"
              size="lg"
              decorative={false}
              ariaLabel="Warning"
              customClass="text-warning"
            />
            <div class="text-xs text-muted-foreground">Warning</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

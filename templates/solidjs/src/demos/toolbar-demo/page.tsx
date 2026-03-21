import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusToolbar from "../../components/ModusToolbar";

export default function ToolbarDemoPage() {
  return (
    <DemoPage
      title="Modus Toolbar"
      description="Toolbars organize actions for a focused context. Keep primary commands on the left, secondary options on the right, and maintain consistent spacing."
    >
      <DemoExample
        title="Document toolbar"
        description="Pair icon buttons with text labels when space allows."
      >
        <ModusToolbar
          startContent={
            <div class="flex items-center gap-3 text-sm text-foreground">
              <i class="modus-icons text-primary">pencil</i>
              <div class="font-medium">Proposal draft</div>
            </div>
          }
          centerContent={
            <div class="flex gap-2">
              <ModusButton size="sm" icon="undo" iconPosition="left">
                Undo
              </ModusButton>
              <ModusButton size="sm" icon="redo" iconPosition="left">
                Redo
              </ModusButton>
            </div>
          }
          endContent={
            <div class="flex gap-2">
              <ModusButton size="sm" variant="borderless">
                Share
              </ModusButton>
              <ModusButton size="sm" color="primary">
                Publish
              </ModusButton>
            </div>
          }
        />
      </DemoExample>
    </DemoPage>
  );
}

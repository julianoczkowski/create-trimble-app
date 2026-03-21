import { createSignal, onCleanup } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusProgress from "../../components/ModusProgress";
import ModusButton from "../../components/ModusButton";

export default function ProgressDemoPage() {
  const [progressValue, setProgressValue] = createSignal(0);
  const [progressLabel, setProgressLabel] = createSignal("0%");
  const [progressInterval, setProgressInterval] = createSignal<ReturnType<typeof setInterval> | null>(null);

  const startProgress = () => {
    const existing = progressInterval();
    if (existing) {
      clearInterval(existing);
    }

    setProgressValue(0);
    setProgressLabel("0%");

    const interval = setInterval(() => {
      setProgressValue((value) => {
        const newValue = Math.min(value + 5, 100);
        setProgressLabel(`${newValue}%`);
        if (newValue >= 100) {
          clearInterval(interval);
          setProgressInterval(null);
        }
        return newValue;
      });
    }, 200);

    setProgressInterval(interval);
  };

  const resetProgress = () => {
    const existing = progressInterval();
    if (existing) {
      clearInterval(existing);
      setProgressInterval(null);
    }
    setProgressValue(0);
    setProgressLabel("0%");
  };

  onCleanup(() => {
    const existing = progressInterval();
    if (existing) {
      clearInterval(existing);
    }
  });

  return (
    <DemoPage
      title="Modus Progress"
      description="Progress components indicate the completion status of a task or process. Use progress bars for file uploads, form completion, or any process with measurable progress."
    >
      <DemoExample
        title="Basic Progress Bar"
        description="Simple progress bars with different values."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">0%</div>
            <ModusProgress value={0} />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">25%</div>
            <ModusProgress value={25} />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">50%</div>
            <ModusProgress value={50} />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">75%</div>
            <ModusProgress value={75} />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">100%</div>
            <ModusProgress value={100} />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Progress with Labels"
        description="Progress bars with custom labels."
      >
        <div class="flex flex-col gap-6">
          <ModusProgress value={45} label="45% complete" />
          <ModusProgress value={72} label="72%" />
          <ModusProgress value={90} label="Almost done" />
        </div>
      </DemoExample>

      <DemoExample
        title="Radial Progress"
        description="Radial progress indicators for compact spaces."
      >
        <div class="flex flex-wrap gap-6">
          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">25%</div>
            <ModusProgress variant="radial" value={25} label="25%" />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">50%</div>
            <ModusProgress variant="radial" value={50} label="50%" />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">75%</div>
            <ModusProgress variant="radial" value={75} label="75%" />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-sm text-muted-foreground">100%</div>
            <ModusProgress variant="radial" value={100} label="100%" />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Indeterminate Progress"
        description="Progress bars for tasks with unknown duration."
      >
        <div class="flex flex-col gap-6">
          <ModusProgress indeterminate />
          <div class="text-sm text-muted-foreground">
            Use indeterminate progress when the duration of a task is unknown.
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Interactive Example"
        description="Dynamic progress bar that updates over time."
      >
        <div class="flex flex-col gap-6">
          <ModusProgress value={progressValue()} label={progressLabel()} />
          <div class="flex gap-2">
            <ModusButton
              color="primary"
              size="sm"
              onButtonClick={startProgress}
            >
              Start Progress
            </ModusButton>
            <ModusButton
              color="secondary"
              size="sm"
              onButtonClick={resetProgress}
            >
              Reset
            </ModusButton>
          </div>
          <div class="p-4 rounded-lg bg-card border-default">
            <div class="text-sm text-foreground">
              <strong>Current Value:</strong> {progressValue()}%
            </div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

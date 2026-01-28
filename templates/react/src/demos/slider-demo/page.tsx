"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSlider from "../../components/ModusSlider";

export default function SliderDemoPage() {
  return (
    <DemoPage
      title="Modus Slider"
      description="Sliders let people adjust values within a range. Use them when precise input is not critical and always show the scale."
    >
      <DemoExample
        title="Volume control"
        description="Provide a label to describe the setting."
      >
        <ModusSlider label="Volume" value={60} min={0} max={100} />
      </DemoExample>
      <DemoExample
        title="Temperature range"
        description="A smaller slider suits compact layouts."
      >
        <ModusSlider
          label="Temperature"
          size="sm"
          value={18}
          min={10}
          max={30}
          step={1}
        />
      </DemoExample>
    </DemoPage>
  );
}

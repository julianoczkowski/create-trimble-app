"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSlider from "../../components/ModusSlider";

/**
 * Demo page showcasing the Modus Slider component.
 *
 * Demonstrates slider features including:
 * - Basic slider
 * - Sizes
 */
export default function SliderDemoPage() {
  return (
    <DemoPage
      title="Modus Slider"
      description="Slider components allow users to select a numeric value by dragging a handle along a track. Use sliders for volume, brightness, or any continuous numeric input."
    >
      <DemoExample
        title="Basic Slider"
        description="Simple slider with default range."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusSlider
              inputId="volume-slider"
              label="Volume"
              min={0}
              max={100}
              value={50}
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Slider Sizes"
        description="Sliders in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <ModusSlider
              inputId="small-slider"
              label="Small"
              min={0}
              max={100}
              value={50}
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusSlider
              inputId="medium-slider"
              label="Medium"
              min={0}
              max={100}
              value={50}
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <ModusSlider
              inputId="large-slider"
              label="Large"
              min={0}
              max={100}
              value={50}
              size="lg"
            />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

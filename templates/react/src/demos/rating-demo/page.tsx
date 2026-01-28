"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusRating from "../../components/ModusRating";

export default function RatingDemoPage() {
  return (
    <DemoPage
      title="Modus Rating"
      description="Rating controls capture quick sentiment or satisfaction. Pick a variant that matches the tone of your experience."
    >
      <DemoExample
        title="Experience rating"
        description="Star ratings feel familiar for reviews."
      >
        <ModusRating variant="star" value={4} aria-label="Experience rating" />
      </DemoExample>
      <DemoExample
        title="Simple feedback"
        description="Smiley faces work well for lightweight surveys."
      >
        <ModusRating
          variant="smiley"
          count={3}
          value={2}
          size="sm"
          aria-label="Survey rating"
        />
      </DemoExample>
    </DemoPage>
  );
}

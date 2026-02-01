"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusRating from "../../components/ModusRating";

export default function RatingDemoPage() {
  return (
    <DemoPage
      title="Modus Rating"
      description="Rating components allow users to provide feedback through visual ratings. Use ratings for reviews, surveys, or any scenario requiring user opinion."
    >
      <DemoExample title="Star Rating" description="Star-based rating system.">
        <div className="flex flex-col gap-6">
          <ModusRating variant="star" value={0} count={5} />
          <ModusRating variant="star" value={2.5} count={5} />
          <ModusRating variant="star" value={5} count={5} />
        </div>
      </DemoExample>

      <DemoExample
        title="Star Rating with Half Steps"
        description="Star ratings that allow half-step increments."
      >
        <div className="flex flex-col gap-6">
          <ModusRating variant="star" value={2.5} count={5} allowHalf />
          <ModusRating variant="star" value={3.5} count={5} allowHalf />
          <ModusRating variant="star" value={4.5} count={5} allowHalf />
        </div>
      </DemoExample>

      <DemoExample
        title="Smiley Rating"
        description="Smiley face-based rating system."
      >
        <div className="flex flex-col gap-6">
          <ModusRating variant="smiley" value={1} count={5} />
          <ModusRating variant="smiley" value={3} count={5} />
          <ModusRating variant="smiley" value={5} count={5} />
        </div>
      </DemoExample>

      <DemoExample
        title="Rating Sizes"
        description="Ratings in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Small</div>
            <ModusRating variant="star" value={3} count={5} size="sm" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Medium (Default)
            </div>
            <ModusRating variant="star" value={3} count={5} size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Large</div>
            <ModusRating variant="star" value={3} count={5} size="lg" />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Rating Count"
        description="Ratings with custom number of items."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">3 Stars</div>
            <ModusRating variant="star" value={2} count={3} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">10 Stars</div>
            <ModusRating variant="star" value={7} count={10} />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Disabled Rating"
        description="Read-only rating display."
      >
        <div className="flex flex-col gap-6">
          <ModusRating variant="star" value={4} count={5} disabled />
          <div className="text-sm text-muted-foreground">
            Disabled ratings are useful for displaying read-only ratings.
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

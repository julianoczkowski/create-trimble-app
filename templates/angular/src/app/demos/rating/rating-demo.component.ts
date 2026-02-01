import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusRatingComponent } from '../../components/modus-rating.component';

/**
 * Demo page showcasing the Modus Rating component.
 *
 * Demonstrates rating features including:
 * - Star ratings
 * - Smiley ratings
 * - Half ratings
 * - Different sizes
 * - Interactive ratings
 */
@Component({
  selector: 'app-rating-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusRatingComponent],
  template: `
    <demo-page
      title="Modus Rating"
      description="Rating components allow users to provide feedback through visual ratings. Use ratings for reviews, surveys, or any scenario requiring user opinion."
    >
      <demo-example title="Star Rating" description="Star-based rating system.">
        <div class="flex flex-col gap-6">
          <modus-rating variant="star" [value]="0" [count]="5" />
          <modus-rating variant="star" [value]="2.5" [count]="5" />
          <modus-rating variant="star" [value]="5" [count]="5" />
        </div>
      </demo-example>

      <demo-example
        title="Star Rating with Half Steps"
        description="Star ratings that allow half-step increments."
      >
        <div class="flex flex-col gap-6">
          <modus-rating variant="star" [value]="2.5" [count]="5" [allowHalf]="true" />
          <modus-rating variant="star" [value]="3.5" [count]="5" [allowHalf]="true" />
          <modus-rating variant="star" [value]="4.5" [count]="5" [allowHalf]="true" />
        </div>
      </demo-example>

      <demo-example title="Smiley Rating" description="Smiley face-based rating system.">
        <div class="flex flex-col gap-6">
          <modus-rating variant="smiley" [value]="1" [count]="5" />
          <modus-rating variant="smiley" [value]="3" [count]="5" />
          <modus-rating variant="smiley" [value]="5" [count]="5" />
        </div>
      </demo-example>

      <demo-example title="Rating Sizes" description="Ratings in different sizes.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Small</p>
            <modus-rating variant="star" [value]="3" [count]="5" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Medium (Default)</p>
            <modus-rating variant="star" [value]="3" [count]="5" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Large</p>
            <modus-rating variant="star" [value]="3" [count]="5" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example title="Custom Rating Count" description="Ratings with custom number of items.">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">3 Stars</p>
            <modus-rating variant="star" [value]="2" [count]="3" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">10 Stars</p>
            <modus-rating variant="star" [value]="7" [count]="10" />
          </div>
        </div>
      </demo-example>

      <demo-example title="Disabled Rating" description="Read-only rating display.">
        <div class="flex flex-col gap-6">
          <modus-rating variant="star" [value]="4" [count]="5" [disabled]="true" />
          <p class="text-sm text-muted-foreground">
            Disabled ratings are useful for displaying read-only ratings.
          </p>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class RatingDemoPageComponent {}

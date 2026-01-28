import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusPaginationComponent } from '../modus-pagination.component';
import type { IPageChange } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Pagination component.
 *
 * Demonstrates pagination features including:
 * - Basic pagination
 * - Different sizes
 * - Custom button text
 * - Interactive pagination
 */
@Component({
  selector: 'app-pagination-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusPaginationComponent],
  template: `
    <demo-page
      title="Modus Pagination"
      description="Pagination components enable users to navigate through multiple pages of content. Use pagination for tables, lists, or any paginated content."
    >
      <demo-example
        title="Basic Pagination"
        description="Simple pagination with page count and current page."
      >
        <div class="flex flex-col gap-6">
          <modus-pagination [count]="8" [page]="1" />
          <modus-pagination [count]="5" [page]="3" />
          <modus-pagination [count]="10" [page]="5" />
        </div>
      </demo-example>

      <demo-example
        title="Pagination Sizes"
        description="Pagination in different sizes."
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Small</p>
            <modus-pagination [count]="5" [page]="2" size="sm" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Medium (Default)</p>
            <modus-pagination [count]="5" [page]="2" size="md" />
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted-foreground">Large</p>
            <modus-pagination [count]="5" [page]="2" size="lg" />
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Custom Button Text"
        description="Pagination with custom previous and next button text."
      >
        <div class="flex flex-col gap-6">
          <modus-pagination
            [count]="5"
            [page]="2"
            prevButtonText="Previous"
            nextButtonText="Next"
          />
          <modus-pagination
            [count]="5"
            [page]="3"
            prevButtonText="←"
            nextButtonText="→"
          />
        </div>
      </demo-example>

      <demo-example
        title="Interactive Pagination"
        description="Pagination with two-way binding and event handling."
      >
        <div class="flex flex-col gap-6">
          <modus-pagination
            [count]="paginationState().count"
            [page]="paginationState().page"
            (pageChange)="handlePageChange($event)"
          />
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground">
              <strong>Current Page:</strong> {{ paginationState().page }} / {{ paginationState().count }}
            </p>
            <p class="text-sm text-muted-foreground mt-2">
              Click the pagination controls above to navigate between pages.
            </p>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Real-World Example"
        description="Pagination integrated with content display."
      >
        <div class="flex flex-col gap-6">
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground mb-2">
              Showing page {{ paginationState().page }} of {{ paginationState().count }}
            </p>
            <p class="text-sm text-muted-foreground">
              Items {{ (paginationState().page - 1) * 10 + 1 }}-{{ paginationState().page * 10 }} of
              {{ paginationState().count * 10 }}
            </p>
          </div>
          <modus-pagination
            [count]="paginationState().count"
            [page]="paginationState().page"
            (pageChange)="handlePageChange($event)"
          />
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class PaginationDemoPageComponent {
  readonly paginationState = signal<{ page: number; count: number }>({ page: 2, count: 8 });

  handlePageChange(change: IPageChange): void {
    this.paginationState.update((state) => ({
      ...state,
      page: change.newPage,
    }));
  }
}


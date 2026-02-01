"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusPagination from "../../components/ModusPagination";

export default function PaginationDemoPage() {
  const [paginationState, setPaginationState] = useState({
    page: 2,
    count: 8,
  });

  const handlePageChange = (
    event: CustomEvent<{ newPage: number; prevPage: number }>,
  ) => {
    setPaginationState((state) => ({
      ...state,
      page: event.detail.newPage,
    }));
  };

  return (
    <DemoPage
      title="Modus Pagination"
      description="Pagination components enable users to navigate through multiple pages of content. Use pagination for tables, lists, or any paginated content."
    >
      <DemoExample
        title="Basic Pagination"
        description="Simple pagination with page count and current page."
      >
        <div className="flex flex-col gap-6">
          <ModusPagination count={8} page={1} ariaLabel="Basic pagination 1" />
          <ModusPagination count={5} page={3} ariaLabel="Basic pagination 2" />
          <ModusPagination count={10} page={5} ariaLabel="Basic pagination 3" />
        </div>
      </DemoExample>

      <DemoExample
        title="Pagination Sizes"
        description="Pagination in different sizes."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Small</div>
            <ModusPagination
              count={5}
              page={2}
              size="sm"
              ariaLabel="Small pagination"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Medium (Default)
            </div>
            <ModusPagination
              count={5}
              page={2}
              size="md"
              ariaLabel="Medium pagination"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Large</div>
            <ModusPagination
              count={5}
              page={2}
              size="lg"
              ariaLabel="Large pagination"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Button Text"
        description="Pagination with custom previous and next button text."
      >
        <div className="flex flex-col gap-6">
          <ModusPagination
            count={5}
            page={2}
            prevButtonText="Previous"
            nextButtonText="Next"
            ariaLabel="Pagination with text labels"
          />
          <ModusPagination
            count={5}
            page={3}
            prevButtonText="←"
            nextButtonText="→"
            ariaLabel="Pagination with arrow labels"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Interactive Pagination"
        description="Pagination with state management and event handling."
      >
        <div className="flex flex-col gap-6">
          <ModusPagination
            count={paginationState.count}
            page={paginationState.page}
            onPageChange={handlePageChange}
            ariaLabel="Interactive pagination"
          />
          <div className="p-4 rounded-lg bg-card border border-default">
            <div className="text-sm text-foreground">
              <strong>Current Page:</strong> {paginationState.page} /{" "}
              {paginationState.count}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Click the pagination controls above to navigate between pages.
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Real-World Example"
        description="Pagination integrated with content display."
      >
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-lg bg-card border border-default">
            <div className="text-sm text-foreground mb-2">
              Showing page {paginationState.page} of {paginationState.count}
            </div>
            <div className="text-sm text-muted-foreground">
              Items {(paginationState.page - 1) * 10 + 1}-
              {paginationState.page * 10} of {paginationState.count * 10}
            </div>
          </div>
          <ModusPagination
            count={paginationState.count}
            page={paginationState.page}
            onPageChange={handlePageChange}
            ariaLabel="Real-world pagination example"
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

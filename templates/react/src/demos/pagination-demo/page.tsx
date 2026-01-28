"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusPagination from "../../components/ModusPagination";

export default function PaginationDemoPage() {
  return (
    <DemoPage
      title="Modus Pagination"
      description="Pagination lets people move through large result sets. Show the total number of pages and keep labels clear."
    >
      <DemoExample
        title="Standard pagination"
        description="The default medium size works well for tables and search results."
      >
        <ModusPagination
          count={12}
          page={3}
          ariaLabel="Search results pagination"
        />
      </DemoExample>
      <DemoExample
        title="Compact pagination"
        description="Use the small size in dense layouts such as cards or side panels."
      >
        <ModusPagination
          count={5}
          page={1}
          size="sm"
          ariaLabel="Compact pagination"
        />
      </DemoExample>
    </DemoPage>
  );
}

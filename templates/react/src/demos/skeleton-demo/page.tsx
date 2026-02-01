"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSkeleton from "../../components/ModusSkeleton";

/**
 * Demo page showcasing the Modus Skeleton component.
 *
 * Demonstrates skeleton loading features including:
 * - Basic skeleton
 * - Different shapes
 * - Custom sizes
 * - Real-world examples
 */
export default function SkeletonDemoPage() {
  return (
    <DemoPage
      title="Modus Skeleton"
      description="Skeleton components provide loading placeholders that mimic the shape of content being loaded. Use skeletons to improve perceived performance and provide visual feedback during data loading."
    >
      <DemoExample
        title="Basic Skeleton"
        description="Simple skeleton with default rectangle shape."
      >
        <div className="flex flex-col gap-6">
          <ModusSkeleton />
          <ModusSkeleton />
          <ModusSkeleton />
        </div>
      </DemoExample>

      <DemoExample
        title="Skeleton Shapes"
        description="Skeletons in different shapes."
      >
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col gap-2 items-center">
            <ModusSkeleton shape="rectangle" width="200px" height="20px" />
            <div className="text-sm text-muted-foreground">Rectangle</div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <ModusSkeleton shape="circle" width="64px" height="64px" />
            <div className="text-sm text-muted-foreground">Circle</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Sizes"
        description="Skeletons with custom width and height."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Small</div>
            <ModusSkeleton width="100px" height="12px" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Medium</div>
            <ModusSkeleton width="200px" height="16px" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Large</div>
            <ModusSkeleton width="300px" height="24px" />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Real-World Example"
        description="Skeleton loading states for common UI patterns."
      >
        <div className="flex flex-col gap-6">
          {/* Card skeleton */}
          <div className="p-6 rounded-lg bg-card border-default">
            <div className="flex gap-4">
              <ModusSkeleton shape="circle" width="64px" height="64px" />
              <div className="flex flex-col gap-2 flex-1">
                <ModusSkeleton width="60%" height="20px" />
                <ModusSkeleton width="40%" height="16px" />
              </div>
            </div>
          </div>

          {/* List skeleton */}
          <div className="flex flex-col gap-3">
            <ModusSkeleton width="100%" height="16px" />
            <ModusSkeleton width="90%" height="16px" />
            <ModusSkeleton width="95%" height="16px" />
            <ModusSkeleton width="85%" height="16px" />
          </div>

          {/* Form skeleton */}
          <div className="flex flex-col gap-4">
            <ModusSkeleton width="120px" height="14px" />
            <ModusSkeleton width="100%" height="40px" />
            <ModusSkeleton width="100px" height="14px" />
            <ModusSkeleton width="100%" height="40px" />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

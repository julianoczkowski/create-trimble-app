"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusSkeleton from "../../components/ModusSkeleton";

export default function SkeletonDemoPage() {
  return (
    <DemoPage
      title="Modus Skeleton"
      description="Skeletons provide a lightweight preview of content while data loads. Match the shape and approximate size of the final element."
    >
      <DemoExample
        title="Card placeholder"
        description="Combine multiple skeletons to represent the final layout."
      >
        <div className="flex flex-col gap-3">
          <ModusSkeleton height="20px" width="50%" />
          <ModusSkeleton height="14px" width="80%" />
          <ModusSkeleton height="14px" width="60%" />
        </div>
      </DemoExample>
      <DemoExample
        title="Avatar and text"
        description="Mix circular and rectangular skeletons to mirror media plus copy."
      >
        <div className="flex items-center gap-3">
          <ModusSkeleton shape="circle" height="48px" width="48px" />
          <div className="flex flex-col gap-2">
            <ModusSkeleton height="16px" width="140px" />
            <ModusSkeleton height="12px" width="100px" />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

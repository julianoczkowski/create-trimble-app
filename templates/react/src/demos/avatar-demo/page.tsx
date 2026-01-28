"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAvatar from "../../components/ModusAvatar";

export default function AvatarDemoPage() {
  return (
    <DemoPage
      title="Modus Avatar"
      description="Use avatars to represent people or workspace items. Favor recognizable initials or well-cropped photos and keep the shapes consistent within a surface."
    >
      <DemoExample
        title="Team member"
        description="Show a face or initials to help people scan who is responsible."
      >
        <div className="flex items-center gap-4">
          <ModusAvatar
            alt="Aria Watson"
            imgSrc="https://i.pravatar.cc/120?img=5"
            size="lg"
          />
          <div className="flex flex-col gap-1">
            <div className="text-base font-medium text-foreground">
              Aria Watson
            </div>
            <div className="text-sm text-foreground opacity-80">
              Principal Product Designer
            </div>
          </div>
        </div>
      </DemoExample>
      <DemoExample
        title="Project spaces"
        description="Square avatars pair well with folders or abstract entities."
      >
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Research" shape="square" size="md" />
            <div className="text-sm text-foreground">Research</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Marketing" shape="square" size="md" />
            <div className="text-sm text-foreground">Marketing</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Field Ops" shape="square" size="md" />
            <div className="text-sm text-foreground">Field Ops</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusAvatar from "../../components/ModusAvatar";

export default function AvatarDemoPage() {
  return (
    <DemoPage
      title="Modus Avatar"
      description="Avatars represent users or entities in the interface. Use avatars to personalize user experiences and provide visual identity."
    >
      <DemoExample
        title="Avatar Sizes"
        description="Different sizes for various contexts and display needs."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Extra Small Avatar" size="xs" initials="X S" />
            <div className="text-xs text-muted-foreground">Extra Small (xs)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Small Avatar" size="sm" initials="SM" />
            <div className="text-xs text-muted-foreground">Small (sm)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Medium Avatar" size="md" initials="MD" />
            <div className="text-xs text-muted-foreground">Medium (md)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Large Avatar" size="lg" initials="LG" />
            <div className="text-xs text-muted-foreground">Large (lg)</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Avatar Shapes"
        description="Circle and square shapes for different design styles."
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Circle Avatar" shape="circle" initials="C" size="md" />
            <div className="text-xs text-muted-foreground">Circle</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="Square Avatar" shape="square" initials="S" size="md" />
            <div className="text-xs text-muted-foreground">Square</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Avatars with Images"
        description="Avatars displaying user profile images."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ModusAvatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=1"
            size="md"
            shape="circle"
          />
          <ModusAvatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=2"
            size="md"
            shape="circle"
          />
          <ModusAvatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=3"
            size="md"
            shape="circle"
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Avatars with Initials"
        description="Avatars displaying user initials when no image is available."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ModusAvatar alt="John Doe" initials="J D" size="md" shape="circle" />
          <ModusAvatar alt="Jane Smith" initials="J S" size="md" shape="circle" />
          <ModusAvatar alt="Bob Johnson" initials="B J" size="md" shape="circle" />
          <ModusAvatar alt="Alice Brown" initials="A B" size="md" shape="circle" />
        </div>
      </DemoExample>

      <DemoExample
        title="Fallback Behavior"
        description="Avatars automatically fall back to initials when image fails to load."
      >
        <div className="flex flex-wrap items-center gap-6">
          <ModusAvatar
            alt="User Avatar"
            imgSrc="https://invalid-url.com/image.jpg"
            initials="F B"
            size="md"
            shape="circle"
          />
          <div className="text-sm text-muted-foreground">
            <div className="font-semibold mb-1">Fallback to Initials</div>
            <div>When an image fails to load, the avatar automatically displays initials.</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Size Comparison"
        description="Visual comparison of all avatar sizes side by side."
      >
        <div className="flex flex-wrap items-end gap-8">
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="XS Avatar" size="xs" initials="XS" shape="circle" />
            <div className="text-xs text-muted-foreground">xs</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="SM Avatar" size="sm" initials="SM" shape="circle" />
            <div className="text-xs text-muted-foreground">sm</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="MD Avatar" size="md" initials="MD" shape="circle" />
            <div className="text-xs text-muted-foreground">md</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusAvatar alt="LG Avatar" size="lg" initials="LG" shape="circle" />
            <div className="text-xs text-muted-foreground">lg</div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

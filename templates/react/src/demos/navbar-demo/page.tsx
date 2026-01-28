"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNavbar from "../../components/ModusNavbar";

export default function NavbarDemoPage() {
  return (
    <DemoPage
      title="Modus Navbar"
      description="The global navbar anchors workspace navigation. Keep the structure simple and reserve the right side for search and personal actions."
    >
      <DemoExample
        title="Workspace navigation"
        description="Use the default layout for primary sections, quick actions, and the user menu."
      >
        <ModusNavbar
          userCard={{
            name: "Jordan Miles",
            email: "jordan.miles@example.com",
            avatarSrc: "https://i.pravatar.cc/96?img=12",
          }}
          startContent={
            <div className="text-base font-semibold text-foreground">
              Trimble Atlas
            </div>
          }
          centerContent={
            <div className="flex gap-6 text-sm text-foreground opacity-80">
              <div>Projects</div>
              <div>Analytics</div>
              <div>Library</div>
            </div>
          }
          endContent={
            <div className="text-sm text-foreground opacity-80">Help</div>
          }
        />
      </DemoExample>
    </DemoPage>
  );
}

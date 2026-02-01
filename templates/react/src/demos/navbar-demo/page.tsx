"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNavbar from "../../components/ModusNavbar";

const navbarUserCard = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarSrc: "https://i.pravatar.cc/64?img=12",
};

export default function NavbarDemoPage() {
  const handleHelpClick = () => {
    console.log("Help button clicked");
  };

  const handleAppsClick = () => {
    console.log("Apps button clicked");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications button clicked");
  };

  const handleMainMenuOpenChange = (open: boolean) => {
    console.log(`Main menu ${open ? "opened" : "closed"}`);
  };

  return (
    <DemoPage
      title="Modus Navbar"
      description="The navbar provides a consistent top-level navigation and user controls. Use the navbar for primary navigation, user profile access, search, and application-wide actions."
    >
      <DemoExample
        title="Basic Navbar"
        description="A basic navbar with user card and search functionality."
      >
        <div className="flex flex-col gap-4">
          <ModusNavbar
            userCard={navbarUserCard}
            visibility={{ user: true, search: true, searchInput: true }}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Navbar with Help Button"
        description="Navbar with user card and help button for accessing documentation and support."
      >
        <div className="flex flex-col gap-4">
          <ModusNavbar
            userCard={navbarUserCard}
            visibility={{ user: true, help: true }}
            onHelpClick={handleHelpClick}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Navbar with All Buttons"
        description="Navbar showing all available buttons: user, search, help, apps, notifications, and main menu."
      >
        <div className="flex flex-col gap-4">
          <ModusNavbar
            userCard={navbarUserCard}
            visibility={{
              user: true,
              search: true,
              searchInput: true,
              help: true,
              apps: true,
              notifications: true,
              mainMenu: true,
            }}
            onHelpClick={handleHelpClick}
            onAppsClick={handleAppsClick}
            onNotificationsClick={handleNotificationsClick}
            onMainMenuOpenChange={handleMainMenuOpenChange}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Condensed Navbar"
        description="A condensed version of the navbar suitable for tighter spaces."
      >
        <div className="flex flex-col gap-4">
          <ModusNavbar
            userCard={navbarUserCard}
            visibility={{
              user: true,
              mainMenu: true,
              notifications: true,
              help: true,
            }}
            condensed={true}
          />
        </div>
      </DemoExample>

      <DemoExample
        title="Navbar with Custom Slots"
        description="Navbar with custom content in start, center, and end slots."
      >
        <div className="flex flex-col gap-4">
          <ModusNavbar
            userCard={navbarUserCard}
            visibility={{
              user: true,
              search: true,
              searchInput: true,
              help: true,
            }}
            startContent={
              <div className="flex items-center gap-2">
                <div className="text-sm text-foreground">
                  Custom Start Content
                </div>
              </div>
            }
            centerContent={
              <div className="flex items-center gap-2">
                <div className="text-sm text-foreground">
                  Custom Center Content
                </div>
              </div>
            }
            endContent={
              <div className="flex items-center gap-2">
                <div className="text-sm text-foreground">
                  Custom End Content
                </div>
              </div>
            }
          />
        </div>
      </DemoExample>
    </DemoPage>
  );
}

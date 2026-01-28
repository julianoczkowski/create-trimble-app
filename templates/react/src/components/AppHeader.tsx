import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcherDropdown from "./ThemeSwitcherDropdown";

/**
 * Renders the application header, including navigation links and a theme switcher.
 * @returns {JSX.Element} The rendered header component.
 */
export default function AppHeader() {
  const navigate = useNavigate();

  /**
   * Navigates to the specified path using the `useNavigate` hook.
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full border-bottom-default">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex-shrink-0">
          <div
            onClick={() => handleNavigation("/")}
            className="text-xl md:text-2xl font-semibold m-0 text-foreground hover:opacity-80 transition-opacity cursor-pointer"
          >
            Modus 2.0 React App
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 order-2 md:order-1">
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/")}
          >
            Home
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/button-demo")}
          >
            Button Demo
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/color-palette")}
          >
            Colors
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/components")}
          >
            Components
          </ModusWcButton>
          <ModusWcButton
            color="primary"
            variant="outlined"
            size="sm"
            onButtonClick={() => handleNavigation("/icons")}
          >
            Icons
          </ModusWcButton>
        </div>
        <div className="flex items-center min-w-[140px] order-1 md:order-2">
          <ThemeSwitcherDropdown />
        </div>
      </div>
    </div>
  );
}

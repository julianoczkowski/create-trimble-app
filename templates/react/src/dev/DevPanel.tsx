import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDevPanel } from "./useDevPanel";
import { devNavItems, demoCategories } from "./config";
import ModusButton from "../components/ModusButton";
import ThemeSwitcherDropdown from "../components/ThemeSwitcherDropdown";

/**
 * Floating toggle button for the Dev Panel.
 * Positioned in the bottom-right corner of the screen.
 */
function DevPanelToggle() {
  const { toggle, isOpen } = useDevPanel();

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <ModusButton
        color="primary"
        size="lg"
        onButtonClick={toggle}
        ariaLabel={isOpen ? "Close Dev Panel" : "Open Dev Panel (Ctrl+Shift+D)"}
      >
        <div className="flex items-center gap-2">
          <i className="modus-icons text-xl">
            {isOpen ? "close" : "code"}
          </i>
          <div className="hidden sm:block">Dev</div>
        </div>
      </ModusButton>
    </div>
  );
}

/**
 * Navigation section within the Dev Panel.
 */
function DevPanelNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { close } = useDevPanel();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleNavClick = (path: string) => {
    navigate(path);
    close();
  };

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="space-y-6">
      {/* Theme Switcher Section */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Theme
        </div>
        <ThemeSwitcherDropdown />
      </div>

      {/* Main Navigation */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Reference
        </div>
        <div className="space-y-1">
          {/* Home Button */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleNavClick("/")}
            onKeyDown={(e) => e.key === "Enter" && handleNavClick("/")}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer
              ${isActive("/")
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
              }
            `}
          >
            <i className="modus-icons text-lg">home</i>
            <div>Home</div>
          </div>
          {devNavItems.map((item) => (
            <div
              key={item.path}
              role="button"
              tabIndex={0}
              onClick={() => handleNavClick(item.path)}
              onKeyDown={(e) => e.key === "Enter" && handleNavClick(item.path)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer
                ${isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
                }
              `}
            >
              {item.icon && <i className="modus-icons text-lg">{item.icon}</i>}
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Demos */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Component Demos
        </div>
        <div className="border border-default rounded-lg overflow-hidden">
          {demoCategories.map((category) => (
            <div key={category.label} className="border-b border-default last:border-b-0">
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleCategory(category.label)}
                onKeyDown={(e) => e.key === "Enter" && toggleCategory(category.label)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted transition-colors text-left cursor-pointer"
              >
                <div className="font-medium text-foreground">{category.label}</div>
                <i className="modus-icons text-foreground-60">
                  {expandedCategories.includes(category.label) ? "expand_less" : "expand_more"}
                </i>
              </div>
              {expandedCategories.includes(category.label) && (
                <div className="pl-4 pb-2 space-y-1">
                  {category.items.map((item) => (
                    <div
                      key={item.path}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleNavClick(item.path)}
                      onKeyDown={(e) => e.key === "Enter" && handleNavClick(item.path)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left transition-colors cursor-pointer
                        ${isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                        }
                      `}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="pt-4 border-t border-default">
        <div className="text-xs text-foreground-60 text-center">
          Press <div className="inline px-1.5 py-0.5 bg-muted rounded text-foreground text-xs font-mono">Ctrl+Shift+D</div> to toggle
        </div>
      </div>
    </div>
  );
}

/**
 * Dev Panel Component.
 * A floating utility panel that provides access to demos, theme switching,
 * and other development tools. Only renders in development mode.
 */
export default function DevPanel() {
  const { isOpen, close } = useDevPanel();

  return (
    <>
      {/* Floating Toggle Button */}
      <DevPanelToggle />

      {/* Utility Panel - Only render when open to avoid blocking clicks */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground-20 animate-fade-in"
            onClick={close}
          />

          {/* Panel */}
          <div
            className="absolute top-0 right-0 h-full w-[360px] max-w-[90vw] bg-card shadow-xl animate-slide-in-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-bottom-default">
              <div className="text-lg font-semibold text-foreground">Dev Panel</div>
              <ModusButton
                variant="borderless"
                color="secondary"
                size="sm"
                onButtonClick={close}
                ariaLabel="Close Dev Panel"
              >
                <i className="modus-icons">close</i>
              </ModusButton>
            </div>

            {/* Body */}
            <div className="h-[calc(100%-64px)] overflow-y-auto p-4">
              <DevPanelNav />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { createSignal } from "solid-js";
import { For, Show } from "solid-js";
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
    <div class="fixed bottom-4 right-4 z-[9999]">
      <ModusButton
        color="primary"
        size="lg"
        onButtonClick={toggle}
        ariaLabel={isOpen() ? "Close Dev Panel" : "Open Dev Panel (Ctrl+Shift+D)"}
      >
        <div class="flex items-center gap-2">
          <i class="modus-icons text-xl">{isOpen() ? "close" : "code"}</i>
          <div class="hidden sm:block">Dev</div>
        </div>
      </ModusButton>
    </div>
  );
}

/**
 * Navigation section within the Dev Panel.
 */
function DevPanelNav() {
  const { close } = useDevPanel();
  const [expandedCategories, setExpandedCategories] = createSignal<string[]>([]);
  const [currentPath] = createSignal(window.location.pathname);

  const handleNavClick = (path: string) => {
    window.location.href = path;
    close();
  };

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => currentPath() === path;

  return (
    <div class="space-y-6">
      {/* Theme Switcher Section */}
      <div class="space-y-2">
        <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Theme
        </div>
        <ThemeSwitcherDropdown />
      </div>

      {/* Main Navigation */}
      <div class="space-y-2">
        <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Reference
        </div>
        <div class="space-y-1">
          {/* Home Button */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleNavClick("/")}
            onKeyDown={(e) => e.key === "Enter" && handleNavClick("/")}
            classList={{
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer": true,
              "bg-primary text-primary-foreground": isActive("/"),
              "hover:bg-muted text-foreground": !isActive("/"),
            }}
          >
            <i class="modus-icons text-lg">home</i>
            <div>Home</div>
          </div>
          <For each={devNavItems}>
            {(item) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleNavClick(item.path)}
                onKeyDown={(e) => e.key === "Enter" && handleNavClick(item.path)}
                classList={{
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer": true,
                  "bg-primary text-primary-foreground": isActive(item.path),
                  "hover:bg-muted text-foreground": !isActive(item.path),
                }}
              >
                <Show when={item.icon}>
                  <i class="modus-icons text-lg">{item.icon}</i>
                </Show>
                <div>{item.label}</div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Component Demos */}
      <div class="space-y-2">
        <div class="text-sm font-semibold text-foreground-60 uppercase tracking-wide">
          Component Demos
        </div>
        <div class="border border-default rounded-lg overflow-hidden">
          <For each={demoCategories}>
            {(category) => (
              <div class="border-bottom-default last:border-b-0">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleCategory(category.label)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggleCategory(category.label)
                  }
                  class="w-full flex items-center justify-between px-3 py-2 hover:bg-muted transition-colors text-left cursor-pointer"
                >
                  <div class="font-medium text-foreground">{category.label}</div>
                  <i class="modus-icons text-foreground-60">
                    {expandedCategories().includes(category.label)
                      ? "expand_less"
                      : "expand_more"}
                  </i>
                </div>
                <Show when={expandedCategories().includes(category.label)}>
                  <div class="pl-4 pb-2 space-y-1">
                    <For each={category.items}>
                      {(item) => (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleNavClick(item.path)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleNavClick(item.path)
                          }
                          classList={{
                            "w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm text-left transition-colors cursor-pointer": true,
                            "bg-primary text-primary-foreground": isActive(
                              item.path
                            ),
                            "hover:bg-muted text-foreground": !isActive(
                              item.path
                            ),
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div class="pt-4 border-t border-default">
        <div class="text-xs text-foreground-60 text-center">
          Press{" "}
          <div class="inline px-1.5 py-0.5 bg-muted rounded text-foreground text-xs font-mono">
            Ctrl+Shift+D
          </div>{" "}
          to toggle
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
      <DevPanelToggle />

      <Show when={isOpen()}>
        <div class="fixed inset-0 z-[9998]">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-foreground-20 animate-fade-in"
            onClick={close}
          />

          {/* Panel */}
          <div class="absolute top-0 right-0 h-full w-[360px] max-w-[90vw] bg-card shadow-xl animate-slide-in-right">
            {/* Header */}
            <div class="flex items-center justify-between p-4 border-bottom-default">
              <div class="text-lg font-semibold text-foreground">Dev Panel</div>
              <ModusButton
                variant="borderless"
                color="secondary"
                size="sm"
                onButtonClick={close}
                ariaLabel="Close Dev Panel"
              >
                <i class="modus-icons">close</i>
              </ModusButton>
            </div>

            {/* Body */}
            <div class="h-[calc(100%-64px)] overflow-y-auto p-4">
              <DevPanelNav />
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

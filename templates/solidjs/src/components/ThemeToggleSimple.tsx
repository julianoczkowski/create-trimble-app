import { createSignal, onMount, type Component } from "solid-js";
import { Show, For } from "solid-js";
import { useTheme } from "../contexts/ThemeContext";
import type { Theme } from "../contexts/ThemeContext";
import ModusButton from "./ModusButton";

/**
 * Props for the ThemeToggleSimple component.
 */
interface ThemeToggleSimpleProps {
  className?: string;
}

/**
 * Renders the content of the simple theme toggle.
 * @param {ThemeToggleSimpleProps} props - The component props.
 * @returns {JSX.Element} The rendered theme toggle content.
 */
const ThemeToggleSimpleContent: Component<ThemeToggleSimpleProps> = (props) => {
  const { theme, setTheme } = useTheme();

  const themeGroups = [
    { name: "Classic", light: "modus-classic-light" as Theme, dark: "modus-classic-dark" as Theme },
    { name: "Modern", light: "modus-modern-light" as Theme, dark: "modus-modern-dark" as Theme },
    { name: "Connect", light: "connect-light" as Theme, dark: "connect-dark" as Theme },
  ];

  const getCurrentGroup = () =>
    themeGroups.find((group) => theme() === group.light || theme() === group.dark) ?? themeGroups[0];

  const getCurrentMode = () => (theme().includes("dark") ? "dark" : "light");

  const toggleMode = () => {
    const currentGroup = getCurrentGroup();
    const newMode = getCurrentMode() === "light" ? "dark" : "light";
    const newTheme = newMode === "light" ? currentGroup.light : currentGroup.dark;
    setTheme(newTheme);
  };

  const switchGroup = (groupName: string) => {
    const group = themeGroups.find((g) => g.name === groupName);
    if (group) {
      const currentMode = getCurrentMode();
      const newTheme = currentMode === "light" ? group.light : group.dark;
      setTheme(newTheme);
    }
  };

  return (
    <div class={props.className ?? ""}>
      <div class="space-y-6">
        <div class="text-lg font-semibold text-foreground">Theme Selection</div>

        <div class="space-y-2">
          <div class="text-sm font-medium text-foreground">Theme Variant</div>
          <div class="flex gap-2">
            <For each={themeGroups}>
              {(group) => (
                <ModusButton
                  color={getCurrentGroup().name === group.name ? "primary" : "secondary"}
                  variant={getCurrentGroup().name === group.name ? "filled" : "outlined"}
                  size="sm"
                  onButtonClick={() => switchGroup(group.name)}
                >
                  {group.name}
                </ModusButton>
              )}
            </For>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-sm font-medium text-foreground">Mode</div>
          <ModusButton
            color="primary"
            variant="outlined"
            size="md"
            icon={getCurrentMode() === "light" ? "sun" : "moon"}
            onButtonClick={toggleMode}
          >
            {getCurrentMode() === "light" ? "Light Mode" : "Dark Mode"}
          </ModusButton>
        </div>

        <div class="text-sm text-muted-foreground">
          Current: {getCurrentGroup().name} {getCurrentMode()}
        </div>
      </div>
    </div>
  );
};

/**
 * Renders the simple theme toggle with hydration-safe mounting.
 * @param {ThemeToggleSimpleProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ThemeToggleSimple: Component<ThemeToggleSimpleProps> = (props) => {
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  });

  return (
    <Show
      when={mounted()}
      fallback={
        <div class={props.className ?? ""}>
          <div class="space-y-6">
            <div class="text-lg font-semibold text-foreground">Theme Selection</div>
            <div class="animate-pulse">
              <div class="h-8 w-32 rounded bg-muted mb-4" />
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={[1, 2, 3, 4, 5, 6]}>
                  {() => <div class="h-6 w-24 rounded bg-muted" />}
                </For>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ThemeToggleSimpleContent className={props.className} />
    </Show>
  );
};

export default ThemeToggleSimple;

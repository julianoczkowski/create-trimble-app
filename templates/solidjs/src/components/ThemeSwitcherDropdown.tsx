import { createSignal, onMount, type Component } from "solid-js";
import { Show } from "solid-js";
import { useTheme } from "../contexts/ThemeContext";
import type { Theme } from "../contexts/ThemeContext";
import ModusDropdownMenu from "./ModusDropdownMenu";
import type { MenuItem } from "./ModusMenu";

/**
 * Props for the ThemeSwitcherDropdown component.
 */
interface ThemeSwitcherDropdownProps {
  className?: string;
}

/**
 * Renders the content of the theme switcher dropdown.
 * @param {ThemeSwitcherDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered dropdown content.
 */
const themeOptions: { value: Theme; label: string }[] = [
  { value: "modus-classic-light", label: "Classic Light" },
  { value: "modus-classic-dark", label: "Classic Dark" },
  { value: "modus-modern-light", label: "Modern Light" },
  { value: "modus-modern-dark", label: "Modern Dark" },
  { value: "connect-light", label: "Connect Light" },
  { value: "connect-dark", label: "Connect Dark" },
];

const menuItems: MenuItem[] = themeOptions.map((t) => ({
  label: t.label,
  value: t.value,
}));

const ThemeSwitcherDropdownContent: Component<ThemeSwitcherDropdownProps> = (props) => {
  const { theme, setTheme } = useTheme();

  const handleItemSelect = (event: CustomEvent<{ value: string }>) => {
    const selectedValue = event.detail.value as Theme;
    if (selectedValue && selectedValue !== theme()) {
      setTheme(selectedValue);
    }
  };

  const getCurrentThemeLabel = () => {
    const found = themeOptions.find((t) => t.value === theme());
    return found ? found.label : "Theme";
  };

  return (
    <div class={props.className ?? ""}>
      <ModusDropdownMenu
        buttonVariant="filled"
        menuPlacement="bottom-end"
        menuItems={menuItems}
        selectedValue={theme()}
        onItemSelect={handleItemSelect}
        buttonContent={
          <div class="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2">
            <div class="flex-1 text-left text-md font-medium">
              {getCurrentThemeLabel()}
            </div>
            <i class="modus-icons text-base flex-shrink-0">expand_more</i>
          </div>
        }
      />
    </div>
  );
};

/**
 * Renders the theme switcher dropdown with hydration-safe mounting.
 * @param {ThemeSwitcherDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ThemeSwitcherDropdown: Component<ThemeSwitcherDropdownProps> = (props) => {
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    setMounted(true);
  });

  return (
    <Show
      when={mounted()}
      fallback={
        <div class={props.className ?? ""}>
          <div class="animate-pulse">
            <div class="h-8 w-32 rounded bg-muted" />
          </div>
        </div>
      }
    >
      <ThemeSwitcherDropdownContent className={props.className} />
    </Show>
  );
};

export default ThemeSwitcherDropdown;

import { useTheme } from "../hooks/useTheme";
import { type Theme } from "../contexts/ThemeContextData";
import { useState, useEffect } from "react";
import ModusDropdownMenu from "./ModusDropdownMenu";
import type { MenuItem } from "./ModusMenu";

/**
 * Props for the ThemeSwitcherDropdown component.
 */
interface ThemeSwitcherDropdownProps {
  /** A custom CSS class to apply to the component. */
  className?: string;
}

/**
 * Renders the content of the theme switcher dropdown.
 * @param {ThemeSwitcherDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered dropdown content.
 */
function ThemeSwitcherDropdownContent({
  className = '',
}: ThemeSwitcherDropdownProps) {
  const { theme, setTheme } = useTheme();

  const handleItemSelect = (event: CustomEvent<{ value: string }>) => {
    const selectedValue = event.detail.value as Theme;
    if (selectedValue && selectedValue !== theme) {
      setTheme(selectedValue);
    }
  };

  const themes: { value: Theme; label: string; description: string }[] = [
    {
      value: "modus-classic-light",
      label: "Classic Light",
      description: "Traditional light theme",
    },
    {
      value: "modus-classic-dark",
      label: "Classic Dark",
      description: "Traditional dark theme",
    },
    {
      value: "modus-modern-light",
      label: "Modern Light",
      description: "Contemporary light theme",
    },
    {
      value: "modus-modern-dark",
      label: "Modern Dark",
      description: "Contemporary dark theme",
    },
    {
      value: "connect-light",
      label: "Connect Light",
      description: "Connect light theme",
    },
    {
      value: "connect-dark",
      label: "Connect Dark",
      description: "Connect dark theme",
    },
  ];

  const getCurrentThemeLabel = () => {
    const currentTheme = themes.find((t) => t.value === theme);
    return currentTheme ? currentTheme.label : "Theme";
  };

  const menuItems: MenuItem[] = themes.map((themeOption) => ({
    label: themeOption.label,
    value: themeOption.value,
    selected: theme === themeOption.value,
  }));

  return (
    <div className={className}>
      <ModusDropdownMenu
        buttonVariant="filled"
        menuPlacement="bottom-end"
        menuItems={menuItems}
        onItemSelect={handleItemSelect}
        buttonContent={
          <div className="flex items-center justify-between w-full min-w-[140px] px-3 py-2 gap-2">
            <div className="flex-1 text-left text-md font-medium">
              {getCurrentThemeLabel()}
            </div>
            <i className="modus-icons text-base flex-shrink-0">expand_more</i>
          </div>
        }
      />
    </div>
  );
}

export default function ThemeSwitcherDropdown(
  props: ThemeSwitcherDropdownProps
) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={props.className || ""}>
        <div className="animate-pulse">
          <div className="h-8 w-32 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return <ThemeSwitcherDropdownContent {...props} />;
}

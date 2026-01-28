import { useTheme } from "../hooks/useTheme";
import { type Theme } from "../contexts/ThemeContextData";
import { useState, useEffect } from "react";
import ModusButton from "./ModusButton";

/**
 * Props for the ThemeToggleSimple component.
 */
interface ThemeToggleSimpleProps {
  /** A custom CSS class to apply to the component. */
  className?: string;
}

/**
 * Renders the content of the simple theme toggle.
 * @param {ThemeToggleSimpleProps} props - The component props.
 * @returns {JSX.Element} The rendered theme toggle content.
 */
function ThemeToggleSimpleContent({ className = '' }: ThemeToggleSimpleProps) {
  const { theme, setTheme } = useTheme();

  const themeGroups = [
    {
      name: "Classic",
      light: "modus-classic-light" as Theme,
      dark: "modus-classic-dark" as Theme,
    },
    {
      name: "Modern",
      light: "modus-modern-light" as Theme,
      dark: "modus-modern-dark" as Theme,
    },
    {
      name: "Connect",
      light: "connect-light" as Theme,
      dark: "connect-dark" as Theme,
    },
  ];

  const getCurrentGroup = () => {
    return (
      themeGroups.find(
        (group) => theme === group.light || theme === group.dark
      ) || themeGroups[0]
    );
  };

  const getCurrentMode = () => {
    return theme.includes("dark") ? "dark" : "light";
  };

  const toggleMode = () => {
    const currentGroup = getCurrentGroup();
    const newMode = getCurrentMode() === "light" ? "dark" : "light";
    const newTheme =
      newMode === "light" ? currentGroup.light : currentGroup.dark;
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
    <div className={className}>
      <div className="space-y-6">
        <div className="text-lg font-semibold text-foreground">
          Theme Selection
        </div>

        {/* Group Selection */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">
            Theme Variant
          </div>
          <div className="flex gap-2">
            {themeGroups.map((group) => (
              <ModusButton
                key={group.name}
                color={
                  getCurrentGroup().name === group.name
                    ? "primary"
                    : "secondary"
                }
                variant={
                  getCurrentGroup().name === group.name ? "filled" : "outlined"
                }
                size="sm"
                onButtonClick={() => switchGroup(group.name)}
              >
                {group.name}
              </ModusButton>
            ))}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Mode</div>
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

        {/* Current Theme Display */}
        <div className="text-sm text-muted-foreground">
          Current: {getCurrentGroup().name} {getCurrentMode()}
        </div>
      </div>
    </div>
  );
}

export default function ThemeToggleSimple(props: ThemeToggleSimpleProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className={props.className || ""}>
        <div className="space-y-6">
          <div className="text-lg font-semibold text-foreground">
            Theme Selection
          </div>
          <div className="animate-pulse">
            <div className="h-8 w-32 rounded bg-muted mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-6 w-24 rounded bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ThemeToggleSimpleContent {...props} />;
}

import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContextData";

interface ThemeProviderProps {
  children: ReactNode;
}

const VALID_THEMES: Theme[] = [
  "modus-classic-light",
  "modus-classic-dark",
  "modus-modern-light",
  "modus-modern-dark",
  "connect-light",
  "connect-dark",
];

/**
 * A provider component that manages the application's theme.
 * @param {ThemeProviderProps} props - The component props.
 * @returns {JSX.Element} The rendered theme provider.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('modus-classic-light');
  const [mounted, setMounted] = useState(false);

  // Derived state
  const isDark = theme.includes("dark");
  const isModern = theme.includes("modern");

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = window.localStorage.getItem(
          "preferred-theme"
        ) as Theme | null;

        if (savedTheme && VALID_THEMES.includes(savedTheme)) {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.warn("Unable to read stored theme preference:", error);
      }
    }
    setMounted(true);
  }, []);

  // Apply theme to document when it changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;

    // Set theme attribute (official Modus way)
    html.setAttribute("data-theme", theme);

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("preferred-theme", theme);
      } catch (error) {
        console.warn("Unable to persist theme preference:", error);
      }
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isModern }}>
      {children}
    </ThemeContext.Provider>
  );
}

import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  type ParentComponent,
} from "solid-js";

export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

const VALID_THEMES: Theme[] = [
  "modus-classic-light",
  "modus-classic-dark",
  "modus-modern-light",
  "modus-modern-dark",
  "connect-light",
  "connect-dark",
];

interface ThemeContextType {
  theme: () => Theme;
  setTheme: (theme: Theme) => void;
  isDark: () => boolean;
  isModern: () => boolean;
}

const ThemeContext = createContext<ThemeContextType>();

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "modus-classic-light";
  try {
    const saved = window.localStorage.getItem("preferred-theme") as Theme | null;
    if (saved && VALID_THEMES.includes(saved)) return saved;
  } catch {
    // localStorage unavailable
  }
  return "modus-classic-light";
}

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setThemeSignal] = createSignal<Theme>(getInitialTheme());

  createEffect(() => {
    const current = theme();
    document.documentElement.setAttribute("data-theme", current);
    try {
      window.localStorage.setItem("preferred-theme", current);
    } catch {
      // localStorage unavailable
    }
  });

  const setTheme = (newTheme: Theme) => {
    setThemeSignal(newTheme);
  };

  const isDark = () => theme().includes("dark");
  const isModern = () => theme().includes("modern");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isModern }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

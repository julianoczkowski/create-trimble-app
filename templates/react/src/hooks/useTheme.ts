import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextData";

/**
 * A custom hook that provides access to the theme context.
 * @returns {object} The theme context.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

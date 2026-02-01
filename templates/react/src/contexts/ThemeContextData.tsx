import { createContext } from "react";

/**
 * Available theme options for the Modus Design System.
 *
 * The Modus Design System supports 6 distinct themes organized into
 * three families with light and dark variants each:
 *
 * - **Classic**: Traditional Modus design language
 * - **Modern**: Contemporary design with updated styling
 * - **Connect**: Specialized theme for Trimble Connect applications
 *
 * @example
 * // Using theme in components
 * const { theme, setTheme } = useTheme();
 * setTheme('modus-modern-dark');
 *
 * @example
 * // Theme validation
 * const isValidTheme = (theme: string): theme is Theme => {
 *   return ['modus-classic-light', 'modus-classic-dark',
 *           'modus-modern-light', 'modus-modern-dark',
 *           'connect-light', 'connect-dark'].includes(theme);
 * };
 *
 * @see {@link ThemeContextType} - Theme context interface
 * @see {@link useTheme} - Hook for accessing theme context
 */
export type Theme =
  | "modus-classic-light"
  | "modus-classic-dark"
  | "modus-modern-light"
  | "modus-modern-dark"
  | "connect-light"
  | "connect-dark";

/**
 * Represents the shape of the theme context.
 *
 * This interface defines the structure of the theme context value that
 * is provided to all components within the ThemeProvider. It includes
 * the current theme, theme setter function, and computed theme properties.
 *
 * @example
 * // Using theme context in a component
 * const { theme, setTheme, isDark, isModern } = useTheme();
 *
 * // Conditional rendering based on theme
 * return (
 *   <div className={isDark ? 'dark-theme' : 'light-theme'}>
 *     {isModern ? 'Modern UI' : 'Classic UI'}
 *   </div>
 * );
 *
 * @see {@link Theme} - Available theme options
 * @see {@link useTheme} - Hook for accessing theme context
 */
export interface ThemeContextType {
  /** The current theme. */
  theme: Theme;
  /** A function to set the theme. */
  setTheme: (theme: Theme) => void;
  /** Whether the current theme is a dark theme. */
  isDark: boolean;
  /** Whether the current theme is a modern theme. */
  isModern: boolean;
}

/**
 * The context for managing the application's theme.
 *
 * This React context provides theme state and functionality to all
 * components within the ThemeProvider. It uses undefined as the default
 * value to ensure proper error handling when the context is accessed
 * outside of a ThemeProvider.
 *
 * @example
 * // Accessing theme context
 * const themeContext = useContext(ThemeContext);
 * if (!themeContext) {
 *   throw new Error('useTheme must be used within a ThemeProvider');
 * }
 *
 * @see {@link ThemeContextType} - Context value interface
 * @see {@link useTheme} - Recommended hook for accessing theme context
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

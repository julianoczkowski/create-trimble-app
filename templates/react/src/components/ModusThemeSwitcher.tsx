

import { useEffect, useRef } from "react";
import { ModusWcThemeSwitcher } from "@trimble-oss/moduswebcomponents-react";
import type { IThemeConfig } from "@trimble-oss/moduswebcomponents";

export type ModusThemeConfig = IThemeConfig;

/**
 * Props for the ModusThemeSwitcher component.
 */
export interface ModusThemeSwitcherProps {
  /** A custom CSS class to apply to the theme switcher. */
  customClass?: string;
  /** The ARIA label for the theme switcher. */
  ariaLabel?: string;
  /** A callback function to handle theme changes. */
  onThemeChange?: (config: ModusThemeConfig) => void;
}

/**
 * Renders a Modus theme switcher component.
 * @param {ModusThemeSwitcherProps} props - The component props.
 * @returns {JSX.Element} The rendered theme switcher component.
 */
export default function ModusThemeSwitcher({
  customClass,
  ariaLabel = 'Toggle theme',
  onThemeChange,
}: ModusThemeSwitcherProps) {
  const switcherRef = useRef<HTMLModusWcThemeSwitcherElement>(null);

  useEffect(() => {
    const switcher = switcherRef.current;
    if (!switcher || !onThemeChange) {
      return;
    }

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<IThemeConfig>;
      onThemeChange(customEvent.detail);
    };

    switcher.addEventListener("themeChange", handleThemeChange);

    return () => {
      switcher.removeEventListener("themeChange", handleThemeChange);
    };
  }, [onThemeChange]);

  return (
    <ModusWcThemeSwitcher
      ref={switcherRef}
      custom-class={customClass}
      aria-label={ariaLabel}
    />
  );
}

import { onMount, onCleanup, type Component } from "solid-js";

/**
 * Theme config from Modus web components.
 */
export interface ModusThemeConfig {
  theme?: string;
  [key: string]: unknown;
}

/**
 * Props for the ModusThemeSwitcher component.
 */
export interface ModusThemeSwitcherProps {
  customClass?: string;
  ariaLabel?: string;
  onThemeChange?: (config: ModusThemeConfig) => void;
}

/**
 * Renders a Modus theme switcher component.
 * @param {ModusThemeSwitcherProps} props - The component props.
 * @returns {JSX.Element} The rendered theme switcher component.
 */
const ModusThemeSwitcher: Component<ModusThemeSwitcherProps> = (props) => {
  let switcherEl: HTMLElement | undefined;

  onMount(() => {
    if (!switcherEl || !props.onThemeChange) return;

    const handleThemeChange = (e: Event) => {
      const ce = e as CustomEvent<ModusThemeConfig>;
      props.onThemeChange?.(ce.detail);
    };

    switcherEl.addEventListener("themeChange", handleThemeChange);

    onCleanup(() => {
      switcherEl?.removeEventListener("themeChange", handleThemeChange);
    });
  });

  return (
    <modus-wc-theme-switcher
      ref={(el) => (switcherEl = el as HTMLElement)}
      custom-class={props.customClass}
      aria-label={props.ariaLabel ?? "Toggle theme"}
    />
  );
};

export default ModusThemeSwitcher;

import "@trimble-oss/moduswebcomponents-react/modus-wc-styles.css";

/**
 * Props for the ModusProvider component.
 */
interface ModusProviderProps {
  /** The child components to render within the provider. */
  children: React.ReactNode;
}

/**
 * A provider component that applies Modus web component styles.
 * @param {ModusProviderProps} props - The component props.
 * @returns {JSX.Element} The rendered provider component.
 */
export default function ModusProvider({ children }: ModusProviderProps) {
  return <>{children}</>;
}

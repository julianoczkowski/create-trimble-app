import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ModusButton from "./ModusButton";

/**
 * Props for the DemoPage component.
 */
interface DemoPageProps {
  /** The title of the demo page. */
  title: string;
  /** A description of the demo page. */
  description: string;
  /** The content of the demo page. */
  children: ReactNode;
  /** Whether to show the back button. Defaults to true. */
  showBackButton?: boolean;
}

/**
 * Renders a standard layout for a demo page.
 * @param {DemoPageProps} props - The component props.
 * @param {string} props.title - The title of the demo page.
 * @param {string} props.description - A description of the demo page.
 * @param {ReactNode} props.children - The content of the demo page.
 * @param {boolean} props.showBackButton - Whether to show the back button. Defaults to true.
 * @returns {JSX.Element} The rendered demo page component.
 */
export default function DemoPage({
  title,
  description,
  children,
  showBackButton = true,
}: DemoPageProps) {
  const navigate = useNavigate();

  /**
   * Handles the click event for the "Component List" button, navigating to the components gallery page.
   */
  const handleComponentListClick = () => {
    navigate("/dev/components");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-background">
      {showBackButton && (
        <div className="flex items-center gap-4 mb-6">
          <ModusButton
            variant="filled"
            color="tertiary"
            size="md"
            onButtonClick={handleComponentListClick}
          >
            <i className="modus-icons">arrow_back</i> Component List
          </ModusButton>
        </div>
      )}
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          {title}
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>

      {/* Footer */}
      <div className="text-center pt-8 box-content">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src="/react.svg" alt="React" className="h-6 w-6" />
          <div className="text-foreground-40">+</div>
          <img src="/vite.svg" alt="Vite" className="h-6 w-6" />
        </div>
        <div className="text-sm font-mono text-foreground-40">
          2026 Modus React App v1.0.0 + React 19 + Vite + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>
    </div>
  );
}

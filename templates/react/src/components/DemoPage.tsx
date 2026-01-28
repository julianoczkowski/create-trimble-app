import type { ReactNode } from "react";
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
}

/**
 * Renders a standard layout for a demo page.
 * @param {DemoPageProps} props - The component props.
 * @param {string} props.title - The title of the demo page.
 * @param {string} props.description - A description of the demo page.
 * @param {ReactNode} props.children - The content of the demo page.
 * @returns {JSX.Element} The rendered demo page component.
 */
export default function DemoPage({
  title,
  description,
  children,
}: DemoPageProps) {
  /**
   * Handles the click event for the "Back" button, navigating to the previous page in the browser's history.
   */
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <ModusButton
          variant="filled"
          color="tertiary"
          size="md"
          onButtonClick={handleBackClick}
        >
          <i className="modus-icons">arrow_back</i> Back
        </ModusButton>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold text-foreground">{title}</div>
        <div className="text-base text-foreground opacity-80  ">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

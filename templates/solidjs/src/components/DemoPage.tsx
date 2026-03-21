import { useNavigate } from "@solidjs/router";
import type { Component, JSX } from "solid-js";
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
  children: JSX.Element;
  /** Whether to show the back button. Defaults to true. */
  showBackButton?: boolean;
}

/**
 * Renders a standard layout for a demo page.
 * @param props - The component props.
 * @returns The rendered demo page component.
 */
const DemoPage: Component<DemoPageProps> = (props) => {
  const navigate = useNavigate();

  const handleComponentListClick = () => {
    navigate("/dev/components");
  };

  return (
    <div class="max-w-6xl mx-auto p-8 bg-background">
      {props.showBackButton !== false && (
        <div class="flex items-center gap-4 mb-6">
          <ModusButton
            variant="filled"
            color="tertiary"
            size="md"
            onButtonClick={handleComponentListClick}
          >
            <i class="modus-icons">arrow_back</i> Component List
          </ModusButton>
        </div>
      )}
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">
          {props.title}
        </div>
        <div class="text-lg leading-relaxed text-foreground text-center">
          {props.description}
        </div>
      </div>
      <div class="flex flex-col gap-6">{props.children}</div>

      {/* Footer */}
      <div class="text-center pt-8 box-content">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img src="/vite.svg" alt="Vite" class="h-6 w-6" />
        </div>
        <div class="text-sm font-mono text-foreground-40">
          2026 Modus SolidJS App v1.0.0 + SolidJS + Vite + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

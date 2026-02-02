import { useState } from "react";
import DemoExample from "../components/DemoExample";
import ModusAlert from "../components/ModusAlert";
import { modusIcons, totalIconCount, categoryCount } from "../data/modusIcons";

/**
 * Renders a comprehensive page that displays all available Modus icons.
 *
 * This page provides a complete showcase of the Modus icon library with
 * interactive features for browsing, searching, and copying icon names.
 * Icons are organized by category and displayed in a grid layout with
 * hover effects and click-to-copy functionality.
 *
 * @example
 * // The page automatically displays all icons from modusIcons data
 * <IconsPage />
 *
 * @returns {JSX.Element} The rendered icons page with search and category filtering
 * @see {@link modusIcons} - Source data for all available icons
 * @see {@link totalIconCount} - Total number of icons displayed
 * @see {@link categoryCount} - Number of icon categories
 */
export default function IconsPage() {
  const [showAlert, setShowAlert] = useState(false);

  const copyIconName = (iconName: string) => {
    navigator.clipboard.writeText(iconName).then(
      () => {
        // Show alert notification
        setShowAlert(true);
        // Hide alert after delay
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy:", err);
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hideAlert = (_: CustomEvent<void>) => {
    setShowAlert(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Icons Gallery
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Complete showcase of all available Modus icons organized by category. Click on any icon to copy its name.
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <DemoExample
          title="Icon Usage"
          description="All icons use the modus-icons class with kebab-case names. Size with Tailwind classes and color with design system colors."
        >
          <div className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground">
              Total Icons:{" "}
              <div className="font-semibold text-foreground inline">
                {totalIconCount}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Categories:{" "}
              <div className="font-semibold text-foreground inline">
                {categoryCount}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Click on any icon below to copy its name to your clipboard.
            </div>
          </div>
        </DemoExample>

        {Object.entries(modusIcons).map(([categoryName, icons]) => (
          <DemoExample
            key={categoryName}
            title={categoryName}
            description={`${icons.length} icons in this category`}
          >
            <div className="grid grid-cols-5 gap-4">
              {icons.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:scale-105 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => copyIconName(iconName)}
                  title={`Click to copy: ${iconName}`}
                >
                  <i
                    className={`modus-icons text-2xl text-foreground group-hover:text-primary transition-colors`}
                  >
                    {iconName}
                  </i>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground text-center break-all leading-tight transition-colors">
                    {iconName}
                  </div>
                </div>
              ))}
            </div>
          </DemoExample>
        ))}
      </div>

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

      {/* Alert notification for copy feedback - fixed at bottom */}
      {showAlert && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <ModusAlert
            alertTitle="Icon name copied!"
            variant="success"
            dismissible={true}
            onDismissClick={hideAlert}
          />
        </div>
      )}
    </div>
  );
}

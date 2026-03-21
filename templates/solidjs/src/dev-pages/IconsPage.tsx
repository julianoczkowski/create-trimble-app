import { createSignal } from "solid-js";
import { For, Show } from "solid-js";
import DemoExample from "../components/DemoExample";
import ModusAlert from "../components/ModusAlert";
import { modusIcons, totalIconCount, categoryCount } from "../data/modusIcons";

/**
 * Renders a comprehensive page that displays all available Modus icons.
 */
export default function IconsPage() {
  const [showAlert, setShowAlert] = createSignal(false);

  const copyIconName = (iconName: string) => {
    navigator.clipboard.writeText(iconName).then(
      () => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div class="max-w-6xl mx-auto p-8">
      <div class="text-center mb-12">
        <div class="text-4xl font-semibold mb-4 text-foreground">
          Modus Icons Gallery
        </div>
        <div class="text-lg leading-relaxed text-foreground text-center">
          Complete showcase of all available Modus icons organized by category.
          Click on any icon to copy its name.
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <DemoExample
          title="Icon Usage"
          description="All icons use the modus-icons class with kebab-case names. Size with Tailwind classes and color with design system colors."
        >
          <div class="flex flex-col gap-4">
            <div class="text-sm text-muted-foreground">
              Total Icons:{" "}
              <div class="font-semibold text-foreground inline">
                {totalIconCount}
              </div>
            </div>
            <div class="text-sm text-muted-foreground">
              Categories:{" "}
              <div class="font-semibold text-foreground inline">
                {categoryCount}
              </div>
            </div>
            <div class="text-xs text-muted-foreground mt-2">
              Click on any icon below to copy its name to your clipboard.
            </div>
          </div>
        </DemoExample>

        <For each={Object.entries(modusIcons)}>
          {([categoryName, icons]) => (
            <DemoExample
              title={categoryName}
              description={`${icons.length} icons in this category`}
            >
              <div class="grid grid-cols-5 gap-4">
                <For each={icons}>
                  {(iconName) => (
                    <div
                      class="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:scale-105 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => copyIconName(iconName)}
                      title={`Click to copy: ${iconName}`}
                    >
                      <i class="modus-icons text-2xl text-foreground group-hover:text-primary transition-colors">
                        {iconName}
                      </i>
                      <div class="text-xs text-muted-foreground group-hover:text-foreground text-center break-all leading-tight transition-colors">
                        {iconName}
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </DemoExample>
          )}
        </For>
      </div>

      <div class="text-center pt-8 box-content">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img src="/solidjs.svg" alt="SolidJS" class="h-6 w-6" />
          <div class="text-foreground-40">+</div>
          <img src="/vite.svg" alt="Vite" class="h-6 w-6" />
        </div>
        <div class="text-sm font-mono text-foreground-40">
          2026 Modus SolidJS App v1.0.0 + SolidJS + Vite + Tailwind CSS -
          Created by Julian Oczkowski
        </div>
      </div>

      <Show when={showAlert()}>
        <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <ModusAlert
            alertTitle="Icon name copied!"
            variant="success"
            dismissible={true}
            onDismissClick={hideAlert}
          />
        </div>
      </Show>
    </div>
  );
}

"use client";

import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusLoader from "../../components/ModusLoader";

export default function LoaderDemoPage() {
  return (
    <DemoPage
      title="Modus Loader"
      description="Loaders communicate that content is on the way. Select a variant that fits the space and avoid pairing multiple animations together."
    >
      <DemoExample
        title="All Variants"
        description="Six different animation styles to choose from based on your use case."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" size="md" />
            <div className="text-sm text-foreground opacity-80">Spinner</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="ball" size="md" />
            <div className="text-sm text-foreground opacity-80">Ball</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="bars" size="md" />
            <div className="text-sm text-foreground opacity-80">Bars</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="dots" size="md" />
            <div className="text-sm text-foreground opacity-80">Dots</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="infinity" size="md" />
            <div className="text-sm text-foreground opacity-80">Infinity</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="ring" size="md" />
            <div className="text-sm text-foreground opacity-80">Ring</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Color Options"
        description="Theme-aware colors that automatically adapt to light and dark themes."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="primary" size="md" />
            <div className="text-sm text-foreground opacity-80">Primary</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="secondary" size="md" />
            <div className="text-sm text-foreground opacity-80">Secondary</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="accent" size="md" />
            <div className="text-sm text-foreground opacity-80">Accent</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="success" size="md" />
            <div className="text-sm text-foreground opacity-80">Success</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="warning" size="md" />
            <div className="text-sm text-foreground opacity-80">Warning</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="error" size="md" />
            <div className="text-sm text-foreground opacity-80">Error</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" color="info" size="md" />
            <div className="text-sm text-foreground opacity-80">Info</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Size Options"
        description="Four size tokens from extra small to large for different contexts."
      >
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" size="xs" />
            <div className="text-sm text-foreground opacity-80">XS (16px)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" size="sm" />
            <div className="text-sm text-foreground opacity-80">SM (20px)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" size="md" />
            <div className="text-sm text-foreground opacity-80">MD (24px)</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ModusLoader variant="spinner" size="lg" />
            <div className="text-sm text-foreground opacity-80">LG (32px)</div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Usage Examples"
        description="Common patterns for using loaders in real applications."
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <ModusLoader variant="spinner" size="md" />
            <div className="text-sm text-foreground opacity-80">
              Syncing records…
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModusLoader variant="dots" size="sm" color="secondary" />
            <div className="text-sm text-foreground opacity-80">
              Preparing report
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModusLoader variant="bars" size="sm" color="success" />
            <div className="text-sm text-foreground opacity-80">
              Upload complete
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModusLoader variant="ring" size="lg" color="warning" />
            <div className="text-lg text-foreground">
              Processing large dataset…
            </div>
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}

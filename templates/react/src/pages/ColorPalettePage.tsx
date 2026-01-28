import { useState, useEffect } from "react";
import { DemoExampleClean } from "../components/DemoExample";

import DemoPage from "../components/DemoPage";

/**
 * Renders a comprehensive page that displays the Modus Design System color palette.
 *
 * This page showcases all available colors in the Modus Design System,
 * including semantic colors, base colors, and their various opacity variants.
 * Each color is displayed with its name, hex value, and usage examples.
 * The page includes interactive features for exploring color combinations
 * and understanding proper color usage patterns.
 *
 * @example
 * // The page automatically displays all colors from the design system
 * <ColorPalettePage />
 *
 * @returns {JSX.Element} The rendered color palette page with interactive color swatches
 * @see {@link https://modus.trimble.com/design/color} - Modus Design System color documentation
 */
export default function ColorPalettePage() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Define all colors from globals.css
  const colorGroups = [
    {
      title: "Base Colors",
      description: "Core background and content colors",
      colors: [
        {
          name: "background",
          cssVar: "--background",
          tailwindClass: "bg-background",
        },
        {
          name: "foreground",
          cssVar: "--foreground",
          tailwindClass: "text-foreground",
        },
        { name: "card", cssVar: "--card", tailwindClass: "bg-card" },
        {
          name: "card-foreground",
          cssVar: "--card-foreground",
          tailwindClass: "text-card-foreground",
        },
        { name: "popover", cssVar: "--popover", tailwindClass: "bg-popover" },
        {
          name: "popover-foreground",
          cssVar: "--popover-foreground",
          tailwindClass: "text-popover-foreground",
        },
      ],
    },
    {
      title: "Primary Colors",
      description: "Main brand and accent colors",
      colors: [
        { name: "primary", cssVar: "--primary", tailwindClass: "bg-primary" },
        {
          name: "primary-foreground",
          cssVar: "--primary-foreground",
          tailwindClass: "text-primary-foreground",
        },
        {
          name: "secondary",
          cssVar: "--secondary",
          tailwindClass: "bg-secondary",
        },
        {
          name: "secondary-foreground",
          cssVar: "--secondary-foreground",
          tailwindClass: "text-secondary-foreground",
        },
        { name: "accent", cssVar: "--accent", tailwindClass: "bg-accent" },
        {
          name: "accent-foreground",
          cssVar: "--accent-foreground",
          tailwindClass: "text-accent-foreground",
        },
      ],
    },
    {
      title: "Utility Colors",
      description: "Muted, destructive, and border colors",
      colors: [
        { name: "muted", cssVar: "--muted", tailwindClass: "bg-muted" },
        {
          name: "muted-foreground",
          cssVar: "--muted-foreground",
          tailwindClass: "text-muted-foreground",
        },
        {
          name: "destructive",
          cssVar: "--destructive",
          tailwindClass: "bg-destructive",
        },
        {
          name: "destructive-foreground",
          cssVar: "--destructive-foreground",
          tailwindClass: "text-destructive-foreground",
        },
        { name: "border", cssVar: "--border", tailwindClass: "border-border" },
        { name: "ring", cssVar: "--ring", tailwindClass: "ring-ring" },
        { name: "warning", cssVar: "--warning", tailwindClass: "bg-warning" },
        {
          name: "warning-foreground",
          cssVar: "--warning-foreground",
          tailwindClass: "text-warning-foreground",
        },
        { name: "success", cssVar: "--success", tailwindClass: "bg-success" },
        {
          name: "success-foreground",
          cssVar: "--success-foreground",
          tailwindClass: "text-success-foreground",
        },
      ],
    },
    {
      title: "Input Colors",
      description: "Form input and background colors",
      colors: [
        { name: "input", cssVar: "--input", tailwindClass: "bg-input" },
        {
          name: "input-background",
          cssVar: "--input-background",
          tailwindClass: "bg-input-background",
        },
      ],
    },
    {
      title: "Chart Colors",
      description: "Data visualization colors",
      colors: [
        { name: "chart-1", cssVar: "--chart-1", tailwindClass: "bg-chart-1" },
        { name: "chart-2", cssVar: "--chart-2", tailwindClass: "bg-chart-2" },
        { name: "chart-3", cssVar: "--chart-3", tailwindClass: "bg-chart-3" },
        { name: "chart-4", cssVar: "--chart-4", tailwindClass: "bg-chart-4" },
        { name: "chart-5", cssVar: "--chart-5", tailwindClass: "bg-chart-5" },
      ],
    },
    {
      title: "Sidebar Colors",
      description: "Navigation and sidebar colors",
      colors: [
        { name: "sidebar", cssVar: "--sidebar", tailwindClass: "bg-sidebar" },
        {
          name: "sidebar-foreground",
          cssVar: "--sidebar-foreground",
          tailwindClass: "text-sidebar-foreground",
        },
        {
          name: "sidebar-primary",
          cssVar: "--sidebar-primary",
          tailwindClass: "bg-sidebar-primary",
        },
        {
          name: "sidebar-primary-foreground",
          cssVar: "--sidebar-primary-foreground",
          tailwindClass: "text-sidebar-primary-foreground",
        },
        {
          name: "sidebar-accent",
          cssVar: "--sidebar-accent",
          tailwindClass: "bg-sidebar-accent",
        },
        {
          name: "sidebar-accent-foreground",
          cssVar: "--sidebar-accent-foreground",
          tailwindClass: "text-sidebar-accent-foreground",
        },
        {
          name: "sidebar-border",
          cssVar: "--sidebar-border",
          tailwindClass: "border-sidebar-border",
        },
        {
          name: "sidebar-ring",
          cssVar: "--sidebar-ring",
          tailwindClass: "ring-sidebar-ring",
        },
      ],
    },
  ];

  return (
    <DemoPage
      title="Color Palette"
      description="Visual reference for all colors in the Modus Design System. These colors automatically adapt to the current theme (Classic Light/Dark, Modern Light/Dark)."
    >
      {colorGroups.map((group, groupIndex) => (
        <DemoExampleClean
          key={groupIndex}
          title={group.title}
          description={group.description}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {group.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="bg-card rounded-lg p-6 color-card border-thick-dashed"
              >
                {/* Color Swatch */}
                <div
                  className={`rounded-lg w-full h-24 mb-4 ${
                    color.name.includes("foreground") ? "" : color.tailwindClass
                  }`}
                  style={{
                    backgroundColor:
                      color.name === "border" || color.name === "ring"
                        ? `var(${color.cssVar})`
                        : color.name.includes("foreground")
                        ? color.name === "destructive-foreground"
                          ? `var(--destructive)`
                          : color.name === "success-foreground"
                          ? `var(--success)`
                          : color.name === "primary-foreground" ||
                            color.name === "accent-foreground" ||
                            color.name === "sidebar-primary-foreground" ||
                            color.name === "sidebar-accent-foreground"
                          ? `var(--primary)`
                          : `var(--background)`
                        : undefined,
                    border:
                      color.name === "border"
                        ? `1px solid var(${color.cssVar})`
                        : "1px solid var(--border)",
                    boxShadow:
                      color.name === "ring"
                        ? `0 0 0 2px var(${color.cssVar})`
                        : undefined,
                    color: color.name.includes("foreground")
                      ? `var(${color.cssVar})`
                      : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {color.name.includes("foreground") && "Aa"}
                </div>

                {/* Color Info */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    {color.name}
                  </div>
                  <div className="text-xs text-foreground opacity-70 font-mono">
                    {color.cssVar}
                  </div>
                  <div className="text-xs text-foreground opacity-70 font-mono">
                    {color.tailwindClass}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DemoExampleClean>
      ))}

      <DemoExampleClean
        title="Modus Web Component Colors"
        description="These are the original Modus Web Component colors that our design system maps to."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "modus-wc-color-base-page",
              description: "Page background",
            },
            {
              name: "modus-wc-color-base-100",
              description: "Light background",
            },
            {
              name: "modus-wc-color-base-200",
              description: "Medium background",
            },
            { name: "modus-wc-color-base-300", description: "Dark background" },
            {
              name: "modus-wc-color-base-content",
              description: "Text content",
            },
            { name: "modus-wc-color-info", description: "Info/primary" },
            { name: "modus-wc-color-success", description: "Success" },
            { name: "modus-wc-color-warning", description: "Warning" },
            { name: "modus-wc-color-error", description: "Error/danger" },
          ].map((color, index) => (
            <div key={index} className="bg-card rounded-lg p-4 border-default">
              <div
                className="w-full h-16 rounded mb-3"
                style={{ backgroundColor: `var(--${color.name})` }}
              />
              <div className="text-sm font-medium text-foreground">
                {color.name}
              </div>
              <div className="text-xs text-foreground opacity-70">
                {color.description}
              </div>
            </div>
          ))}
        </div>
      </DemoExampleClean>
    </DemoPage>
  );
}

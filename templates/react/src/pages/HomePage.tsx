import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModusButton from "../components/ModusButton";
import { DemoExampleClean } from "../components/DemoExample";

/**
 * Renders the home page of the application.
 * @returns {JSX.Element} The rendered home page.
 */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handles navigation to different pages using React Router.
   *
   * @param {string} path - The path to navigate to
   * @private
   */
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="text-6xl font-bold text-foreground mb-6">
              Modus 2.0
            </div>
            <div className="text-2xl text-foreground-80 mb-8 max-w-3xl mx-auto">
              The complete design system for building modern, accessible, and
              beautiful user interfaces with React and Vite.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ModusButton
                color="primary"
                size="lg"
                onButtonClick={() => handleNavigation("/components")}
              >
                Explore Components
              </ModusButton>
              <ModusButton
                color="secondary"
                variant="outlined"
                size="lg"
                onButtonClick={() => handleNavigation("/color-palette")}
              >
                View Colors
              </ModusButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-card-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-4xl font-bold text-foreground mb-4">
              Why Choose Modus 2.0?
            </div>
            <div className="text-xl text-foreground-80 mx-auto">
              Built for modern React applications with TypeScript, Vite, and
              Tailwind CSS.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DemoExampleClean
              title="Modern Stack"
              description="Built with React 18, TypeScript, Vite, and Tailwind CSS for optimal performance and developer experience."
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  React 18 with Hooks
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  TypeScript Support
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Vite Build Tool
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Tailwind CSS
                </div>
              </div>
            </DemoExampleClean>

            <DemoExampleClean
              title="Design System"
              description="Comprehensive design system with consistent colors, typography, spacing, and component patterns."
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Consistent Theming
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Dark/Light Modes
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Responsive Design
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Accessibility First
                </div>
              </div>
            </DemoExampleClean>

            <DemoExampleClean
              title="Performance"
              description="Optimized for speed with code splitting, lazy loading, and modern build tools."
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Fast Build Times
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Hot Module Replacement
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Tree Shaking
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <i className="modus-icons text-primary">check_circle</i>
                  Bundle Optimization
                </div>
              </div>
            </DemoExampleClean>
          </div>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-4xl font-bold text-foreground mb-4">
              Component Showcase
            </div>
            <div className="text-xl text-foreground-80 mx-auto">
              Explore our comprehensive collection of React components built
              with Modus Design System.
            </div>

            {/* Opacity Test Section */}
            <div className="mt-8 p-6 bg-card border border-border rounded-lg">
              <div className="text-lg font-medium text-foreground mb-4">
                Opacity Variants Test
              </div>
              <div className="space-y-2">
                <div className="text-foreground">text-foreground (100%)</div>
                <div className="text-foreground-80">
                  text-foreground-80 (80%)
                </div>
                <div className="text-foreground-60">
                  text-foreground-60 (60%)
                </div>
                <div className="text-foreground-40">
                  text-foreground-40 (40%)
                </div>
                <div className="text-foreground-20">
                  text-foreground-20 (20%)
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-primary">text-primary (100%)</div>
                <div className="text-primary-80">text-primary-80 (80%)</div>
                <div className="text-primary-60">text-primary-60 (60%)</div>
                <div className="text-primary-40">text-primary-40 (40%)</div>
                <div className="text-primary-20">text-primary-20 (20%)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DemoExampleClean
              title="Buttons"
              description="Interactive buttons with multiple variants, sizes, and states."
            >
              <div className="flex flex-wrap gap-3">
                <ModusButton color="primary" size="sm">
                  Primary
                </ModusButton>
                <ModusButton color="secondary" variant="outlined" size="sm">
                  Secondary
                </ModusButton>
                <ModusButton color="tertiary" variant="borderless" size="sm">
                  Tertiary
                </ModusButton>
              </div>
              <ModusButton
                color="primary"
                variant="outlined"
                onButtonClick={() => handleNavigation("/button-demo")}
                fullWidth
              >
                View Button Demo
              </ModusButton>
            </DemoExampleClean>

            <DemoExampleClean
              title="Color System"
              description="Comprehensive color palette with semantic naming and theme support."
            >
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 bg-primary rounded"></div>
                <div className="h-8 bg-secondary rounded"></div>
                <div className="h-8 bg-accent rounded"></div>
                <div className="h-8 bg-destructive rounded"></div>
                <div className="h-8 bg-warning rounded"></div>
                <div className="h-8 bg-success rounded"></div>
              </div>
              <ModusButton
                color="primary"
                variant="outlined"
                onButtonClick={() => handleNavigation("/color-palette")}
                fullWidth
              >
                View Color Palette
              </ModusButton>
            </DemoExampleClean>

            <DemoExampleClean
              title="Components Gallery"
              description="Browse all available components and their usage examples."
            >
              <div className="space-y-2 text-sm text-foreground">
                <div>• Form Components</div>
                <div>• Navigation Elements</div>
                <div>• Data Display</div>
                <div>• Feedback Components</div>
              </div>
              <ModusButton
                color="primary"
                variant="outlined"
                onButtonClick={() => handleNavigation("/components")}
                fullWidth
              >
                Browse Components
              </ModusButton>
            </DemoExampleClean>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-3xl font-bold mb-4">
            Ready to Build Something Amazing?
          </div>
          <div className="text-xl mb-8 opacity-90">
            Start building with Modus 2.0 today and create beautiful, accessible
            user interfaces.
          </div>
        </div>
      </div>
    </div>
  );
}

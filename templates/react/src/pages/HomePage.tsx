import ModusButton from "../components/ModusButton";

/**
 * Home Page - Your application's landing page.
 *
 * Replace this with your own content!
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <i className="modus-icons text-5xl text-primary">launch</i>
            </div>
            <div className="text-4xl font-bold text-foreground">
              Modus React App
            </div>
            <div className="text-xl text-foreground-60">
              A production-ready React boilerplate with Modus Design System
              integration.
            </div>
          </div>

          {/* Dev Panel Hint */}
          <div className="flex justify-center">
            <ModusButton
              color="primary"
              size="lg"
              onButtonClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    ctrlKey: true,
                    shiftKey: true,
                    key: "d",
                  }),
                );
              }}
            >
              <div className="flex items-center gap-2">
                <i className="modus-icons">code</i>
                <div>Open Dev Panel</div>
              </div>
            </ModusButton>
          </div>

          {/* Getting Started */}
          <div className="bg-card border-default rounded-lg p-6 space-y-4">
            <div className="text-lg font-semibold text-foreground">
              Getting Started
            </div>
            <div className="space-y-4 text-foreground-80">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Build Your App
                  </div>
                  <div className="text-sm text-foreground-60">
                    Start developing in{" "}
                    <code className="px-1 py-0.5 bg-muted rounded text-sm">
                      src/pages/
                    </code>{" "}
                    - add your routes in{" "}
                    <code className="px-1 py-0.5 bg-muted rounded text-sm">
                      App.tsx
                    </code>
                    .
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Use the Dev Panel
                  </div>
                  <div className="text-sm text-foreground-60">
                    Press{" "}
                    <div className="inline px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                      Ctrl+Shift+D
                    </div>{" "}
                    to browse components, colors, and icons.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <div className="font-medium text-foreground">Deploy</div>
                  <div className="text-sm text-foreground-60">
                    In production, the Dev Panel is automatically hidden. Your
                    app ships clean.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MCP Servers */}
          <div className="bg-card border-default rounded-lg p-6 space-y-4">
            <div className="text-lg font-semibold text-foreground">
              MCP Servers Included
            </div>
            <div className="text-sm text-foreground-60 mb-4">
              Pre-configured Model Context Protocol servers for AI-assisted
              development.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-1">
                  Modus Docs MCP
                </div>
                <div className="text-sm text-foreground-60">
                  Access Modus Web Components documentation directly in your AI
                  assistant. Get component props, usage examples, and best
                  practices.
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-1">
                  Context7 MCP
                </div>
                <div className="text-sm text-foreground-60">
                  Up-to-date library documentation for React, Vite, Tailwind,
                  and other dependencies.
                </div>
              </div>
            </div>
          </div>

          {/* Cursor Rules */}
          <div className="bg-card border-default rounded-lg p-6 space-y-4">
            <div className="text-lg font-semibold text-foreground">
              AI-Powered Development Rules
            </div>
            <div className="text-sm text-foreground-60 mb-4">
              Comprehensive Cursor rules ensure consistent, high-quality code
              generation.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">widgets</i>
                  <div>
                    <div className="font-medium text-foreground">
                      Component Patterns
                    </div>
                    <div className="text-sm text-foreground-60">
                      React integration, state management, event handling for
                      Modus Web Components
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">palette</i>
                  <div>
                    <div className="font-medium text-foreground">
                      Design System Compliance
                    </div>
                    <div className="text-sm text-foreground-60">
                      Color usage, border utilities, opacity patterns, icon
                      guidelines
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">
                    accessibility
                  </i>
                  <div>
                    <div className="font-medium text-foreground">
                      Accessibility Standards
                    </div>
                    <div className="text-sm text-foreground-60">
                      Semantic HTML patterns, ARIA attributes, keyboard
                      navigation
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">dashboard</i>
                  <div>
                    <div className="font-medium text-foreground">
                      UX Foundations
                    </div>
                    <div className="text-sm text-foreground-60">
                      Gestalt laws, visual hierarchy, spacing rhythms,
                      interaction patterns
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">wrench</i>
                  <div>
                    <div className="font-medium text-foreground">
                      Development Workflow
                    </div>
                    <div className="text-sm text-foreground-60">
                      Linting commands, quality gates, testing procedures
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="modus-icons text-primary mt-0.5">bug</i>
                  <div>
                    <div className="font-medium text-foreground">
                      Known Issues
                    </div>
                    <div className="text-sm text-foreground-60">
                      Checkbox value inversion, modal patterns, select vs
                      dropdown
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Automation */}
          <div className="bg-card border-default rounded-lg p-6 space-y-4">
            <div className="text-lg font-semibold text-foreground">
              Quality Automation
            </div>
            <div className="text-sm text-foreground-60 mb-4">
              Pre-configured Husky hooks and GitHub workflows for automated
              quality assurance.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-2">
                  Pre-commit Hooks
                </div>
                <div className="text-sm text-foreground-60 space-y-1">
                  <div>TypeScript type checking</div>
                  <div>Design system color validation</div>
                  <div>Modus icon usage verification</div>
                  <div>Border and opacity pattern checks</div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-2">
                  Linting Scripts
                </div>
                <div className="text-sm text-foreground-60 space-y-1">
                  <div>Inline style detection</div>
                  <div>Semantic HTML enforcement</div>
                  <div>Icon name validation (700+ icons)</div>
                  <div>
                    Run all checks with{" "}
                    <code className="px-1 py-0.5 bg-background rounded text-xs font-mono">
                      npm run lint:all
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 box-content">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src="/vite.svg" alt="Vite" className="h-6 w-6" />
              <div className="text-foreground-40">+</div>
              <img src="/react.svg" alt="React" className="h-6 w-6" />
            </div>
            <div className="text-sm font-mono text-foreground-40">
              2026 Modus React App v1.0.0 + React 19 + Vite + Tailwind CSS -
              Created by Julian Oczkowski
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

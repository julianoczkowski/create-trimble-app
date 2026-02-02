import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusButtonComponent } from '../../components/modus-button.component';

/**
 * Home page component.
 *
 * This is the main landing page for the user's application.
 * Edit this component to create your own home page.
 *
 * Getting Started:
 * 1. Customize the hero section with your app's branding
 * 2. Add your own features and content
 * 3. Use Ctrl+Shift+D to open the Dev Panel for component reference
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ModusButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <div class="flex-1 flex flex-col items-center p-8">
        <div class="max-w-4xl w-full space-y-8">
          <!-- Header -->
          <div class="text-center space-y-4">
            <div class="text-4xl font-bold text-foreground">Modus Angular App</div>
            <div class="text-xl text-foreground-60">
              A production-ready Angular boilerplate with Modus Design System integration.
            </div>
          </div>

          <!-- Dev Panel Hint -->
          <div class="flex justify-center">
            <modus-button color="primary" size="lg" (buttonClick)="openDevPanel()">
              <div class="flex items-center gap-2">
                <i class="modus-icons">code</i>
                <div>Open Dev Panel</div>
              </div>
            </modus-button>
          </div>

          <!-- Getting Started -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">Getting Started</div>
            <div class="space-y-4 text-foreground-80">
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-muted-foreground text-background flex items-center justify-center text-sm font-bold"
                >
                  1
                </div>
                <div>
                  <div class="font-medium text-foreground">Build Your App</div>
                  <div class="text-sm text-foreground-60">
                    Start developing in
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">src/app/pages/</code>
                    - add your routes in
                    <code class="px-1 py-0.5 bg-muted rounded text-sm">app.routes.ts</code>.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-muted-foreground text-background flex items-center justify-center text-sm font-bold"
                >
                  2
                </div>
                <div>
                  <div class="font-medium text-foreground">Use the Dev Panel</div>
                  <div class="text-sm text-foreground-60">
                    Press
                    <div class="inline px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                      Ctrl+Shift+D
                    </div>
                    to browse components, colors, and icons.
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-muted-foreground text-background flex items-center justify-center text-sm font-bold"
                >
                  3
                </div>
                <div>
                  <div class="font-medium text-foreground">Deploy</div>
                  <div class="text-sm text-foreground-60">
                    In production, the Dev Panel is automatically hidden. Your app ships clean.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MCP Servers -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">MCP Servers Included</div>
            <div class="text-sm text-foreground-60 mb-4">
              Pre-configured Model Context Protocol servers for AI-assisted development.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-card rounded-lg border-thick-dashed">
                <div class="font-medium text-foreground mb-1">Modus Docs MCP</div>
                <div class="text-sm text-foreground-60">
                  Access Modus Web Components documentation directly in your AI assistant. Get
                  component props, usage examples, and best practices.
                </div>
              </div>
              <div class="p-4 bg-card rounded-lg border-thick-dashed">
                <div class="font-medium text-foreground mb-1">Context7 MCP</div>
                <div class="text-sm text-foreground-60">
                  Up-to-date library documentation for Angular, Tailwind, and other
                  dependencies.
                </div>
              </div>
            </div>
          </div>

          <!-- Cursor Rules -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">AI-Powered Development Rules</div>
            <div class="text-sm text-foreground-60 mb-4">
              Comprehensive Cursor rules ensure consistent, high-quality code generation.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">widgets</i>
                  <div>
                    <div class="font-medium text-foreground">Component Patterns</div>
                    <div class="text-sm text-foreground-60">
                      Angular integration, state management, event handling for Modus Web Components
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">palette</i>
                  <div>
                    <div class="font-medium text-foreground">Design System Compliance</div>
                    <div class="text-sm text-foreground-60">
                      Color usage, border utilities, opacity patterns, icon guidelines
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">accessibility</i>
                  <div>
                    <div class="font-medium text-foreground">Accessibility Standards</div>
                    <div class="text-sm text-foreground-60">
                      Semantic HTML patterns, ARIA attributes, keyboard navigation
                    </div>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">dashboard</i>
                  <div>
                    <div class="font-medium text-foreground">UX Foundations</div>
                    <div class="text-sm text-foreground-60">
                      Gestalt laws, visual hierarchy, spacing rhythms, interaction patterns
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">wrench</i>
                  <div>
                    <div class="font-medium text-foreground">Development Workflow</div>
                    <div class="text-sm text-foreground-60">
                      Linting commands, quality gates, testing procedures
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <i class="modus-icons text-muted-foreground mt-0.5">bug</i>
                  <div>
                    <div class="font-medium text-foreground">Known Issues</div>
                    <div class="text-sm text-foreground-60">
                      Checkbox value inversion, modal patterns, select vs dropdown
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quality Automation -->
          <div class="bg-card border-default rounded-lg p-6 space-y-4">
            <div class="text-lg font-semibold text-foreground">Quality Automation</div>
            <div class="text-sm text-foreground-60 mb-4">
              Pre-configured Husky hooks and GitHub workflows for automated quality assurance.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-card rounded-lg border-thick-dashed">
                <div class="font-medium text-foreground mb-2">Pre-commit Hooks</div>
                <div class="text-sm text-foreground-60 space-y-1">
                  <div>TypeScript type checking</div>
                  <div>Design system color validation</div>
                  <div>Modus icon usage verification</div>
                  <div>Border and opacity pattern checks</div>
                </div>
              </div>
              <div class="p-4 bg-card rounded-lg border-thick-dashed">
                <div class="font-medium text-foreground mb-2">Linting Scripts</div>
                <div class="text-sm text-foreground-60 space-y-1">
                  <div>Inline style detection</div>
                  <div>Semantic HTML enforcement</div>
                  <div>Icon name validation (700+ icons)</div>
                  <div>
                    Run all checks with
                    <code class="px-1 py-0.5 bg-muted rounded text-xs font-mono"
                      >npm run lint:all</code
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center pt-8 box-content">
            <div class="flex items-center justify-center gap-3 mb-3">
              <img src="/angular-icon.svg" alt="Angular" class="h-6 w-6" aria-hidden="true" />
            </div>
            <div class="text-sm font-mono text-foreground-40">
              2026 Modus Angular App v1.0.0 + Angular 20 + Tailwind CSS - Created by Julian
              Oczkowski
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  /**
   * Opens the Dev Panel by dispatching a keyboard event for Ctrl+Shift+D.
   */
  openDevPanel(): void {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        ctrlKey: true,
        shiftKey: true,
        key: 'd',
      }),
    );
  }
}

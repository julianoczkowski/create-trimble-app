import { useState, useEffect, useRef } from "react";
import ModusButton from "../components/ModusButton";
import ModusCard from "../components/ModusCard";
import ModusModal, { type ModusModalRef } from "../components/ModusModal";
import ThemeToggleSimple from "../components/ThemeToggleSimple";
import GithubMarkSvg from "../assets/github-mark.svg";
import GithubMarkWhiteSvg from "../assets/github-mark-white.svg";

/**
 * Renders a comprehensive setup validation page for the Modus 2.0 React App.
 *
 * This page provides a complete validation suite to ensure all components,
 * themes, and functionality are working correctly. It includes interactive
 * tests for Modus components, theme switching, modal functionality, and
 * other critical features of the application.
 *
 * The validation page helps developers verify that their setup is correct
 * and all Modus Design System components are properly integrated.
 *
 * @example
 * // Access the validation page at /setup-validation
 * <SetupValidationPage />
 *
 * @returns {JSX.Element} The rendered setup validation page with interactive tests
 * @see {@link ModusModal} - Modal component validation
 * @see {@link ThemeToggleSimple} - Theme switching validation
 */
export default function SetupValidationPage() {
  const [mounted, setMounted] = useState(false);

  const centerModalRef = useRef<ModusModalRef>(null);
  const bottomModalRef = useRef<ModusModalRef>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Opens the center modal for testing modal functionality.
   *
   * @private
   */
  const openCenterModal = () => {
    if (centerModalRef.current) {
      centerModalRef.current.openModal();
    }
  };

  /**
   * Opens the bottom modal for testing different modal positions.
   *
   * @private
   */
  const openBottomModal = () => {
    if (bottomModalRef.current) {
      bottomModalRef.current.openModal();
    }
  };

  /**
   * Closes the center modal.
   *
   * @private
   */
  const closeCenterModal = () => {
    if (centerModalRef.current) {
      centerModalRef.current.closeModal();
    }
  };

  /**
   * Closes the bottom modal.
   *
   * @private
   */
  const closeBottomModal = () => {
    if (bottomModalRef.current) {
      bottomModalRef.current.closeModal();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-32 pb-8 flex flex-col gap-6">
            <div className="text-center space-y-6">
              <div className="h-16 bg-muted rounded animate-pulse" />
              <div className="h-8 bg-muted rounded animate-pulse max-w-4xl mx-auto" />
            </div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="border-t border-border bg-card py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const iconExamples = [
    { name: "check_circle", label: "Check Circle" },
    { name: "settings", label: "Settings" },
    { name: "home", label: "Home" },
    { name: "search", label: "Search" },
    { name: "notifications", label: "Notifications" },
    { name: "person", label: "Person" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-32 pb-8 flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="text-5xl md:text-6xl font-bold text-foreground">
              Your Modus 2.0 React App is Ready
            </div>
            <div className="text-xl md:text-2xl text-foreground-80 max-w-4xl mx-auto">
              Everything is configured perfectly. Time to build something
              amazing
            </div>
          </div>

          {/* Sample YouTube Player */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/aG7Eu7SkKZA?si=BCJ0yNUe07-BCA8a"
                title="Modus 2.0 Setup Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          {/* Theme Switcher Section */}
          <ModusCard customClass="p-6 border-default">
            <ThemeToggleSimple />
          </ModusCard>

          {/* Button Showcase Section */}
          <ModusCard customClass="p-6 border-default">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-foreground">
                Button Components
              </div>
              <div className="text-sm text-foreground-80">
                All buttons are working correctly with icons and proper styling
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <ModusButton color="primary" size="md" icon="check_circle">
                    Primary
                  </ModusButton>
                  <div className="text-xs text-muted-foreground">Primary</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ModusButton color="secondary" size="md" icon="settings">
                    Secondary
                  </ModusButton>
                  <div className="text-xs text-muted-foreground">Secondary</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ModusButton color="tertiary" size="md" icon="close">
                    Tertiary
                  </ModusButton>
                  <div className="text-xs text-muted-foreground">Tertiary</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ModusButton color="danger" size="md" icon="delete">
                    Danger
                  </ModusButton>
                  <div className="text-xs text-muted-foreground">Danger</div>
                </div>
              </div>
            </div>
          </ModusCard>

          {/* Card Example Section */}
          <ModusCard
            customClass="p-6 border-dashed"
            title="Card Component Example"
            subtitle="This demonstrates the ModusCard component working correctly"
          >
            <div className="space-y-4">
              <div className="text-foreground">
                This card shows that the ModusCard component is properly
                integrated and styled according to the current theme.
              </div>
              <div className="flex gap-4">
                <ModusButton color="primary" size="sm">
                  Action Button
                </ModusButton>
                <ModusButton color="secondary" variant="outlined" size="sm">
                  Secondary Action
                </ModusButton>
              </div>
            </div>
          </ModusCard>

          {/* Modal Example Section */}
          <ModusCard customClass="p-6 border-default">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-foreground">
                Modal Components
              </div>
              <div className="text-sm text-foreground-80">
                Test the modal functionality with different placements
              </div>
              <div className="flex gap-4">
                <ModusButton
                  color="primary"
                  size="md"
                  icon="expand"
                  onButtonClick={openCenterModal}
                >
                  Open Modal (Center)
                </ModusButton>
                <ModusButton
                  color="secondary"
                  size="md"
                  icon="expand"
                  onButtonClick={openBottomModal}
                >
                  Open Modal (Bottom)
                </ModusButton>
              </div>
            </div>
          </ModusCard>

          {/* Icon Showcase Section */}
          <ModusCard customClass="p-6 border-default">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-foreground">
                Icon Components
              </div>
              <div className="text-sm text-foreground-80">
                Modus icons are loading and displaying correctly
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {iconExamples.map((icon) => (
                  <div
                    key={icon.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <i className="modus-icons text-3xl text-primary">
                      {icon.name}
                    </i>
                    <div className="text-xs text-muted-foreground text-center">
                      {icon.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ModusCard>

          {/* Demo Package Section */}
          <ModusCard customClass="p-6 border-default">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-foreground">
                Extended Demo Package
              </div>
              <div className="text-sm text-foreground-80">
                Coming soon - Install the full demo package to see all Modus Web
                Components in action
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="font-mono text-sm text-foreground">
                  npm install @julianoczkowski/modus-react-demos
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                This package will include comprehensive examples of all Modus
                Web Components with React integration patterns.
              </div>
            </div>
          </ModusCard>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="border-t border-border bg-card py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-foreground">
            &copy; 2025 Modus 2.0 React App - Built with React + Vite
          </div>
          <a
            href="https://github.com/julianoczkowski/modus-react-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center transition-colors duration-200 no-underline text-foreground hover:opacity-80"
          >
            <img
              src={GithubMarkSvg}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2 github-icon-light"
            />
            <img
              src={GithubMarkWhiteSvg}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2 github-icon-dark"
            />
            GitHub Repository
          </a>
        </div>
      </div>

      {/* Center Modal */}
      <ModusModal
        ref={centerModalRef}
        modalId="center-modal"
        header="Center Modal Example"
        onClose={closeCenterModal}
      >
        <div className="space-y-4">
          <div className="text-foreground">
            This modal opens in the center of the screen. It demonstrates the
            ModusModal component working correctly.
          </div>
          <div className="text-sm text-muted-foreground">
            You can close this modal by clicking the close button or pressing
            the Escape key.
          </div>
          <div className="flex gap-4 pt-4">
            <ModusButton color="primary" onButtonClick={closeCenterModal}>
              Close Modal
            </ModusButton>
          </div>
        </div>
      </ModusModal>

      {/* Bottom Modal */}
      <ModusModal
        ref={bottomModalRef}
        modalId="bottom-modal"
        position="bottom"
        header="Bottom Modal Example"
        onClose={closeBottomModal}
      >
        <div className="space-y-4">
          <div className="text-foreground">
            This modal opens at the bottom of the screen. It shows how modals
            can be positioned differently.
          </div>
          <div className="text-sm text-muted-foreground">
            The modal component is fully functional and theme-aware.
          </div>
          <div className="flex gap-4 pt-4">
            <ModusButton color="primary" onButtonClick={closeBottomModal}>
              Close Modal
            </ModusButton>
          </div>
        </div>
      </ModusModal>
    </div>
  );
}

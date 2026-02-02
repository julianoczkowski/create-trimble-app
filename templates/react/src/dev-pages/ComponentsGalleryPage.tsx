import { useState } from "react";
import { Link } from "react-router-dom";
import ModusButton from "../components/ModusButton";
import ModusBadge from "../components/ModusBadge";

interface ComponentDemo {
  name: string;
  description: string;
  url: string;
  category: string;
  status: "ready" | "demo";
}

const componentDemos: ComponentDemo[] = [
  {
    name: "Accordion",
    description:
      "Collapsible content sections with expand/collapse functionality",
    url: "/dev/demos/accordion-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Alert",
    description:
      "Notifications and messages with different variants and dismissible options",
    url: "/dev/demos/alert-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Autocomplete",
    description: "Input field with suggestions and multi-select capabilities",
    url: "/dev/demos/autocomplete-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Avatar",
    description: "User profile images with different sizes and shapes",
    url: "/dev/demos/avatar-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Badge",
    description: "Labels and counters for status indicators and notifications",
    url: "/dev/demos/badge-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Breadcrumbs",
    description: "Navigation breadcrumb trails for hierarchical navigation",
    url: "/dev/demos/breadcrumbs-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Button",
    description: "Action buttons with various styles, sizes, and states",
    url: "/dev/demos/button-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Button Group",
    description:
      "Groups multiple buttons with single or multiple selection modes for toolbars and segmented controls",
    url: "/dev/demos/button-group-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Card",
    description: "Content containers with headers, content, and action areas",
    url: "/dev/demos/card-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Checkbox",
    description: "Form controls for multiple selections and boolean inputs",
    url: "/dev/demos/checkbox-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Chip",
    description: "Compact elements for tags, filters, and removable items",
    url: "/dev/demos/chip-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Date",
    description: "Date input controls with validation and formatting",
    url: "/dev/demos/date-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Dropdown Menu",
    description: "Contextual menus with various placement and sizing options",
    url: "/dev/demos/dropdown-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "File Dropzone",
    description:
      "Drag-and-drop file upload with validation for file types, sizes, and counts",
    url: "/dev/demos/file-dropzone-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Handle",
    description:
      "Draggable resize handle for panels with bar and button styles, supports keyboard navigation",
    url: "/dev/demos/handle-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Icon",
    description:
      "Icon component with various sizes, accessibility options, and styling",
    url: "/dev/demos/icon-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Input Feedback",
    description:
      "Contextual feedback for form fields with error, success, warning, and info messages",
    url: "/dev/demos/input-feedback-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Input Label",
    description:
      "Labels for form controls with sub-labels, required indicators, and custom content",
    url: "/dev/demos/input-label-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Loader",
    description:
      "Visual loading indicators with 6 animation variants, 4 sizes, and 8 colors",
    url: "/dev/demos/loader-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Logo",
    description:
      "Trimble and Viewpoint product logos with theme-aware light/dark switching and emblem variants",
    url: "/dev/demos/logo-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Menu",
    description:
      "Integrated menu system with container and menu items for navigation and toolbars",
    url: "/dev/demos/menu-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Modal",
    description:
      "Blocking dialog overlays for forms, confirmations, and detailed content",
    url: "/dev/demos/modal-demo",
    category: "Overlays",
    status: "demo",
  },
  {
    name: "Navbar",
    description:
      "Full-width application bar with navigation menus, search, notifications, apps launcher, AI button and user profile controls",
    url: "/dev/demos/navbar-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Number Input",
    description:
      "Numeric input controls with validation, currency support, range sliders, and comprehensive form integration",
    url: "/dev/demos/number-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Pagination",
    description:
      "Page navigation control with first, previous, number, next, and last actions plus accessibility customization",
    url: "/dev/demos/pagination-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Panel",
    description:
      "Structured layout component with header, body, and footer slots for side navigation and content sections",
    url: "/dev/demos/panel-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Progress",
    description:
      "Linear and radial progress indicators for task completion and live updates",
    url: "/dev/demos/progress-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Radio",
    description:
      "Exclusive choice control with multiple sizes, required state, and layout customization",
    url: "/dev/demos/radio-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Rating",
    description:
      "Star, smiley, heart, and thumb ratings with events, half-steps, and accessibility helpers",
    url: "/dev/demos/rating-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Select",
    description:
      "Single-select dropdown with dynamic options arrays, validation feedback, and async loading patterns",
    url: "/dev/demos/select-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Side Navigation",
    description:
      "Collapsible left navigation with controlled expansion and Modus navbar integration",
    url: "/dev/demos/side-navigation-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Skeleton",
    description:
      "Animated loading placeholders for typography, cards, and dashboards",
    url: "/dev/demos/skeleton-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Slider",
    description:
      "Interactive range input with min/max bounds, step control, and live feedback",
    url: "/dev/demos/slider-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Stepper",
    description:
      "Progress indicator for multi-step workflows with horizontal and vertical orientations",
    url: "/dev/demos/stepper-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Switch",
    description:
      "Binary toggle control with required, disabled, and indeterminate states",
    url: "/dev/demos/switch-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Table",
    description: "Data tables with sorting, pagination, and selection",
    url: "/dev/demos/table-demo",
    category: "Data",
    status: "demo",
  },
  {
    name: "Tabs",
    description:
      "Tab navigation with icons, disabled states, and multiple visual styles",
    url: "/dev/demos/tabs-demo",
    category: "Navigation",
    status: "demo",
  },
  {
    name: "Textarea",
    description:
      "Multi-line text field with helper messages, validation, and clearable controls",
    url: "/dev/demos/textarea-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Text Input",
    description:
      "Single-line text fields with various types, validation, and interactive features",
    url: "/dev/demos/text-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Theme Switcher",
    description:
      "Toggle between light and dark Modus themes with persisted preferences",
    url: "/dev/demos/theme-switcher-demo",
    category: "Display",
    status: "demo",
  },
  {
    name: "Time Input",
    description:
      "Single-field time picker with min/max limits, seconds support, and datalist suggestions",
    url: "/dev/demos/time-input-demo",
    category: "Forms",
    status: "demo",
  },
  {
    name: "Toast",
    description:
      "Transient notifications that stack by position and pair with alerts for content",
    url: "/dev/demos/toast-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Toolbar",
    description:
      "Three-slot layout container for building application headers and action bars",
    url: "/dev/demos/toolbar-demo",
    category: "Layout",
    status: "demo",
  },
  {
    name: "Tooltip",
    description:
      "Contextual helper messages that appear on hover or focus around any trigger",
    url: "/dev/demos/tooltip-demo",
    category: "Feedback",
    status: "demo",
  },
  {
    name: "Utility Panel",
    description:
      "Collapsible side panel for contextual filters, tools, and secondary content with optional push layout",
    url: "/dev/demos/utility-panel-demo",
    category: "Layout",
    status: "demo",
  },
];

const categories = [
  { name: "All", value: "all" },
  { name: "Forms", value: "forms" },
  { name: "Layout", value: "layout" },
  { name: "Navigation", value: "navigation" },
  { name: "Display", value: "display" },
  { name: "Feedback", value: "feedback" },
  { name: "Overlays", value: "overlays" },
  { name: "Data", value: "data" },
];

/**
 * Renders a gallery of component demos.
 * @returns {JSX.Element} The rendered component gallery page.
 */
export default function ComponentsGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredComponents =
    selectedCategory === "all"
      ? componentDemos
      : componentDemos.filter(
          (component) => component.category.toLowerCase() === selectedCategory,
        );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold mb-4 text-foreground">
          Modus Web Components
        </div>
        <div className="text-lg leading-relaxed text-foreground text-center">
          Explore all available React Modus Web Components.
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12 p-8 bg-card rounded-lg border-default">
        <div className="text-2xl font-semibold mb-4 text-foreground">
          Filter by Category
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <ModusButton
              key={category.value}
              color={
                selectedCategory === category.value ? "secondary" : "secondary"
              }
              variant={
                selectedCategory === category.value ? "filled" : "outlined"
              }
              size="md"
              onButtonClick={() => setSelectedCategory(category.value)}
            >
              {category.name}
            </ModusButton>
          ))}
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <div
            key={component.url}
            className="bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-200 border-default"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  {component.name}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {component.category}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ModusBadge
                  color={component.status === "ready" ? "success" : "warning"}
                  variant="filled"
                  size="md"
                >
                  {component.status === "ready" ? "Ready" : "Demo"}
                </ModusBadge>
              </div>
            </div>

            <div className="text-foreground mb-4 text-sm leading-relaxed">
              {component.description}
            </div>

            <div className="flex gap-2">
              <Link to={component.url} className="flex-1">
                <ModusButton
                  color="primary"
                  variant="filled"
                  size="md"
                  fullWidth
                >
                  View Demo
                </ModusButton>
              </Link>
            </div>
          </div>
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
    </div>
  );
}

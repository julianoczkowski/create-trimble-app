/**
 * Dev Panel configuration
 */

export interface DevNavItem {
  label: string;
  path: string;
  icon?: string;
  description?: string;
}

export interface DevNavCategory {
  label: string;
  items: DevNavItem[];
}

/**
 * Main navigation items for the Dev Panel
 */
export const devNavItems: DevNavItem[] = [
  {
    label: "Colors",
    path: "/dev/colors",
    icon: "palette",
    description: "Color palette reference",
  },
  {
    label: "Icons",
    path: "/dev/icons",
    icon: "apps",
    description: "Icon library browser",
  },
  {
    label: "Components",
    path: "/dev/components",
    icon: "widgets",
    description: "Component gallery",
  },
];

/**
 * Component demo categories for the Dev Panel navigation.
 * Categories match the gallery filter categories for consistent UX.
 */
export const demoCategories: DevNavCategory[] = [
  {
    label: "Forms",
    items: [
      { label: "Autocomplete", path: "/dev/demos/autocomplete-demo" },
      { label: "Button", path: "/dev/demos/button-demo" },
      { label: "Button Group", path: "/dev/demos/button-group-demo" },
      { label: "Checkbox", path: "/dev/demos/checkbox-demo" },
      { label: "Date", path: "/dev/demos/date-demo" },
      { label: "File Dropzone", path: "/dev/demos/file-dropzone-demo" },
      { label: "Input Feedback", path: "/dev/demos/input-feedback-demo" },
      { label: "Input Label", path: "/dev/demos/input-label-demo" },
      { label: "Number Input", path: "/dev/demos/number-input-demo" },
      { label: "Radio", path: "/dev/demos/radio-demo" },
      { label: "Rating", path: "/dev/demos/rating-demo" },
      { label: "Select", path: "/dev/demos/select-demo" },
      { label: "Slider", path: "/dev/demos/slider-demo" },
      { label: "Switch", path: "/dev/demos/switch-demo" },
      { label: "Text Input", path: "/dev/demos/text-input-demo" },
      { label: "Textarea", path: "/dev/demos/textarea-demo" },
      { label: "Time Input", path: "/dev/demos/time-input-demo" },
    ],
  },
  {
    label: "Layout",
    items: [
      { label: "Accordion", path: "/dev/demos/accordion-demo" },
      { label: "Card", path: "/dev/demos/card-demo" },
      { label: "Handle", path: "/dev/demos/handle-demo" },
      { label: "Panel", path: "/dev/demos/panel-demo" },
      { label: "Toolbar", path: "/dev/demos/toolbar-demo" },
      { label: "Utility Panel", path: "/dev/demos/utility-panel-demo" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { label: "Breadcrumbs", path: "/dev/demos/breadcrumbs-demo" },
      { label: "Dropdown", path: "/dev/demos/dropdown-demo" },
      { label: "Menu", path: "/dev/demos/menu-demo" },
      { label: "Navbar", path: "/dev/demos/navbar-demo" },
      { label: "Pagination", path: "/dev/demos/pagination-demo" },
      { label: "Side Navigation", path: "/dev/demos/side-navigation-demo" },
      { label: "Stepper", path: "/dev/demos/stepper-demo" },
      { label: "Tabs", path: "/dev/demos/tabs-demo" },
    ],
  },
  {
    label: "Display",
    items: [
      { label: "Avatar", path: "/dev/demos/avatar-demo" },
      { label: "Badge", path: "/dev/demos/badge-demo" },
      { label: "Chip", path: "/dev/demos/chip-demo" },
      { label: "Icon", path: "/dev/demos/icon-demo" },
      { label: "Logo", path: "/dev/demos/logo-demo" },
      { label: "Theme Switcher", path: "/dev/demos/theme-switcher-demo" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { label: "Alert", path: "/dev/demos/alert-demo" },
      { label: "Loader", path: "/dev/demos/loader-demo" },
      { label: "Progress", path: "/dev/demos/progress-demo" },
      { label: "Skeleton", path: "/dev/demos/skeleton-demo" },
      { label: "Toast", path: "/dev/demos/toast-demo" },
      { label: "Tooltip", path: "/dev/demos/tooltip-demo" },
    ],
  },
  {
    label: "Overlays",
    items: [{ label: "Modal", path: "/dev/demos/modal-demo" }],
  },
  {
    label: "Data",
    items: [{ label: "Table", path: "/dev/demos/table-demo" }],
  },
];

/**
 * Check if Dev Panel should be shown based on environment variable
 */
export function isDevPanelEnabled(): boolean {
  return import.meta.env.VITE_DEV_PANEL === "true";
}

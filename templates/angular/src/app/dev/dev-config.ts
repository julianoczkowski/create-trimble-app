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
    label: 'Colors',
    path: '/dev/colors',
    icon: 'palette',
    description: 'Color palette reference',
  },
  {
    label: 'Icons',
    path: '/dev/icons',
    icon: 'apps',
    description: 'Icon library browser',
  },
  {
    label: 'Components',
    path: '/dev/components',
    icon: 'widgets',
    description: 'Component gallery',
  },
];

/**
 * Component demo categories for the Dev Panel navigation.
 * Categories match the gallery filter categories for consistent UX.
 */
export const demoCategories: DevNavCategory[] = [
  {
    label: 'Forms',
    items: [
      { label: 'Autocomplete', path: '/dev/demos/autocomplete' },
      { label: 'Button', path: '/dev/demos/button' },
      { label: 'Button Group', path: '/dev/demos/button-group' },
      { label: 'Checkbox', path: '/dev/demos/checkbox' },
      { label: 'Date', path: '/dev/demos/date' },
      { label: 'File Dropzone', path: '/dev/demos/file-dropzone' },
      { label: 'Input Feedback', path: '/dev/demos/input-feedback' },
      { label: 'Input Label', path: '/dev/demos/input-label' },
      { label: 'Number Input', path: '/dev/demos/number-input' },
      { label: 'Radio', path: '/dev/demos/radio' },
      { label: 'Rating', path: '/dev/demos/rating' },
      { label: 'Select', path: '/dev/demos/select' },
      { label: 'Slider', path: '/dev/demos/slider' },
      { label: 'Switch', path: '/dev/demos/switch' },
      { label: 'Text Input', path: '/dev/demos/text-input' },
      { label: 'Textarea', path: '/dev/demos/textarea' },
      { label: 'Time Input', path: '/dev/demos/time-input' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Accordion', path: '/dev/demos/accordion' },
      { label: 'Card', path: '/dev/demos/card' },
      { label: 'Handle', path: '/dev/demos/handle' },
      { label: 'Panel', path: '/dev/demos/panel' },
      { label: 'Toolbar', path: '/dev/demos/toolbar' },
      { label: 'Utility Panel', path: '/dev/demos/utility-panel' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Breadcrumbs', path: '/dev/demos/breadcrumbs' },
      { label: 'Dropdown Menu', path: '/dev/demos/dropdown' },
      { label: 'Menu', path: '/dev/demos/menu' },
      { label: 'Navbar', path: '/dev/demos/navbar' },
      { label: 'Pagination', path: '/dev/demos/pagination' },
      { label: 'Side Navigation', path: '/dev/demos/side-navigation' },
      { label: 'Stepper', path: '/dev/demos/stepper' },
      { label: 'Tabs', path: '/dev/demos/tabs' },
    ],
  },
  {
    label: 'Display',
    items: [
      { label: 'Avatar', path: '/dev/demos/avatar' },
      { label: 'Badge', path: '/dev/demos/badge' },
      { label: 'Chip', path: '/dev/demos/chip' },
      { label: 'Icon', path: '/dev/demos/icon' },
      { label: 'Logo', path: '/dev/demos/logo' },
      { label: 'Theme Switcher', path: '/dev/demos/theme-switcher' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { label: 'Alert', path: '/dev/demos/alert' },
      { label: 'Loader', path: '/dev/demos/loader' },
      { label: 'Progress', path: '/dev/demos/progress' },
      { label: 'Skeleton', path: '/dev/demos/skeleton' },
      { label: 'Toast', path: '/dev/demos/toast' },
      { label: 'Tooltip', path: '/dev/demos/tooltip' },
    ],
  },
  {
    label: 'Overlays',
    items: [{ label: 'Modal', path: '/dev/demos/modal' }],
  },
  {
    label: 'Data',
    items: [{ label: 'Table', path: '/dev/demos/table' }],
  },
];

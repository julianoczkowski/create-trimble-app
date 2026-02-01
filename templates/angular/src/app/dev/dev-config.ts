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
 * Categories and items are sorted alphabetically.
 */
export const demoCategories: DevNavCategory[] = [
  {
    label: 'Display',
    items: [
      { label: 'Avatar', path: '/dev/demos/avatar' },
      { label: 'Badge', path: '/dev/demos/badge' },
      { label: 'Chip', path: '/dev/demos/chip' },
      { label: 'Icon', path: '/dev/demos/icon' },
      { label: 'Logo', path: '/dev/demos/logo' },
      { label: 'Pagination', path: '/dev/demos/pagination' },
      { label: 'Skeleton', path: '/dev/demos/skeleton' },
      { label: 'Stepper', path: '/dev/demos/stepper' },
      { label: 'Table', path: '/dev/demos/table' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { label: 'Alert', path: '/dev/demos/alert' },
      { label: 'Handle', path: '/dev/demos/handle' },
      { label: 'Input Feedback', path: '/dev/demos/input-feedback' },
      { label: 'Input Label', path: '/dev/demos/input-label' },
      { label: 'Loader', path: '/dev/demos/loader' },
      { label: 'Modal', path: '/dev/demos/modal' },
      { label: 'Progress', path: '/dev/demos/progress' },
      { label: 'Rating', path: '/dev/demos/rating' },
      { label: 'Toast', path: '/dev/demos/toast' },
      { label: 'Tooltip', path: '/dev/demos/tooltip' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Autocomplete', path: '/dev/demos/autocomplete' },
      { label: 'Button', path: '/dev/demos/button' },
      { label: 'Button Group', path: '/dev/demos/button-group' },
      { label: 'Checkbox', path: '/dev/demos/checkbox' },
      { label: 'Date', path: '/dev/demos/date' },
      { label: 'Dropdown', path: '/dev/demos/dropdown' },
      { label: 'File Dropzone', path: '/dev/demos/file-dropzone' },
      { label: 'Number Input', path: '/dev/demos/number-input' },
      { label: 'Radio', path: '/dev/demos/radio' },
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
      { label: 'Panel', path: '/dev/demos/panel' },
      { label: 'Utility Panel', path: '/dev/demos/utility-panel' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Breadcrumbs', path: '/dev/demos/breadcrumbs' },
      { label: 'Menu', path: '/dev/demos/menu' },
      { label: 'Navbar', path: '/dev/demos/navbar' },
      { label: 'Side Navigation', path: '/dev/demos/side-navigation' },
      { label: 'Tabs', path: '/dev/demos/tabs' },
      { label: 'Toolbar', path: '/dev/demos/toolbar' },
    ],
  },
  {
    label: 'System',
    items: [{ label: 'Theme Switcher', path: '/dev/demos/theme-switcher' }],
  },
];

import { lazy } from "react";

/**
 * Route configuration for demo pages using React lazy loading.
 *
 * This configuration defines all demo page routes with lazy-loaded components
 * to improve initial bundle size and performance. Each route object contains
 * a path and a lazy-loaded component that will be loaded on-demand when
 * the route is accessed.
 *
 * The lazy loading pattern helps reduce the initial JavaScript bundle size
 * by splitting demo pages into separate chunks that are only loaded when needed.
 *
 * @example
 * // Adding a new demo route
 * {
 *   path: "/demos/new-component-demo",
 *   component: lazy(() => import("../demos/new-component-demo/page")),
 * }
 *
 * @example
 * // Using in router configuration
 * {demoRoutes.map(({ path, component: Component }) => (
 *   <Route key={path} path={path} element={<Component />} />
 * ))}
 *
 * @see {@link https://react.dev/reference/react/lazy} - React lazy loading documentation
 */
export const demoRoutes = [
  {
    path: "/demos/button-demo",
    component: lazy(() => import("../demos/button-demo/page")),
  },
  {
    path: "/demos/accordion-demo",
    component: lazy(() => import("../demos/accordion-demo/page")),
  },
  {
    path: "/demos/alert-demo",
    component: lazy(() => import("../demos/alert-demo/page")),
  },
  {
    path: "/demos/autocomplete-demo",
    component: lazy(() => import("../demos/autocomplete-demo/page")),
  },
  {
    path: "/demos/avatar-demo",
    component: lazy(() => import("../demos/avatar-demo/page")),
  },
  {
    path: "/demos/badge-demo",
    component: lazy(() => import("../demos/badge-demo/page")),
  },
  {
    path: "/demos/breadcrumbs-demo",
    component: lazy(() => import("../demos/breadcrumbs-demo/page")),
  },
  {
    path: "/demos/card-demo",
    component: lazy(() => import("../demos/card-demo/page")),
  },
  {
    path: "/demos/checkbox-demo",
    component: lazy(() => import("../demos/checkbox-demo/page")),
  },
  {
    path: "/demos/chip-demo",
    component: lazy(() => import("../demos/chip-demo/page")),
  },
  {
    path: "/demos/date-demo",
    component: lazy(() => import("../demos/date-demo/page")),
  },
  {
    path: "/demos/divider-demo",
    component: lazy(() => import("../demos/divider-demo/page")),
  },
  {
    path: "/demos/dropdown-demo",
    component: lazy(() => import("../demos/dropdown-demo/page")),
  },
  {
    path: "/demos/icon-demo",
    component: lazy(() => import("../demos/icon-demo/page")),
  },
  {
    path: "/demos/input-feedback-demo",
    component: lazy(() => import("../demos/input-feedback-demo/page")),
  },
  {
    path: "/demos/input-label-demo",
    component: lazy(() => import("../demos/input-label-demo/page")),
  },
  {
    path: "/demos/loader-demo",
    component: lazy(() => import("../demos/loader-demo/page")),
  },
  {
    path: "/demos/menu-demo",
    component: lazy(() => import("../demos/menu-demo/page")),
  },
  {
    path: "/demos/modal-demo",
    component: lazy(() => import("../demos/modal-demo/page")),
  },
  {
    path: "/demos/navbar-demo",
    component: lazy(() => import("../demos/navbar-demo/page")),
  },
  {
    path: "/demos/number-input-demo",
    component: lazy(() => import("../demos/number-input-demo/page")),
  },
  {
    path: "/demos/pagination-demo",
    component: lazy(() => import("../demos/pagination-demo/page")),
  },
  {
    path: "/demos/progress-demo",
    component: lazy(() => import("../demos/progress-demo/page")),
  },
  {
    path: "/demos/radio-demo",
    component: lazy(() => import("../demos/radio-demo/page")),
  },
  {
    path: "/demos/rating-demo",
    component: lazy(() => import("../demos/rating-demo/page")),
  },
  {
    path: "/demos/select-demo",
    component: lazy(() => import("../demos/select-demo/page")),
  },
  {
    path: "/demos/side-navigation-demo",
    component: lazy(() => import("../demos/side-navigation-demo/page")),
  },
  {
    path: "/demos/skeleton-demo",
    component: lazy(() => import("../demos/skeleton-demo/page")),
  },
  {
    path: "/demos/slider-demo",
    component: lazy(() => import("../demos/slider-demo/page")),
  },
  {
    path: "/demos/stepper-demo",
    component: lazy(() => import("../demos/stepper-demo/page")),
  },
  {
    path: "/demos/switch-demo",
    component: lazy(() => import("../demos/switch-demo/page")),
  },
  {
    path: "/demos/table-demo",
    component: lazy(() => import("../demos/table-demo/page")),
  },
  {
    path: "/demos/tabs-demo",
    component: lazy(() => import("../demos/tabs-demo/page")),
  },
  {
    path: "/demos/textarea-demo",
    component: lazy(() => import("../demos/textarea-demo/page")),
  },
  {
    path: "/demos/text-input-demo",
    component: lazy(() => import("../demos/text-input-demo/page")),
  },
  {
    path: "/demos/theme-switcher-demo",
    component: lazy(() => import("../demos/theme-switcher-demo/page")),
  },
  {
    path: "/demos/time-input-demo",
    component: lazy(() => import("../demos/time-input-demo/page")),
  },
  {
    path: "/demos/toast-demo",
    component: lazy(() => import("../demos/toast-demo/page")),
  },
  {
    path: "/demos/toolbar-demo",
    component: lazy(() => import("../demos/toolbar-demo/page")),
  },
  {
    path: "/demos/tooltip-demo",
    component: lazy(() => import("../demos/tooltip-demo/page")),
  },
  {
    path: "/demos/utility-panel-demo",
    component: lazy(() => import("../demos/utility-panel-demo/page")),
  },
];

import { lazy } from "react";

/**
 * Route configuration for demo pages using React lazy loading.
 *
 * NOTE: This file is deprecated. Demo routes are now handled by DevRoutes.tsx
 * under the /dev/ prefix. This file is kept for reference only.
 *
 * The lazy loading pattern helps reduce the initial JavaScript bundle size
 * by splitting demo pages into separate chunks that are only loaded when needed.
 *
 * @deprecated Use DevRoutes component from src/dev/ instead
 * @see {@link https://react.dev/reference/react/lazy} - React lazy loading documentation
 */
export const demoRoutes = [
  {
    path: "/dev/demos/button-demo",
    component: lazy(() => import("../demos/button-demo/page")),
  },
  {
    path: "/dev/demos/button-group-demo",
    component: lazy(() => import("../demos/button-group-demo/page")),
  },
  {
    path: "/dev/demos/accordion-demo",
    component: lazy(() => import("../demos/accordion-demo/page")),
  },
  {
    path: "/dev/demos/alert-demo",
    component: lazy(() => import("../demos/alert-demo/page")),
  },
  {
    path: "/dev/demos/autocomplete-demo",
    component: lazy(() => import("../demos/autocomplete-demo/page")),
  },
  {
    path: "/dev/demos/avatar-demo",
    component: lazy(() => import("../demos/avatar-demo/page")),
  },
  {
    path: "/dev/demos/badge-demo",
    component: lazy(() => import("../demos/badge-demo/page")),
  },
  {
    path: "/dev/demos/breadcrumbs-demo",
    component: lazy(() => import("../demos/breadcrumbs-demo/page")),
  },
  {
    path: "/dev/demos/card-demo",
    component: lazy(() => import("../demos/card-demo/page")),
  },
  {
    path: "/dev/demos/checkbox-demo",
    component: lazy(() => import("../demos/checkbox-demo/page")),
  },
  {
    path: "/dev/demos/chip-demo",
    component: lazy(() => import("../demos/chip-demo/page")),
  },
  {
    path: "/dev/demos/date-demo",
    component: lazy(() => import("../demos/date-demo/page")),
  },
  {
    path: "/dev/demos/dropdown-demo",
    component: lazy(() => import("../demos/dropdown-demo/page")),
  },
  {
    path: "/dev/demos/file-dropzone-demo",
    component: lazy(() => import("../demos/file-dropzone-demo/page")),
  },
  {
    path: "/dev/demos/handle-demo",
    component: lazy(() => import("../demos/handle-demo/page")),
  },
  {
    path: "/dev/demos/icon-demo",
    component: lazy(() => import("../demos/icon-demo/page")),
  },
  {
    path: "/dev/demos/input-feedback-demo",
    component: lazy(() => import("../demos/input-feedback-demo/page")),
  },
  {
    path: "/dev/demos/input-label-demo",
    component: lazy(() => import("../demos/input-label-demo/page")),
  },
  {
    path: "/dev/demos/loader-demo",
    component: lazy(() => import("../demos/loader-demo/page")),
  },
  {
    path: "/dev/demos/logo-demo",
    component: lazy(() => import("../demos/logo-demo/page")),
  },
  {
    path: "/dev/demos/menu-demo",
    component: lazy(() => import("../demos/menu-demo/page")),
  },
  {
    path: "/dev/demos/modal-demo",
    component: lazy(() => import("../demos/modal-demo/page")),
  },
  {
    path: "/dev/demos/navbar-demo",
    component: lazy(() => import("../demos/navbar-demo/page")),
  },
  {
    path: "/dev/demos/number-input-demo",
    component: lazy(() => import("../demos/number-input-demo/page")),
  },
  {
    path: "/dev/demos/pagination-demo",
    component: lazy(() => import("../demos/pagination-demo/page")),
  },
  {
    path: "/dev/demos/panel-demo",
    component: lazy(() => import("../demos/panel-demo/page")),
  },
  {
    path: "/dev/demos/progress-demo",
    component: lazy(() => import("../demos/progress-demo/page")),
  },
  {
    path: "/dev/demos/radio-demo",
    component: lazy(() => import("../demos/radio-demo/page")),
  },
  {
    path: "/dev/demos/rating-demo",
    component: lazy(() => import("../demos/rating-demo/page")),
  },
  {
    path: "/dev/demos/select-demo",
    component: lazy(() => import("../demos/select-demo/page")),
  },
  {
    path: "/dev/demos/side-navigation-demo",
    component: lazy(() => import("../demos/side-navigation-demo/page")),
  },
  {
    path: "/dev/demos/skeleton-demo",
    component: lazy(() => import("../demos/skeleton-demo/page")),
  },
  {
    path: "/dev/demos/slider-demo",
    component: lazy(() => import("../demos/slider-demo/page")),
  },
  {
    path: "/dev/demos/stepper-demo",
    component: lazy(() => import("../demos/stepper-demo/page")),
  },
  {
    path: "/dev/demos/switch-demo",
    component: lazy(() => import("../demos/switch-demo/page")),
  },
  {
    path: "/dev/demos/table-demo",
    component: lazy(() => import("../demos/table-demo/page")),
  },
  {
    path: "/dev/demos/tabs-demo",
    component: lazy(() => import("../demos/tabs-demo/page")),
  },
  {
    path: "/dev/demos/textarea-demo",
    component: lazy(() => import("../demos/textarea-demo/page")),
  },
  {
    path: "/dev/demos/text-input-demo",
    component: lazy(() => import("../demos/text-input-demo/page")),
  },
  {
    path: "/dev/demos/theme-switcher-demo",
    component: lazy(() => import("../demos/theme-switcher-demo/page")),
  },
  {
    path: "/dev/demos/time-input-demo",
    component: lazy(() => import("../demos/time-input-demo/page")),
  },
  {
    path: "/dev/demos/toast-demo",
    component: lazy(() => import("../demos/toast-demo/page")),
  },
  {
    path: "/dev/demos/toolbar-demo",
    component: lazy(() => import("../demos/toolbar-demo/page")),
  },
  {
    path: "/dev/demos/tooltip-demo",
    component: lazy(() => import("../demos/tooltip-demo/page")),
  },
  {
    path: "/dev/demos/utility-panel-demo",
    component: lazy(() => import("../demos/utility-panel-demo/page")),
  },
];

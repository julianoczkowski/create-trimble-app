import { lazy } from "solid-js";

/**
 * Route configuration for demo pages using SolidJS lazy loading.
 *
 * NOTE: Routes are defined inline in App.tsx. This file provides
 * lazy-loaded component references for the demo pages.
 *
 * @see {@link https://www.solidjs.com/docs/latest#lazy} - SolidJS lazy loading
 */
export const demoRouteComponents = {
  colorPalette: lazy(() => import("../dev-pages/ColorPalettePage")),
  icons: lazy(() => import("../dev-pages/IconsPage")),
  componentsGallery: lazy(() => import("../dev-pages/ComponentsGalleryPage")),
};

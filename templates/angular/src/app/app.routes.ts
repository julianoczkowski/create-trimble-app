import { Routes } from '@angular/router';
import { environment } from '../environments/environment.development';

/**
 * Application routes.
 *
 * Structure:
 * - / : User's home page
 * - /dev/* : Development routes (only available when devPanel is enabled)
 *   - /dev/colors : Color palette reference
 *   - /dev/icons : Icon library browser
 *   - /dev/components : Component gallery
 *   - /dev/demos/* : Individual component demos
 *
 * Getting Started:
 * 1. Add your application routes below the home route
 * 2. Use Ctrl+Shift+D to open the Dev Panel for component reference
 * 3. Dev routes are automatically excluded from production builds
 */
export const routes: Routes = [
  // User routes - add your application routes here
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },

  // Dev routes - conditionally added based on environment
  ...(environment.devPanel
    ? [
        {
          path: 'dev',
          children: [
            { path: '', redirectTo: 'components', pathMatch: 'full' as const },
            {
              path: 'colors',
              loadComponent: () =>
                import('./dev-pages/color-palette/color-palette.component').then(
                  (m) => m.ColorPaletteComponent,
                ),
              title: 'Colors',
            },
            {
              path: 'icons',
              loadComponent: () =>
                import('./dev-pages/icons/icons.component').then((m) => m.IconsComponent),
              title: 'Icons',
            },
            {
              path: 'components',
              loadComponent: () =>
                import('./dev-pages/components-gallery/components-gallery.component').then(
                  (m) => m.ComponentsGalleryComponent,
                ),
              title: 'Components',
            },
            // Component demos
            {
              path: 'demos/accordion',
              loadComponent: () =>
                import('./demos/accordion/accordion-demo.component').then(
                  (m) => m.AccordionDemoPageComponent,
                ),
            },
            {
              path: 'demos/alert',
              loadComponent: () =>
                import('./demos/alert/alert-demo.component').then((m) => m.AlertDemoPageComponent),
            },
            {
              path: 'demos/autocomplete',
              loadComponent: () =>
                import('./demos/autocomplete/autocomplete-demo.component').then(
                  (m) => m.AutocompleteDemoPageComponent,
                ),
            },
            {
              path: 'demos/avatar',
              loadComponent: () =>
                import('./demos/avatar/avatar-demo.component').then(
                  (m) => m.AvatarDemoPageComponent,
                ),
            },
            {
              path: 'demos/badge',
              loadComponent: () =>
                import('./demos/badge/badge-demo.component').then((m) => m.BadgeDemoPageComponent),
            },
            {
              path: 'demos/breadcrumbs',
              loadComponent: () =>
                import('./demos/breadcrumbs/breadcrumbs-demo.component').then(
                  (m) => m.BreadcrumbsDemoPageComponent,
                ),
            },
            {
              path: 'demos/button',
              loadComponent: () =>
                import('./demos/button/button-demo.component').then(
                  (m) => m.ButtonDemoPageComponent,
                ),
            },
            {
              path: 'demos/button-group',
              loadComponent: () =>
                import('./demos/button-group/button-group-demo.component').then(
                  (m) => m.ButtonGroupDemoPageComponent,
                ),
            },
            {
              path: 'demos/card',
              loadComponent: () =>
                import('./demos/card/card-demo.component').then((m) => m.CardDemoPageComponent),
            },
            {
              path: 'demos/checkbox',
              loadComponent: () =>
                import('./demos/checkbox/checkbox-demo.component').then(
                  (m) => m.CheckboxDemoPageComponent,
                ),
            },
            {
              path: 'demos/chip',
              loadComponent: () =>
                import('./demos/chip/chip-demo.component').then((m) => m.ChipDemoPageComponent),
            },
            {
              path: 'demos/date',
              loadComponent: () =>
                import('./demos/date/date-demo.component').then((m) => m.DateDemoPageComponent),
            },
            {
              path: 'demos/dropdown',
              loadComponent: () =>
                import('./demos/dropdown/dropdown-demo.component').then(
                  (m) => m.DropdownDemoPageComponent,
                ),
            },
            {
              path: 'demos/file-dropzone',
              loadComponent: () =>
                import('./demos/file-dropzone/file-dropzone-demo.component').then(
                  (m) => m.FileDropzoneDemoPageComponent,
                ),
            },
            {
              path: 'demos/handle',
              loadComponent: () =>
                import('./demos/handle/handle-demo.component').then(
                  (m) => m.HandleDemoPageComponent,
                ),
            },
            {
              path: 'demos/icon',
              loadComponent: () =>
                import('./demos/icon/icon-demo.component').then((m) => m.IconDemoPageComponent),
            },
            {
              path: 'demos/input-feedback',
              loadComponent: () =>
                import('./demos/input-feedback/input-feedback-demo.component').then(
                  (m) => m.InputFeedbackDemoPageComponent,
                ),
            },
            {
              path: 'demos/input-label',
              loadComponent: () =>
                import('./demos/input-label/input-label-demo.component').then(
                  (m) => m.InputLabelDemoPageComponent,
                ),
            },
            {
              path: 'demos/loader',
              loadComponent: () =>
                import('./demos/loader/loader-demo.component').then(
                  (m) => m.LoaderDemoPageComponent,
                ),
            },
            {
              path: 'demos/logo',
              loadComponent: () =>
                import('./demos/logo/logo-demo.component').then(
                  (m) => m.LogoDemoPageComponent,
                ),
            },
            {
              path: 'demos/menu',
              loadComponent: () =>
                import('./demos/menu/menu-demo.component').then((m) => m.MenuDemoPageComponent),
            },
            {
              path: 'demos/modal',
              loadComponent: () =>
                import('./demos/modal/modal-demo.component').then((m) => m.ModalDemoPageComponent),
            },
            {
              path: 'demos/navbar',
              loadComponent: () =>
                import('./demos/navbar/navbar-demo.component').then(
                  (m) => m.NavbarDemoPageComponent,
                ),
            },
            {
              path: 'demos/number-input',
              loadComponent: () =>
                import('./demos/number-input/number-input-demo.component').then(
                  (m) => m.NumberInputDemoPageComponent,
                ),
            },
            {
              path: 'demos/pagination',
              loadComponent: () =>
                import('./demos/pagination/pagination-demo.component').then(
                  (m) => m.PaginationDemoPageComponent,
                ),
            },
            {
              path: 'demos/panel',
              loadComponent: () =>
                import('./demos/panel/panel-demo.component').then((m) => m.PanelDemoPageComponent),
            },
            {
              path: 'demos/progress',
              loadComponent: () =>
                import('./demos/progress/progress-demo.component').then(
                  (m) => m.ProgressDemoPageComponent,
                ),
            },
            {
              path: 'demos/radio',
              loadComponent: () =>
                import('./demos/radio/radio-demo.component').then((m) => m.RadioDemoPageComponent),
            },
            {
              path: 'demos/rating',
              loadComponent: () =>
                import('./demos/rating/rating-demo.component').then(
                  (m) => m.RatingDemoPageComponent,
                ),
            },
            {
              path: 'demos/select',
              loadComponent: () =>
                import('./demos/select/select-demo.component').then(
                  (m) => m.SelectDemoPageComponent,
                ),
            },
            {
              path: 'demos/side-navigation',
              loadComponent: () =>
                import('./demos/side-navigation/side-navigation-demo.component').then(
                  (m) => m.SideNavigationDemoPageComponent,
                ),
            },
            {
              path: 'demos/skeleton',
              loadComponent: () =>
                import('./demos/skeleton/skeleton-demo.component').then(
                  (m) => m.SkeletonDemoPageComponent,
                ),
            },
            {
              path: 'demos/slider',
              loadComponent: () =>
                import('./demos/slider/slider-demo.component').then(
                  (m) => m.SliderDemoPageComponent,
                ),
            },
            {
              path: 'demos/stepper',
              loadComponent: () =>
                import('./demos/stepper/stepper-demo.component').then(
                  (m) => m.StepperDemoPageComponent,
                ),
            },
            {
              path: 'demos/switch',
              loadComponent: () =>
                import('./demos/switch/switch-demo.component').then(
                  (m) => m.SwitchDemoPageComponent,
                ),
            },
            {
              path: 'demos/table',
              loadComponent: () =>
                import('./demos/table/table-demo.component').then((m) => m.TableDemoPageComponent),
            },
            {
              path: 'demos/tabs',
              loadComponent: () =>
                import('./demos/tabs/tabs-demo.component').then((m) => m.TabsDemoPageComponent),
            },
            {
              path: 'demos/textarea',
              loadComponent: () =>
                import('./demos/textarea/textarea-demo.component').then(
                  (m) => m.TextareaDemoPageComponent,
                ),
            },
            {
              path: 'demos/text-input',
              loadComponent: () =>
                import('./demos/text-input/text-input-demo.component').then(
                  (m) => m.TextInputDemoPageComponent,
                ),
            },
            {
              path: 'demos/theme-switcher',
              loadComponent: () =>
                import('./demos/theme-switcher/theme-switcher-demo.component').then(
                  (m) => m.ThemeSwitcherDemoPageComponent,
                ),
            },
            {
              path: 'demos/time-input',
              loadComponent: () =>
                import('./demos/time-input/time-input-demo.component').then(
                  (m) => m.TimeInputDemoPageComponent,
                ),
            },
            {
              path: 'demos/toast',
              loadComponent: () =>
                import('./demos/toast/toast-demo.component').then((m) => m.ToastDemoPageComponent),
            },
            {
              path: 'demos/toolbar',
              loadComponent: () =>
                import('./demos/toolbar/toolbar-demo.component').then(
                  (m) => m.ToolbarDemoPageComponent,
                ),
            },
            {
              path: 'demos/tooltip',
              loadComponent: () =>
                import('./demos/tooltip/tooltip-demo.component').then(
                  (m) => m.TooltipDemoPageComponent,
                ),
            },
            {
              path: 'demos/utility-panel',
              loadComponent: () =>
                import('./demos/utility-panel/utility-panel-demo.component').then(
                  (m) => m.UtilityPanelDemoPageComponent,
                ),
            },
          ],
        },
      ]
    : []),
];

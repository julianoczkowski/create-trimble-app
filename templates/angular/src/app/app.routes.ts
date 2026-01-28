import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/home-page.component').then((m) => m.HomePageComponent),
    title: 'Home',
  },
  {
    path: 'colors',
    loadComponent: () =>
      import('./components/pages/colors-page.component').then((m) => m.ColorsPageComponent),
    title: 'Colors',
  },
  {
    path: 'icons',
    loadComponent: () =>
      import('./components/pages/icons-page.component').then((m) => m.IconsPageComponent),
    title: 'Icons',
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./components/pages/components-page.component').then((m) => m.ComponentsPageComponent),
    title: 'Components',
  },
  {
    path: 'theme-demo',
    loadComponent: () =>
      import('./components/theme-demo.component').then((m) => m.ThemeDemoComponent),
  },
  {
    path: 'button-demo',
    loadComponent: () =>
      import('./components/demos/button-demo-page.component').then(
        (m) => m.ButtonDemoPageComponent
      ),
  },
  {
    path: 'demos',
    loadComponent: () =>
      import('./components/demos/demos-page.component').then((m) => m.DemosPageComponent),
    title: 'Component Demos',
  },
  {
    path: 'demos/accordion',
    loadComponent: () =>
      import('./components/demos/accordion-demo-page.component').then(
        (m) => m.AccordionDemoPageComponent
      ),
  },
  {
    path: 'demos/alert',
    loadComponent: () =>
      import('./components/demos/alert-demo-page.component').then((m) => m.AlertDemoPageComponent),
  },
  {
    path: 'demos/autocomplete',
    loadComponent: () =>
      import('./components/demos/autocomplete-demo-page.component').then(
        (m) => m.AutocompleteDemoPageComponent
      ),
  },
  {
    path: 'demos/avatar',
    loadComponent: () =>
      import('./components/demos/avatar-demo-page.component').then(
        (m) => m.AvatarDemoPageComponent
      ),
  },
  {
    path: 'demos/badge',
    loadComponent: () =>
      import('./components/demos/badge-demo-page.component').then((m) => m.BadgeDemoPageComponent),
  },
  {
    path: 'demos/breadcrumbs',
    loadComponent: () =>
      import('./components/demos/breadcrumbs-demo-page.component').then(
        (m) => m.BreadcrumbsDemoPageComponent
      ),
  },
  {
    path: 'demos/card',
    loadComponent: () =>
      import('./components/demos/card-demo-page.component').then((m) => m.CardDemoPageComponent),
  },
  {
    path: 'demos/checkbox',
    loadComponent: () =>
      import('./components/demos/checkbox-demo-page.component').then(
        (m) => m.CheckboxDemoPageComponent
      ),
  },
  {
    path: 'demos/chip',
    loadComponent: () =>
      import('./components/demos/chip-demo-page.component').then((m) => m.ChipDemoPageComponent),
  },
  {
    path: 'demos/date',
    loadComponent: () =>
      import('./components/demos/date-demo-page.component').then((m) => m.DateDemoPageComponent),
  },
  {
    path: 'demos/divider',
    loadComponent: () =>
      import('./components/demos/divider-demo-page.component').then(
        (m) => m.DividerDemoPageComponent
      ),
  },
  {
    path: 'demos/dropdown',
    loadComponent: () =>
      import('./components/demos/dropdown-demo-page.component').then(
        (m) => m.DropdownDemoPageComponent
      ),
  },
  {
    path: 'demos/icon',
    loadComponent: () =>
      import('./components/demos/icon-demo-page.component').then((m) => m.IconDemoPageComponent),
  },
  {
    path: 'demos/input-feedback',
    loadComponent: () =>
      import('./components/demos/input-feedback-demo-page.component').then(
        (m) => m.InputFeedbackDemoPageComponent
      ),
  },
  {
    path: 'demos/input-label',
    loadComponent: () =>
      import('./components/demos/input-label-demo-page.component').then(
        (m) => m.InputLabelDemoPageComponent
      ),
  },
  {
    path: 'demos/loader',
    loadComponent: () =>
      import('./components/demos/loader-demo-page.component').then(
        (m) => m.LoaderDemoPageComponent
      ),
  },
  {
    path: 'demos/menu',
    loadComponent: () =>
      import('./components/demos/menu-demo-page.component').then((m) => m.MenuDemoPageComponent),
  },
  {
    path: 'demos/modal',
    loadComponent: () =>
      import('./components/demos/modal-demo-page.component').then((m) => m.ModalDemoPageComponent),
  },
  {
    path: 'demos/navbar',
    loadComponent: () =>
      import('./components/demos/navbar-demo-page.component').then(
        (m) => m.NavbarDemoPageComponent
      ),
  },
  {
    path: 'demos/number-input',
    loadComponent: () =>
      import('./components/demos/number-input-demo-page.component').then(
        (m) => m.NumberInputDemoPageComponent
      ),
  },
  {
    path: 'demos/pagination',
    loadComponent: () =>
      import('./components/demos/pagination-demo-page.component').then(
        (m) => m.PaginationDemoPageComponent
      ),
  },
  {
    path: 'demos/progress',
    loadComponent: () =>
      import('./components/demos/progress-demo-page.component').then(
        (m) => m.ProgressDemoPageComponent
      ),
  },
  {
    path: 'demos/radio',
    loadComponent: () =>
      import('./components/demos/radio-demo-page.component').then((m) => m.RadioDemoPageComponent),
  },
  {
    path: 'demos/rating',
    loadComponent: () =>
      import('./components/demos/rating-demo-page.component').then(
        (m) => m.RatingDemoPageComponent
      ),
  },
  {
    path: 'demos/select',
    loadComponent: () =>
      import('./components/demos/select-demo-page.component').then(
        (m) => m.SelectDemoPageComponent
      ),
  },
  {
    path: 'demos/skeleton',
    loadComponent: () =>
      import('./components/demos/skeleton-demo-page.component').then(
        (m) => m.SkeletonDemoPageComponent
      ),
  },
  {
    path: 'demos/slider',
    loadComponent: () =>
      import('./components/demos/slider-demo-page.component').then(
        (m) => m.SliderDemoPageComponent
      ),
  },
  {
    path: 'demos/stepper',
    loadComponent: () =>
      import('./components/demos/stepper-demo-page.component').then(
        (m) => m.StepperDemoPageComponent
      ),
  },
  {
    path: 'demos/switch',
    loadComponent: () =>
      import('./components/demos/switch-demo-page.component').then(
        (m) => m.SwitchDemoPageComponent
      ),
  },
  {
    path: 'demos/text-input',
    loadComponent: () =>
      import('./components/demos/text-input-demo-page.component').then(
        (m) => m.TextInputDemoPageComponent
      ),
  },
  {
    path: 'demos/textarea',
    loadComponent: () =>
      import('./components/demos/textarea-demo-page.component').then(
        (m) => m.TextareaDemoPageComponent
      ),
  },
  {
    path: 'demos/time-input',
    loadComponent: () =>
      import('./components/demos/time-input-demo-page.component').then(
        (m) => m.TimeInputDemoPageComponent
      ),
  },
  {
    path: 'demos/side-navigation',
    loadComponent: () =>
      import('./components/demos/side-navigation-demo-page.component').then(
        (m) => m.SideNavigationDemoPageComponent
      ),
  },
  {
    path: 'demos/tooltip',
    loadComponent: () =>
      import('./components/demos/tooltip-demo-page.component').then(
        (m) => m.TooltipDemoPageComponent
      ),
  },
];

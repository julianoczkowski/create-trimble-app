import { Router, Route } from "@solidjs/router";
import { ThemeProvider } from "./contexts/ThemeContext";
import ModusProvider from "./components/ModusProvider";
import { DevPanelProvider, DevPanel, isDevPanelEnabled } from "./dev";

import HomePage from "./pages/HomePage";
import { lazy } from "solid-js";

const ColorPalettePage = lazy(() => import("./dev-pages/ColorPalettePage"));
const IconsPage = lazy(() => import("./dev-pages/IconsPage"));
const ComponentsGalleryPage = lazy(
  () => import("./dev-pages/ComponentsGalleryPage"),
);

const ButtonDemo = lazy(() => import("./demos/button-demo/page"));
const ButtonGroupDemo = lazy(() => import("./demos/button-group-demo/page"));
const AccordionDemo = lazy(() => import("./demos/accordion-demo/page"));
const AlertDemo = lazy(() => import("./demos/alert-demo/page"));
const AutocompleteDemo = lazy(() => import("./demos/autocomplete-demo/page"));
const AvatarDemo = lazy(() => import("./demos/avatar-demo/page"));
const BadgeDemo = lazy(() => import("./demos/badge-demo/page"));
const BreadcrumbsDemo = lazy(() => import("./demos/breadcrumbs-demo/page"));
const CardDemo = lazy(() => import("./demos/card-demo/page"));
const CheckboxDemo = lazy(() => import("./demos/checkbox-demo/page"));
const ChipDemo = lazy(() => import("./demos/chip-demo/page"));
const DateDemo = lazy(() => import("./demos/date-demo/page"));
const DropdownDemo = lazy(() => import("./demos/dropdown-demo/page"));
const FileDropzoneDemo = lazy(
  () => import("./demos/file-dropzone-demo/page"),
);
const HandleDemo = lazy(() => import("./demos/handle-demo/page"));
const IconDemo = lazy(() => import("./demos/icon-demo/page"));
const InputFeedbackDemo = lazy(
  () => import("./demos/input-feedback-demo/page"),
);
const InputLabelDemo = lazy(() => import("./demos/input-label-demo/page"));
const LoaderDemo = lazy(() => import("./demos/loader-demo/page"));
const LogoDemo = lazy(() => import("./demos/logo-demo/page"));
const MenuDemo = lazy(() => import("./demos/menu-demo/page"));
const ModalDemo = lazy(() => import("./demos/modal-demo/page"));
const NavbarDemo = lazy(() => import("./demos/navbar-demo/page"));
const NumberInputDemo = lazy(() => import("./demos/number-input-demo/page"));
const PaginationDemo = lazy(() => import("./demos/pagination-demo/page"));
const PanelDemo = lazy(() => import("./demos/panel-demo/page"));
const ProgressDemo = lazy(() => import("./demos/progress-demo/page"));
const RadioDemo = lazy(() => import("./demos/radio-demo/page"));
const RatingDemo = lazy(() => import("./demos/rating-demo/page"));
const SelectDemo = lazy(() => import("./demos/select-demo/page"));
const SideNavigationDemo = lazy(
  () => import("./demos/side-navigation-demo/page"),
);
const SkeletonDemo = lazy(() => import("./demos/skeleton-demo/page"));
const SliderDemo = lazy(() => import("./demos/slider-demo/page"));
const StepperDemo = lazy(() => import("./demos/stepper-demo/page"));
const SwitchDemo = lazy(() => import("./demos/switch-demo/page"));
const TableDemo = lazy(() => import("./demos/table-demo/page"));
const TabsDemo = lazy(() => import("./demos/tabs-demo/page"));
const TextareaDemo = lazy(() => import("./demos/textarea-demo/page"));
const TextInputDemo = lazy(() => import("./demos/text-input-demo/page"));
const ThemeSwitcherDemo = lazy(
  () => import("./demos/theme-switcher-demo/page"),
);
const TimeInputDemo = lazy(() => import("./demos/time-input-demo/page"));
const ToastDemo = lazy(() => import("./demos/toast-demo/page"));
const ToolbarDemo = lazy(() => import("./demos/toolbar-demo/page"));
const TooltipDemo = lazy(() => import("./demos/tooltip-demo/page"));
const UtilityPanelDemo = lazy(
  () => import("./demos/utility-panel-demo/page"),
);

export default function App() {
  const showDevPanel = isDevPanelEnabled();

  return (
    <ThemeProvider>
      <ModusProvider>
        <DevPanelProvider>
          <Router>
            <Route path="/" component={HomePage} />

            {showDevPanel && (
              <>
                <Route path="/dev/colors" component={ColorPalettePage} />
                <Route path="/dev/icons" component={IconsPage} />
                <Route path="/dev/components" component={ComponentsGalleryPage} />
                <Route path="/dev/demos/button-demo" component={ButtonDemo} />
                <Route path="/dev/demos/button-group-demo" component={ButtonGroupDemo} />
                <Route path="/dev/demos/accordion-demo" component={AccordionDemo} />
                <Route path="/dev/demos/alert-demo" component={AlertDemo} />
                <Route path="/dev/demos/autocomplete-demo" component={AutocompleteDemo} />
                <Route path="/dev/demos/avatar-demo" component={AvatarDemo} />
                <Route path="/dev/demos/badge-demo" component={BadgeDemo} />
                <Route path="/dev/demos/breadcrumbs-demo" component={BreadcrumbsDemo} />
                <Route path="/dev/demos/card-demo" component={CardDemo} />
                <Route path="/dev/demos/checkbox-demo" component={CheckboxDemo} />
                <Route path="/dev/demos/chip-demo" component={ChipDemo} />
                <Route path="/dev/demos/date-demo" component={DateDemo} />
                <Route path="/dev/demos/dropdown-demo" component={DropdownDemo} />
                <Route path="/dev/demos/file-dropzone-demo" component={FileDropzoneDemo} />
                <Route path="/dev/demos/handle-demo" component={HandleDemo} />
                <Route path="/dev/demos/icon-demo" component={IconDemo} />
                <Route path="/dev/demos/input-feedback-demo" component={InputFeedbackDemo} />
                <Route path="/dev/demos/input-label-demo" component={InputLabelDemo} />
                <Route path="/dev/demos/loader-demo" component={LoaderDemo} />
                <Route path="/dev/demos/logo-demo" component={LogoDemo} />
                <Route path="/dev/demos/menu-demo" component={MenuDemo} />
                <Route path="/dev/demos/modal-demo" component={ModalDemo} />
                <Route path="/dev/demos/navbar-demo" component={NavbarDemo} />
                <Route path="/dev/demos/number-input-demo" component={NumberInputDemo} />
                <Route path="/dev/demos/pagination-demo" component={PaginationDemo} />
                <Route path="/dev/demos/panel-demo" component={PanelDemo} />
                <Route path="/dev/demos/progress-demo" component={ProgressDemo} />
                <Route path="/dev/demos/radio-demo" component={RadioDemo} />
                <Route path="/dev/demos/rating-demo" component={RatingDemo} />
                <Route path="/dev/demos/select-demo" component={SelectDemo} />
                <Route path="/dev/demos/side-navigation-demo" component={SideNavigationDemo} />
                <Route path="/dev/demos/skeleton-demo" component={SkeletonDemo} />
                <Route path="/dev/demos/slider-demo" component={SliderDemo} />
                <Route path="/dev/demos/stepper-demo" component={StepperDemo} />
                <Route path="/dev/demos/switch-demo" component={SwitchDemo} />
                <Route path="/dev/demos/table-demo" component={TableDemo} />
                <Route path="/dev/demos/tabs-demo" component={TabsDemo} />
                <Route path="/dev/demos/textarea-demo" component={TextareaDemo} />
                <Route path="/dev/demos/text-input-demo" component={TextInputDemo} />
                <Route path="/dev/demos/theme-switcher-demo" component={ThemeSwitcherDemo} />
                <Route path="/dev/demos/time-input-demo" component={TimeInputDemo} />
                <Route path="/dev/demos/toast-demo" component={ToastDemo} />
                <Route path="/dev/demos/toolbar-demo" component={ToolbarDemo} />
                <Route path="/dev/demos/tooltip-demo" component={TooltipDemo} />
                <Route path="/dev/demos/utility-panel-demo" component={UtilityPanelDemo} />
              </>
            )}
          </Router>
          {showDevPanel && <DevPanel />}
        </DevPanelProvider>
      </ModusProvider>
    </ThemeProvider>
  );
}

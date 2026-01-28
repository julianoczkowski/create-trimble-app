import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusButtonComponent } from './modus-button.component';
import { ModusAlertComponent } from './modus-alert.component';
import { ModusBadgeComponent } from './modus-badge.component';
import { ModusIconComponent } from './modus-icon.component';
import { ModusAccordionComponent } from './modus-accordion.component';
import { ModusCollapseComponent, ICollapseOptions } from './modus-collapse.component';
import { ModusThemeSwitcherComponent } from './modus-theme-switcher.component';
import { ModusAvatarComponent } from './modus-avatar.component';
import { ModusBreadcrumbsComponent } from './modus-breadcrumbs.component';
import { ModusCardComponent } from './modus-card.component';
import { ModusCheckboxComponent } from './modus-checkbox.component';
import { ModusChipComponent } from './modus-chip.component';
import { ModusDateComponent } from './modus-date.component';
import { ModusDividerComponent } from './modus-divider.component';
import { ModusDropdownMenuComponent } from './modus-dropdown-menu.component';
import { ModusFileDropzoneComponent } from './modus-file-dropzone.component';
import { ModusInputFeedbackComponent } from './modus-input-feedback.component';
import { ModusInputLabelComponent } from './modus-input-label.component';
import { ModusLoaderComponent } from './modus-loader.component';
import { ModusMenuComponent } from './modus-menu.component';
import { ModusMenuItemComponent } from './modus-menu-item.component';
import { ModusModalComponent } from './modus-modal.component';
import { ModusNumberInputComponent } from './modus-number-input.component';
import { ModusPaginationComponent } from './modus-pagination.component';
import { ModusProgressComponent } from './modus-progress.component';
import { ModusRadioComponent } from './modus-radio.component';
import { ModusRatingComponent } from './modus-rating.component';
import { ModusAutocompleteComponent } from './modus-autocomplete.component';
import { ModusNavbarComponent, INavbarUserCard } from './modus-navbar.component';
import { ModusSelectComponent } from './modus-select.component';
import { ModusSideNavigationComponent } from './modus-side-navigation.component';
import { ModusSkeletonComponent } from './modus-skeleton.component';
import { ModusSliderComponent } from './modus-slider.component';
import { ModusStepperComponent, IStepperItem } from './modus-stepper.component';
import { ModusSwitchComponent } from './modus-switch.component';
import { ModusTableComponent } from './modus-table.component';
import { ModusTabsComponent } from './modus-tabs.component';
import { ModusTextareaComponent } from './modus-textarea.component';
import { ModusTextInputComponent } from './modus-text-input.component';
import { ModusTimeInputComponent } from './modus-time-input.component';
import { ModusToastComponent } from './modus-toast.component';
import { ModusToolbarComponent } from './modus-toolbar.component';
import { ModusTooltipComponent } from './modus-tooltip.component';
import { ModusTypographyComponent } from './modus-typography.component';
import { ModusUtilityPanelComponent } from './modus-utility-panel.component';
import { ThemeService, ThemeName, ThemeMode, ThemeConfig } from '../services/theme.service';
import type {
  IBreadcrumb,
  IPageChange,
  IRatingChange,
  IAutocompleteItem,
  ISelectOption,
  ITab,
  ITableColumn,
} from '@trimble-oss/moduswebcomponents';

/**
 * Demo component to test and demonstrate theme switching functionality.
 * Shows all available themes (Modus Classic, Modern, Connect) in both light and dark modes.
 */
@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    ModusAccordionComponent,
    ModusAlertComponent,
    ModusAvatarComponent,
    ModusBadgeComponent,
    ModusBreadcrumbsComponent,
    ModusButtonComponent,
    ModusCardComponent,
    ModusCheckboxComponent,
    ModusChipComponent,
    ModusCollapseComponent,
    ModusDateComponent,
    ModusDividerComponent,
    ModusDropdownMenuComponent,
    ModusFileDropzoneComponent,
    ModusIconComponent,
    ModusInputFeedbackComponent,
    ModusInputLabelComponent,
    ModusLoaderComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
    ModusModalComponent,
    ModusNumberInputComponent,
    ModusPaginationComponent,
    ModusProgressComponent,
    ModusRadioComponent,
    ModusRatingComponent,
    ModusThemeSwitcherComponent,
    ModusAutocompleteComponent,
    ModusNavbarComponent,
    ModusSelectComponent,
    ModusSideNavigationComponent,
    ModusSkeletonComponent,
    ModusSliderComponent,
    ModusStepperComponent,
    ModusSwitchComponent,
    ModusTableComponent,
    ModusTabsComponent,
    ModusTextareaComponent,
    ModusTextInputComponent,
    ModusTimeInputComponent,
    ModusToastComponent,
    ModusToolbarComponent,
    ModusTooltipComponent,
    ModusTypographyComponent,
    ModusUtilityPanelComponent,
  ],
  template: `
    <div class="theme-demo-container">
      <div class="theme-demo-header">
        <h1>Modus Theme Demo</h1>
        <p>Test different themes and modes</p>
      </div>

      <div class="theme-controls">
        <div class="control-group">
          <h2>Theme Switcher</h2>
          <modus-theme-switcher
            ariaLabel="Toggle light/dark mode"
            (themeChange)="onThemeChange($event)"
          />
        </div>

        <div class="control-group">
          <h2>Select Theme</h2>
          <div class="theme-buttons">
            <modus-button
              [color]="currentTheme() === 'modus-classic' ? 'primary' : 'secondary'"
              (buttonClick)="setTheme('modus-classic')"
            >
              Classic
            </modus-button>
            <modus-button
              [color]="currentTheme() === 'modus-modern' ? 'primary' : 'secondary'"
              (buttonClick)="setTheme('modus-modern')"
            >
              Modern
            </modus-button>
            <modus-button
              [color]="currentTheme() === 'connect' ? 'primary' : 'secondary'"
              (buttonClick)="setTheme('connect')"
            >
              Connect
            </modus-button>
          </div>
        </div>

        <div class="control-group">
          <h2>Mode</h2>
          <div class="mode-buttons">
            <modus-button
              [color]="currentMode() === 'light' ? 'primary' : 'secondary'"
              (buttonClick)="setMode('light')"
            >
              Light
            </modus-button>
            <modus-button
              [color]="currentMode() === 'dark' ? 'primary' : 'secondary'"
              (buttonClick)="setMode('dark')"
            >
              Dark
            </modus-button>
          </div>
        </div>
      </div>

      <div class="current-theme-info">
        <p><strong>Current Theme:</strong> {{ currentTheme() }}</p>
        <p><strong>Current Mode:</strong> {{ currentMode() }}</p>
        <p><strong>Full Theme:</strong> {{ fullThemeName() }}</p>
      </div>

      <div class="demo-components">
        <h2>Component Examples</h2>

        <div class="component-row">
          <modus-card padding="normal">
            <h3 slot="header">Card Example</h3>
            <p>This card demonstrates the current theme colors and styling.</p>
            <div slot="footer">
              <modus-button color="primary">Action</modus-button>
            </div>
          </modus-card>
        </div>

        <div class="component-row">
          <h3>Buttons</h3>
          <div class="button-group">
            <modus-button color="primary">Primary</modus-button>
            <modus-button color="secondary">Secondary</modus-button>
            <modus-button color="tertiary">Tertiary</modus-button>
            <modus-button color="warning">Warning</modus-button>
            <modus-button color="danger">Danger</modus-button>
          </div>
        </div>

        <div class="component-row">
          <h3>Buttons with Icons</h3>
          <div class="button-group">
            <modus-button color="primary" icon="add" iconPosition="left">Add Item</modus-button>
            <modus-button color="secondary" icon="search" iconPosition="left">Search</modus-button>
            <modus-button color="primary" icon="check_circle" iconPosition="right"
              >Submit</modus-button
            >
            <modus-button color="secondary" icon="close" iconPosition="right">Cancel</modus-button>
            <modus-button color="tertiary" icon="info" iconPosition="left">Info</modus-button>
            <modus-button color="warning" icon="warning" iconPosition="left">Warning</modus-button>
            <modus-button color="danger" icon="close" iconPosition="right">Delete</modus-button>
          </div>
        </div>

        <div class="component-row">
          <h3>Buttons with Different Sizes and Icons</h3>
          <div class="button-group">
            <modus-button color="primary" icon="add" iconPosition="left" size="xs"
              >Extra Small</modus-button
            >
            <modus-button color="primary" icon="add" iconPosition="left" size="sm"
              >Small</modus-button
            >
            <modus-button color="primary" icon="add" iconPosition="left" size="md"
              >Medium</modus-button
            >
            <modus-button color="primary" icon="add" iconPosition="left" size="lg"
              >Large</modus-button
            >
          </div>
        </div>

        <div class="component-row">
          <h3>Full Width Button</h3>
          <div class="button-group">
            <modus-button color="primary" [fullWidth]="true">Full Width Button</modus-button>
            <modus-button color="secondary" [fullWidth]="true" icon="add" iconPosition="left"
              >Full Width with Icon</modus-button
            >
            <modus-button color="tertiary" [fullWidth]="true" size="lg"
              >Large Full Width Button</modus-button
            >
          </div>
        </div>

        <div class="component-row">
          <h3>Icon-Only Buttons</h3>
          <div class="button-group">
            <modus-button
              color="primary"
              icon="add"
              iconPosition="only"
              ariaLabel="Add item"
              size="xs"
            ></modus-button>
            <modus-button
              color="primary"
              icon="add"
              iconPosition="only"
              ariaLabel="Add item"
              size="sm"
            ></modus-button>
            <modus-button
              color="primary"
              icon="add"
              iconPosition="only"
              ariaLabel="Add item"
              size="md"
            ></modus-button>
            <modus-button
              color="primary"
              icon="add"
              iconPosition="only"
              ariaLabel="Add item"
              size="lg"
            ></modus-button>
            <modus-button
              color="secondary"
              icon="search"
              iconPosition="only"
              ariaLabel="Search"
            ></modus-button>
            <modus-button
              color="tertiary"
              icon="info"
              iconPosition="only"
              ariaLabel="Information"
            ></modus-button>
            <modus-button
              color="warning"
              icon="warning"
              iconPosition="only"
              ariaLabel="Warning"
            ></modus-button>
            <modus-button
              color="danger"
              icon="close"
              iconPosition="only"
              ariaLabel="Close"
            ></modus-button>
            <modus-button
              color="primary"
              icon="check_circle"
              iconPosition="only"
              ariaLabel="Success"
            ></modus-button>
          </div>
        </div>

        <div class="component-row">
          <h3>Badges</h3>
          <div class="badge-group">
            <modus-badge color="primary">Primary Badge</modus-badge>
            <modus-badge color="secondary">Secondary Badge</modus-badge>
            <modus-badge color="tertiary">Tertiary Badge</modus-badge>
            <modus-badge color="warning">Warning Badge</modus-badge>
            <modus-badge color="danger">Danger Badge</modus-badge>
          </div>
        </div>

        <div class="component-row">
          <h3>Alerts</h3>
          <div class="alert-group">
            <modus-alert
              alertTitle="Information"
              alertDescription="General guidance for the current view."
              variant="info"
            />
            <modus-alert
              alertTitle="Success"
              alertDescription="All updates completed successfully."
              variant="success"
              [dismissible]="true"
            />
            <modus-alert
              alertTitle="Warning"
              alertDescription="Check the highlighted fields before continuing."
              variant="warning"
            />
            <modus-alert
              alertTitle="Error"
              alertDescription="Something went wrong while saving changes."
              variant="error"
              [dismissible]="true"
            />
          </div>
        </div>

        <div class="component-row">
          <h3>Icons</h3>
          <div class="icon-group">
            <div class="icon-example">
              <modus-icon name="alert" variant="outlined" size="lg" />
              <span>alert (outlined)</span>
            </div>
            <div class="icon-example">
              <modus-icon name="alert" variant="solid" size="lg" />
              <span>alert (solid)</span>
            </div>
            <div class="icon-example">
              <modus-icon name="accessibility_circle" variant="solid" size="lg" />
              <span>accessibility_circle (solid)</span>
            </div>
            <div class="icon-example">
              <modus-icon name="check_circle" variant="outlined" size="lg" />
              <span>check_circle (outlined)</span>
            </div>
            <div class="icon-example">
              <modus-icon name="check_circle" variant="solid" size="lg" />
              <span>check_circle (solid)</span>
            </div>
            <div class="icon-example">
              <modus-icon name="info" variant="outlined" size="lg" />
              <span>info (outlined)</span>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Icons with Custom Styling</h3>
          <div class="icon-group">
            <div class="icon-example">
              <modus-icon name="alert" variant="solid" size="lg" className="text-primary" />
              <span>Info color</span>
            </div>
            <div class="icon-example">
              <modus-icon name="check_circle" variant="solid" size="lg" className="text-success" />
              <span>Success color</span>
            </div>
            <div class="icon-example">
              <modus-icon name="warning" variant="solid" size="lg" className="text-warning" />
              <span>Warning color</span>
            </div>
            <div class="icon-example">
              <modus-icon name="alert" variant="solid" size="lg" className="text-error" />
              <span>Error color</span>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Accessible Icons</h3>
          <div class="icon-group">
            <div class="icon-example">
              <modus-icon
                name="accessibility_circle"
                variant="solid"
                size="md"
                [decorative]="false"
                ariaLabel="Accessibility features"
              />
              <span>With aria-label</span>
            </div>
            <div class="icon-example">
              <modus-icon name="info" variant="outlined" size="md" [decorative]="true" />
              <span>Decorative (hidden from screen readers)</span>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Avatars</h3>
          <div class="avatar-group">
            <modus-avatar alt="Ada Lovelace" initials="AL" size="lg" />
            <modus-avatar alt="Grace Hopper" imgSrc="https://via.placeholder.com/64" size="md" />
            <modus-avatar alt="Design System" initials="DS" shape="square" size="sm" />
          </div>
        </div>

        <div class="component-row">
          <h3>Breadcrumbs</h3>
          <modus-breadcrumbs
            [items]="breadcrumbItems"
            (breadcrumbClick)="onBreadcrumbClick($event)"
          />
        </div>

        <div class="component-row">
          <h3>Chips</h3>
          <div class="chip-group">
            <modus-chip label="Default" />
            <modus-chip label="Active" [active]="true" />
            <modus-chip label="Dismiss" [showRemove]="true" />
            <modus-chip label="Error" [hasError]="true" variant="outline" />
          </div>
        </div>

        <div class="component-row">
          <h3>Form Controls</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-input-label forId="demo-checkbox" labelText="Checkbox" [required]="true" />
              <modus-checkbox inputId="demo-checkbox" label="Accept terms" [value]="true" />
              <modus-input-feedback level="success" message="Thanks for confirming." />
            </div>
            <div class="form-control">
              <modus-input-label forId="demo-radio" labelText="Radio" />
              <modus-radio inputId="demo-radio" label="Option A" name="radio-demo" [value]="true" />
              <modus-radio
                inputId="demo-radio-b"
                label="Option B"
                name="radio-demo"
                [value]="false"
              />
            </div>
            <div class="form-control">
              <modus-input-label forId="demo-date" labelText="Date" />
              <modus-date inputId="demo-date" label="Pick a date" value="2025-01-15" />
            </div>
            <div class="form-control">
              <modus-input-label forId="demo-number" labelText="Number" />
              <modus-number-input
                inputId="demo-number"
                label="Quantity"
                placeholder="0"
                [value]="'12'"
                [step]="1"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Dropdown Menu</h3>
          <modus-dropdown-menu buttonAriaLabel="Actions menu">
            <span slot="button">Open Menu</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Profile" value="profile" />
                <modus-menu-item label="Settings" value="settings" />
                <modus-menu-item label="Log out" value="logout" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>
        </div>

        <div class="component-row">
          <h3>Menu</h3>
          <div class="menu-grid">
            <modus-menu [bordered]="true">
              <modus-menu-item label="Dashboard" value="dashboard" [selected]="true" />
              <modus-menu-item label="Projects" value="projects" />
              <modus-menu-item label="Reports" value="reports" />
            </modus-menu>
            <modus-menu orientation="horizontal">
              <modus-menu-item label="Left" value="left" />
              <modus-menu-item label="Center" value="center" />
              <modus-menu-item label="Right" value="right" />
            </modus-menu>
          </div>
        </div>

        <div class="component-row">
          <h3>File Dropzone</h3>
          <modus-file-dropzone
            acceptFileTypes=".pdf,.docx"
            instructions="Drag files here or click to upload"
            successMessage="Upload complete"
          >
            <p>Supports PDF and DOCX files up to 10MB.</p>
          </modus-file-dropzone>
        </div>

        <div class="component-row">
          <h3>Loader</h3>
          <div class="loader-group">
            <modus-loader />
            <modus-loader color="success" variant="dots" />
            <modus-loader color="warning" variant="spinner" size="lg" />
          </div>
        </div>

        <div class="component-row">
          <h3>Divider</h3>
          <modus-divider content="Section Divider" [responsive]="true" />
        </div>

        <div class="component-row">
          <h3>Pagination &amp; Progress</h3>
          <div class="pagination-grid">
            <div>
              <modus-pagination
                [count]="paginationState.count"
                [page]="paginationState.page"
                (pageChange)="onPageChange($event)"
              />
              <p class="pagination-info">
                Current page: {{ paginationState.page }} / {{ paginationState.count }}
              </p>
            </div>
            <div class="progress-stack">
              <modus-progress [value]="45" [label]="'45% complete'" />
              <modus-progress variant="radial" [value]="72" [label]="'72%'">
                <strong>72%</strong>
              </modus-progress>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Rating</h3>
          <div class="rating-group">
            <modus-rating
              [value]="ratingValue"
              variant="star"
              [allowHalf]="true"
              (ratingChange)="onRatingChange($event)"
            />
            <span>Selected rating: {{ ratingValue }}</span>
          </div>
        </div>

        <div class="component-row">
          <h3>Modal</h3>
          <modus-button color="primary" (buttonClick)="openDemoModal()">Open Modal</modus-button>
          <modus-modal modalId="theme-demo-modal" [showFullscreenToggle]="true" backdrop="default">
            <h3 slot="header">Theme Demo Modal</h3>
            <div slot="content">
              <p>This modal showcases the Modus modal wrapper.</p>
              <modus-divider />
              <p>Use the buttons in the header to close or toggle fullscreen.</p>
            </div>
            <div slot="footer">
              <modus-button color="secondary">Dismiss</modus-button>
              <modus-button color="primary">Confirm</modus-button>
            </div>
          </modus-modal>
        </div>

        <div class="component-row">
          <h3>Accordion</h3>
          <div class="accordion-example">
            <modus-accordion (expandedChange)="onAccordionChange($event)">
              <modus-collapse [options]="collapseOptions[0]">
                <div slot="content">
                  <p>This is the content for the first accordion item.</p>
                  <p>You can add any HTML content here, including other components.</p>
                </div>
              </modus-collapse>
              <modus-collapse [options]="collapseOptions[1]">
                <div slot="content">
                  <p>This is the content for the second accordion item.</p>
                  <ul>
                    <li>List item one</li>
                    <li>List item two</li>
                    <li>List item three</li>
                  </ul>
                </div>
              </modus-collapse>
              <modus-collapse [options]="collapseOptions[2]">
                <div slot="content">
                  <p>This is the content for the third accordion item.</p>
                  <modus-button color="primary">Action Button</modus-button>
                </div>
              </modus-collapse>
            </modus-accordion>
          </div>
        </div>

        <div class="component-row">
          <h3>Autocomplete</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-autocomplete
                label="Search cities"
                placeholder="Type to search..."
                [items]="autocompleteItems"
                [includeSearch]="true"
              />
            </div>
            <div class="form-control">
              <modus-autocomplete
                label="Multi-select tags"
                placeholder="Select multiple items"
                [items]="autocompleteItems"
                [multiSelect]="true"
                [includeClear]="true"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Select</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-select label="Choose a country" [options]="selectOptions" />
            </div>
            <div class="form-control">
              <modus-select
                label="Required field"
                [options]="selectOptions"
                [required]="true"
                size="lg"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Text Input</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-text-input
                label="Email address"
                type="email"
                placeholder="user@example.com"
                [includeClear]="true"
              />
            </div>
            <div class="form-control">
              <modus-text-input
                label="Password"
                type="password"
                placeholder="Enter password"
                [required]="true"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Textarea</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-textarea
                label="Comments"
                placeholder="Enter your comments here..."
                [rows]="4"
              />
            </div>
            <div class="form-control">
              <modus-textarea
                label="Description"
                placeholder="Max 200 characters"
                [maxLength]="200"
                [rows]="3"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Switch</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-switch label="Enable notifications" [value]="true" />
            </div>
            <div class="form-control">
              <modus-switch label="Dark mode" [value]="false" size="lg" />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Slider</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-slider label="Volume" [min]="0" [max]="100" [value]="50" [step]="5" />
            </div>
            <div class="form-control">
              <modus-slider label="Temperature" [min]="0" [max]="100" [value]="25" />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Time Input</h3>
          <div class="form-grid">
            <div class="form-control">
              <modus-time-input label="Start time" value="09:00" />
            </div>
            <div class="form-control">
              <modus-time-input label="End time" value="17:00" [required]="true" />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Tabs</h3>
          <div class="menu-grid">
            <div>
              <modus-tabs [tabs]="tabItems" [activeTabIndex]="0">
                <div slot="tab-0">
                  <p>Content for the first tab</p>
                </div>
                <div slot="tab-1">
                  <p>Content for the second tab</p>
                </div>
                <div slot="tab-2">
                  <p>Content for the third tab</p>
                </div>
              </modus-tabs>
            </div>
            <div>
              <modus-tabs [tabs]="tabItemsSmall" [activeTabIndex]="1" size="sm">
                <div slot="tab-0">Small tab 1</div>
                <div slot="tab-1">Small tab 2</div>
              </modus-tabs>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Stepper</h3>
          <div class="menu-grid">
            <div>
              <modus-stepper [steps]="stepperItems" orientation="horizontal" />
            </div>
            <div>
              <modus-stepper [steps]="stepperItemsVertical" orientation="vertical" />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Tooltip</h3>
          <div class="button-group">
            <modus-tooltip content="This is a tooltip on the top" position="top">
              <modus-button color="primary">Hover me (Top)</modus-button>
            </modus-tooltip>
            <modus-tooltip content="This is a tooltip on the right" position="right">
              <modus-button color="secondary">Hover me (Right)</modus-button>
            </modus-tooltip>
          </div>
        </div>

        <div class="component-row">
          <h3>Toast</h3>
          <div class="button-group">
            <modus-toast position="top-end" [delay]="5000">
              <div>Success message displayed as toast</div>
            </modus-toast>
            <modus-toast position="bottom-center" [delay]="3000">
              <div>Info message in center</div>
            </modus-toast>
          </div>
        </div>

        <div class="component-row">
          <h3>Skeleton</h3>
          <div class="menu-grid">
            <div>
              <modus-skeleton />
            </div>
            <div>
              <modus-skeleton shape="circle" />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Typography</h3>
          <div class="menu-grid">
            <div>
              <modus-typography hierarchy="h1" size="xl" weight="bold">Heading 1</modus-typography>
              <modus-typography hierarchy="h2" size="lg">Heading 2</modus-typography>
              <modus-typography hierarchy="p">Body text</modus-typography>
            </div>
            <div>
              <modus-typography hierarchy="h3" weight="semibold">Semibold Heading</modus-typography>
              <modus-typography hierarchy="p" size="sm" weight="light">Light text</modus-typography>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Toolbar</h3>
          <div class="menu-grid">
            <div>
              <modus-toolbar>
                <modus-button slot="start" color="primary" size="sm">Start</modus-button>
                <div slot="center">Center Content</div>
                <modus-button slot="end" color="secondary" size="sm">End</modus-button>
              </modus-toolbar>
            </div>
            <div>
              <modus-toolbar>
                <modus-icon slot="start" name="menu" size="lg" />
                <div slot="center">Another Toolbar</div>
                <modus-icon slot="end" name="settings" size="lg" />
              </modus-toolbar>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Table</h3>
          <div class="menu-grid">
            <div>
              <modus-table
                [columns]="tableColumns"
                [data]="tableData"
                [paginated]="true"
                [sortable]="true"
                [hover]="true"
              />
            </div>
            <div>
              <modus-table
                [columns]="tableColumns"
                [data]="tableData"
                [zebra]="true"
                density="compact"
                caption="Compact table with zebra stripes"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Side Navigation</h3>
          <div class="menu-grid">
            <div>
              <modus-side-navigation [expanded]="true" mode="push">
                <p>Side navigation content in push mode</p>
              </modus-side-navigation>
            </div>
            <div>
              <modus-side-navigation [expanded]="false" mode="overlay">
                <p>Side navigation in overlay mode (collapsed)</p>
              </modus-side-navigation>
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Navbar</h3>
          <div class="menu-grid">
            <div>
              <modus-navbar
                [userCard]="navbarUserCard"
                [visibility]="{ user: true, search: true }"
              />
            </div>
            <div>
              <modus-navbar
                [userCard]="navbarUserCard"
                [visibility]="{ user: true, mainMenu: true, notifications: true }"
                [condensed]="true"
              />
            </div>
          </div>
        </div>

        <div class="component-row">
          <h3>Utility Panel</h3>
          <div class="menu-grid">
            <div>
              <modus-utility-panel [expanded]="false" [pushContent]="false">
                <div slot="header">Utility Panel Header</div>
                <div slot="body">Utility panel body content</div>
                <div slot="footer">Utility Panel Footer</div>
              </modus-utility-panel>
            </div>
            <div>
              <modus-utility-panel [expanded]="true" [pushContent]="true">
                <div slot="header">Expanded Panel Header</div>
                <div slot="body">Expanded panel with push content enabled</div>
                <div slot="footer">Expanded Panel Footer</div>
              </modus-utility-panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-demo-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .theme-demo-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .theme-demo-header h1 {
        margin-bottom: 0.5rem;
      }

      .theme-controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--card);
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .control-group h2 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }

      .theme-buttons,
      .mode-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .current-theme-info {
        background: var(--muted);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
      }

      .current-theme-info p {
        margin: 0.5rem 0;
      }

      .demo-components {
        margin-top: 2rem;
      }

      .demo-components h2 {
        margin-bottom: 1.5rem;
      }

      .component-row {
        margin-bottom: 2rem;
      }

      .component-row h3 {
        margin-bottom: 1rem;
      }

      .button-group,
      .badge-group {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
      }

      .alert-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .icon-group {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        align-items: center;
      }

      .avatar-group,
      .chip-group,
      .loader-group {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }

      .form-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background: var(--muted);
        border-radius: 0.5rem;
      }

      .menu-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: flex-start;
      }

      .pagination-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: center;
      }

      .pagination-info {
        margin-top: 0.5rem;
      }

      .progress-stack {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .rating-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .icon-example {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: var(--muted);
        border-radius: 0.5rem;
      }

      .icon-example span {
        font-size: 0.875rem;
        text-align: center;
      }

      .accordion-example {
        max-width: 800px;
      }
    `,
  ],
})
export class ThemeDemoComponent implements OnInit {
  currentTheme = signal<ThemeName>('modus-modern');
  currentMode = signal<ThemeMode>('light');
  fullThemeName = signal<string>('modus-modern-light');

  /** Collapse options for accordion items */
  collapseOptions: ICollapseOptions[] = [
    {
      title: 'Item One',
      description: 'Item one description',
      icon: 'info',
      iconAriaLabel: 'Information',
    },
    {
      title: 'Item Two',
      description: 'Item two description',
      icon: 'warning',
      iconAriaLabel: 'Warning',
    },
    {
      title: 'Item Three',
      description: 'Item three description',
      icon: 'check_circle',
      iconAriaLabel: 'Success',
    },
  ];

  breadcrumbItems: IBreadcrumb[] = [
    { label: 'Home', url: '#home' },
    { label: 'Components', url: '#components' },
    { label: 'Theme Demo' },
  ];

  paginationState = { page: 2, count: 8 };

  ratingValue = 3.5;

  autocompleteItems: IAutocompleteItem[] = [
    { label: 'New York', value: 'ny', visibleInMenu: true },
    { label: 'Los Angeles', value: 'la', visibleInMenu: true },
    { label: 'Chicago', value: 'ch', visibleInMenu: true },
    { label: 'Houston', value: 'ho', visibleInMenu: true },
    { label: 'Phoenix', value: 'ph', visibleInMenu: true },
  ];

  selectOptions: ISelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
  ];

  tabItems: ITab[] = [{ label: 'Tab One' }, { label: 'Tab Two' }, { label: 'Tab Three' }];

  tabItemsSmall: ITab[] = [{ label: 'Small Tab 1' }, { label: 'Small Tab 2' }];

  stepperItems: IStepperItem[] = [
    { label: 'Step 1', color: 'primary' },
    { label: 'Step 2', color: 'info' },
    { label: 'Step 3' },
  ];

  stepperItemsVertical: IStepperItem[] = [
    { label: 'Setup', color: 'success' },
    { label: 'Configure', color: 'warning' },
    { label: 'Deploy', color: 'error' },
  ];

  tableColumns: ITableColumn[] = [
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email', sortable: true },
    { id: 'role', header: 'Role', accessor: 'role' },
  ];

  tableData: Record<string, unknown>[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  navbarUserCard: INavbarUserCard = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarSrc: 'https://via.placeholder.com/64',
    avatarAlt: 'User avatar',
  };

  constructor(private themeService: ThemeService) {
    // Use effect to react to theme changes
    effect(() => {
      const theme = this.themeService.theme();
      this.currentTheme.set(theme);
      this.updateFullThemeName();
    });

    effect(() => {
      const mode = this.themeService.mode();
      this.currentMode.set(mode);
      this.updateFullThemeName();
    });
  }

  ngOnInit(): void {
    // Initialize current values
    const config = this.themeService.getThemeConfig();
    this.currentTheme.set(config.theme);
    this.currentMode.set(config.mode);
    this.updateFullThemeName();
  }

  setTheme(theme: ThemeName): void {
    this.themeService.setThemeName(theme);
  }

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  onThemeChange(config: ThemeConfig): void {
    if (config && config.theme && config.mode) {
      this.themeService.setTheme(config.theme, config.mode);
    }
  }

  private updateFullThemeName(): void {
    this.fullThemeName.set(this.themeService.getFullThemeName());
  }

  /**
   * Handles accordion expanded change events
   *
   * @param event - Event containing expanded state and index
   */
  onAccordionChange(event: { expanded: boolean; index: number }): void {
    console.log('Accordion item changed:', event);
  }

  onBreadcrumbClick(item: IBreadcrumb): void {
    console.log('Breadcrumb clicked:', item);
  }

  onPageChange(change: IPageChange): void {
    this.paginationState = { ...this.paginationState, page: change.newPage };
  }

  onRatingChange(change: IRatingChange): void {
    this.ratingValue = change.newRating;
  }

  openDemoModal(): void {
    const dialog = document.getElementById('theme-demo-modal') as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }
}

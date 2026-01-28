import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusSideNavigationComponent } from '../modus-side-navigation.component';
import { ModusMenuComponent } from '../modus-menu.component';
import { ModusMenuItemComponent } from '../modus-menu-item.component';
import { ModusIconComponent } from '../modus-icon.component';
import { ModusNavbarComponent } from '../modus-navbar.component';

/**
 * Demo page showcasing the Modus Side Navigation component.
 *
 * Demonstrates side navigation features including:
 * - Navbar integration (recommended pattern)
 * - Icons that remain visible when collapsed
 * - Push mode layout
 * - State management with signals
 * - Interactive examples with state management
 */
@Component({
  selector: 'app-side-navigation-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusSideNavigationComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
    ModusIconComponent,
    ModusNavbarComponent,
  ],
  styles: [],
  template: `
    <demo-page
      title="Modus Side Navigation"
      description="A collapsible vertical navigation component that provides contextual menu options for application navigation. The component collapses to show icons only (4rem width) and expands to show full menu items with labels. Icons remain visible and properly positioned in both states."
    >
      <!-- Navbar Integration Example -->
      <demo-example
        title="Navbar Integration (Recommended Pattern)"
        description="Side navigation controlled by the navbar's main menu button (hamburger menu). This is the standard Modus pattern used in applications."
      >
        <div class="layout-with-navbar h-[600px] flex flex-col" data-example="basic">
          <modus-navbar
            [userCard]="userCardInfo()"
            [visibility]="{ mainMenu: true, user: true }"
            class="navbar"
          />

          <div class="main-content-row flex flex-1 overflow-hidden">
            <modus-side-navigation
              [expanded]="false"
              [collapseOnClickOutside]="true"
              [maxWidth]="'256px'"
              mode="push"
              [targetContent]="'#basic-panel-content'"
              class="side-navigation h-full"
            >
              <modus-menu size="lg">
                <modus-menu-item label="Home" value="home" [selected]="true">
                  <modus-icon slot="start-icon" name="home" [decorative]="true"></modus-icon>
                </modus-menu-item>
                <modus-menu-item label="Profile" value="profile">
                  <modus-icon slot="start-icon" name="person" [decorative]="true"></modus-icon>
                </modus-menu-item>
                <modus-menu-item label="Settings" value="settings">
                  <modus-icon slot="start-icon" name="settings" [decorative]="true"></modus-icon>
                </modus-menu-item>
              </modus-menu>
            </modus-side-navigation>

            <div id="basic-panel-content" class="panel-content flex-1 p-6">
              <div class="text-lg font-semibold text-foreground mb-4">Main Content Area</div>
              <p class="text-base text-foreground mb-4">
                The side navigation of an application provides context through accessible menu
                options and positions a consistent component to connect to various pages in the
                application.
              </p>
              <p class="text-base text-foreground">
                The side navigation is a collapsible side content of the site's pages. It is located
                alongside the page's primary content. The component is designed to add side content
                to a fullscreen application. It is activated through the "hamburger" menu in the
                Navbar.
              </p>
              <div class="mt-4 p-4 rounded-lg bg-card border-default">
                <div class="text-sm font-medium text-card-foreground mb-1">Navigation State:</div>
                <div class="text-sm text-muted-foreground">
                  {{ navbarMenuExpanded() ? 'Expanded' : 'Collapsed' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </demo-example>

      <!-- Sub-Menu Example -->
      <demo-example
        title="Side Navigation with Sub-Menus"
        description="Advanced side navigation with collapsible sub-menus and nested menu items. Demonstrates hierarchical navigation with expand/collapse functionality."
      >
        <div class="layout-with-navbar-submenu h-[700px] flex flex-col" data-example="submenu">
          <modus-navbar
            [userCard]="subMenuUserCardInfo()"
            [visibility]="{ mainMenu: true, user: true }"
            class="navbar"
          />

          <div class="main-content-row flex flex-1 overflow-hidden">
            <modus-side-navigation
              [expanded]="false"
              [collapseOnClickOutside]="true"
              [maxWidth]="'256px'"
              mode="push"
              [targetContent]="'#submenu-panel-content'"
              class="side-navigation h-full"
            >
              <modus-menu ariaLabel="Custom menu" customClass="side-nav-menu-width">
                <!-- Charts Menu with Sub-items -->
                <li>
                  <div class="side-nav-flex-row" (click)="handleCollapseToggle($event)">
                    <modus-icon
                      name="bar_graph"
                      [decorative]="true"
                      class="side-nav-collapse-icon side-nav-icon-left"
                    ></modus-icon>
                    <div class="side-nav-dropdown-menu">Charts</div>
                    <div class="side-nav-justify-end">
                      <modus-icon
                        name="expand_more"
                        [decorative]="true"
                        class="side-nav-collapse-icon side-nav-dropdown-toggle"
                      ></modus-icon>
                    </div>
                  </div>
                </li>
                <li class="side-nav-children-container side-nav-hidden" aria-hidden="true">
                  <ul>
                    <li>
                      <div
                        class="side-nav-flex-row side-nav-nested-row"
                        (click)="selectMenuItem('bar-chart')"
                      >
                        <div>Bar Chart</div>
                      </div>
                    </li>
                    <li>
                      <div
                        class="side-nav-flex-row side-nav-nested-row"
                        (click)="selectMenuItem('line-chart')"
                      >
                        <div>Line Chart</div>
                      </div>
                    </li>
                    <li>
                      <div
                        class="side-nav-flex-row side-nav-nested-row"
                        (click)="selectMenuItem('pie-chart')"
                      >
                        <div>Pie Chart</div>
                      </div>
                    </li>
                  </ul>
                </li>

                <!-- Calendar Menu (no sub-items) -->
                <li>
                  <div class="side-nav-flex-row" (click)="selectMenuItem('calendar')">
                    <modus-icon
                      name="calendar"
                      [decorative]="true"
                      class="side-nav-collapse-icon side-nav-icon-left"
                    ></modus-icon>
                    <div class="side-nav-dropdown-menu">Calendar</div>
                  </div>
                </li>

                <!-- Maps Menu with Sub-items -->
                <div class="side-nav-menu-item-container">
                  <div class="side-nav-flex-row" (click)="toggleSubMenu('maps', $event)">
                    <modus-icon
                      name="compass"
                      [decorative]="true"
                      class="side-nav-collapse-icon side-nav-icon-left"
                    ></modus-icon>
                    <div class="side-nav-dropdown-menu">Maps</div>
                    <div class="side-nav-justify-end">
                      <modus-icon
                        [name]="subMenuStates()['maps'] ? 'expand_less' : 'expand_more'"
                        [decorative]="true"
                        class="side-nav-collapse-icon side-nav-dropdown-toggle"
                      >
                      </modus-icon>
                    </div>
                  </div>
                  <div
                    class="side-nav-children-container"
                    [class.hidden]="!subMenuStates()['maps']"
                    [attr.aria-hidden]="!subMenuStates()['maps']"
                  >
                    <div
                      class="side-nav-submenu-item side-nav-nested-row"
                      (click)="selectMenuItem('map-1')"
                    >
                      <div>Map 1</div>
                    </div>
                    <div
                      class="side-nav-submenu-item side-nav-nested-row"
                      (click)="toggleSubMenu('map-2', $event)"
                    >
                      <div>Map 2</div>
                      <div class="side-nav-justify-end">
                        <modus-icon
                          [name]="subMenuStates()['map-2'] ? 'expand_less' : 'expand_more'"
                          [decorative]="true"
                          class="side-nav-collapse-icon side-nav-dropdown-toggle"
                        >
                        </modus-icon>
                      </div>
                    </div>
                    <div
                      class="side-nav-children-container side-nav-nested-submenu"
                      [class.hidden]="!subMenuStates()['map-2']"
                      [attr.aria-hidden]="!subMenuStates()['map-2']"
                    >
                      <div
                        class="side-nav-submenu-item side-nav-deeply-nested-row"
                        (click)="selectMenuItem('map-2-1')"
                      >
                        <div>Map 1</div>
                      </div>
                      <div
                        class="side-nav-submenu-item side-nav-deeply-nested-row"
                        (click)="selectMenuItem('map-2-2')"
                      >
                        <div>Map 2</div>
                      </div>
                    </div>
                    <div
                      class="side-nav-submenu-item side-nav-nested-row"
                      (click)="selectMenuItem('map-3')"
                    >
                      <div>Map 3</div>
                    </div>
                  </div>
                </div>
              </modus-menu>
            </modus-side-navigation>

            <div id="submenu-panel-content" class="panel-content flex-1 p-6">
              <div class="text-lg font-semibold text-foreground mb-4">Sub-Menu Navigation</div>
              <p class="text-base text-foreground mb-4">
                This example demonstrates hierarchical navigation with collapsible sub-menus. Click
                on menu items with arrows to expand/collapse sub-menus. The navigation maintains
                state and properly handles nested menu structures.
              </p>
              <div class="mt-4 p-4 rounded-lg bg-card border-default">
                <div class="text-sm font-medium text-card-foreground mb-2">Current Selection:</div>
                <div class="text-sm text-muted-foreground">
                  {{ selectedSubMenuItem() || 'No item selected' }}
                </div>
              </div>
              <div class="mt-4 p-4 rounded-lg bg-muted">
                <div class="text-sm font-medium text-foreground mb-2">Sub-Menu States:</div>
                <div class="text-xs text-muted-foreground">
                  <div>Charts: {{ subMenuStates()['charts'] ? 'Expanded' : 'Collapsed' }}</div>
                  <div>Maps: {{ subMenuStates()['maps'] ? 'Expanded' : 'Collapsed' }}</div>
                  <div>Map 2: {{ subMenuStates()['map-2'] ? 'Expanded' : 'Collapsed' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class SideNavigationDemoPageComponent implements AfterViewInit {
  // State for first example (Navbar Integration)
  readonly navbarMenuExpanded = signal<boolean>(false);
  readonly userCardInfo = signal({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarSrc: '',
    avatarAlt: 'User Avatar',
  });

  // State for second example (Sub-Menu)
  readonly subMenuNavbarExpanded = signal<boolean>(false);
  readonly subMenuUserCardInfo = signal({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarSrc: '',
    avatarAlt: 'User Avatar',
  });
  readonly subMenuStates = signal<Record<string, boolean>>({
    charts: false,
    maps: false,
    'map-2': false,
  });
  readonly selectedSubMenuItem = signal<string | null>(null);

  constructor(private elementRef: ElementRef) {}

  /**
   * Handles navbar main menu open state changes
   * This is triggered when the hamburger menu button is clicked
   */
  handleNavbarMenuOpenChange(isOpen: boolean): void {
    console.log(
      'Navbar main menu open change - received:',
      isOpen,
      'current state:',
      this.navbarMenuExpanded()
    );
    // The navbar component should handle the toggle internally, but let's ensure we set the state
    this.navbarMenuExpanded.set(isOpen);
  }

  ngAfterViewInit(): void {
    // Implement the same pattern as the Storybook example
    this.setupNavbarSideNavigationIntegration();
  }

  /**
   * Sets up the navbar-side navigation integration using the Storybook pattern
   */
  private setupNavbarSideNavigationIntegration(): void {
    // Setup for first example (basic navbar integration)
    const basicContainers = this.elementRef.nativeElement.querySelectorAll('.layout-with-navbar');
    basicContainers.forEach((container: any) => {
      this.setupContainerIntegration(container, 'basic');
    });

    // Setup for second example (sub-menu integration)
    const subMenuContainers = this.elementRef.nativeElement.querySelectorAll(
      '.layout-with-navbar-submenu'
    );
    subMenuContainers.forEach((container: any) => {
      this.setupContainerIntegration(container, 'submenu');
    });

    console.log(
      `Navbar-side navigation integration setup complete for ${
        basicContainers.length + subMenuContainers.length
      } containers`
    );
  }

  /**
   * Sets up integration for a specific container
   */
  private setupContainerIntegration(container: any, type: 'basic' | 'submenu'): void {
    const exampleType = container.getAttribute('data-example');
    console.log(
      `Setting up ${type} container integration for:`,
      container.className,
      'data-example:',
      exampleType
    );

    // Listen for navbar main menu open change events
    container.addEventListener('mainMenuOpenChange', (event: any) => {
      console.log(`🔥 ${type} (${exampleType}) navbar main menu open change event:`, event.detail);

      // Find the side navigation element in this specific container
      const sideNav = container.querySelector('modus-wc-side-navigation');

      if (sideNav) {
        // Directly set the expanded property on the web component
        sideNav.expanded = event.detail;
        console.log(`✅ Set ${type} (${exampleType}) side navigation expanded to:`, event.detail);

        // Update the appropriate signal for UI consistency - ONLY for the correct example
        if (type === 'basic' && exampleType === 'basic') {
          console.log('📊 Updating navbarMenuExpanded signal to:', event.detail);
          this.navbarMenuExpanded.set(event.detail);
        } else if (type === 'submenu' && exampleType === 'submenu') {
          console.log('📊 Updating subMenuNavbarExpanded signal to:', event.detail);
          this.subMenuNavbarExpanded.set(event.detail);
        }

        // Collapse all sub-menus when side navigation collapses (only for submenu example)
        if (!event.detail && exampleType === 'submenu') {
          this.collapseAllSubMenus();
        }
      } else {
        console.error(`❌ No side navigation found in ${type} container`);
      }
    });

    // Also listen for expandedChange events from the side navigation itself
    const sideNavs = container.querySelectorAll('modus-wc-side-navigation');
    sideNavs.forEach((sideNav: any) => {
      sideNav.addEventListener('expandedChange', (event: any) => {
        console.log(`${type} (${exampleType}) side navigation expanded change:`, event.detail);

        // Update the appropriate signal - ONLY for the correct example
        if (type === 'basic' && exampleType === 'basic') {
          this.navbarMenuExpanded.set(event.detail);
        } else if (type === 'submenu' && exampleType === 'submenu') {
          this.subMenuNavbarExpanded.set(event.detail);
        }

        // Collapse all sub-menus when side navigation collapses (only for submenu example)
        if (!event.detail && exampleType === 'submenu') {
          this.collapseAllSubMenus();
        }

        // Also handle Storybook-style sub-menu collapse (only for submenu example)
        if (exampleType === 'submenu') {
          this.handleExpandChange(event);
        }
      });
    });
  }

  /**
   * Toggles the expanded state of a sub-menu
   */
  toggleSubMenu(menuKey: string, event: Event): void {
    event.stopPropagation();
    console.log('Toggling sub-menu:', menuKey);

    const currentStates = this.subMenuStates();
    const newStates = {
      ...currentStates,
      [menuKey]: !currentStates[menuKey],
    };

    this.subMenuStates.set(newStates);
    console.log('Sub-menu states updated:', newStates);
  }

  /**
   * Selects a menu item and updates the current selection
   */
  selectMenuItem(itemKey: string): void {
    console.log('Selected menu item:', itemKey);
    this.selectedSubMenuItem.set(itemKey);
  }

  /**
   * Handles collapse toggle for sub-menus (Storybook pattern)
   */
  handleCollapseToggle(event: Event): void {
    const clickedEl = event.currentTarget as HTMLElement;
    const parentLi = clickedEl.closest('li');
    if (!parentLi) return;

    // Find the icon element that needs to be toggled using the dropdown-toggle class
    const iconEl = clickedEl.querySelector('.side-nav-dropdown-toggle') as any;
    if (!iconEl) return;

    // Find the parent side nav element (check both container types)
    const parentContainer = clickedEl.closest('.layout-with-navbar, .layout-with-navbar-submenu');
    const sideNav = parentContainer?.querySelector('modus-wc-side-navigation') as any;

    // Toggle between expand_more and expand_less icons only if side nav is expanded
    const isExpanded = iconEl.getAttribute('name') === 'expand_more';
    if (sideNav?.expanded) {
      iconEl.setAttribute('name', isExpanded ? 'expand_less' : 'expand_more');
    }

    // Find and toggle children visibility
    const childContainer = parentLi.nextElementSibling?.classList.contains(
      'side-nav-children-container'
    )
      ? parentLi.nextElementSibling
      : null;

    if (childContainer && sideNav?.expanded) {
      childContainer.classList.toggle('side-nav-hidden');
      childContainer.setAttribute('aria-hidden', !isExpanded ? 'true' : 'false');
    }
  }

  /**
   * Handles expand change events (Storybook pattern)
   */
  handleExpandChange(event: CustomEvent<boolean>): void {
    if (!event.detail) {
      const eventSource = event.target as HTMLElement;
      const container = eventSource?.closest('.layout-with-navbar, .layout-with-navbar-submenu');

      if (container) {
        // Collapse all child containers if the side navigation is collapsed
        const childrenContainers = container.querySelectorAll('.side-nav-children-container');
        childrenContainers.forEach((container) => {
          container.classList.add('side-nav-hidden');
          container.setAttribute('aria-hidden', 'true');
        });

        // Reset all collapse icons to expand_more
        const collapseIcons = container.querySelectorAll('.side-nav-dropdown-toggle');
        collapseIcons.forEach((icon: any) => {
          if (icon.getAttribute('name') === 'expand_less') {
            icon.setAttribute('name', 'expand_more');
          }
        });
      }
    }
  }

  /**
   * Collapses all sub-menus (called when side navigation collapses)
   */
  private collapseAllSubMenus(): void {
    console.log('Collapsing all sub-menus');
    this.subMenuStates.set({
      charts: false,
      maps: false,
      'regional-maps': false,
      reports: false,
    });
  }
}

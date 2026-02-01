"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusNavbar from "../../components/ModusNavbar";
import {
  ModusWcSideNavigation,
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcIcon,
} from "@trimble-oss/moduswebcomponents-react";

/**
 * Demo page showcasing the Modus Side Navigation component.
 *
 * Demonstrates side navigation features including:
 * - Navbar integration (recommended pattern)
 * - Icons that remain visible when collapsed
 * - Push mode layout
 * - State management with React hooks
 * - Interactive examples with state management
 */
export default function SideNavigationDemoPage() {
  // ============================================
  // First example state (Navbar Integration)
  // ============================================
  const [navbarMenuExpanded, setNavbarMenuExpanded] = useState(false);
  const [selectedItem1, setSelectedItem1] = useState<string | null>("home");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sideNavRef1 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef1 = useRef<any>(null);

  // User card configuration for first example
  const userCard1 = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarSrc: "",
    avatarAlt: "User Avatar",
  };

  // ============================================
  // Second example state (Sub-Menu)
  // ============================================
  const [subMenuNavbarExpanded, setSubMenuNavbarExpanded] = useState(false);
  const [subMenuStates, setSubMenuStates] = useState<Record<string, boolean>>({
    charts: false,
    maps: false,
    "map-2": false,
  });
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState<string | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sideNavRef2 = useRef<any>(null);

  // User card configuration for second example
  const userCard2 = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarSrc: "",
    avatarAlt: "User Avatar",
  };

  // ============================================
  // Helper functions (must be defined before useEffect)
  // ============================================

  /**
   * Handles expand change events (Storybook pattern).
   * Collapses all child containers and resets icons when side navigation collapses.
   */
  const handleExpandChange = useCallback((event: CustomEvent<boolean>) => {
    if (!event.detail) {
      const sideNav = sideNavRef2.current;
      if (!sideNav) return;

      // Find the parent container of the side navigation
      const container = sideNav.closest(
        ".layout-with-navbar",
      ) as HTMLElement;

      if (container) {
        // Collapse all child containers if the side navigation is collapsed
        const childrenContainers = container.querySelectorAll(
          ".side-nav-children-container",
        );
        childrenContainers.forEach((containerEl: Element) => {
          containerEl.classList.add("side-nav-hidden");
          containerEl.setAttribute("aria-hidden", "true");
        });

        // Reset all collapse icons to expand_more
        const collapseIcons = container.querySelectorAll(
          ".side-nav-dropdown-toggle",
        );
        collapseIcons.forEach((icon: Element) => {
          if (icon.getAttribute("name") === "expand_less") {
            icon.setAttribute("name", "expand_more");
          }
        });
      }
    }
  }, []);

  /**
   * Collapses all sub-menus (called when side navigation collapses).
   */
  const collapseAllSubMenus = useCallback(() => {
    console.log("Collapsing all sub-menus");
    setSubMenuStates({
      charts: false,
      maps: false,
      "map-2": false,
    });
  }, []);

  // ============================================
  // Navbar menu change handlers
  // ============================================

  /**
   * Handles navbar main menu open state changes for first example.
   * This is triggered when the hamburger menu button is clicked.
   */
  const handleNavbarMenuOpenChange1 = useCallback((isOpen: boolean) => {
    console.log("Navbar main menu open change 1 - received:", isOpen);
    // Just update React state - useEffect will sync to web component
    setNavbarMenuExpanded(isOpen);
  }, []);

  /**
   * Handles navbar main menu open state changes for second example.
   */
  const handleNavbarMenuOpenChange2 = useCallback(
    (isOpen: boolean) => {
      console.log("Navbar main menu open change 2 - received:", isOpen);
      // Just update React state - useEffect will sync to web component
      setSubMenuNavbarExpanded(isOpen);

      // Collapse all sub-menus when side navigation collapses
      if (!isOpen) {
        collapseAllSubMenus();
      }
    },
    [collapseAllSubMenus],
  );

  // ============================================
  // Sync expanded prop to web component
  // ============================================

  /**
   * Syncs React state to side navigation web component for first example.
   */
  useEffect(() => {
    const sideNav = sideNavRef1.current;
    if (sideNav && sideNav.expanded !== navbarMenuExpanded) {
      sideNav.expanded = navbarMenuExpanded;
    }
  }, [navbarMenuExpanded]);

  /**
   * Syncs React state to side navigation web component for second example.
   */
  useEffect(() => {
    const sideNav = sideNavRef2.current;
    if (sideNav && sideNav.expanded !== subMenuNavbarExpanded) {
      sideNav.expanded = subMenuNavbarExpanded;
    }
  }, [subMenuNavbarExpanded]);

  // ============================================
  // Side navigation expanded change handlers
  // ============================================

  /**
   * Handles side navigation expanded state changes for first example.
   * This syncs React state when side nav changes independently (e.g., click outside).
   */
  useEffect(() => {
    const sideNav = sideNavRef1.current;
    if (!sideNav) return;

    const handleExpandedChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const isExpanded = customEvent.detail;
      console.log("Side navigation 1 expanded change:", isExpanded);

      // Only update state if it's different to avoid circular updates
      setNavbarMenuExpanded((prev) => {
        if (prev !== isExpanded) {
          return isExpanded;
        }
        return prev;
      });
    };

    sideNav.addEventListener("expandedChange", handleExpandedChange);

    return () => {
      sideNav.removeEventListener("expandedChange", handleExpandedChange);
    };
  }, []);

  /**
   * Handles side navigation expanded state changes for second example.
   */
  useEffect(() => {
    const sideNav = sideNavRef2.current;
    if (!sideNav) return;

    const handleExpandedChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const isExpanded = customEvent.detail;
      console.log("Side navigation 2 expanded change:", isExpanded);

      // Only update state if it's different to avoid circular updates
      setSubMenuNavbarExpanded((prev) => {
        if (prev !== isExpanded) {
          // Collapse all sub-menus when side navigation collapses
          if (!isExpanded) {
            collapseAllSubMenus();
            handleExpandChange(customEvent);
          }
          return isExpanded;
        }
        return prev;
      });
    };

    sideNav.addEventListener("expandedChange", handleExpandedChange);

    return () => {
      sideNav.removeEventListener("expandedChange", handleExpandedChange);
    };
  }, [collapseAllSubMenus, handleExpandChange]);

  // Handle menu item selection for first example
  useEffect(() => {
    const menu = menuRef1.current;
    if (!menu) return;

    const handleItemSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ value: string }>;
      const value = customEvent.detail?.value;
      if (value) {
        setSelectedItem1(value);
      }
    };

    menu.addEventListener("itemSelect", handleItemSelect);

    return () => {
      menu.removeEventListener("itemSelect", handleItemSelect);
    };
  }, []);

  // Update selected state for menu items in first example
  useEffect(() => {
    const menu = menuRef1.current;
    if (!menu) return;

    const menuItems = menu.querySelectorAll("modus-wc-menu-item");
    menuItems.forEach((item: Element) => {
      const value = item.getAttribute("value");
      if (value === selectedItem1) {
        item.setAttribute("selected", "");
      } else {
        item.removeAttribute("selected");
      }
    });
  }, [selectedItem1]);

  // ============================================
  // Event handlers
  // ============================================

  /**
   * Toggles the expanded state of a sub-menu.
   */
  const toggleSubMenu = (menuKey: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Toggling sub-menu:", menuKey);

    setSubMenuStates((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  /**
   * Selects a menu item and updates the current selection.
   */
  const selectMenuItem = (itemKey: string) => {
    console.log("Selected menu item:", itemKey);
    setSelectedSubMenuItem(itemKey);
  };

  /**
   * Handles collapse toggle for sub-menus (Storybook pattern).
   */
  const handleCollapseToggle = (e: React.MouseEvent) => {
    const clickedEl = e.currentTarget as HTMLElement;
    const parentLi = clickedEl.closest("li");
    if (!parentLi) return;

    // Find the icon element that needs to be toggled using the dropdown-toggle class
    const iconEl = clickedEl.querySelector(
      ".side-nav-dropdown-toggle",
    ) as HTMLElement;
    if (!iconEl) return;

    // Find the parent side nav element
    const sideNav = sideNavRef2.current;

    // Toggle between expand_more and expand_less icons only if side nav is expanded
    const isExpanded = iconEl.getAttribute("name") === "expand_more";
    if (sideNav?.expanded) {
      iconEl.setAttribute("name", isExpanded ? "expand_less" : "expand_more");
    }

    // Find and toggle children visibility
    const childContainer = parentLi.nextElementSibling as HTMLElement;
    if (
      childContainer &&
      childContainer.classList.contains("side-nav-children-container") &&
      sideNav?.expanded
    ) {
      childContainer.classList.toggle("side-nav-hidden");
      childContainer.setAttribute(
        "aria-hidden",
        !isExpanded ? "true" : "false",
      );
    }
  };

  return (
    <>
      <style>{`
        .side-nav-children-container {
          transition: height 0.2s ease-out;
        }

        .side-nav-collapse-icon {
          min-width: 24px;
          padding-inline-start: 0.2rem;
        }

        .side-nav-dropdown-menu {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .side-nav-flex-row {
          align-items: center;
          display: flex;
          gap: 1.3rem;
          padding: 0.8rem 0.25rem;
          padding-left: 1rem;
          cursor: pointer;
        }

        .side-nav-hidden {
          display: none;
        }

        .side-nav-justify-end {
          margin-left: auto;
        }

        .layout-with-navbar {
          box-shadow: rgba(36, 35, 45, 0.3) 1px 0 4px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .main-content-row {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
          min-height: 500px;
        }

        .side-nav-menu-width {
          width: 100%;
        }

        .side-nav-nested-row {
          padding-left: 4.5rem !important;
        }

        .side-nav-deeply-nested-row {
          padding-left: 5.5rem !important;
        }

        .panel-content {
          flex: 1;
          padding: 1.5rem;
          overflow: auto;
          margin-left: 4rem; /* Account for collapsed side nav width */
        }

        .side-navigation {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          z-index: 999;
        }

        .modus-wc-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .modus-wc-menu li ul {
          margin-inline-start: 1.8rem;
        }

        .side-nav-menu-item-container {
          list-style: none;
        }

        .side-nav-submenu-item {
          padding: 0.8rem 0.25rem;
          padding-left: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .side-nav-nested-submenu {
          margin-left: 1rem;
        }

        .side-nav-icon-left {
          flex-shrink: 0;
        }
      `}</style>
      <DemoPage
        title="Modus Side Navigation"
        description="A collapsible vertical navigation component that provides contextual menu options for application navigation. The component collapses to show icons only (4rem width) and expands to show full menu items with labels. Icons remain visible and properly positioned in both states."
      >
        {/* Navbar Integration Example */}
        <DemoExample
          title="Navbar Integration (Recommended Pattern)"
          description="Side navigation controlled by the navbar's main menu button (hamburger menu). This is the standard Modus pattern used in applications."
        >
          <div
            className="layout-with-navbar h-[600px] flex flex-col"
            data-example="basic"
          >
            <ModusNavbar
              userCard={userCard1}
              visibility={{ mainMenu: true, user: true }}
              onMainMenuOpenChange={handleNavbarMenuOpenChange1}
            />

            <div className="main-content-row flex flex-1 overflow-hidden">
              <ModusWcSideNavigation
                ref={sideNavRef1}
                expanded={navbarMenuExpanded}
                collapse-on-click-outside={true}
                max-width="256px"
                mode="push"
                target-content="#basic-panel-content"
                className="side-navigation h-full"
              >
                <ModusWcMenu ref={menuRef1} size="lg">
                  <ModusWcMenuItem label="Home" value="home" selected={true}>
                    <ModusWcIcon
                      slot="start-icon"
                      name="home"
                      decorative={true}
                    />
                  </ModusWcMenuItem>
                  <ModusWcMenuItem label="Profile" value="profile">
                    <ModusWcIcon
                      slot="start-icon"
                      name="person"
                      decorative={true}
                    />
                  </ModusWcMenuItem>
                  <ModusWcMenuItem label="Settings" value="settings">
                    <ModusWcIcon
                      slot="start-icon"
                      name="settings"
                      decorative={true}
                    />
                  </ModusWcMenuItem>
                </ModusWcMenu>
              </ModusWcSideNavigation>

              <div
                id="basic-panel-content"
                className="panel-content flex-1 p-6"
              >
                <div className="text-lg font-semibold text-foreground mb-4">
                  Main Content Area
                </div>
                <div className="text-base text-foreground mb-4">
                  The side navigation of an application provides context through
                  accessible menu options and positions a consistent component
                  to connect to various pages in the application.
                </div>
                <div className="text-base text-foreground">
                  The side navigation is a collapsible side content of the
                  site's pages. It is located alongside the page's primary
                  content. The component is designed to add side content to a
                  fullscreen application. It is activated through the
                  "hamburger" menu in the Navbar.
                </div>
                <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                  <div className="text-sm font-medium text-card-foreground mb-1">
                    Navigation State:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {navbarMenuExpanded ? "Expanded" : "Collapsed"}
                  </div>
                  {selectedItem1 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-card-foreground mb-1">
                        Selected Item:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedItem1}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DemoExample>

        {/* Sub-Menu Example */}
        <DemoExample
          title="Side Navigation with Sub-Menus"
          description="Advanced side navigation with collapsible sub-menus and nested menu items. Demonstrates hierarchical navigation with expand/collapse functionality."
        >
          <div
            className="layout-with-navbar h-[700px] flex flex-col"
            data-example="submenu"
          >
            <ModusNavbar
              userCard={userCard2}
              visibility={{ mainMenu: true, user: true }}
              onMainMenuOpenChange={handleNavbarMenuOpenChange2}
            />

            <div className="main-content-row flex flex-1 overflow-hidden">
              <ModusWcSideNavigation
                ref={sideNavRef2}
                expanded={subMenuNavbarExpanded}
                collapse-on-click-outside={true}
                max-width="256px"
                mode="push"
                target-content="#submenu-panel-content"
                className="side-navigation h-full"
              >
                <ModusWcMenu
                  aria-label="Custom menu"
                  custom-class="side-nav-menu-width"
                >
                  {/* Charts Menu with Sub-items */}
                  <li>
                    <div
                      className="side-nav-flex-row hover:bg-muted"
                      onClick={handleCollapseToggle}
                    >
                      <ModusWcIcon
                        name="bar_graph"
                        decorative={true}
                        className="side-nav-collapse-icon side-nav-icon-left"
                      />
                      <div className="side-nav-dropdown-menu">Charts</div>
                      <div className="side-nav-justify-end">
                        <ModusWcIcon
                          decorative={true}
                          name="expand_more"
                          className="side-nav-collapse-icon side-nav-dropdown-toggle"
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    className="side-nav-children-container side-nav-hidden"
                    aria-hidden="true"
                  >
                    <ul>
                      <li>
                        <div
                          className="side-nav-flex-row side-nav-nested-row hover:bg-muted"
                          onClick={() => selectMenuItem("bar-chart")}
                        >
                          <div>Bar Chart</div>
                        </div>
                      </li>
                      <li>
                        <div
                          className="side-nav-flex-row side-nav-nested-row hover:bg-muted"
                          onClick={() => selectMenuItem("line-chart")}
                        >
                          <div>Line Chart</div>
                        </div>
                      </li>
                      <li>
                        <div
                          className="side-nav-flex-row side-nav-nested-row hover:bg-muted"
                          onClick={() => selectMenuItem("pie-chart")}
                        >
                          <div>Pie Chart</div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  {/* Calendar Menu (no sub-items) */}
                  <li>
                    <div
                      className="side-nav-flex-row hover:bg-muted"
                      onClick={() => selectMenuItem("calendar")}
                    >
                      <ModusWcIcon
                        name="calendar"
                        decorative={true}
                        className="side-nav-collapse-icon side-nav-icon-left"
                      />
                      <div className="side-nav-dropdown-menu">Calendar</div>
                    </div>
                  </li>

                  {/* Maps Menu with Sub-items (using state-based approach) */}
                  <div className="side-nav-menu-item-container">
                    <div
                      className="side-nav-flex-row hover:bg-muted"
                      onClick={(e) => toggleSubMenu("maps", e)}
                    >
                      <ModusWcIcon
                        name="compass"
                        decorative={true}
                        className="side-nav-collapse-icon side-nav-icon-left"
                      />
                      <div className="side-nav-dropdown-menu">Maps</div>
                      <div className="side-nav-justify-end">
                        <ModusWcIcon
                          name={
                            subMenuStates["maps"]
                              ? "expand_less"
                              : "expand_more"
                          }
                          decorative={true}
                          className="side-nav-collapse-icon side-nav-dropdown-toggle"
                        />
                      </div>
                    </div>
                    <div
                      className={`side-nav-children-container ${
                        !subMenuStates["maps"] ? "side-nav-hidden" : ""
                      }`}
                      aria-hidden={!subMenuStates["maps"]}
                    >
                      <div
                        className="side-nav-submenu-item side-nav-nested-row hover:bg-muted"
                        onClick={() => selectMenuItem("map-1")}
                      >
                        <div>Map 1</div>
                      </div>
                      <div
                        className="side-nav-submenu-item side-nav-nested-row hover:bg-muted"
                        onClick={(e) => toggleSubMenu("map-2", e)}
                      >
                        <div>Map 2</div>
                        <div className="side-nav-justify-end">
                          <ModusWcIcon
                            name={
                              subMenuStates["map-2"]
                                ? "expand_less"
                                : "expand_more"
                            }
                            decorative={true}
                            className="side-nav-collapse-icon side-nav-dropdown-toggle"
                          />
                        </div>
                      </div>
                      <div
                        className={`side-nav-children-container side-nav-nested-submenu ${
                          !subMenuStates["map-2"] ? "side-nav-hidden" : ""
                        }`}
                        aria-hidden={!subMenuStates["map-2"]}
                      >
                        <div
                          className="side-nav-submenu-item side-nav-deeply-nested-row hover:bg-muted"
                          onClick={() => selectMenuItem("map-2-1")}
                        >
                          <div>Map 2-1</div>
                        </div>
                        <div
                          className="side-nav-submenu-item side-nav-deeply-nested-row hover:bg-muted"
                          onClick={() => selectMenuItem("map-2-2")}
                        >
                          <div>Map 2-2</div>
                        </div>
                      </div>
                      <div
                        className="side-nav-submenu-item side-nav-nested-row hover:bg-muted"
                        onClick={() => selectMenuItem("map-3")}
                      >
                        <div>Map 3</div>
                      </div>
                    </div>
                  </div>
                </ModusWcMenu>
              </ModusWcSideNavigation>

              <div
                id="submenu-panel-content"
                className="panel-content flex-1 p-6"
              >
                <div className="text-lg font-semibold text-foreground mb-4">
                  Sub-Menu Navigation
                </div>
                <div className="text-base text-foreground mb-4">
                  This example demonstrates hierarchical navigation with
                  collapsible sub-menus. Click on menu items with arrows to
                  expand/collapse sub-menus. The navigation maintains state and
                  properly handles nested menu structures.
                </div>
                <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                  <div className="text-sm font-medium text-card-foreground mb-2">
                    Current Selection:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSubMenuItem || "No item selected"}
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-muted">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Sub-Menu States:
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>
                      Charts:{" "}
                      {subMenuStates["charts"] ? "Expanded" : "Collapsed"}
                    </div>
                    <div>
                      Maps: {subMenuStates["maps"] ? "Expanded" : "Collapsed"}
                    </div>
                    <div>
                      Map 2: {subMenuStates["map-2"] ? "Expanded" : "Collapsed"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-card border border-border">
                  <div className="text-sm font-medium text-card-foreground mb-1">
                    Navigation State:
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {subMenuNavbarExpanded ? "Expanded" : "Collapsed"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoExample>
      </DemoPage>
    </>
  );
}

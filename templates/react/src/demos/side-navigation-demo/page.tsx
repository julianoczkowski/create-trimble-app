"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import {
  ModusWcSideNavigation,
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcIcon,
  ModusWcNavbar,
} from "@trimble-oss/moduswebcomponents-react";

export default function SideNavigationDemoPage() {
  // First example state
  const [expanded1, setExpanded1] = useState(false);
  const [selectedItem1, setSelectedItem1] = useState<string | null>("home");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sideNavRef1 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef1 = useRef<any>(null);

  // Second example state
  const [expanded2, setExpanded2] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sideNavRef2 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef2 = useRef<any>(null);

  // First example handlers
  const handleMenuOpenChange1 = useCallback((e: Event) => {
    const customEvent = e as CustomEvent<boolean>;
    const newExpanded = customEvent.detail;
    setExpanded1(newExpanded);
  }, []);

  // Set up event listeners for first example
  useEffect(() => {
    const sideNav = sideNavRef1.current;
    if (!sideNav) return;

    sideNav.addEventListener("expandedChange", handleMenuOpenChange1);

    return () => {
      sideNav.removeEventListener("expandedChange", handleMenuOpenChange1);
    };
  }, [handleMenuOpenChange1]);

  useEffect(() => {
    const menu = menuRef1.current;
    if (!menu) return;

    const menuItems = menu.querySelectorAll("modus-wc-menu-item");
    const handleItemSelect = (e: Event) => {
      const target = e.target as HTMLElement;
      menuItems.forEach((item: Element) => item.removeAttribute("selected"));
      target.setAttribute("selected", "");
      const label = target.getAttribute("label");
      if (label) {
        setSelectedItem1(label);
      }
    };

    menuItems.forEach((item: Element) => {
      item.addEventListener("itemSelect", handleItemSelect);
    });

    return () => {
      menuItems.forEach((item: Element) => {
        item.removeEventListener("itemSelect", handleItemSelect);
      });
    };
  }, []);

  // Update selected state for menu items in first example
  useEffect(() => {
    const menu = menuRef1.current;
    if (!menu) return;

    const menuItems = menu.querySelectorAll("modus-wc-menu-item");
    menuItems.forEach((item: Element) => {
      const label = item.getAttribute("label");
      if (label === selectedItem1) {
        item.setAttribute("selected", "");
      } else {
        item.removeAttribute("selected");
      }
    });
  }, [selectedItem1]);

  // Set initial selected state
  useEffect(() => {
    const menu = menuRef1.current;
    if (!menu) return;

    const menuItems = menu.querySelectorAll("modus-wc-menu-item");
    menuItems.forEach((item: Element) => {
      const label = item.getAttribute("label");
      if (label === "home") {
        item.setAttribute("selected", "");
      }
    });
  }, []);

  // Synchronize expanded state for first example
  useEffect(() => {
    const sideNav = sideNavRef1.current;
    if (sideNav && sideNav.expanded !== expanded1) {
      sideNav.expanded = expanded1;
    }
  }, [expanded1]);

  // Second example handlers
  const handleMenuOpenChange2 = useCallback((e: Event) => {
    const customEvent = e as CustomEvent<boolean>;
    const newExpanded = customEvent.detail;
    setExpanded2(newExpanded);

    // Collapse all child containers when side nav collapses
    if (!newExpanded) {
      const container = sideNavRef2.current?.closest(".layout-with-navbar");
      if (container) {
        const childrenContainers = container.querySelectorAll(
          ".children-container"
        );
        childrenContainers.forEach((container: Element) => {
          container.classList.add("hidden");
          container.setAttribute("aria-hidden", "true");
        });

        const collapseIcons = container.querySelectorAll(".dropdown-toggle");
        collapseIcons.forEach((icon: Element) => {
          if (icon.getAttribute("name") === "expand_less") {
            icon.setAttribute("name", "expand_more");
          }
        });
      }
    }
  }, []);

  const handleCollapseToggle = useCallback((e: React.MouseEvent) => {
    const clickedEl = e.currentTarget as HTMLElement;
    const parentLi = clickedEl.closest("li");
    if (!parentLi) return;

    const iconEl = clickedEl.querySelector(".dropdown-toggle") as HTMLElement;
    if (!iconEl) return;

    const sideNav = sideNavRef2.current;
    const isExpanded = iconEl.getAttribute("name") === "expand_more";

    // Toggle icon only if side nav is expanded
    if (sideNav && sideNav.expanded) {
      iconEl.setAttribute("name", isExpanded ? "expand_less" : "expand_more");
    }

    // Find and toggle children visibility
    const childContainer = parentLi.nextElementSibling as HTMLElement;
    if (
      childContainer &&
      childContainer.classList.contains("children-container") &&
      sideNav &&
      sideNav.expanded
    ) {
      const isExpanded = iconEl.getAttribute("name") === "expand_more";
      childContainer.classList.toggle("hidden");
      childContainer.setAttribute(
        "aria-hidden",
        !isExpanded ? "true" : "false"
      );
    }
  }, []);

  // Set up event listeners for second example
  useEffect(() => {
    const sideNav = sideNavRef2.current;
    if (!sideNav) return;

    sideNav.addEventListener("expandedChange", handleMenuOpenChange2);

    return () => {
      sideNav.removeEventListener("expandedChange", handleMenuOpenChange2);
    };
  }, [handleMenuOpenChange2]);

  // Synchronize expanded state for second example
  useEffect(() => {
    const sideNav = sideNavRef2.current;
    if (sideNav && sideNav.expanded !== expanded2) {
      sideNav.expanded = expanded2;
    }
  }, [expanded2]);

  return (
    <>
      <style>{`
        .children-container {
          transition: height 0.2s ease-out;
        }

        .collapse-icon {
          min-width: 24px;
          padding-inline-start: 0.2rem;
        }

        .dropdown-menu {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .flex-row {
          align-items: center;
          display: flex;
          gap: 1.3rem;
          padding: 0.8rem 0.25rem;
          padding-left: 1rem;
        }

        .hidden {
          display: none;
        }

        .justify-end {
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
        }

        .menu-width {
          width: 100%;
        }

        .modus-wc-menu li ul {
          margin-inline-start: 1.8rem;
        }

        .nested-row {
          padding-left: 4.5rem !important;
        }

        .panel-content {
          margin-left: 4rem;
          padding: 10px;
        }

        .side-navigation {
          align-self: flex-start;
          height: 500px;
          position: relative;
        }

        .modus-wc-menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <DemoPage
        title="Modus Side Navigation"
        description="Side navigation gives people persistent access to major areas of the product. Keep the list short and use icons when it helps recognition."
      >
        <DemoExample
          title="Side Navigation with Icons"
          description="A collapsible vertical navigation component that shows icons in both collapsed (4rem width) and expanded states. Icons remain visible in collapsed state for easy recognition."
        >
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex gap-4 items-center">
              <ModusButton
                color="primary"
                size="sm"
                onButtonClick={() => setExpanded1(!expanded1)}
              >
                {expanded1 ? "Collapse" : "Expand"} Navigation
              </ModusButton>
              <div className="text-sm text-muted-foreground">
                Current state: {expanded1 ? "Expanded" : "Collapsed"}
              </div>
              {selectedItem1 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedItem1}
                </div>
              )}
            </div>

            {/* Navigation with content */}
            <div className="layout-with-navbar side-nav-layout">
              <ModusWcNavbar
                app-title="Modus App"
                className="navbar side-nav-navbar"
              />
              <div className="main-content-row">
                <ModusWcSideNavigation
                  ref={sideNavRef1}
                  className="side-navigation"
                  collapse-on-click-outside="true"
                  expanded={expanded1}
                  max-width="256px"
                  mode="push"
                  target-content=".panel-content-1"
                >
                  <ModusWcMenu ref={menuRef1} size="lg">
                    <ModusWcMenuItem label="home">
                      <ModusWcIcon slot="start-icon" name="home" />
                    </ModusWcMenuItem>
                    <ModusWcMenuItem label="profile">
                      <ModusWcIcon slot="start-icon" name="person" />
                    </ModusWcMenuItem>
                    <ModusWcMenuItem label="settings">
                      <ModusWcIcon slot="start-icon" name="gears" />
                    </ModusWcMenuItem>
                  </ModusWcMenu>
                </ModusWcSideNavigation>
                <div className="panel-content panel-content-1 side-nav-panel-content">
                  <div className="text-foreground">
                    <div className="mb-4">
                      The side navigation of an application provides context
                      through accessible menu options and positions a consistent
                      component to connect to various pages in the application.
                    </div>
                    <div>
                      The side navigation is a collapsible side content of the
                      site's pages. It is located alongside the page's primary
                      content. The component is designed to add side content to
                      a fullscreen application. It is activated through the
                      "hamburger" menu in the Navbar.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoExample>

        <DemoExample
          title="Side Navigation with Collapsible Elements"
          description="A collapsible side navigation with expandable menu items that can contain nested items. Supports multi-level nesting and proper state management."
        >
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex gap-4 items-center">
              <ModusButton
                color="primary"
                size="sm"
                onButtonClick={() => setExpanded2(!expanded2)}
              >
                {expanded2 ? "Collapse" : "Expand"} Navigation
              </ModusButton>
              <div className="text-sm text-muted-foreground">
                Current state: {expanded2 ? "Expanded" : "Collapsed"}
              </div>
            </div>

            {/* Navigation with content */}
            <div className="layout-with-navbar side-nav-layout">
              <ModusWcNavbar
                app-title="Modus App"
                className="navbar side-nav-navbar"
              />
              <div className="main-content-row">
                <ModusWcSideNavigation
                  ref={sideNavRef2}
                  className="side-navigation"
                  collapse-on-click-outside="true"
                  expanded={expanded2}
                  max-width="256px"
                  mode="push"
                  target-content=".panel-content-2"
                >
                  <ModusWcMenu
                    ref={menuRef2}
                    aria-label="Custom menu"
                    custom-class="menu-width"
                  >
                    <li>
                      <div
                        className="flex-row side-nav-clickable"
                        onClick={handleCollapseToggle}
                      >
                        <ModusWcIcon
                          decorative={true}
                          name="bar_graph"
                          className="collapse-icon icon-left"
                        />
                        <div className="dropdown-menu">Charts</div>
                        <div className="justify-end">
                          <ModusWcIcon
                            decorative={true}
                            name="expand_more"
                            className="collapse-icon dropdown-toggle"
                          />
                        </div>
                      </div>
                    </li>
                    <li
                      className="children-container hidden"
                      aria-hidden="true"
                    >
                      <ul>
                        <li>
                          <div className="flex-row nested-row">
                            <div>Bar Chart</div>
                          </div>
                        </li>
                        <li>
                          <div className="flex-row nested-row">
                            <div>Line Chart</div>
                          </div>
                        </li>
                      </ul>
                    </li>

                    {/* Item without children */}
                    <li>
                      <div className="flex-row">
                        <ModusWcIcon
                          decorative={true}
                          name="calendar"
                          className="collapse-icon icon-left"
                        />
                        <div className="dropdown-menu">Calendar</div>
                      </div>
                    </li>

                    {/* Second parent group (collapsed) */}
                    <li>
                      <div
                        className="flex-row side-nav-clickable"
                        onClick={handleCollapseToggle}
                      >
                        <ModusWcIcon
                          decorative={true}
                          name="compass"
                          className="collapse-icon icon-left"
                        />
                        <div className="dropdown-menu">Maps</div>
                        <div className="justify-end">
                          <ModusWcIcon
                            decorative={true}
                            name="expand_more"
                            className="collapse-icon dropdown-toggle"
                          />
                        </div>
                      </div>
                    </li>
                    <li
                      className="children-container hidden"
                      aria-hidden="true"
                    >
                      <ul>
                        <li>
                          <div className="flex-row nested-row">
                            <div>Map 1</div>
                          </div>
                        </li>
                        <li>
                          <div
                            className="flex-row nested-row side-nav-clickable"
                            onClick={handleCollapseToggle}
                          >
                            <div>Map 2</div>
                            <div className="justify-end">
                              <ModusWcIcon
                                decorative={true}
                                name="expand_more"
                                className="collapse-icon dropdown-toggle"
                              />
                            </div>
                          </div>
                        </li>
                        <li
                          className="children-container hidden"
                          aria-hidden="true"
                        >
                          <ul>
                            <li>
                              <div className="flex-row side-nav-nested-indent">
                                <div>Map 1</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex-row side-nav-nested-indent">
                                <div>Map 2</div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <div className="flex-row nested-row">
                            <div>Map 3</div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ModusWcMenu>
                </ModusWcSideNavigation>
                <div className="panel-content panel-content-2 side-nav-panel-content">
                  <div className="text-foreground">
                    <div className="mb-4">
                      The side navigation of an application provides context
                      through accessible menu options and positions a consistent
                      component to connect to various pages in the application.
                    </div>
                    <div>
                      The side navigation is a collapsible side content of the
                      site's pages. It is located alongside the page's primary
                      content. The component is designed to add side content to
                      a fullscreen application. It is activated through the
                      "hamburger" menu in the Navbar.
                    </div>
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

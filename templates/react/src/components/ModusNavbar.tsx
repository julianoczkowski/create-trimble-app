import { ModusWcNavbar } from "@trimble-oss/moduswebcomponents-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

// Type definitions for navbar interfaces
interface NavbarUserCard {
  name: string;
  email: string;
  avatarSrc?: string;
}

interface NavbarVisibility {
  mainMenu?: boolean;
  search?: boolean;
  searchInput?: boolean;
  notifications?: boolean;
  apps?: boolean;
  ai?: boolean;
  help?: boolean;
  user?: boolean;
}

interface NavbarTextOverrides {
  apps?: string;
  help?: string;
  notifications?: string;
  search?: string;
}

/**
 * Props for the ModusNavbar component.
 */
interface ModusNavbarProps {
  /** Whether the navbar should be condensed. */
  condensed?: boolean;
  /** The user card information to display. */
  userCard: NavbarUserCard;
  /** Controls the visibility of different parts of the navbar. */
  visibility?: NavbarVisibility;
  /** Whether the main menu is open. */
  mainMenuOpen?: boolean;
  /** Whether the notifications menu is open. */
  notificationsMenuOpen?: boolean;
  /** Whether the apps menu is open. */
  appsMenuOpen?: boolean;
  /** Whether the search input is open. */
  searchInputOpen?: boolean;
  /** Whether the user menu is open. */
  userMenuOpen?: boolean;
  /** Whether the condensed menu is open. */
  condensedMenuOpen?: boolean;
  /** The debounce time in milliseconds for search input changes. */
  searchDebounceMs?: number;
  /** Text overrides for condensed mode. */
  textOverrides?: NavbarTextOverrides;
  /** A custom CSS class to apply to the navbar. */
  customClass?: string;
  /** The content to display in the main menu. */
  mainMenuContent?: ReactNode;
  /** The content to display in the notifications menu. */
  notificationsContent?: ReactNode;
  /** The content to display in the apps menu. */
  appsContent?: ReactNode;
  /** The content to display at the start of the navbar. */
  startContent?: ReactNode;
  /** The content to display in the center of the navbar. */
  centerContent?: ReactNode;
  /** The content to display at the end of the navbar. */
  endContent?: ReactNode;
  /** A callback function to handle AI clicks. */
  onAiClick?: () => void;
  /** A callback function to handle apps clicks. */
  onAppsClick?: () => void;
  /** A callback function to handle help clicks. */
  onHelpClick?: () => void;
  /** A callback function to handle notifications clicks. */
  onNotificationsClick?: () => void;
  /** A callback function to handle search clicks. */
  onSearchClick?: () => void;
  /** A callback function to handle sign out clicks. */
  onSignOutClick?: () => void;
  /** A callback function to handle "My Trimble" clicks. */
  onMyTrimbleClick?: () => void;
  /** A callback function to handle Trimble logo clicks. */
  onTrimbleLogoClick?: () => void;
  /** A callback function to handle search input changes. */
  onSearchChange?: (value: string) => void;
  /** A callback function to handle main menu open changes. */
  onMainMenuOpenChange?: (open: boolean) => void;
  /** A callback function to handle notifications menu open changes. */
  onNotificationsMenuOpenChange?: (open: boolean) => void;
  /** A callback function to handle apps menu open changes. */
  onAppsMenuOpenChange?: (open: boolean) => void;
  /** A callback function to handle search input open changes. */
  onSearchInputOpenChange?: (open: boolean) => void;
  /** A callback function to handle user menu open changes. */
  onUserMenuOpenChange?: (open: boolean) => void;
  /** A callback function to handle condensed menu open changes. */
  onCondensedMenuOpenChange?: (open: boolean) => void;
  /** The ARIA label for the navbar. */
  ariaLabel?: string;
}

/**
 * Renders a Modus navbar component.
 * @param {ModusNavbarProps} props - The component props.
 * @returns {JSX.Element} The rendered navbar component.
 */
export default function ModusNavbar({
  condensed = false,
  userCard,
  visibility = {
    mainMenu: true,
    search: true,
    searchInput: true,
    notifications: true,
    apps: true,
    ai: true,
    help: true,
    user: true,
  },
  mainMenuOpen = false,
  notificationsMenuOpen = false,
  appsMenuOpen = false,
  searchInputOpen = false,
  userMenuOpen = false,
  condensedMenuOpen = false,
  searchDebounceMs = 300,
  textOverrides,
  customClass,
  mainMenuContent,
  notificationsContent,
  appsContent,
  startContent,
  centerContent,
  endContent,
  onAiClick,
  onAppsClick,
  onHelpClick,
  onNotificationsClick,
  onSearchClick,
  onSignOutClick,
  onMyTrimbleClick,
  onTrimbleLogoClick,
  onSearchChange,
  onMainMenuOpenChange,
  onNotificationsMenuOpenChange,
  onAppsMenuOpenChange,
  onSearchInputOpenChange,
  onUserMenuOpenChange,
  onCondensedMenuOpenChange,
  ariaLabel,
}: ModusNavbarProps) {
  const navbarRef = useRef<HTMLElement>(null);

  // Event handlers with useCallback for performance
  /**
   * Handles AI button click events.
   *
   * @private
   */
  const handleAiClick = useCallback(() => {
    onAiClick?.();
  }, [onAiClick]);

  /**
   * Handles apps menu button click events.
   *
   * @private
   */
  const handleAppsClick = useCallback(() => {
    onAppsClick?.();
  }, [onAppsClick]);

  /**
   * Handles help button click events.
   *
   * @private
   */
  const handleHelpClick = useCallback(() => {
    onHelpClick?.();
  }, [onHelpClick]);

  /**
   * Handles notifications button click events.
   *
   * @private
   */
  const handleNotificationsClick = useCallback(() => {
    onNotificationsClick?.();
  }, [onNotificationsClick]);

  /**
   * Handles search button click events.
   *
   * @private
   */
  const handleSearchClick = useCallback(() => {
    onSearchClick?.();
  }, [onSearchClick]);

  /**
   * Handles sign out button click events.
   *
   * @private
   */
  const handleSignOutClick = useCallback(() => {
    onSignOutClick?.();
  }, [onSignOutClick]);

  /**
   * Handles My Trimble button click events.
   *
   * @private
   */
  const handleMyTrimbleClick = useCallback(() => {
    onMyTrimbleClick?.();
  }, [onMyTrimbleClick]);

  /**
   * Handles Trimble logo click events.
   *
   * @private
   */
  const handleTrimbleLogoClick = useCallback(() => {
    onTrimbleLogoClick?.();
  }, [onTrimbleLogoClick]);

  /**
   * Handles search input change events with debouncing.
   *
   * @param {Event} event - The search input change event
   * @private
   */
  const handleSearchChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>;
      onSearchChange?.(customEvent.detail.value);
    },
    [onSearchChange]
  );

  /**
   * Handles main menu open/close state changes.
   *
   * @param {Event} event - The menu state change event
   * @private
   */
  const handleMainMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onMainMenuOpenChange?.(customEvent.detail);
    },
    [onMainMenuOpenChange]
  );

  /**
   * Handles notifications menu open/close state changes.
   *
   * @param {Event} event - The menu state change event
   * @private
   */
  const handleNotificationsMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onNotificationsMenuOpenChange?.(customEvent.detail);
    },
    [onNotificationsMenuOpenChange]
  );

  /**
   * Handles apps menu open/close state changes.
   *
   * @param {Event} event - The menu state change event
   * @private
   */
  const handleAppsMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onAppsMenuOpenChange?.(customEvent.detail);
    },
    [onAppsMenuOpenChange]
  );

  /**
   * Handles search input open/close state changes.
   *
   * @param {Event} event - The search input state change event
   * @private
   */
  const handleSearchInputOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onSearchInputOpenChange?.(customEvent.detail);
    },
    [onSearchInputOpenChange]
  );

  /**
   * Handles user menu open/close state changes.
   *
   * @param {Event} event - The menu state change event
   * @private
   */
  const handleUserMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onUserMenuOpenChange?.(customEvent.detail);
    },
    [onUserMenuOpenChange]
  );

  /**
   * Handles condensed menu open/close state changes.
   *
   * @param {Event} event - The menu state change event
   * @private
   */
  const handleCondensedMenuOpenChange = useCallback(
    (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      onCondensedMenuOpenChange?.(customEvent.detail);
    },
    [onCondensedMenuOpenChange]
  );

  // Set up event listeners when component mounts
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Add event listeners
    navbar.addEventListener("aiClick", handleAiClick);
    navbar.addEventListener("appsClick", handleAppsClick);
    navbar.addEventListener("helpClick", handleHelpClick);
    navbar.addEventListener("notificationsClick", handleNotificationsClick);
    navbar.addEventListener("searchClick", handleSearchClick);
    navbar.addEventListener("signOutClick", handleSignOutClick);
    navbar.addEventListener("myTrimbleClick", handleMyTrimbleClick);
    navbar.addEventListener("trimbleLogoClick", handleTrimbleLogoClick);
    navbar.addEventListener("searchChange", handleSearchChange);
    navbar.addEventListener("mainMenuOpenChange", handleMainMenuOpenChange);
    navbar.addEventListener(
      "notificationsMenuOpenChange",
      handleNotificationsMenuOpenChange
    );
    navbar.addEventListener("appsMenuOpenChange", handleAppsMenuOpenChange);
    navbar.addEventListener(
      "searchInputOpenChange",
      handleSearchInputOpenChange
    );
    navbar.addEventListener("userMenuOpenChange", handleUserMenuOpenChange);
    navbar.addEventListener(
      "condensedMenuOpenChange",
      handleCondensedMenuOpenChange
    );

    // Cleanup event listeners
    return () => {
      navbar.removeEventListener("aiClick", handleAiClick);
      navbar.removeEventListener("appsClick", handleAppsClick);
      navbar.removeEventListener("helpClick", handleHelpClick);
      navbar.removeEventListener(
        "notificationsClick",
        handleNotificationsClick
      );
      navbar.removeEventListener("searchClick", handleSearchClick);
      navbar.removeEventListener("signOutClick", handleSignOutClick);
      navbar.removeEventListener("myTrimbleClick", handleMyTrimbleClick);
      navbar.removeEventListener("trimbleLogoClick", handleTrimbleLogoClick);
      navbar.removeEventListener("searchChange", handleSearchChange);
      navbar.removeEventListener(
        "mainMenuOpenChange",
        handleMainMenuOpenChange
      );
      navbar.removeEventListener(
        "notificationsMenuOpenChange",
        handleNotificationsMenuOpenChange
      );
      navbar.removeEventListener(
        "appsMenuOpenChange",
        handleAppsMenuOpenChange
      );
      navbar.removeEventListener(
        "searchInputOpenChange",
        handleSearchInputOpenChange
      );
      navbar.removeEventListener(
        "userMenuOpenChange",
        handleUserMenuOpenChange
      );
      navbar.removeEventListener(
        "condensedMenuOpenChange",
        handleCondensedMenuOpenChange
      );
    };
  }, [
    handleAiClick,
    handleAppsClick,
    handleHelpClick,
    handleNotificationsClick,
    handleSearchClick,
    handleSignOutClick,
    handleMyTrimbleClick,
    handleTrimbleLogoClick,
    handleSearchChange,
    handleMainMenuOpenChange,
    handleNotificationsMenuOpenChange,
    handleAppsMenuOpenChange,
    handleSearchInputOpenChange,
    handleUserMenuOpenChange,
    handleCondensedMenuOpenChange,
  ]);

  // Update navbar properties when props change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navbar = navbarRef.current as any;
    if (!navbar) return;

    // Update visibility
    navbar.visibility = visibility;

    // Update user card
    navbar.userCard = userCard;

    // Update text overrides
    if (textOverrides) {
      navbar.textOverrides = textOverrides;
    }

    // Update search debounce
    navbar.searchDebounceMs = searchDebounceMs;

    // Update menu states
    navbar.mainMenuOpen = mainMenuOpen;
    navbar.notificationsMenuOpen = notificationsMenuOpen;
    navbar.appsMenuOpen = appsMenuOpen;
    navbar.searchInputOpen = searchInputOpen;
    navbar.userMenuOpen = userMenuOpen;
    navbar.condensedMenuOpen = condensedMenuOpen;
  }, [
    visibility,
    userCard,
    textOverrides,
    searchDebounceMs,
    mainMenuOpen,
    notificationsMenuOpen,
    appsMenuOpen,
    searchInputOpen,
    userMenuOpen,
    condensedMenuOpen,
  ]);

  return (
    <ModusWcNavbar
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={navbarRef as any}
      condensed={condensed}
      custom-class={customClass}
      aria-label={ariaLabel}
    >
      {/* Main Menu Slot */}
      {mainMenuContent && <div slot="main-menu">{mainMenuContent}</div>}

      {/* Notifications Slot */}
      {notificationsContent && (
        <div slot="notifications">{notificationsContent}</div>
      )}

      {/* Apps Slot */}
      {appsContent && <div slot="apps">{appsContent}</div>}

      {/* Start Slot */}
      {startContent && <div slot="start">{startContent}</div>}

      {/* Center Slot */}
      {centerContent && <div slot="center">{centerContent}</div>}

      {/* End Slot */}
      {endContent && <div slot="end">{endContent}</div>}
    </ModusWcNavbar>
  );
}

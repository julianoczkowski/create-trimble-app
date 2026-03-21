import { createEffect, onMount, onCleanup, Show, type Component } from "solid-js";
import type { JSX } from "solid-js";

interface NavbarUserCard {
  name: string;
  email: string;
  avatarSrc?: string;
  avatarAlt?: string;
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
  condensed?: boolean;
  userCard: NavbarUserCard;
  visibility?: NavbarVisibility;
  mainMenuOpen?: boolean;
  notificationsMenuOpen?: boolean;
  appsMenuOpen?: boolean;
  searchInputOpen?: boolean;
  userMenuOpen?: boolean;
  condensedMenuOpen?: boolean;
  searchDebounceMs?: number;
  textOverrides?: NavbarTextOverrides;
  customClass?: string;
  mainMenuContent?: JSX.Element;
  notificationsContent?: JSX.Element;
  appsContent?: JSX.Element;
  startContent?: JSX.Element;
  centerContent?: JSX.Element;
  endContent?: JSX.Element;
  onAiClick?: () => void;
  onAppsClick?: () => void;
  onHelpClick?: () => void;
  onNotificationsClick?: () => void;
  onSearchClick?: () => void;
  onSignOutClick?: () => void;
  onMyTrimbleClick?: () => void;
  onTrimbleLogoClick?: () => void;
  onSearchChange?: (value: string) => void;
  onMainMenuOpenChange?: (open: boolean) => void;
  onNotificationsMenuOpenChange?: (open: boolean) => void;
  onAppsMenuOpenChange?: (open: boolean) => void;
  onSearchInputOpenChange?: (open: boolean) => void;
  onUserMenuOpenChange?: (open: boolean) => void;
  onCondensedMenuOpenChange?: (open: boolean) => void;
  ariaLabel?: string;
}

/**
 * Renders a Modus navbar component.
 * @param {ModusNavbarProps} props - The component props.
 * @returns {JSX.Element} The rendered navbar component.
 */
const ModusNavbar: Component<ModusNavbarProps> = (props) => {
  let navbarEl: HTMLElement | undefined;

  const handleAiClick = () => props.onAiClick?.();
  const handleAppsClick = () => props.onAppsClick?.();
  const handleHelpClick = () => props.onHelpClick?.();
  const handleNotificationsClick = () => props.onNotificationsClick?.();
  const handleSearchClick = () => props.onSearchClick?.();
  const handleSignOutClick = () => props.onSignOutClick?.();
  const handleMyTrimbleClick = () => props.onMyTrimbleClick?.();
  const handleTrimbleLogoClick = () => props.onTrimbleLogoClick?.();
  const handleSearchChange = (e: Event) => {
    const ce = e as CustomEvent<{ value: string }>;
    props.onSearchChange?.(ce.detail.value);
  };
  const handleMainMenuOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onMainMenuOpenChange?.(ce.detail);
  };
  const handleNotificationsMenuOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onNotificationsMenuOpenChange?.(ce.detail);
  };
  const handleAppsMenuOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onAppsMenuOpenChange?.(ce.detail);
  };
  const handleSearchInputOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onSearchInputOpenChange?.(ce.detail);
  };
  const handleUserMenuOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onUserMenuOpenChange?.(ce.detail);
  };
  const handleCondensedMenuOpenChange = (e: Event) => {
    const ce = e as CustomEvent<boolean>;
    props.onCondensedMenuOpenChange?.(ce.detail);
  };

  onMount(() => {
    const navbar = navbarEl as Record<string, unknown> | undefined;
    if (navbar) {
      navbar.userCard = props.userCard;
      navbar.visibility = props.visibility ?? {
        mainMenu: true,
        search: true,
        searchInput: true,
        notifications: true,
        apps: true,
        ai: true,
        help: true,
        user: true,
      };
      if (props.textOverrides) {
        navbar.textOverrides = props.textOverrides;
      }
      navbar.searchDebounceMs = props.searchDebounceMs ?? 300;
      navbar.mainMenuOpen = props.mainMenuOpen ?? false;
      navbar.notificationsMenuOpen = props.notificationsMenuOpen ?? false;
      navbar.appsMenuOpen = props.appsMenuOpen ?? false;
      navbar.searchInputOpen = props.searchInputOpen ?? false;
      navbar.userMenuOpen = props.userMenuOpen ?? false;
      navbar.condensedMenuOpen = props.condensedMenuOpen ?? false;
    }

    navbarEl?.addEventListener("aiClick", handleAiClick);
    navbarEl?.addEventListener("appsClick", handleAppsClick);
    navbarEl?.addEventListener("helpClick", handleHelpClick);
    navbarEl?.addEventListener("notificationsClick", handleNotificationsClick);
    navbarEl?.addEventListener("searchClick", handleSearchClick);
    navbarEl?.addEventListener("signOutClick", handleSignOutClick);
    navbarEl?.addEventListener("myTrimbleClick", handleMyTrimbleClick);
    navbarEl?.addEventListener("trimbleLogoClick", handleTrimbleLogoClick);
    navbarEl?.addEventListener("searchChange", handleSearchChange);
    navbarEl?.addEventListener("mainMenuOpenChange", handleMainMenuOpenChange);
    navbarEl?.addEventListener("notificationsMenuOpenChange", handleNotificationsMenuOpenChange);
    navbarEl?.addEventListener("appsMenuOpenChange", handleAppsMenuOpenChange);
    navbarEl?.addEventListener("searchInputOpenChange", handleSearchInputOpenChange);
    navbarEl?.addEventListener("userMenuOpenChange", handleUserMenuOpenChange);
    navbarEl?.addEventListener("condensedMenuOpenChange", handleCondensedMenuOpenChange);
  });

  onCleanup(() => {
    navbarEl?.removeEventListener("aiClick", handleAiClick);
    navbarEl?.removeEventListener("appsClick", handleAppsClick);
    navbarEl?.removeEventListener("helpClick", handleHelpClick);
    navbarEl?.removeEventListener("notificationsClick", handleNotificationsClick);
    navbarEl?.removeEventListener("searchClick", handleSearchClick);
    navbarEl?.removeEventListener("signOutClick", handleSignOutClick);
    navbarEl?.removeEventListener("myTrimbleClick", handleMyTrimbleClick);
    navbarEl?.removeEventListener("trimbleLogoClick", handleTrimbleLogoClick);
    navbarEl?.removeEventListener("searchChange", handleSearchChange);
    navbarEl?.removeEventListener("mainMenuOpenChange", handleMainMenuOpenChange);
    navbarEl?.removeEventListener("notificationsMenuOpenChange", handleNotificationsMenuOpenChange);
    navbarEl?.removeEventListener("appsMenuOpenChange", handleAppsMenuOpenChange);
    navbarEl?.removeEventListener("searchInputOpenChange", handleSearchInputOpenChange);
    navbarEl?.removeEventListener("userMenuOpenChange", handleUserMenuOpenChange);
    navbarEl?.removeEventListener("condensedMenuOpenChange", handleCondensedMenuOpenChange);
  });

  createEffect(() => {
    const navbar = navbarEl as Record<string, unknown> | undefined;
    if (!navbar) return;

    navbar.visibility = props.visibility ?? {
      mainMenu: true,
      search: true,
      searchInput: true,
      notifications: true,
      apps: true,
      ai: true,
      help: true,
      user: true,
    };
    navbar.userCard = props.userCard;
    if (props.textOverrides) {
      navbar.textOverrides = props.textOverrides;
    }
    navbar.searchDebounceMs = props.searchDebounceMs ?? 300;
    navbar.mainMenuOpen = props.mainMenuOpen ?? false;
    navbar.notificationsMenuOpen = props.notificationsMenuOpen ?? false;
    navbar.appsMenuOpen = props.appsMenuOpen ?? false;
    navbar.searchInputOpen = props.searchInputOpen ?? false;
    navbar.userMenuOpen = props.userMenuOpen ?? false;
    navbar.condensedMenuOpen = props.condensedMenuOpen ?? false;
  });

  return (
    <modus-wc-navbar
      ref={(el) => (navbarEl = el as HTMLElement)}
      condensed={props.condensed ?? false}
      custom-class={props.customClass}
      aria-label={props.ariaLabel}
    >
      <Show when={props.mainMenuContent}>
        <div slot="main-menu">{props.mainMenuContent}</div>
      </Show>
      <Show when={props.notificationsContent}>
        <div slot="notifications">{props.notificationsContent}</div>
      </Show>
      <Show when={props.appsContent}>
        <div slot="apps">{props.appsContent}</div>
      </Show>
      <Show when={props.startContent}>
        <div slot="start">{props.startContent}</div>
      </Show>
      <Show when={props.centerContent}>
        <div slot="center">{props.centerContent}</div>
      </Show>
      <Show when={props.endContent}>
        <div slot="end">{props.endContent}</div>
      </Show>
    </modus-wc-navbar>
  );
};

export default ModusNavbar;

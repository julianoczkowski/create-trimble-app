import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcNavbar } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Text replacements for the navbar.
 */
export interface INavbarTextOverrides {
  /** Replaces the text for "Apps" in the condensed menu. */
  apps?: string;
  /** Replaces the text for "Help" in the condensed menu. */
  help?: string;
  /** Replaces the text for "Notifications" in the condensed menu. */
  notifications?: string;
  /** Replaces the text for "Search" in the condensed menu. */
  search?: string;
}

/**
 * Controls the visibility of individual navbar buttons.
 */
export interface INavbarVisibility {
  /** Controls the visibility of the AI button. */
  ai?: boolean;
  /** Controls visibility of the apps button. */
  apps?: boolean;
  /** Controls visibility of the help button. */
  help?: boolean;
  /** Controls visibility of the main menu button. */
  mainMenu?: boolean;
  /** Controls visibility of the notifications button. */
  notifications?: boolean;
  /** Controls visibility of the search button. */
  search?: boolean;
  /** Controls visibility of the search input. */
  searchInput?: boolean;
  /** Controls visibility of the user button. */
  user?: boolean;
}

/**
 * User information used to render the user card.
 */
export interface INavbarUserCard {
  /** The alt value to set on the avatar. */
  avatarAlt?: string;
  /** The avatar image source value. */
  avatarSrc?: string;
  /** The email address of the user. */
  email: string;
  /** Text override for the Access MyTrimble button. */
  myTrimbleButton?: string;
  /** The name of the user. */
  name: string;
  /** Text override for the Sign out button. */
  signOutButton?: string;
}

/**
 * Props supported by the {@link ModusNavbarComponent}.
 */
export interface ModusNavbarProps {
  /** The open state of the apps menu. */
  appsMenuOpen?: Components.ModusWcNavbar['appsMenuOpen'];
  /** Applies condensed layout and styling. */
  condensed?: Components.ModusWcNavbar['condensed'];
  /** The open state of the condensed menu. */
  condensedMenuOpen?: Components.ModusWcNavbar['condensedMenuOpen'];
  /** Custom CSS class applied to the host element. */
  className?: Components.ModusWcNavbar['customClass'];
  /** The open state of the main menu. */
  mainMenuOpen?: Components.ModusWcNavbar['mainMenuOpen'];
  /** The open state of the notifications menu. */
  notificationsMenuOpen?: Components.ModusWcNavbar['notificationsMenuOpen'];
  /** Debounce time in milliseconds for search input changes. */
  searchDebounceMs?: Components.ModusWcNavbar['searchDebounceMs'];
  /** The open state of the search input. */
  searchInputOpen?: Components.ModusWcNavbar['searchInputOpen'];
  /** Text replacements for the navbar. */
  textOverrides?: INavbarTextOverrides;
  /** User information used to render the user card. */
  userCard: INavbarUserCard;
  /** The open state of the user menu. */
  userMenuOpen?: Components.ModusWcNavbar['userMenuOpen'];
  /** The visibility of individual navbar buttons. */
  visibility?: INavbarVisibility;
}

/**
 * Angular wrapper for the Modus navbar web component.
 *
 * The navbar component supports projecting custom content into several slots:
 * - `main-menu` slot: For custom main menu content
 * - `notifications` slot: For custom notifications menu content
 * - `apps` slot: For custom apps menu content
 * - `start` slot: For custom content at the start of the navbar
 * - `center` slot: For custom content at the center of the navbar
 * - `end` slot: For custom content at the end of the navbar
 *
 * @example
 * ```html
 * <modus-navbar
 *   [userCard]="userInfo"
 *   [visibility]="{ user: true, search: true }"
 *   (userMenuOpenChange)="handleUserMenuChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'modus-navbar',
  imports: [CommonModule, ModusWcNavbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-navbar
      [appsMenuOpen]="appsMenuOpen()"
      [condensed]="condensed()"
      [condensedMenuOpen]="condensedMenuOpen()"
      [customClass]="className()"
      [mainMenuOpen]="mainMenuOpen()"
      [notificationsMenuOpen]="notificationsMenuOpen()"
      [searchDebounceMs]="searchDebounceMs()"
      [searchInputOpen]="searchInputOpen()"
      [textOverrides]="textOverrides()"
      [userCard]="userCard()"
      [userMenuOpen]="userMenuOpen()"
      [visibility]="visibility()"
      (aiClick)="handleAiClick($event)"
      (appsClick)="handleAppsClick($event)"
      (appsMenuOpenChange)="handleAppsMenuOpenChange($event)"
      (condensedMenuOpenChange)="handleCondensedMenuOpenChange($event)"
      (helpClick)="handleHelpClick($event)"
      (mainMenuOpenChange)="handleMainMenuOpenChange($event)"
      (myTrimbleClick)="handleMyTrimbleClick($event)"
      (notificationsClick)="handleNotificationsClick($event)"
      (notificationsMenuOpenChange)="handleNotificationsMenuOpenChange($event)"
      (searchChange)="handleSearchChange($event)"
      (searchClick)="handleSearchClick($event)"
      (searchInputOpenChange)="handleSearchInputOpenChange($event)"
      (signOutClick)="handleSignOutClick($event)"
      (trimbleLogoClick)="handleTrimbleLogoClick($event)"
      (userMenuOpenChange)="handleUserMenuOpenChange($event)"
    >
      <ng-content select="[slot='main-menu']" slot="main-menu" />
      <ng-content select="[slot='notifications']" slot="notifications" />
      <ng-content select="[slot='apps']" slot="apps" />
      <ng-content select="[slot='start']" slot="start" />
      <ng-content select="[slot='center']" slot="center" />
      <ng-content select="[slot='end']" slot="end" />
    </modus-wc-navbar>
  `,
})
export class ModusNavbarComponent {
  /** The open state of the apps menu. */
  readonly appsMenuOpen = input<boolean | undefined>(false);

  /** Applies condensed layout and styling. */
  readonly condensed = input<boolean | undefined>(false);

  /** The open state of the condensed menu. */
  readonly condensedMenuOpen = input<boolean | undefined>(false);

  /** Custom CSS class applied to the host element. */
  readonly className = input<string | undefined>();

  /** The open state of the main menu. */
  readonly mainMenuOpen = input<boolean | undefined>(false);

  /** The open state of the notifications menu. */
  readonly notificationsMenuOpen = input<boolean | undefined>(false);

  /** Debounce time in milliseconds for search input changes. */
  readonly searchDebounceMs = input<number | undefined>(300);

  /** The open state of the search input. */
  readonly searchInputOpen = input<boolean | undefined>(false);

  /** Text replacements for the navbar. */
  readonly textOverrides = input<INavbarTextOverrides | undefined>();

  /** User information used to render the user card. */
  readonly userCard = input.required<INavbarUserCard>();

  /** The open state of the user menu. */
  readonly userMenuOpen = input<boolean | undefined>(false);

  /** The visibility of individual navbar buttons. */
  readonly visibility = input<INavbarVisibility | undefined>({
    ai: false,
    apps: false,
    help: false,
    mainMenu: false,
    notifications: false,
    search: false,
    searchInput: false,
    user: true,
  });

  /** Emits when the AI button is clicked or activated via keyboard. */
  readonly aiClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the apps button is clicked or activated via keyboard. */
  readonly appsClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the apps menu open state changes. */
  readonly appsMenuOpenChange = output<boolean>();

  /** Emits when the condensed menu open state changes. */
  readonly condensedMenuOpenChange = output<boolean>();

  /** Emits when the help button is clicked or activated via keyboard. */
  readonly helpClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the main menu open state changes. */
  readonly mainMenuOpenChange = output<boolean>();

  /** Emits when the user profile Access MyTrimble button is clicked. */
  readonly myTrimbleClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the notifications button is clicked or activated via keyboard. */
  readonly notificationsClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the notifications menu open state changes. */
  readonly notificationsMenuOpenChange = output<boolean>();

  /** Emits when the search input value is changed. */
  readonly searchChange = output<{ value: string }>();

  /** Emits when the search button is clicked or activated via keyboard. */
  readonly searchClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the search input open state changes. */
  readonly searchInputOpenChange = output<boolean>();

  /** Emits when the user profile sign out button is clicked. */
  readonly signOutClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the Trimble logo is clicked or activated via keyboard. */
  readonly trimbleLogoClick = output<MouseEvent | KeyboardEvent>();

  /** Emits when the user menu open state changes. */
  readonly userMenuOpenChange = output<boolean>();

  handleAiClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.aiClick.emit(event.detail);
  }

  handleAppsClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.appsClick.emit(event.detail);
  }

  handleAppsMenuOpenChange(event: CustomEvent<boolean>): void {
    this.appsMenuOpenChange.emit(event.detail);
  }

  handleCondensedMenuOpenChange(event: CustomEvent<boolean>): void {
    this.condensedMenuOpenChange.emit(event.detail);
  }

  handleHelpClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.helpClick.emit(event.detail);
  }

  handleMainMenuOpenChange(event: CustomEvent<boolean>): void {
    this.mainMenuOpenChange.emit(event.detail);
  }

  handleMyTrimbleClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.myTrimbleClick.emit(event.detail);
  }

  handleNotificationsClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.notificationsClick.emit(event.detail);
  }

  handleNotificationsMenuOpenChange(event: CustomEvent<boolean>): void {
    this.notificationsMenuOpenChange.emit(event.detail);
  }

  handleSearchChange(event: CustomEvent<{ value: string }>): void {
    this.searchChange.emit(event.detail);
  }

  handleSearchClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.searchClick.emit(event.detail);
  }

  handleSearchInputOpenChange(event: CustomEvent<boolean>): void {
    this.searchInputOpenChange.emit(event.detail);
  }

  handleSignOutClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.signOutClick.emit(event.detail);
  }

  handleTrimbleLogoClick(event: CustomEvent<MouseEvent | KeyboardEvent>): void {
    this.trimbleLogoClick.emit(event.detail);
  }

  handleUserMenuOpenChange(event: CustomEvent<boolean>): void {
    this.userMenuOpenChange.emit(event.detail);
  }
}

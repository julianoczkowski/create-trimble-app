import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusNavbarComponent, INavbarUserCard } from '../modus-navbar.component';

/**
 * Demo page showcasing the Modus Navbar component.
 *
 * Demonstrates navbar features including:
 * - Basic navbar with user card
 * - Visibility controls
 * - Condensed mode
 * - Custom slots (start, center, end)
 * - Event handling
 */
@Component({
  selector: 'app-navbar-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusNavbarComponent],
  template: `
    <demo-page
      title="Modus Navbar"
      description="The navbar provides a consistent top-level navigation and user controls. Use the navbar for primary navigation, user profile access, search, and application-wide actions."
    >
      <demo-example
        title="Basic Navbar"
        description="A basic navbar with user card and search functionality."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{ user: true, search: true, searchInput: true }"
          />
        </div>
      </demo-example>

      <demo-example
        title="Navbar with Help Button"
        description="Navbar with user card and help button for accessing documentation and support."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{ user: true, help: true }"
            (helpClick)="handleHelpClick($event)"
          />
        </div>
      </demo-example>

      <demo-example
        title="Navbar with All Buttons"
        description="Navbar showing all available buttons: user, search, help, apps, notifications, and main menu."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{
              user: true,
              search: true,
              searchInput: true,
              help: true,
              apps: true,
              notifications: true,
              mainMenu: true
            }"
            (helpClick)="handleHelpClick($event)"
            (appsClick)="handleAppsClick($event)"
            (notificationsClick)="handleNotificationsClick($event)"
            (mainMenuOpenChange)="handleMainMenuOpenChange($event)"
          />
        </div>
      </demo-example>

      <demo-example
        title="Condensed Navbar"
        description="A condensed version of the navbar suitable for tighter spaces."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{ user: true, mainMenu: true, notifications: true, help: true }"
            [condensed]="true"
          />
        </div>
      </demo-example>

      <demo-example
        title="Navbar with Custom Slots"
        description="Navbar with custom content in start, center, and end slots."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{ user: true, search: true, searchInput: true, help: true }"
          >
            <div slot="start" class="flex items-center gap-2">
              <span class="text-sm text-foreground">Custom Start Content</span>
            </div>
            <div slot="center" class="flex items-center gap-2">
              <span class="text-sm text-foreground">Custom Center Content</span>
            </div>
            <div slot="end" class="flex items-center gap-2">
              <span class="text-sm text-foreground">Custom End Content</span>
            </div>
          </modus-navbar>
        </div>
      </demo-example>

      <demo-example
        title="Interactive Example"
        description="Navbar with event handlers demonstrating search expansion and all button interactions."
      >
        <div class="flex flex-col gap-4">
          <modus-navbar
            [userCard]="navbarUserCard"
            [visibility]="{
              user: true,
              search: true,
              searchInput: true,
              help: true,
              apps: true,
              notifications: true,
              mainMenu: true
            }"
            [searchInputOpen]="searchInputOpen()"
            [mainMenuOpen]="mainMenuOpen()"
            [notificationsMenuOpen]="notificationsMenuOpen()"
            [appsMenuOpen]="appsMenuOpen()"
            (searchClick)="handleSearchClick($event)"
            (searchInputOpenChange)="handleSearchInputOpenChange($event)"
            (searchChange)="handleSearchChange($event)"
            (helpClick)="handleHelpClick($event)"
            (appsClick)="handleAppsClick($event)"
            (notificationsClick)="handleNotificationsClick($event)"
            (mainMenuOpenChange)="handleMainMenuOpenChange($event)"
            (notificationsMenuOpenChange)="handleNotificationsMenuOpenChange($event)"
            (appsMenuOpenChange)="handleAppsMenuOpenChange($event)"
          />
          @if (searchInputOpen() || lastSearch()) {
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground mb-2">
              <strong>Search Input Open:</strong> {{ searchInputOpen() ? 'Yes' : 'No' }}
            </p>
            @if (lastSearch()) {
              <p class="text-sm text-foreground">
                <strong>Last Search:</strong> {{ lastSearch() }}
              </p>
            }
          </div>
          }
          @if (lastAction()) {
          <div class="p-4 rounded-lg bg-card border-default">
            <p class="text-sm text-foreground">
              <strong>Last Action:</strong> {{ lastAction() }}
            </p>
          </div>
          }
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class NavbarDemoPageComponent {
  readonly navbarUserCard: INavbarUserCard = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarSrc: 'https://via.placeholder.com/64',
    avatarAlt: 'User avatar',
  };

  readonly searchInputOpen = signal<boolean>(false);
  readonly lastSearch = signal<string>('');
  readonly mainMenuOpen = signal<boolean>(false);
  readonly notificationsMenuOpen = signal<boolean>(false);
  readonly appsMenuOpen = signal<boolean>(false);
  readonly lastAction = signal<string>('');

  handleSearchClick(event: MouseEvent | KeyboardEvent): void {
    // Toggle the search input state when search button is clicked
    this.searchInputOpen.set(!this.searchInputOpen());
    this.lastAction.set('Search button clicked');
  }

  handleSearchInputOpenChange(event: boolean): void {
    // Sync state with navbar (in case navbar manages state internally)
    if (this.searchInputOpen() !== event) {
      this.searchInputOpen.set(event);
    }
  }

  handleSearchChange(event: { value: string }): void {
    this.lastSearch.set(event.value);
    this.lastAction.set(`Search: "${event.value}"`);
  }

  handleHelpClick(event: MouseEvent | KeyboardEvent): void {
    this.lastAction.set('Help button clicked');
    console.log('Help button clicked', event);
  }

  handleAppsClick(event: MouseEvent | KeyboardEvent): void {
    this.lastAction.set('Apps button clicked');
    console.log('Apps button clicked', event);
  }

  handleNotificationsClick(event: MouseEvent | KeyboardEvent): void {
    this.lastAction.set('Notifications button clicked');
    console.log('Notifications button clicked', event);
  }

  handleMainMenuOpenChange(event: boolean): void {
    this.mainMenuOpen.set(event);
    this.lastAction.set(`Main menu ${event ? 'opened' : 'closed'}`);
  }

  handleNotificationsMenuOpenChange(event: boolean): void {
    this.notificationsMenuOpen.set(event);
    this.lastAction.set(`Notifications menu ${event ? 'opened' : 'closed'}`);
  }

  handleAppsMenuOpenChange(event: boolean): void {
    this.appsMenuOpen.set(event);
    this.lastAction.set(`Apps menu ${event ? 'opened' : 'closed'}`);
  }
}

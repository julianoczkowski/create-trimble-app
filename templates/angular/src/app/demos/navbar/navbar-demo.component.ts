import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusNavbarComponent, INavbarUserCard } from '../../components/modus-navbar.component';

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
              mainMenu: true,
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
    </demo-page>
  `,
})
export class NavbarDemoPageComponent {
  readonly navbarUserCard: INavbarUserCard = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
    avatarAlt: 'User avatar',
  };

  handleHelpClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Help button clicked', event);
  }

  handleAppsClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Apps button clicked', event);
  }

  handleNotificationsClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Notifications button clicked', event);
  }

  handleMainMenuOpenChange(event: boolean): void {
    console.log(`Main menu ${event ? 'opened' : 'closed'}`);
  }
}

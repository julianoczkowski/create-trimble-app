import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusMenuComponent } from '../modus-menu.component';
import { ModusMenuItemComponent } from '../modus-menu-item.component';

/**
 * Demo page showcasing the Modus Menu component.
 *
 * Demonstrates menu features including:
 * - Vertical menu
 * - Horizontal menu
 * - Menu with borders
 * - Selected menu items
 * - Event handling
 */
@Component({
  selector: 'app-menu-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
  ],
  template: `
    <demo-page
      title="Modus Menu"
      description="Menus provide navigation and action lists. Use menus to organize related actions or navigation items in a consistent, accessible way."
    >
      <demo-example
        title="Vertical Menu"
        description="Default vertical menu orientation for navigation lists."
      >
        <modus-menu [bordered]="true">
          <modus-menu-item label="Dashboard" value="dashboard" [selected]="true" />
          <modus-menu-item label="Projects" value="projects" />
          <modus-menu-item label="Reports" value="reports" />
          <modus-menu-item label="Settings" value="settings" />
        </modus-menu>
      </demo-example>

      <demo-example
        title="Horizontal Menu"
        description="Horizontal menu orientation for top navigation."
      >
        <modus-menu orientation="horizontal">
          <modus-menu-item label="Home" value="home" />
          <modus-menu-item label="Products" value="products" />
          <modus-menu-item label="About" value="about" />
          <modus-menu-item label="Contact" value="contact" />
        </modus-menu>
      </demo-example>

      <demo-example
        title="Menu with Borders"
        description="Menu with border styling for visual separation."
      >
        <modus-menu [bordered]="true">
          <modus-menu-item label="Account" value="account" />
          <modus-menu-item label="Profile" value="profile" />
          <modus-menu-item label="Settings" value="settings" />
          <modus-menu-item label="Log out" value="logout" />
        </modus-menu>
      </demo-example>

      <demo-example
        title="Selected Menu Items"
        description="Menu with selected items to indicate current state."
      >
        <modus-menu [bordered]="true">
          <modus-menu-item label="All Projects" value="all" [selected]="selectedMenu() === 'all'" />
          <modus-menu-item label="Active" value="active" [selected]="selectedMenu() === 'active'" />
          <modus-menu-item label="Archived" value="archived" [selected]="selectedMenu() === 'archived'" />
          <modus-menu-item label="Deleted" value="deleted" [selected]="selectedMenu() === 'deleted'" />
        </modus-menu>
      </demo-example>

      <demo-example
        title="Interactive Menu"
        description="Menu with event handling to track item selection."
      >
        <div class="flex flex-col gap-4">
          <modus-menu [bordered]="true">
            <modus-menu-item
              label="Option 1"
              value="option1"
              [selected]="selectedItem() === 'option1'"
              (itemSelect)="handleItemSelect($event)"
            />
            <modus-menu-item
              label="Option 2"
              value="option2"
              [selected]="selectedItem() === 'option2'"
              (itemSelect)="handleItemSelect($event)"
            />
            <modus-menu-item
              label="Option 3"
              value="option3"
              [selected]="selectedItem() === 'option3'"
              (itemSelect)="handleItemSelect($event)"
            />
          </modus-menu>

          @if (selectedItem()) {
          <div class="p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Selected Item:</div>
            <div class="text-sm">{{ selectedItem() }}</div>
          </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Navigation Menu Example"
        description="Complete navigation menu example."
      >
        <modus-menu [bordered]="true">
          <modus-menu-item
            label="Dashboard"
            value="dashboard"
            [selected]="activeSection() === 'dashboard'"
            (itemSelect)="handleNavigation($event)"
          />
          <modus-menu-item
            label="Projects"
            value="projects"
            [selected]="activeSection() === 'projects'"
            (itemSelect)="handleNavigation($event)"
          />
          <modus-menu-item
            label="Team"
            value="team"
            [selected]="activeSection() === 'team'"
            (itemSelect)="handleNavigation($event)"
          />
          <modus-menu-item
            label="Reports"
            value="reports"
            [selected]="activeSection() === 'reports'"
            (itemSelect)="handleNavigation($event)"
          />
          <modus-menu-item
            label="Settings"
            value="settings"
            [selected]="activeSection() === 'settings'"
            (itemSelect)="handleNavigation($event)"
          />
        </modus-menu>
      </demo-example>
    </demo-page>
  `,
})
export class MenuDemoPageComponent {
  readonly selectedItem = signal<string | null>(null);
  readonly selectedMenu = signal<string>('all');
  readonly activeSection = signal<string>('dashboard');

  handleItemSelect(event: { value: string }): void {
    this.selectedItem.set(event.value);
    console.log('Menu item selected:', event.value);
  }

  handleNavigation(event: { value: string }): void {
    this.activeSection.set(event.value);
    console.log('Navigation to:', event.value);
  }
}

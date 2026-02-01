import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusMenuComponent } from '../../components/modus-menu.component';
import { ModusMenuItemComponent } from '../../components/modus-menu-item.component';

/**
 * Demo page showcasing the Modus Menu component.
 *
 * Demonstrates menu features including:
 * - Vertical menu
 * - Horizontal menu
 * - Selected menu items
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

    </demo-page>
  `,
})
export class MenuDemoPageComponent {
  readonly selectedMenu = signal<string>('all');
}

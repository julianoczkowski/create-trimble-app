import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusDropdownMenuComponent } from '../../components/modus-dropdown-menu.component';
import { ModusMenuComponent } from '../../components/modus-menu.component';
import { ModusMenuItemComponent } from '../../components/modus-menu-item.component';

/**
 * Demo page showcasing the Modus Dropdown Menu component.
 *
 * Demonstrates dropdown menu features including:
 * - Basic dropdown menu
 * - Custom button styling
 * - Menu placement options
 * - Different button colors and variants
 * - Menu with icons
 * - Event handling
 */
@Component({
  selector: 'app-dropdown-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusDropdownMenuComponent,
    ModusMenuComponent,
    ModusMenuItemComponent,
  ],
  template: `
    <demo-page
      title="Modus Dropdown Menu"
      description="Dropdown menus provide a compact way to display multiple actions or options in a menu that opens on demand."
    >
      <demo-example
        title="Button Colors"
        description="Dropdown menus with different button colors."
      >
        <div class="flex flex-wrap gap-4">
          <modus-dropdown-menu buttonAriaLabel="Primary menu" [buttonColor]="'primary'">
            <span slot="button">Primary</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Option 1" value="option1" />
                <modus-menu-item label="Option 2" value="option2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Secondary menu" [buttonColor]="'secondary'">
            <span slot="button">Secondary</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Option 1" value="option1" />
                <modus-menu-item label="Option 2" value="option2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Tertiary menu" [buttonColor]="'tertiary'">
            <span slot="button">Tertiary</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Option 1" value="option1" />
                <modus-menu-item label="Option 2" value="option2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>
        </div>
      </demo-example>

      <demo-example
        title="Button Variants"
        description="Dropdown menus with different button visual styles."
      >
        <div class="flex flex-wrap gap-4">
          <modus-dropdown-menu buttonAriaLabel="Filled menu" [buttonVariant]="'filled'">
            <span slot="button">Filled</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Action 1" value="action1" />
                <modus-menu-item label="Action 2" value="action2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Outlined menu" [buttonVariant]="'outlined'">
            <span slot="button">Outlined</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Action 1" value="action1" />
                <modus-menu-item label="Action 2" value="action2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Borderless menu" [buttonVariant]="'borderless'">
            <span slot="button">Borderless</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Action 1" value="action1" />
                <modus-menu-item label="Action 2" value="action2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>
        </div>
      </demo-example>

      <demo-example
        title="Custom Button Content"
        description="Dropdown menus with custom button content including icons."
      >
        <div class="flex flex-wrap gap-4">
          <modus-dropdown-menu buttonAriaLabel="Icon menu">
            <div slot="button" class="flex items-center gap-2">
              <i class="modus-icons text-lg">settings</i>
              <span>Settings</span>
            </div>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Preferences" value="prefs" />
                <modus-menu-item label="Account" value="account" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="User menu">
            <div slot="button" class="flex items-center gap-2">
              <i class="modus-icons text-lg">user_account</i>
              <span>User Menu</span>
              <i class="modus-icons text-sm">expand_more</i>
            </div>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Profile" value="profile" />
                <modus-menu-item label="Settings" value="settings" />
                <modus-menu-item label="Log out" value="logout" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>
        </div>
      </demo-example>

      <demo-example
        title="Menu Placement"
        description="Different menu placement options relative to the button."
      >
        <div class="flex flex-wrap gap-4">
          <modus-dropdown-menu buttonAriaLabel="Bottom start menu" [menuPlacement]="'bottom-start'">
            <span slot="button">Bottom Start</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Item 1" value="item1" />
                <modus-menu-item label="Item 2" value="item2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Bottom end menu" [menuPlacement]="'bottom-end'">
            <span slot="button">Bottom End</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Item 1" value="item1" />
                <modus-menu-item label="Item 2" value="item2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>

          <modus-dropdown-menu buttonAriaLabel="Top start menu" [menuPlacement]="'top-start'">
            <span slot="button">Top Start</span>
            <div slot="menu">
              <modus-menu>
                <modus-menu-item label="Item 1" value="item1" />
                <modus-menu-item label="Item 2" value="item2" />
              </modus-menu>
            </div>
          </modus-dropdown-menu>
        </div>
      </demo-example>

      <demo-example title="Disabled State" description="Dropdown menu in disabled state.">
        <modus-dropdown-menu buttonAriaLabel="Disabled menu" [disabled]="true">
          <span slot="button">Disabled Menu</span>
          <div slot="menu">
            <modus-menu>
              <modus-menu-item label="Item 1" value="item1" />
              <modus-menu-item label="Item 2" value="item2" />
            </modus-menu>
          </div>
        </modus-dropdown-menu>
      </demo-example>
    </demo-page>
  `,
})
export class DropdownDemoPageComponent {}

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusTabsComponent } from '../../components/modus-tabs.component';
import type { ITab } from '@trimble-oss/moduswebcomponents';

/**
 * Demo page showcasing the Modus Tabs component.
 *
 * Demonstrates all tabs features including:
 * - Basic bordered tabs for dashboards
 * - Compact boxed tabs for cards and sidebars
 * - Icon-only tabs for compact navigation
 * - Icon + Label combinations
 * - Label-only tabs
 * - Disabled tabs
 * - Interactive tab switching with state tracking
 */
@Component({
  selector: 'app-tabs-demo-page',
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusTabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <demo-page
      title="Modus Tabs"
      description="Tabs organize content into logical sections without leaving the page. Keep labels short and related."
    >
      <!-- Project Tabs (Bordered) -->
      <demo-example
        title="Project tabs"
        description="Bordered tabs pair well with dashboards and keep the content anchored."
      >
        <modus-tabs
          [tabs]="projectTabs"
          [activeTabIndex]="projectActiveTab()"
          tabStyle="bordered"
          size="md"
          (tabChange)="handleProjectTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            Review highlights, key metrics, and quick actions for the current project.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            Explore recent updates in chronological order to stay informed.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Access shared documents and media assets that support this initiative.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Compact Tabs (Boxed) -->
      <demo-example
        title="Compact tabs"
        description="Use the small size when tabs sit inside cards or sidebars."
      >
        <modus-tabs
          [tabs]="compactTabs"
          [activeTabIndex]="compactActiveTab()"
          tabStyle="boxed"
          size="sm"
          (tabChange)="handleCompactTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            Outline the work and align on timelines.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            Track progress as each milestone is completed.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Capture lessons learned and share with the team.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Icon-only Tabs -->
      <demo-example
        title="Icon-only tabs"
        description="Use icons without labels for compact navigation. Include aria-label for accessibility."
      >
        <modus-tabs
          [tabs]="iconOnlyTabs"
          [activeTabIndex]="iconOnlyActiveTab()"
          tabStyle="bordered"
          size="sm"
          (tabChange)="handleIconOnlyTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            Overview of your key metrics and recent activity.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            Detailed charts and performance insights.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Geographic data and location-based information.
          </div>
          <div slot="tab-3" class="text-sm text-foreground-80 py-2">
            View your latest notifications and alerts.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Icon + Label Tabs -->
      <demo-example
        title="Icon + Label tabs"
        description="Combine icons with labels for clear navigation. Icons can be positioned left or right."
      >
        <modus-tabs
          [tabs]="iconLabelTabs"
          [activeTabIndex]="iconLabelActiveTab()"
          tabStyle="bordered"
          size="md"
          (tabChange)="handleIconLabelTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            Overview of your key metrics and recent activity.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            Detailed charts and performance insights.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Configure your application settings and preferences.
          </div>
          <div slot="tab-3" class="text-sm text-foreground-80 py-2">
            Find answers to common questions and get support.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Label-only Tabs -->
      <demo-example
        title="Label-only tabs"
        description="Text-only tabs work well for simple navigation without visual clutter."
      >
        <modus-tabs
          [tabs]="labelOnlyTabs"
          [activeTabIndex]="labelOnlyActiveTab()"
          tabStyle="boxed"
          size="lg"
          (tabChange)="handleLabelOnlyTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            High-level summary of the current project status.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            Comprehensive information about all project aspects.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Complete timeline of changes and updates.
          </div>
          <div slot="tab-3" class="text-sm text-foreground-80 py-2">
            Configuration options and preferences.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Disabled Tabs -->
      <demo-example
        title="Disabled tabs"
        description="Disable tabs that are not currently available or relevant."
      >
        <modus-tabs
          [tabs]="disabledTabs"
          [activeTabIndex]="disabledActiveTab()"
          tabStyle="bordered"
          size="md"
          (tabChange)="handleDisabledTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            This tab is currently active and functional.
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            This content is not accessible due to disabled tab.
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            Another active tab with different content.
          </div>
          <div slot="tab-3" class="text-sm text-foreground-80 py-2">
            This content is also not accessible.
          </div>
        </modus-tabs>
      </demo-example>

      <!-- Interactive Example -->
      <demo-example
        title="Interactive example"
        description="Switch tabs to see the event handling and state tracking in action."
      >
        <modus-tabs
          [tabs]="interactiveTabs"
          [activeTabIndex]="interactiveActiveTab()"
          tabStyle="bordered"
          size="md"
          (tabChange)="handleInteractiveTabChange($event)"
        >
          <div slot="tab-0" class="text-sm text-foreground-80 py-2">
            <div class="flex flex-col gap-2">
              <div class="font-medium">Home Content</div>
              <div>Welcome to the home section. Navigate between tabs to explore.</div>
            </div>
          </div>
          <div slot="tab-1" class="text-sm text-foreground-80 py-2">
            <div class="flex flex-col gap-2">
              <div class="font-medium">Profile Content</div>
              <div>View and manage your profile settings here.</div>
            </div>
          </div>
          <div slot="tab-2" class="text-sm text-foreground-80 py-2">
            <div class="flex flex-col gap-2">
              <div class="font-medium">Messages Content</div>
              <div>Check your recent messages and notifications.</div>
            </div>
          </div>
        </modus-tabs>

        @if (tabChangeCount() > 0) {
          <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
            <div class="font-semibold mb-2">Tab Change Event</div>
            <div class="text-sm">Total tab switches: {{ tabChangeCount() }}</div>
            @if (lastTabChange()) {
              <div class="text-xs mt-1 text-muted-foreground">
                Last change: Tab {{ lastTabChange()!.previousTab }} to Tab
                {{ lastTabChange()!.newTab }}
              </div>
            }
          </div>
        }
      </demo-example>
    </demo-page>
  `,
})
export class TabsDemoPageComponent {
  // Project tabs data
  readonly projectTabs: ITab[] = [{ label: 'Summary' }, { label: 'Activity' }, { label: 'Files' }];
  readonly projectActiveTab = signal(0);

  // Compact tabs data
  readonly compactTabs: ITab[] = [{ label: 'Plan' }, { label: 'Deliver' }, { label: 'Review' }];
  readonly compactActiveTab = signal(0);

  // Icon-only tabs data
  readonly iconOnlyTabs: ITab[] = [
    { icon: 'dashboard' },
    { icon: 'bar_graph' },
    { icon: 'map' },
    { icon: 'notifications' },
  ];
  readonly iconOnlyActiveTab = signal(0);

  // Icon + Label tabs data
  readonly iconLabelTabs: ITab[] = [
    { icon: 'dashboard', label: 'Dashboard', iconPosition: 'left' },
    { icon: 'bar_graph', label: 'Analytics', iconPosition: 'left' },
    { icon: 'settings', label: 'Settings', iconPosition: 'right' },
    { icon: 'help', label: 'Help', iconPosition: 'right' },
  ];
  readonly iconLabelActiveTab = signal(0);

  // Label-only tabs data
  readonly labelOnlyTabs: ITab[] = [
    { label: 'Overview' },
    { label: 'Details' },
    { label: 'History' },
    { label: 'Settings' },
  ];
  readonly labelOnlyActiveTab = signal(0);

  // Disabled tabs data
  readonly disabledTabs: ITab[] = [
    { label: 'Active Tab', icon: 'check' },
    { label: 'Disabled Tab', icon: 'lock', disabled: true },
    { label: 'Another Active', icon: 'star' },
    { label: 'Also Disabled', disabled: true },
  ];
  readonly disabledActiveTab = signal(0);

  // Interactive tabs data
  readonly interactiveTabs: ITab[] = [
    { label: 'Home', icon: 'house' },
    { label: 'Profile', icon: 'user' },
    { label: 'Messages', icon: 'email' },
  ];
  readonly interactiveActiveTab = signal(0);
  readonly tabChangeCount = signal(0);
  readonly lastTabChange = signal<{ previousTab: number; newTab: number } | null>(null);

  // Tab change handlers
  handleProjectTabChange(event: { previousTab: number; newTab: number }): void {
    this.projectActiveTab.set(event.newTab);
  }

  handleCompactTabChange(event: { previousTab: number; newTab: number }): void {
    this.compactActiveTab.set(event.newTab);
  }

  handleIconOnlyTabChange(event: { previousTab: number; newTab: number }): void {
    this.iconOnlyActiveTab.set(event.newTab);
  }

  handleIconLabelTabChange(event: { previousTab: number; newTab: number }): void {
    this.iconLabelActiveTab.set(event.newTab);
  }

  handleLabelOnlyTabChange(event: { previousTab: number; newTab: number }): void {
    this.labelOnlyActiveTab.set(event.newTab);
  }

  handleDisabledTabChange(event: { previousTab: number; newTab: number }): void {
    this.disabledActiveTab.set(event.newTab);
  }

  handleInteractiveTabChange(event: { previousTab: number; newTab: number }): void {
    this.interactiveActiveTab.set(event.newTab);
    this.tabChangeCount.update((count) => count + 1);
    this.lastTabChange.set(event);
  }
}

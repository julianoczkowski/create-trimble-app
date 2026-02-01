import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcTabs } from '@trimble-oss/moduswebcomponents-angular';
import type { Components, ITab, ModusSize } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusTabsComponent}.
 */
export interface ModusTabsProps {
  /** Current active tab index. */
  activeTabIndex?: Components.ModusWcTabs['activeTabIndex'];
  /** Custom CSS class applied to the tabs container. */
  className?: Components.ModusWcTabs['customClass'];
  /** Tab size token. */
  size?: ModusSize;
  /** Tabs to display. */
  tabs: ITab[];
  /** Additional styling for the tabs. */
  tabStyle?: Components.ModusWcTabs['tabStyle'];
}

/**
 * Angular wrapper for the Modus tabs web component.
 *
 * The tabs component supports projecting tab content using named slots:
 * - `tab-0`, `tab-1`, etc. for tab panel content
 * - Custom slot names defined in tab `slotName` property
 *
 * @example
 * ```html
 * <modus-tabs
 *   [tabs]="tabItems"
 *   [activeTabIndex]="activeTab()"
 *   (tabChange)="handleTabChange($event)"
 * >
 *   <div slot="tab-0">First tab content</div>
 *   <div slot="tab-1">Second tab content</div>
 * </modus-tabs>
 * ```
 */
@Component({
  selector: 'modus-tabs',
  imports: [CommonModule, ModusWcTabs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-tabs
      [activeTabIndex]="activeTabIndex()"
      [customClass]="className()"
      [size]="size()"
      [tabs]="tabs()"
      [tabStyle]="tabStyle()"
      (tabChange)="handleTabChange($event)"
    >
      <ng-content />
    </modus-wc-tabs>
  `,
})
export class ModusTabsComponent {
  /** Current active tab index. */
  readonly activeTabIndex = input<number>(0);

  /** Custom CSS class applied to the tabs container. */
  readonly className = input<string | undefined>();

  /** Tab size token. */
  readonly size = input<ModusSize | undefined>('md');

  /** Tabs to display. */
  readonly tabs = input.required<ITab[]>();

  /** Additional styling for the tabs. */
  readonly tabStyle = input<'boxed' | 'bordered' | 'lifted' | 'none' | undefined>('bordered');

  /** Emits when a tab is switched. */
  readonly tabChange = output<{ previousTab: number; newTab: number }>();

  /** Handles tab change events from the Modus Tabs Web Component. */
  handleTabChange(event: CustomEvent<{ previousTab: number; newTab: number }>): void {
    this.tabChange.emit(event.detail);
  }
}


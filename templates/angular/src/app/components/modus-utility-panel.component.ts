import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostBinding,
  inject,
  Injector,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcUtilityPanel } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusUtilityPanelComponent}.
 */
export interface ModusUtilityPanelProps {
  /** Whether the panel is expanded. */
  expanded?: Components.ModusWcUtilityPanel['expanded'];
  /** Whether the panel is collapsed. When provided, overrides expanded. */
  collapsed?: boolean;
  /** Optional CSS class applied to the panel wrapper. */
  className?: string;
  /** Panel position (left or right). */
  position?: 'left' | 'right';
  /** Optional header text shown when no custom header is provided. */
  headerText?: string;
  /** Panel width (e.g. 300px, 24rem). */
  panelWidth?: string;
  /** Optional target selector used for push content. */
  targetSelector?: string;
  /** Determines if the panel pushes content or displays an overlay. */
  pushContent?: Components.ModusWcUtilityPanel['pushContent'];
  /** Target element reference to push content when panel opens. */
  targetElement?: Components.ModusWcUtilityPanel['targetElement'];
  /** Accessible label for the panel. */
  ariaLabel?: string;
  /** Accessible expanded state override. */
  ariaExpanded?: boolean;
}

/**
 * Angular wrapper for the Modus utility panel web component.
 *
 * The utility panel supports projecting content into header, body, and footer slots.
 *
 * @example
 * ```html
 * <modus-utility-panel [expanded]="panelOpen()" (panelOpened)="handleOpen()">
 *   <div slot="header">Header Content</div>
 *   <div slot="body">Body Content</div>
 *   <div slot="footer">Footer Content</div>
 * </modus-utility-panel>
 * ```
 */
@Component({
  selector: 'modus-utility-panel',
  imports: [CommonModule, ModusWcUtilityPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }

      :host(.fixed-utility-panel) {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        height: 100vh;
        pointer-events: none;
      }

      :host(.fixed-utility-panel) modus-wc-utility-panel {
        pointer-events: auto;
        height: 100%;
      }

      :host(.fixed-utility-panel.left) {
        right: auto;
        left: 0;
      }
    `,
  ],
  template: `
    <modus-wc-utility-panel
      #panelRef
      [expanded]="effectiveExpanded()"
      [pushContent]="pushContent()"
      [targetElement]="resolvedTarget()"
      [class]="panelClass()"
      [style.--modus-wc-utility-panel-width]="panelWidth()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="ariaExpanded()"
      (panelOpened)="handlePanelOpened()"
      (panelClosed)="handlePanelClosed()"
      (panelToggle)="handlePanelToggle($event)"
    >
      @if (headerText()) {
        <div
          slot="header"
          class="w-full min-w-full max-w-full text-lg font-semibold text-foreground"
        >
          {{ headerText() }}
        </div>
      }
      <ng-content select="[slot='header']" slot="header" />
      <div slot="body" class="w-full">
        <ng-content select="[slot='body']" />
        <ng-content />
      </div>
      <ng-content select="[slot='footer']" slot="footer" />
    </modus-wc-utility-panel>
  `,
})
export class ModusUtilityPanelComponent {
  @ViewChild('panelRef', { read: ElementRef })
  private readonly panelElementRef?: ElementRef<HTMLElement & Components.ModusWcUtilityPanel>;

  /** Apply className to host element for fixed positioning support */
  @HostBinding('class')
  get hostClass(): string {
    const classes: string[] = [];
    const cn = this.className();
    if (cn) {
      classes.push(cn);
    }
    if (this.position() === 'left') {
      classes.push('left');
    }
    return classes.join(' ');
  }

  /** Whether the panel is expanded. */
  readonly expanded = input<boolean>(false);

  /** Whether the panel is collapsed. When provided, overrides expanded. */
  readonly collapsed = input<boolean | undefined>();

  /** Optional CSS class applied to the panel wrapper. */
  readonly className = input<string | undefined>();

  /** Panel position (left or right). */
  readonly position = input<'left' | 'right'>('right');

  /** Optional header text shown when no custom header is provided. */
  readonly headerText = input<string | undefined>();

  /** Panel width (e.g. 300px, 24rem). */
  readonly panelWidth = input<string | undefined>();

  /** Optional target selector used for push content. */
  readonly targetSelector = input<string | undefined>();

  /** Determines if the panel pushes content or displays an overlay. */
  readonly pushContent = input<boolean>(false);

  /** Target element reference to push content when panel opens. */
  readonly targetElement = input<HTMLElement | undefined>();

  /** Accessible label for the panel. */
  readonly ariaLabel = input<string | undefined>();

  /** Accessible expanded state override. */
  readonly ariaExpanded = input<boolean | undefined>();

  /** Emits when the panel is opened. */
  readonly panelOpened = output<void>();

  /** Emits when the panel is closed. */
  readonly panelClosed = output<void>();

  /** Emits when the panel toggles, emitting the collapsed state. */
  readonly panelToggle = output<boolean>();

  readonly effectiveExpanded = computed(() => {
    const collapsed = this.collapsed();
    if (collapsed === undefined) {
      return this.expanded();
    }
    return !collapsed;
  });

  readonly resolvedTarget = computed(() => {
    // Only resolve target when pushContent is enabled
    if (!this.pushContent()) {
      return undefined;
    }
    const directTarget = this.targetElement();
    if (directTarget) {
      return directTarget;
    }
    const selector = this.targetSelector();
    if (!selector || typeof document === 'undefined') {
      return undefined;
    }
    return document.querySelector<HTMLElement>(selector) ?? undefined;
  });

  readonly panelClass = computed(() => {
    const classes = [
      this.className(),
      this.position() === 'left' ? 'modus-utility-panel--left' : undefined,
    ]
      .filter(Boolean)
      .join(' ');
    return classes.length > 0 ? classes : undefined;
  });

  private readonly injector = inject(Injector);

  constructor() {
    // Set properties directly on web component element after view initialization
    afterNextRender(() => {
      // Effect to sync properties when inputs change
      // This effect tracks all signal dependencies automatically
      // Must pass injector since we're outside the injection context
      effect(
        () => {
          const panel = this.panelElementRef?.nativeElement;
          if (!panel) {
            return;
          }

          // Read all signal values to ensure effect tracks them
          const expandedValue = this.effectiveExpanded();
          const pushContentValue = this.pushContent();
          const targetValue = this.resolvedTarget();
          const positionValue = this.position();

          // Set properties directly on web component (required for proper behavior)
          // This matches the React implementation pattern
          panel.expanded = expandedValue;
          panel.pushContent = pushContentValue;
          panel.targetElement = targetValue ?? undefined;

          // Handle push target class for left-positioned panels
          if (targetValue) {
            const applyLeftClass = positionValue === 'left' && pushContentValue;
            if (applyLeftClass) {
              targetValue.classList.add('modus-wc-utility-panel-push-target-left');
            } else {
              targetValue.classList.remove('modus-wc-utility-panel-push-target-left');
            }
          }
        },
        { injector: this.injector }
      );
    });
  }

  /** Handles panel opened event. */
  handlePanelOpened(): void {
    this.panelOpened.emit();
  }

  /** Handles panel closed event. */
  handlePanelClosed(): void {
    this.panelClosed.emit();
  }

  handlePanelToggle(event: Event): void {
    const detail = (event as CustomEvent<{ collapsed: boolean }>).detail;
    if (detail) {
      this.panelToggle.emit(detail.collapsed);
    }
  }
}

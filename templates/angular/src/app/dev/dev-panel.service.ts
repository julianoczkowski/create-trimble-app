import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../environments/environment.development';

/**
 * Service for managing Dev Panel state.
 *
 * Provides:
 * - Signal-based state management for panel open/close
 * - Environment-based feature flag
 * - Keyboard shortcuts (Ctrl+Shift+D to toggle, Escape to close)
 */
@Injectable({ providedIn: 'root' })
export class DevPanelService {
  private readonly _isOpen = signal(false);

  /** Read-only signal for panel open state */
  readonly isOpen = this._isOpen.asReadonly();

  /** Computed signal to check if Dev Panel feature is enabled */
  readonly isEnabled = computed(() => environment.devPanel);

  constructor() {
    this.initKeyboardShortcuts();
  }

  /** Toggle the panel open/close state */
  toggle(): void {
    this._isOpen.update((open) => !open);
  }

  /** Open the panel */
  open(): void {
    this._isOpen.set(true);
  }

  /** Close the panel */
  close(): void {
    this._isOpen.set(false);
  }

  /**
   * Initialize keyboard shortcuts for the Dev Panel.
   * - Ctrl+Shift+D (or Cmd+Shift+D on Mac): Toggle panel
   * - Escape: Close panel when open
   */
  private initKeyboardShortcuts(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      // Toggle with Ctrl+Shift+D or Cmd+Shift+D
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        this.toggle();
      }

      // Close with Escape when open
      if (event.key === 'Escape' && this._isOpen()) {
        event.preventDefault();
        this.close();
      }
    });
  }
}

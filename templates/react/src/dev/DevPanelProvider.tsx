import {
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { DevPanelContext } from "./DevPanelContext";

interface DevPanelProviderProps {
  children: ReactNode;
}

/**
 * Provider for Dev Panel state management.
 * Handles panel open/close state and keyboard shortcuts (Ctrl+Shift+D to toggle).
 */
export function DevPanelProvider({ children }: DevPanelProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard shortcut handler: Ctrl+Shift+D (or Cmd+Shift+D on Mac)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle with Ctrl+Shift+D or Cmd+Shift+D
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();
        toggle();
      }

      // Close with Escape when open
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle, close]);

  return (
    <DevPanelContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </DevPanelContext.Provider>
  );
}

export default DevPanelProvider;

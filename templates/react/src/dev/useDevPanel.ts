import { useContext } from "react";
import { DevPanelContext } from "./DevPanelContext";
import type { DevPanelContextType } from "./DevPanelContext";

/**
 * Hook to access the Dev Panel context.
 * Must be used within a DevPanelProvider.
 */
export function useDevPanel(): DevPanelContextType {
  const context = useContext(DevPanelContext);
  if (context === undefined) {
    throw new Error("useDevPanel must be used within a DevPanelProvider");
  }
  return context;
}

export default useDevPanel;

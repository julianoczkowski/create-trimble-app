import { createContext } from "react";

export interface DevPanelContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const DevPanelContext = createContext<DevPanelContextType | undefined>(
  undefined
);

export default DevPanelContext;

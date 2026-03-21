import { createSignal, onMount, onCleanup, type ParentComponent } from "solid-js";
import { DevPanelContext } from "./DevPanelContext";

export const DevPanelProvider: ParentComponent = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();
        toggle();
      }

      if (event.key === "Escape" && isOpen()) {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return (
    <DevPanelContext.Provider value={{ isOpen, toggle, open, close }}>
      {props.children}
    </DevPanelContext.Provider>
  );
};

export default DevPanelProvider;

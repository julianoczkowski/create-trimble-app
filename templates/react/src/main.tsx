// Set asset path BEFORE any component imports
import { setAssetPath } from "@trimble-oss/moduswebcomponents/components";
setAssetPath(window.location.origin + "/modus-wc/");

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

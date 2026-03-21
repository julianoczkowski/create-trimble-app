import { setAssetPath } from "@trimble-oss/moduswebcomponents/components";
setAssetPath(window.location.origin + "/modus-wc/");

import { defineCustomElements } from "@trimble-oss/moduswebcomponents/loader";
defineCustomElements();

import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

render(() => <App />, document.getElementById("root")!);

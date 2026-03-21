import { defineCustomElements } from "@trimble-oss/moduswebcomponents/loader";
defineCustomElements(window, { resourcesUrl: window.location.origin + "/" });

import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

render(() => <App />, document.getElementById("root")!);

import type { ParentComponent } from "solid-js";
import "@trimble-oss/moduswebcomponents/modus-wc-styles.css";

const ModusProvider: ParentComponent = (props) => {
  return <>{props.children}</>;
};

export default ModusProvider;

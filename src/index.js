import React from "react";
import { createRoot } from "react-dom/client";
import "antd-mobile/dist/antd-mobile.css";
import "react-virtualized/styles.css";
import "./assets/fonts/iconfont.css";
import App from "./App";
import "./index.css";
import "./utils/url";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// ReactDOM.render(<App />, document.getElementById("root"));

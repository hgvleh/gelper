import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Content from "./Content";
import Paperbase from "./Paperbase";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Paperbase />
  </StrictMode>
);

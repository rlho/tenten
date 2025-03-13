import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Wireframe } from "./screens/Wireframe/Wireframe";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Wireframe />
  </StrictMode>,
);

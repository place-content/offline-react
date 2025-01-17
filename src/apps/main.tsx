import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from ".";
import { serviceWorkerLoad } from "@/shared";

serviceWorkerLoad();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);

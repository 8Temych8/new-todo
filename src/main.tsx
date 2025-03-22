import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import App from "./App.tsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found in the DOM.");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

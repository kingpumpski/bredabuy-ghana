import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import AppErrorBoundary from "@/app/components/AppErrorBoundary";
import AppProviders from "@/app/providers/AppProviders";

import "@/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("BredaBuy application root element was not found.");
}

ReactDOM.createRoot(rootElement).render(
  <AppErrorBoundary>
    <AppProviders>
      <App />
    </AppProviders>
  </AppErrorBoundary>,
);

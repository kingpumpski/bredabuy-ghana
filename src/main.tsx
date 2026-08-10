import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";
import AppProviders from "@/app/providers/AppProviders";

import "@/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "BredaBuy application root element was not found."
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);

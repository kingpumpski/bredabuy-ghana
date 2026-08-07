import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


createRoot(
  document.getElementById("root")!
).render(
  <App />
);

import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";

import {router} from "./app/router";
import AppProviders from ".app/providers/AppProviders";

import "./index.css";


ReactDOM.createRoot(
document.getElementById("root")!
)
.render(

<React.StrictMode>

<AppProviders>

<RouterProvider router={router}/>

</AppProviders>

</React.StrictMode>

);
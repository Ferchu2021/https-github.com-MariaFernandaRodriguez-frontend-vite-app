import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import errorboundary from "./Components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <errorboundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </errorboundary>
  </React.StrictMode>
);

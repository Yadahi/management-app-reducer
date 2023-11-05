import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ManagementContextProvider from "./store/management-app-store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ManagementContextProvider>
      <App />
    </ManagementContextProvider>
  </React.StrictMode>
);

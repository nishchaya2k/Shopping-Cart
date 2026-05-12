import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./redux/Store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="bottom-right"
          gutter={10}
          toastOptions={{
            duration: 2200,
            style: {
              borderRadius: "12px",
              background: "#0f172a",
              color: "#f8fafc",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: 500,
              boxShadow:
                "0 8px 24px -8px rgba(15, 23, 42, 0.25), 0 2px 4px -2px rgba(15, 23, 42, 0.15)",
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

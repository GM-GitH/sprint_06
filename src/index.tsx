import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { useAuthStore }
from "./store/authStore";

const user =
  localStorage.getItem("user");

if (user) {
  useAuthStore
    .getState()
    .setUser(JSON.parse(user));
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Global } from "@emotion/react";


import { global, reset } from "./styles/global";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Global styles={reset} />
    <Global styles={global} />
    <App />
  </BrowserRouter>
);

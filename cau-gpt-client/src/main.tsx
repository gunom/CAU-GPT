import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/globalStyles.ts";
import Router from "./Router.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GlobalStyle />
    <Router />
  </>
);

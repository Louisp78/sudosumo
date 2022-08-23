import React from 'react';
import * as ReactDOM from 'react-dom/client';
import RenderRoutes from "./services/routes";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    {RenderRoutes()}
  </React.StrictMode>
);

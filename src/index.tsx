import React from 'react';
import * as ReactDOM from 'react-dom/client';
import RenderRoutes from "./services/routes";

// Set firebase config
import './services/firebase';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    {RenderRoutes()}
  </React.StrictMode>
);

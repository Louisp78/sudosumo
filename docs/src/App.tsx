import React from "react";
import './App.css'
import {setupStore} from "./infra/redux/store.ts";
import Router from "./routes/routes";
import {Provider} from "react-redux";

function App() {

  return (
    <React.StrictMode>
            <Provider store={setupStore}>
                <Router />
            </Provider>
    </React.StrictMode>
  )
}

export default App

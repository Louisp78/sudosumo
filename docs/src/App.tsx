import React from "react";
import './App.css'
import {setupStore} from "./infra/redux/store.ts";
import Router from "./routes/routes";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApiConfig } from "./infra/redux/api/ApiConfig.ts";


function App() {

  console.info("Starting with current api url : ", ApiConfig.baseUrl)
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID!}>
            <Provider store={setupStore}>
                <Router />
            </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  )
}

export default App

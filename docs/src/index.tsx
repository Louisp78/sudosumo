import React from 'react';
import * as ReactDOM from 'react-dom/client';
import RenderRoutes from "./services/routes";
import {Provider} from "react-redux";
import {setupStore} from "./infra/redux/store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import LoginPage from "./presentation/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root")!);
checkEnv();
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
            <Provider store={setupStore}>
                {RenderRoutes()}
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// check env var
function checkEnv() {
    if (process.env.REACT_APP_GOOGLE_CLIENT_ID === undefined) {
        throw new Error("REACT_APP_GOOGLE_CLIENT_ID is undefined");
    }
    if (process.env.REACT_APP_GOOGLE_CLIENT_SECRET === undefined) {
        throw new Error("REACT_APP_GOOGLE_CLIENT_SECRET is undefined");
    }
    if (process.env.REACT_APP_GOOGLE_REDIRECT_URI === undefined) {
        throw new Error("REACT_APP_GOOGLE_REDIRECT_URI is undefined");
    }
}

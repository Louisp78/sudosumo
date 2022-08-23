import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "../pages/App";
import Login from "../pages/Login";
import NoPage from "../pages/NoPage";

export default function RenderRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="dashboard" element={<App />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "../pages/App";
import NoPage from "../pages/NoPage";

export default function RenderRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<App />} />
                    <Route path="*" element={<NoPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
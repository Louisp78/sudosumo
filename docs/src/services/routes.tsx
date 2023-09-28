import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {App} from "../presentation/App";
import NoPage from "../presentation/NoPage";
import LoginPage from "../presentation/LoginPage";
import {ListOfUsers} from "../presentation/ListOfUsers";

export default function RenderRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<LoginPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/allusers" element={<ListOfUsers />} />
                    <Route path={"/login"} element={<LoginPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
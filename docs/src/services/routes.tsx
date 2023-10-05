import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../presentation/home/HomePage";
import NoPage from "../presentation/NoPage";
import LoginPage from "../presentation/LoginPage";
import {ListOfUsers} from "../presentation/ListOfUsers";
import {ProfilePage} from "../presentation/Profile";

export default function RenderRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/allusers" element={<ListOfUsers />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/profile"} element={<ProfilePage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
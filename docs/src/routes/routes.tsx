import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../presentation/home/HomePage";
import NoPage from "../presentation/NoPage";
import LoginPage from "../presentation/LoginPage";
import {ListOfUsers} from "../presentation/ListOfUsers";
import {ProfilePage} from "../presentation/profile/ProfilePage";
import {useSelector} from "react-redux";
import useAuthState from "../hooks/useAuthState";
import {RootState} from "../infra/redux/store";
import RouteConfig from "./RouteConfig";
import EditProfilePage from "../presentation/edit_profile/EditProfilePage";

const Router = () => {
    useAuthState();
    const userId = useSelector((state: RootState) => state.auth.userId);
    console.log("current user id: ", userId);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage/>}/>
                    <Route path="*" element={<NoPage/>}/>
                    <Route path={RouteConfig.allUsers} element={<ListOfUsers/>}/>
                    <Route path={RouteConfig.login} element={<LoginPage/>}/>
                    <Route path={RouteConfig.profile} element={<ProfilePage/>} />
                    <Route path={RouteConfig.editProfile} element={<EditProfilePage/>} />
                    </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
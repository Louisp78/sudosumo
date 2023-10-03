import React from "react";
import {useGetCurrentUserQuery} from "../infra/ApiSlice";

export const ProfilePage = () => {
    const {data, isLoading, isSuccess, isError, error} = useGetCurrentUserQuery();
    return (
        <div>
        <h1>Profile</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{JSON.stringify(error)}</div>}
            {isSuccess && <div>{JSON.stringify(data)}</div>}
        </div>
    )
}
import React from 'react'
import {useGetAllUsersQuery} from "../infra/redux/slices/apiSlice";
export const ListOfUsers = () => {

    const {data, isLoading, isSuccess, isError, error} = useGetAllUsersQuery();
    if (isLoading)
        return <div>Loading...</div>
    else if (isError)
        return <div>{JSON.stringify(error)}</div>
    return (
        <div>
            <h1>Get List of users</h1>
            <ul>
                {data?.map((user) => (
                    <li key={user.id}>{user.score}</li>
                ))}
            </ul>
        </div>
    );
}
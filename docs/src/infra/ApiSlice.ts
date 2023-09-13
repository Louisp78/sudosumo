// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TokenRequest} from "./request/TokenRequest";
import {UserDto} from "./dto/UserDto";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/', mode: 'cors'}),
    endpoints: (builder) => ({
        getUserByTokenRequest: builder.query<UserDto, TokenRequest>({
            query: (body) => ({
                url: `/users`,
                method: 'GET',
                body
            }),
        }),
        createUser: builder.mutation<UserDto, TokenRequest>({
            query: (body) => ({
                url: "/users/create",
                method: 'POST',
                body
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByTokenRequestQuery, useCreateUserMutation } = apiSlice
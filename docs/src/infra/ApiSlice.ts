// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TokenRequest} from "./request/TokenRequest";
import {UserDto} from "./dto/UserDto";
import {ApiConfig} from "./apiConfig";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiConfig.baseUrl,
        mode: 'cors',
        credentials: 'include',
    }),
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
        getAllUsers: builder.query<UserDto[], void>({
            query: () => ({
                url: "/users/all",
                method: 'GET',
            }),
        }),
        sendGoogleAuthorizationCode: builder.mutation<string, TokenRequest>({
            query: (body) => ({
                url: "/oauth2/authorization/google",
                method: 'POST',
                body
            }),

        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByTokenRequestQuery,
    useCreateUserMutation ,
    useGetAllUsersQuery
    , useSendGoogleAuthorizationCodeMutation
} = apiSlice
// Export the reducer for the API slice
export const { reducer: apiReducer , reducerPath: apiReducerPath, middleware: apiMiddleware} = apiSlice;
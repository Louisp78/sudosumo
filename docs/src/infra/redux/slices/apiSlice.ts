// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TokenRequest} from "../../request/TokenRequest";
import {UserDto} from "../../dto/UserDto";
import {ApiConfig} from "../api_config";
import {BaseQueryError, BaseQueryMeta} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiConfig.baseUrl,
        mode: 'cors',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<UserDto, TokenRequest>({
            query: (body) => ({
                url: ApiConfig.endpoint.createUser,
                method: 'POST',
                body
            }),
            transformErrorResponse(baseQueryReturnValue, meta, args) {
                if (baseQueryReturnValue.status === "FETCH_ERROR") {
                    ApiConfig.handleUnauthorized();
                }
                return baseQueryReturnValue;
            }
        }),
        getAllUsers: builder.query<UserDto[], void>({
            query: () => ({
                url: ApiConfig.endpoint.getAllUsers,
                method: 'GET',
            }),
            transformErrorResponse(baseQueryReturnValue, meta, args) {
                if (baseQueryReturnValue.status === "FETCH_ERROR") {
                    ApiConfig.handleUnauthorized();
                }
                return baseQueryReturnValue;
            }
        }),
        getCurrentUser: builder.query<UserDto, void>({
            query: () => ({
                url: ApiConfig.endpoint.getCurrentUser,
                method: 'GET',
            }),
            transformErrorResponse(baseQueryReturnValue, meta, args) {
                if (baseQueryReturnValue.status === "FETCH_ERROR") {
                    ApiConfig.handleUnauthorized();
                }
                return baseQueryReturnValue;
            }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateUserMutation,
    useGetAllUsersQuery,
    useGetCurrentUserQuery,
} = apiSlice
// Export the reducer for the API slice
export const {reducer: apiReducer, reducerPath: apiReducerPath, middleware: apiMiddleware} = apiSlice;
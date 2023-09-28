import { configureStore } from '@reduxjs/toolkit';
import {apiMiddleware, apiReducer, apiReducerPath} from './ApiSlice';
import authReducer from "./authReducer";

export const setupStore = configureStore({
    reducer: {
        auth: authReducer,
        [apiReducerPath]: apiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof setupStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof setupStore.dispatch;
export type AppStore = typeof setupStore;

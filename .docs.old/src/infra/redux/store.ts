import { configureStore } from '@reduxjs/toolkit';
import {apiMiddleware, apiReducer, apiReducerPath} from './api/apiSlice';
import editSlice from "./slices/editSlice";
import gridSlice from "./slices/gridSlice";
import authSlice from "./slices/authSlice";

export const setupStore = configureStore({
    reducer: {
        edit: editSlice.reducer,
        grid: gridSlice.reducer,
        auth: authSlice.reducer,
        [apiReducerPath]: apiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof setupStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof setupStore.dispatch;
export type AppStore = typeof setupStore;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "./store";

interface AuthState {
    accessToken: string;
}

const initialState: AuthState = {
    accessToken: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setAccessToken,} = authSlice.actions;
export const selectAccessToken = (state : RootState) => state.auth.accessToken;
export default authSlice.reducer;

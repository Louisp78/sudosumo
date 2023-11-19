import {createSlice} from "@reduxjs/toolkit";

const initialState : IAuthSlice = {
    userId: undefined,
}

const authSlice = createSlice({
    initialState: initialState,
    name: 'auth',
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    }
});

export const {
    setUserId,
} = authSlice.actions;
export default authSlice;
import {createSlice} from "@reduxjs/toolkit";
import {EditMode} from "../../../enum";
import IEditSlice from "./iEditSlice";

const initialState : IEditSlice = {
    editMode: EditMode.Pen,
    selectedNumber: 1,
};
const editSlice = createSlice({
    initialState: initialState,
    name: 'edit',
    reducers: {
        setEditModeReducer: (state, action) => {
            state.editMode = action.payload;
        },
        setSelectedNumberReducer: (state, action) => {
            state.selectedNumber = action.payload;
        },
        nextSelectedNumberReducer: (state) => {
            if (state.selectedNumber + 1 > 9) {
                state.selectedNumber = 1;
            } else {
                state.selectedNumber = state.selectedNumber + 1;
            }
        },
        prevSelectedNumberReducer: (state) => {
            if (state.selectedNumber - 1 < 1) {
                state.selectedNumber = 9;
            } else {
                state.selectedNumber = state.selectedNumber - 1;
            }
        },
    }
});

export const {
    setEditModeReducer,
    setSelectedNumberReducer,
    nextSelectedNumberReducer,
    prevSelectedNumberReducer,
} = editSlice.actions;
export default editSlice;
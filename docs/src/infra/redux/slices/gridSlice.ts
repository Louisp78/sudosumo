import {createSlice} from "@reduxjs/toolkit";
import {GridState} from "../../../domain/GridState";
import IGridSlice from "./iGridSlice";
import CellType from "../../../domain/CellType";

const initialState: IGridSlice = {
    previousGrid: ".".repeat(81),
    grid: ".".repeat(81),
    clues: ".".repeat(81),
    gridState: GridState.UNSOLVED,
}

const gridSlice = createSlice({
    name: 'sudoku',
    initialState: initialState,
    reducers: {
        setGridReducer: (state, action) => {
            state.grid = action.payload.slice();
        },
        setCluesReducer: (state, action) => {
            state.clues = action.payload;
        },
        setGridStateReducer: (state, action) => {
            state.gridState = action.payload;
        },
        setPreviousGridReducer: (state, action) => {
            state.previousGrid = action.payload;
        },
    }
});

export const {
    setGridReducer,
    setCluesReducer,
    setPreviousGridReducer,
} = gridSlice.actions;
export default gridSlice;
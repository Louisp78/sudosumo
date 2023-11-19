import {GridState} from "../../../domain/GridState";
import CellType from "../../../domain/CellType";

interface IGridSlice {
    clues: string;
    grid: string;
    previousGrid: string;
    gridState: GridState;
}

export default IGridSlice;
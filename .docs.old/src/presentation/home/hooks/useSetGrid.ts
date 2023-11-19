import CellType from "../../../domain/CellType";
import SudokuDomain from "../../../domain/SudokuDomain";
import {setGridReducer, setPreviousGridReducer} from "../../../infra/redux/slices/gridSlice";
import UtilsGrid from "../../../infra/utils/UtilsGrid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";

const useSetGrid = () => {
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);
    const dispatch = useDispatch();
    const setGrid = (newGrid: CellType[][]) => {
        const sudoku = new SudokuDomain({grid: newGrid});
        dispatch(setPreviousGridReducer(UtilsGrid.gridMatrixToString(grid)));
        dispatch(setGridReducer(UtilsGrid.gridMatrixToString(newGrid)));
    }
    return {setGrid};
}

export default useSetGrid;
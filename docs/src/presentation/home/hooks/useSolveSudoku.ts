import SudokuDomain from "../../../domain/SudokuDomain";
import {GridState} from "../../../domain/GridState";
import {useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import UtilsGrid from "../../../components/UtilsGrid";
import SudokuRepositoryImpl from "../../../domain/SudokuRepositoryImpl";
import useSetGrid from "./useSetGrid";

const useSolveSudoku = () => {

    const setGrid = useSetGrid();
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);

    const sudokuRepository = new SudokuRepositoryImpl();

    const solve = () => {
        const sudoku = new SudokuDomain({grid: grid});
        if (sudokuRepository.getGridState(sudoku) === GridState.UNSOLVED) {
            if (sudokuRepository.solve(sudoku)) {
                setGrid(sudoku.grid);
            }
        }
    }
    return {solve};
}

export default useSolveSudoku;
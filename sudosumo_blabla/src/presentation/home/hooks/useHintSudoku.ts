import SudokuDomain from "../../../domain/SudokuDomain";
import {GridState} from "../../../domain/GridState";
import SudokuRepositoryImpl from "../../../domain/SudokuRepositoryImpl";
import useSetGrid from "./useSetGrid";
import {useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import UtilsGrid from "../../../infra/utils/UtilsGrid";


const useHintSudoku = () => {
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);

    const {setGrid} = useSetGrid();
    const sudokuRepository = new SudokuRepositoryImpl();
    const hint = () => {
        const sudoku = new SudokuDomain({grid: grid});
        if (sudokuRepository.getGridState(sudoku) === GridState.UNSOLVED){
            if (sudokuRepository.hint(sudoku)){
                setGrid(sudoku.grid);
            }
        }
    }
    return {hint};
}

export default useHintSudoku;
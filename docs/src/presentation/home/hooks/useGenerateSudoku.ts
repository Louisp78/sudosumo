import SudokuDomain from "../../../domain/SudokuDomain";
import {DIFFICULTY} from "../../../domain/sudoku_solver_lib/sudoku";
import {setCluesReducer} from "../../../infra/redux/slices/gridSlice";
import UtilsGrid from "../../../components/UtilsGrid";
import SudokuRepositoryImpl from "../../../domain/SudokuRepositoryImpl";
import React from "react";
import {useDispatch} from "react-redux";
import useSetGrid from "./useSetGrid";
import useGridCleaner from "./useGridCleaner";

const useGenerateSudoku = ({setDisplayLoading} : any) => {
    const {setDisplayUndoClean} = useGridCleaner();
    const {setGrid} = useSetGrid();
    const [score, setScore] = React.useState(0);
    const dispatch = useDispatch();
    const sudokuRepository = new SudokuRepositoryImpl();
    const newSudoku = () => {
        setDisplayLoading(true);
        setDisplayUndoClean(false);

        const sudoku : SudokuDomain = sudokuRepository.generateSudoku(DIFFICULTY.medium);
        setScore(sudoku.difficultyScore);

        dispatch(setCluesReducer(UtilsGrid.gridMatrixToString(sudoku.clues)));
        setGrid(sudoku.grid);
        setDisplayLoading(false);
    }
    return {score, newSudoku};
}

export default useGenerateSudoku;
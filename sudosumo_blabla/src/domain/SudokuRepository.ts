import SudokuDomain from "./SudokuDomain";
import {GridState} from "./GridState";

interface SudokuRepository {
    solve: (sudokuDomain : SudokuDomain) => boolean;
    hint: (sudokuDomain: SudokuDomain) => boolean;
    isValid: (sudokuDomain: SudokuDomain) => boolean;
    isSolved: (sudokuDomain: SudokuDomain) => boolean;
    getGridState: (sudokuDomain: SudokuDomain) => GridState;
    generateGrid: (difficultyScore: number) => SudokuDomain;
}

export default SudokuRepository;
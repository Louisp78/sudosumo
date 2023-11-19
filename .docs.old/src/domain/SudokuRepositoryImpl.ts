import SudokuRepository from "./SudokuRepository";
import SudokuDomain from "./SudokuDomain";
import CellType from "./CellType";
import sudoku from "./sudoku_solver_lib/sudoku";
import UtilsGrid from "../infra/utils/UtilsGrid";
import { GridState } from "./GridState";

class SudokuRepositoryImpl implements SudokuRepository {
    hint(sudokuDomain: SudokuDomain) : boolean{
        //TODO: implement
        return false;
    }

    // Add dependency inside constructor if needed


    getGridState(sudokuDomain: SudokuDomain) : GridState {
        if (this.isSolved(sudokuDomain)){
            return GridState.SOLVED;
        } else if (this.isValid(sudokuDomain)){
            return GridState.UNSOLVED;
        } else {
            return GridState.INVALID;
        }
    }

    generateGrid(difficultyScore: number): SudokuDomain {
        const strGeneratedSudoku = sudoku.generate(difficultyScore);
        const grid = UtilsGrid.stringToGridMatrix(strGeneratedSudoku);
        return new SudokuDomain({grid});
    }


    // A valid Sudoku with no empty cells
    isSolved(sudokuDomain : SudokuDomain): boolean {
        return sudokuDomain.grid.every(row => row.every(cell => cell !== undefined))
            && this.isValid(sudokuDomain);
    }

    isValid(sudokuDomain : SudokuDomain): boolean {
        // check per row
        for (let x = 0; x < sudokuDomain.grid.length; x++){
            const currentRow : CellType[] = [];
            for (let y = 0; y < sudokuDomain.grid[x].length; y++){
                if (currentRow.includes(sudokuDomain.grid[x][y])){
                    return false;
                }
                if (sudokuDomain.grid[x][y] !== undefined)
                    currentRow.push(sudokuDomain.grid[x][y]);
            }
        }

        // check per column
        for (let y = 0; y < sudokuDomain.grid.length; y++){
            let currentColumn : CellType[] = [];
            for (let x = 0; x < sudokuDomain.grid.length; x++){
                if (currentColumn.includes(sudokuDomain.grid[x][y])){
                    return false;
                }
                if (sudokuDomain.grid[x][y] !== undefined)
                    currentColumn.push(sudokuDomain.grid[x][y]);
            }
        }

        // check per block
        for (let x = 0; x < sudokuDomain.grid.length; x += 3){
            for (let y = 0; y < sudokuDomain.grid.length; y += 3){
                let currentBlock : CellType[] = [];
                for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        if (currentBlock.includes(sudokuDomain.grid[x + i][y + j])){
                            return false;
                        }
                        if (sudokuDomain.grid[x + i][y + j] !== undefined)
                            currentBlock.push(sudokuDomain.grid[x + i][y + j]);
                    }
                }
            }
        }
        return true;
    }

    // Different strategies to solve the Sudoku
    solve(sudokuDomain : SudokuDomain): boolean {
        const strSolvedSudoku = sudoku.solve(sudokuDomain.toString());
        if (strSolvedSudoku === false){
            return false;
        }
        sudokuDomain.grid = UtilsGrid.stringToGridMatrix(strSolvedSudoku);
        return true;
    }

    generateSudoku(difficultyScore : number): SudokuDomain {
        const strGeneratedSudoku = sudoku.generate(difficultyScore);
        console.log("generated string sudoku: " + strGeneratedSudoku);
        const grid = UtilsGrid.stringToGridMatrix(strGeneratedSudoku);
        console.log("generated sudoku: " + grid);
        const sudokuDomain = new SudokuDomain({grid});
        console.log("generated sudokuDomain: " + sudokuDomain.prettyString());
        return sudokuDomain;
    }

}

export default SudokuRepositoryImpl;
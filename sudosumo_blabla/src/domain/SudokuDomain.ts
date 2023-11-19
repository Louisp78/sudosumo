import CellType from "./CellType";

class SudokuDomain {
    clues: CellType[][];
    grid: CellType[][];
    gridDimensions: number = 9;
    difficultyScore: number;

    constructor({grid}: { grid: CellType[][] }) {
        this.clues = grid;
        this.grid = grid;
        this.gridDimensions = grid.length;
        // TODO: calculate difficulty score
        this.difficultyScore = grid.flat().filter(cell => cell === undefined).length;
    }

    toString() : string {
        return this.grid.map(row => row.map(cell => cell === undefined ? '.' : cell).join("")).join("");
    }

    prettyString(): string {
        let result = '';
        for (let i = 0; i < 9; i++) {
            if (i > 0 && i % 3 === 0) {
                result += '- - - - - - - - - - -\n'; // Separator line for every 3 rows
            }
            for (let j = 0; j < 9; j++) {
                if (j > 0 && j % 3 === 0) {
                    result += '| '; // Separator within each block
                }
                const cellValue = this.grid[i][j];
                result += cellValue === undefined ? '. ' : cellValue + ' ';
            }
            result += '\n'; // Newline at the end of each row
        }
        return result;
    }
}

export default SudokuDomain;
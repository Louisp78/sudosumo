import Utils from './Utils'
import {PuzzleState} from '../pages/App';
import UtilsGrid from "./UtilsGrid";
import {CoordinateType, GridMatrixType, PossibilitiesType} from "./Type";


enum StrategyState {
    Worked,
    NotWorked,
}


/// Possibilities array is an array of arrays of possibilities
/// If a value is null in it, it means it is found in the grid
class Solver {
    public grid: GridMatrixType;
    public possibilities: PossibilitiesType;
    private score: number;

    constructor(grid: GridMatrixType) {
        this.grid = grid;
        this.score = 0;
        this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(grid);
    }

// FIXME: this function must be removed after Hint class is implemented
    hint() {
        console.log('Getting an hint')
        this.eliminate();
        const fHint = this.getFirstPossibility();
        if (fHint !== null) {
            let {x, y} = fHint;
            console.log('display hint at x:', x, ' and y:', y)
            this.grid[x][y] = this.possibilities[x][y][0];
        } else {
            console.log('no hint');
        }
    }

// FIXME: this function must be removed after Hint class is implemented
    getFirstPossibility() {
        for (let x = 0; x < this.possibilities.length; x++) {
            for (let y = 0; y < this.possibilities[x].length; y++) {
                if (this.possibilities[x][y].length === 1 && this.grid[x][y] == null) {
                    //console.log(this.possibilities[x][y][0], "is the only possibilty at ", x, ", ", y);
                    return {x, y};
                }
                // TODO: detect error when this.possibilities[x][y].length == 0 mean puzzle is wrong
            }
        }
        return null;
    }


    removePossibilityFromIndex(number: number, x: number, y: number) {
        this.possibilities[x][y] = [number];
        /// line
        for (let yBis = 0; yBis < this.possibilities[x].length; yBis++) {
            if (yBis !== y)
                this.possibilities[x][yBis] = this.possibilities[x][yBis].filter(elt => elt !== number);
        }
        /// column
        for (let xBis = 0; xBis < this.possibilities.length; xBis++) {
            if (xBis !== x)
                this.possibilities[xBis][y] = this.possibilities[xBis][y].filter((elt) => elt !== number);
        }
        /// square
        let {startX, startY} = UtilsGrid.getSquareFromIndex(x, y)
        //console.log("startX : ", startX, " startY :", startY);
        for (let xBis = startX; xBis <= startX + 2; xBis++) {
            for (let yBis = startY; yBis <= startY + 2; yBis++) {
                if (xBis !== x || yBis !== y)
                    this.possibilities[xBis][yBis] = (this.possibilities[xBis][yBis]).filter((elt) => elt !== number)
            }
        }

    }


    /// Delete all impossible possibilities based on the current grid
    eliminate() {
        for (let selectedNumber = 1; selectedNumber <= 9; selectedNumber++) {
            for (let x = 0; x < this.grid.length; x++) {
                for (let y = 0; y < this.grid[x].length; y++) {
                    if (this.grid[x][y] === selectedNumber) {
                        this.removePossibilityFromIndex(selectedNumber, x, y)
                    }
                }
            }
        }
    }

/// If only one possibility, we can put it in the grid
/// Then we can eliminate it from the other possibilities
/// Return if puzzle stay valid or not

/// This function can detect last digit and naked single
    lastDigit(): StrategyState {
        this.eliminate();
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 5;

        for (let x = 0; x < this.possibilities.length; x++) {
            for (let y = 0; y < this.possibilities[x].length; y++) {
                if (this.possibilities[x][y].length === 1 && this.grid[x][y] == null) {
                    strategyState = StrategyState.Worked;
                    this.grid[x][y] = this.possibilities[x][y][0]
                } else if (this.possibilities[x][y].length === 0) {
                    return strategyState;
                }
            }
        }
        return strategyState;
    }

/// This function detect hidden single when a digit appears once in the possibilities arrays of a square, column or line
    hiddenSingle(): StrategyState {
        this.eliminate();
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 10;

        // line
        for (let x = 0; x < this.possibilities.length; x++) {
            const currentLine = UtilsGrid.getLine(this.possibilities, x).map(elt => this.possibilities[x][elt.y]);
            const histogram = Utils.getHistogramPossibilities(currentLine);
            for (const [key, value] of Object.entries(histogram)) {
                const index = currentLine.findIndex(elt => elt.includes(parseInt(key)));
                if (value === 1 && this.grid[x][index] === null) {
                    strategyState = StrategyState.Worked;
                    this.grid[x][index] = parseInt(key);
                    this.eliminate();
                }
            }
        }
        // column
        for (let y = 0; y < this.possibilities[0].length; y++) {
            const currentColumn = UtilsGrid.getColumn(this.possibilities, y).map(elt => this.possibilities[elt.x][y]);
            const histogram = Utils.getHistogramPossibilities(currentColumn);
            for (const [key, value] of Object.entries(histogram)) {
                const index = currentColumn.findIndex(elt => elt.includes(parseInt(key)));
                if (value === 1 && this.grid[index][y] === null) {
                    strategyState = StrategyState.Worked;
                    this.grid[index][y] = parseInt(key);
                    this.eliminate();
                }
            }
        }

        // block
        for (let x = 0; x < this.possibilities.length; x += 3) {
            for (let y = 0; y < this.possibilities[x].length; y += 3) {
                const currentBlock = UtilsGrid.getBlock(x, y).map(elt => this.possibilities[elt.x][elt.y]);
                const histogram = Utils.getHistogramPossibilities(currentBlock);
                for (const [key, value] of Object.entries(histogram)) {
                    const index = currentBlock.findIndex(elt => elt.includes(parseInt(key)));
                    const xBis = x + Math.floor(index / 3);
                    const yBis = y + index % 3;
                    if (value === 1 && this.grid[xBis][yBis] === null) {
                        strategyState = StrategyState.Worked;
                        this.grid[xBis][yBis] = parseInt(key);
                        this.eliminate();
                    }
                }
            }
        }

        return strategyState;

    }


    /// From array of coordinates, remove all possibilities from array of values
    /// Values correspond to a pair, triplet or quad of numbers
    removePossibilitiesFromPair(coords: Array<CoordinateType>, pairingLength: number): StrategyState {

        let strategyState = StrategyState.NotWorked;

        const coordsVal = coords.map(elt => this.possibilities[elt.x][elt.y]);
        const histogram = Utils.getHistogramOfPairing(coordsVal)
        for (const [key, value] of Object.entries(histogram)) {
            if (value === pairingLength && key.length === pairingLength) {
                const pairs = Utils.arrayRepOfString(key);
                //let countVal = 0;
                for (const coordinate of coords) {
                    const x = coordinate.x;
                    const y = coordinate.y;
                    if (Utils.getArrayCombination23(pairs).some(elt => Utils.areSameArray(this.possibilities[x][y], elt)) /*&&
                        countVal < pairingLength*/) {
                        //countVal += 1;
                    } else {
                        const lengthInitial = this.possibilities[x][y].length;
                        this.possibilities[x][y] = this.possibilities[x][y]
                            .filter(elt => !pairs.includes(elt));
                        if (this.possibilities[x][y].length < lengthInitial) {
                            strategyState = StrategyState.Worked;
                        }
                    }
                }
            }
        }
        return strategyState;
    }

    nakedPairs(): StrategyState {
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 15;

        /// by line
        for (let x = 0; x < this.possibilities.length; x++) {
            const line = UtilsGrid.getLine(this.possibilities, x);
            if (this.removePossibilitiesFromPair(line, 2) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }

        /// by columns
        for (let y = 0; y < this.possibilities.length; y++) {
            const colsIndex = UtilsGrid.getColumn(this.possibilities, y);
            if (this.removePossibilitiesFromPair(colsIndex, 2) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }

        /// by blocks
        for (let x = 0; x < this.possibilities.length; x += 3) {
            for (let y = 0; y < this.possibilities.length; y += 3) {
                const blockIndex = UtilsGrid.getBlock(x, y);
                if (this.removePossibilitiesFromPair(blockIndex, 2) === StrategyState.Worked) {
                    strategyState = StrategyState.Worked;
                }
            }
        }

        return strategyState;
    }

    hiddenPairs(): StrategyState {
        // TODO: Implement this function
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 20;

        return strategyState;
    }

    nakedTriplets(): StrategyState {
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 40;

        /// Line
        for (let x = 0; x < this.possibilities.length; x++) {
            const line = UtilsGrid.getLine(this.possibilities, x);
            if (this.removePossibilitiesFromPair(line, 3) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }
        /// Column
        for (let y = 0; y < this.possibilities.length; y++) {
            const colsIndex = UtilsGrid.getColumn(this.possibilities, y);
            if (this.removePossibilitiesFromPair(colsIndex, 3) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }
        /// Block
        for (let x = 0; x < this.possibilities.length; x += 3) {
            for (let y = 0; y < this.possibilities.length; y += 3) {
                const blockIndex = UtilsGrid.getBlock(x, y);
                if (this.removePossibilitiesFromPair(blockIndex, 3) === StrategyState.Worked) {
                    strategyState = StrategyState.Worked;
                }
            }
        }

        return strategyState;
    }

    hiddenTriplets(): StrategyState {
        // TODO: Implement this function
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 45;

        return strategyState;
    }

    nakedQuadruplets(): StrategyState {
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 60;

        /// Line
        for (let x = 0; x < this.possibilities.length; x++) {
            const line = UtilsGrid.getLine(this.possibilities, x);
            if (this.removePossibilitiesFromPair(line, 4) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }
        /// Column
        for (let y = 0; y < this.possibilities.length; y++) {
            const colsIndex = UtilsGrid.getColumn(this.possibilities, y);
            if (this.removePossibilitiesFromPair(colsIndex, 4) === StrategyState.Worked) {
                strategyState = StrategyState.Worked;
            }
        }
        /// Block
        for (let x = 0; x < this.possibilities.length; x += 3) {
            for (let y = 0; y < this.possibilities.length; y += 3) {
                const blockIndex = UtilsGrid.getBlock(x, y);
                if (this.removePossibilitiesFromPair(blockIndex, 4) === StrategyState.Worked) {
                    strategyState = StrategyState.Worked;
                }
            }
        }
        return strategyState;
    }

    hiddenQuadruplets(): StrategyState {
        // TODO: Implement this function
        let strategyState = StrategyState.NotWorked;

        // set score
        this.score += 65;

        return strategyState;
    }


    /// Constraint propagation algorithm
    /// Each time this function is called, the score of the sudoku is set
    solve(): PuzzleState {
        // reset score
        this.score = (81 - UtilsGrid.countFilledCells(this.grid)) * 10;
        // Call eliminate() mostly for generateSudoku()
        let numberOfPass = 0;

        let strategies = Array.of(() => this.lastDigit(), () => this.hiddenSingle(), () => this.nakedPairs(), () => this.nakedTriplets());
        let indexStrategy = 0;
        let isStrategyWorkedAtLeastOnce = false;
        let strategyState = StrategyState.Worked;

        while (UtilsGrid.isSolved(this.grid, this.possibilities) === PuzzleState.Undone) {
            strategyState = StrategyState.Worked;
            isStrategyWorkedAtLeastOnce = false;
            while (strategyState === StrategyState.Worked && UtilsGrid.isSolved(this.grid, this.possibilities) === PuzzleState.Undone) {
                strategyState = strategies[indexStrategy]();
                if (strategyState === StrategyState.Worked)
                    isStrategyWorkedAtLeastOnce = true;
            }
            if (indexStrategy === strategies.length - 1 && !isStrategyWorkedAtLeastOnce) {
                break;
            }
            this.score += 30;
            if (isStrategyWorkedAtLeastOnce) {
                if (indexStrategy === 0) {
                    indexStrategy = 1;
                } else {
                    indexStrategy = 0;
                }
                // If the current strategy didn't work, we must select the next strategy.
            } else {
                indexStrategy += 1;
            }
        }
        return UtilsGrid.isSolved(this.grid, this.possibilities);
    }


    cleanGrid() {
        this.grid = Utils.convertArrayToMatrix(Array(81).fill(null), 9);
        this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(this.grid);
    }

    /// Get array of all possible coordinates left
    getArrayOfAllCoordsOfEmptyCell(): Array<CoordinateType> {
        const arrayOfCoords = [];
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid.length; y++) {
                if (this.grid[x][y] === null) {
                    arrayOfCoords.push({x, y});
                }
            }
        }
        return arrayOfCoords;
    }

    getArrayOfAllCoordsOfFilledCell(): Array<CoordinateType> {
        const arrayOfCoords = [];
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid.length; y++) {
                if (this.grid[x][y] !== null) {
                    arrayOfCoords.push({x, y});
                }
            }
        }
        return arrayOfCoords;
    }

    fillGrid() {
        // step 1: pick a random cell and place a random number which is possible
        // step 2: check if sudoku is currently solvable, if not go back to step 1

        while (UtilsGrid.isSolved(this.grid, this.possibilities) !== PuzzleState.Solved) {
            this.cleanGrid();
            while (UtilsGrid.isEmptyCellLeft(this.grid)) {
                const allIndex = this.getArrayOfAllCoordsOfEmptyCell();
                let ind = Utils.getRandomInt(0, allIndex.length - 1);
                const {x, y} = allIndex[ind];
                // pick random a possibility of this cell
                const randPossibility = Utils.getRandomInt(0, this.possibilities[x][y].length - 1);
                this.grid[x][y] = this.possibilities[x][y][randPossibility];
                this.eliminate();

                const validity = this.solve();
                console.log('validity :', validity);
                if (validity === PuzzleState.Invalid)
                    break;
            }
        }
    }

    /// Get the solvable puzzle with the least number of filled cells
    setToMinimalGrid() {
        const initialGrid = Utils.deepCopyMatrix(this.grid);

        let gridResult : GridMatrixType = initialGrid;
        let countFilledCells : number = UtilsGrid.countFilledCells(this.grid);
        let score = this.score;

        let numberOfTry = 100;

        // test each combination of filled cells and find the one with the least number of filled cells
        while(numberOfTry > 0)
        {
            // get coordinates of all filled cells
            const coords = Utils.shuffleArray(this.getArrayOfAllCoordsOfFilledCell());

            coords.forEach(elt => this.grid[elt.x][elt.y] = null);
            this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(this.grid);

            const cpyGrid = Utils.deepCopyMatrix(this.grid);
            this.solve();

            const currentFilledCells = UtilsGrid.countFilledCells(this.grid);

            if (UtilsGrid.isSolved(this.grid, this.possibilities) === PuzzleState.Solved &&
                this.score > score) {
                gridResult = cpyGrid;
                countFilledCells = currentFilledCells;
            }

            this.grid = Utils.deepCopyMatrix(initialGrid);
            numberOfTry--;
        }

        this.grid = gridResult;
        this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(this.grid);
    }
    /// Generate sudoku v 2.0
    gen2(minScore: number = 0) {
        let saveGrid: GridMatrixType = [[]];
        while (UtilsGrid.isSolved(this.grid, this.possibilities) !== PuzzleState.Solved || this.score < minScore) {
            this.cleanGrid();
            while (UtilsGrid.isEmptyCellLeft(this.grid) && UtilsGrid.isSolved(this.grid, this.possibilities) !== PuzzleState.Solved) {
                const allIndex = this.getArrayOfAllCoordsOfEmptyCell();
                let ind = Utils.getRandomInt(0, allIndex.length - 1);
                const {x, y} = allIndex[ind];
                // pick random a possibility of this cell
                const randPossibility = Utils.getRandomInt(0, this.possibilities[x][y].length - 1);
                this.grid[x][y] = this.possibilities[x][y][randPossibility];
                this.eliminate();

                saveGrid = Utils.deepCopyMatrix(this.grid);

                const validity = this.solve();
                console.log('validity :', validity);
                if (validity === PuzzleState.Invalid)
                    break;
            }
        }
        this.grid = saveGrid;

        this.setToMinimalGrid();
    }


    /// Get the score of difficulty of the current sudoku
    getScore(): number {
        // Set the score
        this.solve();

        return this.score;
    }




/// Clean grid and possibilities
/// STEP 1: fill grid with a valid solved puzzle
/// STEP 2: Remove number and check each time if sudoku stay solvable
    generateSudoku() {
        this.cleanGrid();


        this.fillGrid();
        let prevValue: number | null = null;

        let tempGrid: GridMatrixType = Utils.deepCopyMatrix(this.grid);

        let x = 0
        let y = 0
        let puzzleState = this.solve();
        while (puzzleState === PuzzleState.Solved) {
            x = Utils.getRandomInt(0, 8);
            y = Utils.getRandomInt(0, 8);
            while (tempGrid[x][y] == null) {
                x = Utils.getRandomInt(0, 8);
                y = Utils.getRandomInt(0, 8);
            }
            prevValue = tempGrid[x][y];
            tempGrid[x][y] = null;
            this.grid = Utils.deepCopyMatrix(tempGrid);
            this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(this.grid);
            puzzleState = this.solve();
        }

        tempGrid[x][y] = prevValue;
        this.grid = Utils.deepCopyMatrix(tempGrid);
        this.possibilities = UtilsGrid.resetPossibilitiesFromGrid(this.grid);
    }

}

export default Solver
import Utils from './Utils.js'
import {PuzzleState} from '../App.js';
import UtilsGrid from "./UtilsGrid";


const StrategyState = {
    Worked: 'worked',
    NotWorked: 'notWorked'
}


/// Possibilities array is an array of arrays of possibilities
/// If a value is null in it, it means it is found in the grid
class Solver {
    constructor(grid) {
        this.grid = grid;
        this.possibilities = UtilsGrid.getPossibilitiesFromGrid(grid);
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


    removePossibilityFromIndex(number, x, y) {
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
    lastDigit() {
        this.eliminate();
        var strategyState = StrategyState.NotWorked;
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
    hiddenSingle() {
        this.eliminate();
        var strategyState = StrategyState.NotWorked;
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

    nakedPairs() {
        var strategyState = StrategyState.NotWorked;
        /// by line
        for (let x = 0; x < this.possibilities.length; x++) {
            const histogram = Utils.getHistogramArrayPossibilities(this.possibilities[x])
            for (const [key, value] of Object.entries(histogram)) {
                if (value === 2 && key.length === 2) {
                    const pairs = Utils.arrayRepOfString(key);
                    for (let y = 0; y < this.possibilities[x].length; y++) {
                        if (key !== Utils.stringRepOfArray(this.possibilities[x][y])){
                            const lengthInitial = this.possibilities[x][y].length;
                            this.possibilities[x][y] = this.possibilities[x][y]
                                .filter(elt => elt !== pairs[0] && elt !== pairs[1]);
                            if (this.possibilities[x][y].length < lengthInitial) {
                                strategyState = StrategyState.Worked;
                            }
                        }
                    }
                }
            }
        }

        /// by columns
        for (let y = 0; y < this.possibilities.length; y++) {
            const cols = UtilsGrid.getColumn(this.possibilities, y).map(elt => this.possibilities[elt.x][y])
            const histogram = Utils.getHistogramArrayPossibilities(cols);
            for (const [key, value] of Object.entries(histogram)) {
                if (value === 2 && key.length === 2) {
                    const pairs = Utils.arrayRepOfString(key);
                    for (let x = 0; x < this.possibilities.length; x++) {
                        if (key !== Utils.stringRepOfArray(this.possibilities[x][y])) {
                            const lengthInitial = this.possibilities[x][y].length;
                            this.possibilities[x][y] = this.possibilities[x][y]
                                .filter(elt => elt !== pairs[0] && elt !== pairs[1]);
                            if (this.possibilities[x][y].length < lengthInitial) {
                                strategyState = StrategyState.Worked;
                            }
                        }
                    }
                }
            }
        }

        /// by blocks
        for (var x = 0; x < this.possibilities.length; x += 3) {
            for (var y = 0; y < this.possibilities.length; y += 3) {
                const block = UtilsGrid.getBlock(x, y).map((elt) => this.possibilities[elt.x][elt.y]);
                const histogram = Utils.getHistogramArrayPossibilities(block)
                for (const [key, value] of Object.entries(histogram)) {
                    if (value === 2 && key.length === 2) {
                        const pairs = Utils.arrayRepOfString(key);
                        for (var coords of UtilsGrid.getBlock(x, y)) {
                            const xBis = coords.x;
                            const yBis = coords.y;
                            if (key !== Utils.stringRepOfArray(this.possibilities[xBis][yBis])) {
                                const lengthInitial = this.possibilities[xBis][yBis].length;
                                this.possibilities[xBis][yBis] = this.possibilities[xBis][yBis]
                                    .filter(elt => elt !== pairs[0] && elt !== pairs[1]);
                                if (this.possibilities[xBis][yBis].length < lengthInitial) {
                                    strategyState = StrategyState.Worked;
                                }
                            }
                        }
                    }
                }
            }
        }

        return strategyState;

    }

    hiddenPairs() {
        // TODO: Implement this function
        var strategyState = StrategyState.NotWorked;
        return strategyState;
    }

    nakedTriplets() {
        // TODO: Implement this function
        var strategyState = StrategyState.NotWorked;
        return strategyState;
    }

    hiddenTriplets() {
        // TODO: Implement this function
    }

    nakedQuadruplets() {
        // TODO: Implement this function
    }

    hiddenQuadruplets() {
        // TODO: Implement this function
    }


/// Constraint propagation algorithm
    solve() {
        // Call eliminate() mostly for generateSudoku()
        let numberOfPass = 0;

        const strategies = Array.of(() => this.lastDigit(), () => this.hiddenSingle(),() => this.nakedPairs() /*,this.hiddenPairs, this.nakedTriplets, this.hiddenTriplets, this.nakedQuadruplets, this.hiddenQuadruplets*/);
        var indexStrategy = 0;
        let isStrategyWorkedAtLeastOnce = false;
        let strategyState = StrategyState.Worked;

        while (UtilsGrid.isSolved(this.grid, this.possibilities) === PuzzleState.Undone) {
            strategyState = StrategyState.Worked;
            isStrategyWorkedAtLeastOnce = false;
            while (strategyState === StrategyState.Worked && UtilsGrid.isSolved(this.grid, this.possibilities) === PuzzleState.Undone)
            {
                strategyState = strategies[indexStrategy]();
                if (strategyState === StrategyState.Worked)
                    isStrategyWorkedAtLeastOnce = true;
            }
            if (indexStrategy === strategies.length - 1 && !isStrategyWorkedAtLeastOnce){
                break;
            }
             if (isStrategyWorkedAtLeastOnce === true)
             {
                    if (indexStrategy === 0){
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
        this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
    }

    /// Get array of all possible coordinates left
    getArrayOfAllCoords() {
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

    fillGrid() {
        // step 1: pick a random cell and place a random number which is possible
        // step 2: check if sudoku is currently solvable, if not go back to step 1


        while (UtilsGrid.isSolved(this.grid, this.possibilities) !== PuzzleState.Solved) {
            this.cleanGrid();
            while (UtilsGrid.isEmptyCellLeft(this.grid)) {
                const allIndex = this.getArrayOfAllCoords();
                let ind = Utils.getRandomInt(0, allIndex.length - 1);
                const {x, y} = allIndex[ind];
                // pick random a possibility of this cell
                const randPossibility = Utils.getRandomInt(0, this.possibilities[x][y].length - 1);
                if (this.possibilities[x][y][randPossibility] === undefined) {
                    throw new TypeError('possibility is undefined for x: ' + x + ' y: ' + y + " with randPossibility: " + randPossibility + " and possibilities: " + this.possibilities[x][y].toString());
                }
                this.grid[x][y] = this.possibilities[x][y][randPossibility];
                this.eliminate();

                const validity = this.solve();
                console.log('validity :', validity);
                if (validity === PuzzleState.Invalid)
                    break;
            }
        }
    }

    generateSudoku() {
        // Clean grid and possibilities
        this.cleanGrid();


        // STEP 1: fill grid with a valid solved puzzle
        this.fillGrid();
        // STEP 2: Remove number and check each time if sudoku stay solvable
        let prevValue = null;

        let tempGrid = Utils.deepCopyMatrix(this.grid);

        let x = 0
        let y = 0
        let puzzleState = this.solve();
        while (puzzleState === PuzzleState.Solved) {
            console.log("heho");
            x = Utils.getRandomInt(0, 8);
            y = Utils.getRandomInt(0, 8);
            while (tempGrid[x][y] == null) {
                x = Utils.getRandomInt(0, 8);
                y = Utils.getRandomInt(0, 8);
            }
            prevValue = tempGrid[x][y];
            tempGrid[x][y] = null;
            this.grid = Utils.deepCopyMatrix(tempGrid);
            this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
            puzzleState = this.solve();
        }

        tempGrid[x][y] = prevValue;
        this.grid = Utils.deepCopyMatrix(tempGrid);
        this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
    }

}

export default Solver
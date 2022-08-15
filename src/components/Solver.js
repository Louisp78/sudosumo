import Utils from './Utils.js'
import { PuzzleState } from '../App.js';
import UtilsGrid  from "./UtilsGrid";

class Solver {
constructor(grid){
    this.grid = grid;
    this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
}

// FIXME: this function must be removed after Hint class is implemented
hint(){
        console.log('Getting an hint')
        this.eliminate();
        const fHint = this.getFirstPossibility();
        if (fHint !== null){
            let {x, y} = fHint;
            console.log('display hint at x:', x, ' and y:', y)
            this.grid[x][y] = this.possibilities[x][y][0];
        } else{
            console.log('no hint');
        }
}

// FIXME: this function must be removed after Hint class is implemented
getFirstPossibility(){
        for(let x = 0; x < this.possibilities.length; x++){
            for (let y = 0; y < this.possibilities[x].length; y++){
                if (this.possibilities[x][y].length === 1 && this.grid[x][y] == null){
                    //console.log(this.possibilities[x][y][0], "is the only possibilty at ", x, ", ", y);
                    return {x, y};
                }
                // TODO: detect error when this.possibilities[x][y].length == 0 mean puzzle is wrong
            }
        }
        return null;
    }


removePossibilityFromIndex(number, x, y){
    let xBis;
    let yBis;
/// line
    for (yBis = 0; yBis < this.possibilities[x].length; yBis++){
        if (yBis !== y)
            this.possibilities[x][yBis] = this.possibilities[x][yBis].filter(elt => elt !== number);
    }
    /// column
    for (xBis = 0; xBis < this.possibilities.length; xBis++){
        if (xBis !== x)
            this.possibilities[xBis][y] = this.possibilities[xBis][y].filter((elt) => elt !== number);
    }
    /// square
    let {startX, startY} = UtilsGrid.getSquareFromIndex(x, y)
    //console.log("startX : ", startX, " startY :", startY);
    for (xBis = startX; xBis <= startX + 2; xBis++){
        for (yBis = startY; yBis <= startY + 2; yBis++){
            if (xBis !== x || yBis !== y)
                this.possibilities[xBis][yBis] = (this.possibilities[xBis][yBis]).filter((elt) => elt !== number)
        }
    }

}

/// Need to be careful not to remove other naked twins
/// Need to remove all related square from position of naked twins
removePossibilitiesFromIndex(strOfPossibilities, x, y){
    const arrayOfPossibilities = Utils.arrayRepOfString(strOfPossibilities);
    console.log('removing all possibilities because of naked twins')
    /// line
    for (let yBis = 0; yBis < this.possibilities[x].length; yBis++){
        if (yBis !== y && Utils.stringRepOfArray(this.possibilities[x][yBis]) !== strOfPossibilities)
            this.possibilities[x][yBis] = this.possibilities[x][yBis].filter(elt => arrayOfPossibilities.includes(elt) === false);
    }      
/*
    /// column
    for (var xBis = 0; xBis < this.possibilities.length; xBis++){
        if (xBis != x && Utils.areSameArray(this.possibilities[xBis][y] ,arrayOfPossibilities) == false)
            this.possibilities[xBis][y] = this.possibilities[xBis][y].filter((elt) => arrayOfPossibilities.includes(elt) == false);
    }

    /// square
    let {startX, startY} = this.getSquareFromIndex(x, y)
    console.log("startX : ", startX, " startY :", startY);
    for (var xBis = startX; xBis <= startX + 2; xBis++){
        for (var yBis = startY; yBis <= startY + 2; yBis++){
            if ((xBis != x || yBis != y) && Utils.areSameArray(this.possibilities[xBis][yBis], arrayOfPossibilities) == false)
                this.possibilities[xBis][yBis] = (this.possibilities[xBis][yBis]).filter((elt) => arrayOfPossibilities.includes(elt) == false)
        }
    }*/
}

eliminate(){
    for (let selectedNumber = 1; selectedNumber <= 9; selectedNumber++){
        for (let x = 0; x < this.grid.length; x++){
            for (let y = 0; y < this.grid[x].length; y++){
                if (this.grid[x][y] === selectedNumber){
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
keepLastDigit(){
    for(let x = 0; x < this.possibilities.length; x++){
        for (let y = 0; y < this.possibilities[x].length; y++){
            if (this.possibilities[x][y].length === 1){
                this.grid[x][y] = this.possibilities[x][y][0]
            } else if (this.possibilities[x][y].length === 0){
                return false;
            }
        }
    }
    this.eliminate();
    return true;
}

/// This function detect hidden single when a digit appears once in the possibilities arrays of a square, column or line
keepHiddenSingle(){
    // line
    for (let x = 0; x < this.possibilities.length; x++) {
        const currentLine = UtilsGrid.getLine(this.possibilities, x).map(elt => this.possibilities[x][elt.y]);
        const histogram = Utils.getHistogramPossibilities(currentLine);
        for (const [key, value] of Object.entries(histogram)){
            if (value === 1){
                const index = currentLine.findIndex(elt => elt.includes(key));
                this.grid[x][index] = key;
            }
        }
    }
    this.eliminate();
    // column
    for (let y = 0; y < this.possibilities[0].length; y++) {
        const currentColumn = UtilsGrid.getColumn(this.possibilities,y).map(elt => this.possibilities[elt.x][y]);
        const histogram = Utils.getHistogramPossibilities(currentColumn);
        for (const [key, value] of Object.entries(histogram)){
            if (value === 1){
                const index = currentColumn.findIndex(elt => elt.includes(key));
                this.grid[index][y] = key;
            }
        }
    }
    this.eliminate();

    // block
    for (let x = 0; x < this.possibilities.length; x += 3) {
        for (let y = 0; y < this.possibilities[x].length; y += 3) {
            const currentBlock = UtilsGrid.getBlock(x, y).map(elt => this.possibilities[elt.x][elt.y]);
            const histogram = Utils.getHistogramPossibilities(currentBlock);
            for (const [key, value] of Object.entries(histogram)){
                if (value === 1){
                    const index = currentBlock.findIndex(elt => elt.includes(key));
                    this.grid[x + Math.floor(index / 3)][y + index % 3] = key;
                }
            }
        }
    }
    this.eliminate();

}
nakedPairs(){

    /// by line
    for (let x = 0; x < this.possibilities.length; x++)
    {
        const histogram = Utils.getHistogramArrayPossibilities(this.possibilities[x])
        for (const [key, value] of Object.entries(histogram)){
            if (histogram[key] === 2 && key.length === 2){
                //console.log('naked twins detected line :', key, " at x :", x);
                for (let y = 0; y < this.possibilities[x].length; y++){
                    //console.log('at x:', x, ' and y:', y, ' it is the naked twin by line : ', key)
                    if (key !== Utils.stringRepOfArray(this.possibilities[x][y]))
                        this.possibilities[x][y] = this.possibilities[x][y].filter(elt => Utils.arrayRepOfString(key).includes(elt) === false);
                }
            }
        }
    }
    //this.keepLastDigit();
    
    /// by columns
    for (let y = 0; y < this.possibilities.length; y++){
        const cols = UtilsGrid.getColumn(this.possibilities, y).map(({x, y}) => this.possibilities[x][y])
        const histogram = Utils.getHistogramArrayPossibilities(cols)
        for (const [key, value] of Object.entries(histogram)){
            if (histogram[key] === 2 && key.length === 2){
                //console.log('naked twins detected cols :', key, ' at y: ', y);
                for (let x = 0; x < this.possibilities.length; x++){
                    if (key !== Utils.stringRepOfArray(this.possibilities[x][y])){
                        this.possibilities[x][y] = this.possibilities[x][y].filter(elt => Utils.arrayRepOfString(key).includes(elt) === false);
                    }
                }
            }
        }
    }

    //this.keepLastDigit();

    /// by blocks
    for (var x = 0; x < this.possibilities.length; x += 3){
        for (var y = 0; y < this.possibilities.length; y += 3){
            const block = UtilsGrid.getBlock(x, y).map(({x, y}) => this.possibilities[x][y]);
            const histogram = Utils.getHistogramArrayPossibilities(block)
            for (const [key,value] of Object.entries(histogram)){
                if (histogram[key] === 2 && key.length === 2){
                //console.log('naked twins detected block :', key, ' at x: ', x, ' at y: ', y);
                    for (var coords of UtilsGrid.getBlock(x, y)){
                        const xBis = coords.x;
                        const yBis = coords.y;
                        if (key !== Utils.stringRepOfArray(this.possibilities[xBis][yBis])){
                            this.possibilities[xBis][yBis] = this.possibilities[xBis][yBis].filter(elt => Utils.arrayRepOfString(key).includes(elt) === false);
                        }
                    }
                }
            }
        }
    }

    //this.keepLastDigit();
}

cleanGrid(){
    this.grid = Utils.convertArrayToMatrix(Array(81).fill(null), 9);
    this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
}

fillGrid(){
    // step 1: pick a random cell and place a random number which is possible
    // step 2: check if sudoku is currently solvable, if not go back to step 1
    while(UtilsGrid.isSolved(this.grid) === PuzzleState.Undone){
        this.cleanGrid();
        while(UtilsGrid.isEmptyCellLeft(this.grid)){
        let x = Utils.getRandomInt(0, 8);
        let y = Utils.getRandomInt(0, 8);
        // find an empty cell
        while (this.grid[x][y] != null){
            x = Utils.getRandomInt(0, 8);
            y = Utils.getRandomInt(0, 8);
        }
        // pick random a possibility of this cell
        const randPossibility = Utils.getRandomInt(0, this.possibilities[x][y].length - 1);
        this.grid[x][y] = this.possibilities[x][y][randPossibility];
        const validity = this.solve();
        if (validity === PuzzleState.Invalid)
            break;
        }
    }
}

generateSudoku(){
    // Clean grid and possibilities
    this.cleanGrid();

    

    // STEP 1: fill grid with a valid solved puzzle
    this.fillGrid();

    // STEP 2: Remove number and check each time if sudoku stay solvable
    let prevValue = null;

    let tempGrid = Utils.deepCopyMatrix(this.grid);

    let x = 0
    let y = 0
    let countRemove = 0;
    let puzzleState = this.solve();
    while(puzzleState === PuzzleState.Solved)
    {
        x = Utils.getRandomInt(0, 8);
        y = Utils.getRandomInt(0, 8);
        while (tempGrid[x][y] == null)
        {
            x = Utils.getRandomInt(0, 8);
            y = Utils.getRandomInt(0, 8);
        }
        prevValue = tempGrid[x][y];
        tempGrid[x][y] = null;
        countRemove++;
        this.grid = Utils.deepCopyMatrix(tempGrid);
        this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
        puzzleState = this.solve();
    }

    tempGrid[x][y] = prevValue;
    this.grid = Utils.deepCopyMatrix(tempGrid);
    this.possibilities = UtilsGrid.getPossibilitiesFromGrid(this.grid);
}


/// Constraint propagation algorithm
solve(){
    let prevGrid = [[null]];
    let isValidPuzzle = true;
    let numberOfPass = 0;
    while (UtilsGrid.isSolved(this.grid) === PuzzleState.Undone)
    {
        while(UtilsGrid.isSolved(this.grid) === PuzzleState.Undone && Utils.areSameMatrix3D(prevGrid, this.possibilities) === false && isValidPuzzle){
            prevGrid = JSON.parse(JSON.stringify(this.possibilities));
            isValidPuzzle = this.keepLastDigit();
            numberOfPass++;
        }
        if (UtilsGrid.isSolved(this.grid) === PuzzleState.Solved || isValidPuzzle === false)
        {
            break;
        }
        else{
            if (numberOfPass > 100){
                break;
            }
            this.nakedPairs();
            this.keepLastDigit();
            if (Utils.areSameMatrix3D(prevGrid, this.possibilities))
                break;
        }
    }
    if (isValidPuzzle === false){
        return PuzzleState.Invalid;
    }
    else {
        return UtilsGrid.isSolved(this.grid);
    }
}

}

export default Solver
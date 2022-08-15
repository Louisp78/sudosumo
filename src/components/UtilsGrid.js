/// Class only for utils functions for solver
import Utils from "./Utils";
import {PuzzleState} from "../App";

class UtilsGrid {

    /// Set the matrix of possibilities from the grid
    static getPossibilitiesFromGrid(grid){
        var possibilities = JSON.parse(JSON.stringify(grid));
        for (let x = 0; x < possibilities.length; x++){
            for (let y = 0; y < possibilities.length; y++){
                if (grid[x][y] == null)
                    possibilities[x][y] = Array.from(Array(9).fill(1), (elt,index) => elt + index)
                else
                    possibilities[x][y] = [grid[x][y]]
            }
        }
        return possibilities;
    }
    static isEmptyCellLeft(grid){
        for (let x = 0; x < grid.length; x++){
            for (let y = 0; y < grid[x].length; y++){
                if (grid[x][y] == null){
                    return true;
                }
            }
        }
        return false;
    }

    static isFilledCellLeft(grid){
        for (let x = 0; x < grid.length; x++){
            for (let y = 0; y < grid[x].length; y++){
                if (grid[x][y] != null){
                    return true;
                }
            }
        }
        return false;
    }

    static isSolved(grid){
        const gridArr = Utils.convertMatrixToArray(grid);
        if (gridArr.includes(null) !== false){
            return PuzzleState.Undone;
        }
        for (let x = 0; x < grid.length; x++){
            console.log('a line on the grid :', grid[x]);
            if (Utils.hasDuplicates(grid[x])){
                return PuzzleState.Invalid;
            }
        }
        for (let y = 0; y < grid.length; y++){
            let tmpCol = []
            for (let x = 0; x < grid.length; x++){
                tmpCol.push(grid[x][y])
            }
            if (Utils.hasDuplicates(tmpCol)){
                return PuzzleState.Invalid;
            }
        }

        for (let x = 0; x < grid.length; x += 3){
            for (let y = 0; y < grid.length; y += 3){
                let tmpBlock = []
                for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        tmpBlock.push(grid[x + i][y + j])
                    }
                }
                if (Utils.hasDuplicates(tmpBlock)){
                    return PuzzleState.Invalid;
                }
            }
        }
        return PuzzleState.Solved;
    }

    static getSquareFromIndex(x, y){
        const valueX = x % 3
        const valueY = y % 3
        const startX = x - valueX
        const startY = y - valueY
        return {startX, startY}
    }
    
    static getColumn(possibilities, y){
        const result = [];
        for (let x = 0; x < possibilities.length; x++){
            result.push({x, y})
        }
        return result;
    }
    static getLine(possibilities, x){
        const result = [];
        for (let y = 0; y < possibilities.length; y++){
            result.push({x, y})
        }
        return result;
    }

    static getBlock(x, y){
        const result = [];
        const {startX, startY} = this.getSquareFromIndex(x, y);
        for (let xBis = startX; xBis <= startX + 2; xBis++)
        {
            for (let yBis = startY; yBis <= startY + 2; yBis++){
                result.push({x: xBis,y: yBis})
            }
        }
        return result;
    }
}

export default UtilsGrid;
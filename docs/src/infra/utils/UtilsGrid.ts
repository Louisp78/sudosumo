/// Class only for utils functions for solver
import Utils from "./Utils";
import {PuzzleState} from "../../enum";
import {CoordinateType, GridArrayType, GridMatrixType, PossibilitiesType} from "../../domain/Type";
import CellType from "../../domain/CellType";

class UtilsGrid {

    /// Reset the matrix of possibilities from the grid
    static resetPossibilitiesFromGrid(grid : GridMatrixType) : PossibilitiesType {
        var possibilities = Utils.convertArrayToMatrix(Array(81).fill(undefined), 9);
        for (let x = 0; x < grid.length; x++){
            for (let y = 0; y < grid.length; y++){
                if (grid[x][y] === undefined)
                    possibilities[x][y] = Array.from(Array(9).fill(1), (elt,index) => elt + index)
                else
                    possibilities[x][y] = [grid[x][y]]
            }
        }
        return possibilities;
    }
    static isEmptyCellLeft(grid : GridMatrixType) : boolean {
        for (let x = 0; x < grid.length; x++){
            for (let y = 0; y < grid[x].length; y++){
                if (grid[x][y] === undefined){
                    return true;
                }
            }
        }
        return false;
    }

    static countFilledCells(grid : GridMatrixType) : number {
        let count = 0;
        for (let x = 0; x < grid.length; x++){
            for (let y = 0; y < grid[x].length; y++){
                if (grid[x][y] !== undefined){
                    count++;
                }
            }
        }
        return count;
    }

    static isSolved(grid : GridMatrixType , possibilities : PossibilitiesType) : PuzzleState {

        if (Utils.convertMatrixToArray(possibilities).filter(elt => elt.length === 0).length > 0)
            return PuzzleState.Invalid;

        const gridArr = Utils.convertMatrixToArray(grid);
        if (gridArr.includes(undefined)){
            return PuzzleState.Undone;
        }
        for (let x = 0; x < grid.length; x++){
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

    static getSquareFromIndex(x : number, y : number) : {startX : number, startY : number}
    {
        const valueX = x % 3
        const valueY = y % 3
        const startX = x - valueX
        const startY = y - valueY
        return {startX, startY}
    }
    
    static getColumn(possibilities : PossibilitiesType, y : number) : Array<CoordinateType>
    {
        const result = [];
        for (let x = 0; x < possibilities.length; x++){
            result.push({x, y})
        }
        return result;
    }
    static getLine(possibilities : PossibilitiesType, x : number) : Array<CoordinateType>
    {
        const result = [];
        for (let y = 0; y < possibilities.length; y++){
            result.push({x, y})
        }
        return result;
    }

    static getBlock(x: number, y: number) : Array<CoordinateType>
    {
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

    private static gridArrayToString(grid : GridArrayType) : string {
        return grid.map(elt => elt === undefined ? "." : elt.toString()).join("");
    }

    static gridMatrixToString(grid : GridMatrixType) : string {
        return grid.map(subArr => subArr.map(elt => elt === undefined ? "." : elt.toString()).join("")).join("");
    }

    private static stringToGridArray(string : string) : GridArrayType{
        return string.split("").map(elt => elt === "." ? undefined : parseInt(elt)) as CellType[];
    }

    static stringToGridMatrix(string : string) : GridMatrixType{
         return Utils.convertArrayToMatrix(this.stringToGridArray(string), 9);
    }
}

export default UtilsGrid;
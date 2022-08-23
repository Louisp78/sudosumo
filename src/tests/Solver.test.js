import Utils from "../components/Utils";
import UtilsGrid from "../components/UtilsGrid";
import Solver from "../components/Solver";
import {PuzzleState} from "../pages/App";

function testGrid(str){
    const grid = UtilsGrid.stringToGridMatrix(str);
    const sudokuSolver = new Solver(grid);
    sudokuSolver.solve();
    return UtilsGrid.isSolved(sudokuSolver.grid, sudokuSolver.possibilities);
}


/// Testing solve puzzle
test("Very Easy", () => {
    expect(testGrid("..5...1..67.2.1....4.....6.....2..5.....47..6.......389..7.438...2..6.4....31....")).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("....69.......185....2..4.984........1.9.....36.....28..85....34.7.....2.9.1.3..5.")).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("4.6.135..1.2..7..8...9...........3...7.2....426.....5......917....3.4..57.....6..")).toStrictEqual(PuzzleState.Solved);
});

test("Easy", () => {
    expect(testGrid("....8......63.47.2...2.....9...4..15.3.9.....5...1..3.1.46..2....7....8.........3")).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("...1.9...4....8.....9..24.613....54.........1...4..9..6....3..25.37..6......6..79")).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("...71.....6.....5.4.9.8..6.3.5....7.2...7.64.....3...2.92......5.....1.6.3.9.....")).toStrictEqual(PuzzleState.Solved);
});

test("Medium", () => {

    expect(testGrid("....1.....1..8.347..2...1....3......9.....47.8561........2.9..8.......53..856..2.")).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("7.......9.....6.3..4.5......16..5.97.9.6.382....9.....5............4.3...69..1...")).toStrictEqual(PuzzleState.Solved);
    const res = testGrid(".9..1.7.66....2..........1...5..9..8..21....97...264........54...736......84.5...");
    expect(res).toStrictEqual(PuzzleState.Solved);
    expect(testGrid("..29...17..3.52.......3...64.....7.5........8....67...6......5..2.5...619.5.1.8..")).toStrictEqual(PuzzleState.Solved);
});

test("Very Hard", () => {
    expect(testGrid(".....1...1.8.69...9..57........35.........14..4.....28.7......1..41.75.22.......9")).toStrictEqual(PuzzleState.Solved);
});

/// Testing puzzle generation
test("clean grid", () => {
    const strGrid = ".....1...1.8.69...9..57........35.........14..4.....28.7......1..41.75.22.......9";
    const grid = UtilsGrid.stringToGridMatrix(strGrid);
    const sudokuSolver = new Solver(grid);
    sudokuSolver.cleanGrid();
    expect(UtilsGrid.gridMatrixToString(sudokuSolver.grid)).toStrictEqual(".................................................................................");
});

test("fill grid", () => {
    const strGrid = ".................................................................................";
    const grid = UtilsGrid.stringToGridMatrix(strGrid);
    const sudokuSolver = new Solver(grid);
    sudokuSolver.fillGrid();
    expect(UtilsGrid.isEmptyCellLeft(sudokuSolver.grid)).toBe(false);
})

test("generate puzzle", () => {
    const sudokuSolver = new Solver( Utils.convertArrayToMatrix(Array(81).fill(null), 9));
    sudokuSolver.generateSudoku();
    expect(UtilsGrid.isEmptyCellLeft(sudokuSolver.grid)).toBe(true);
});


test("generate puzzle 2", () => {
    const sudokuSolver = new Solver( Utils.convertArrayToMatrix(Array(81).fill(null), 9));
    sudokuSolver.gen2();
    expect(UtilsGrid.isEmptyCellLeft(sudokuSolver.grid)).toBe(true);
});




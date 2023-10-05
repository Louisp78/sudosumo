import UtilsGrid from "../components/UtilsGrid";
import SudokuDomain from "../domain/SudokuDomain";
import SudokuRepositoryImpl from "../domain/SudokuRepositoryImpl";
import {sudokusTestData} from "./data";

describe("SudokuRepositoryImpl - isValid", () => {
    function testIsValid(strGrid: string): boolean {
        const grid = UtilsGrid.stringToGridMatrix(strGrid);
        const sudokuDomain = new SudokuDomain({grid});

        const sudokuRepository = new SudokuRepositoryImpl();
        return sudokuRepository.isValid(sudokuDomain);
    }

    test("isValid empty sudoku", () => {
        expect(testIsValid('.'.repeat(81))).toBe(true);
    });

    test("isValid very easy sudoku", () => {
        expect(testIsValid(sudokusTestData.veryEasy[0])).toBe(true);
        expect(testIsValid(sudokusTestData.veryEasy[1])).toBe(true);
        expect(testIsValid(sudokusTestData.veryEasy[2])).toBe(true);
    });

    test("isValid easy sudoku", () => {
        expect(testIsValid(sudokusTestData.easy[0])).toBe(true);
        expect(testIsValid(sudokusTestData.easy[1])).toBe(true);
        expect(testIsValid(sudokusTestData.easy[2])).toBe(true);
    });

    test("isValid medium sudoku", () => {
        expect(testIsValid(sudokusTestData.medium[0])).toBe(true);
        expect(testIsValid(sudokusTestData.medium[1])).toBe(true);
        expect(testIsValid(sudokusTestData.medium[2])).toBe(true);
    });

    test("isValid hard sudoku", () => {
        expect(testIsValid(sudokusTestData.difficult[0])).toBe(true);
    });
});

describe("SudokuRepositoryImpl - isSolved", () => {
    function testIsSolved(strGrid: string): boolean {
        const grid = UtilsGrid.stringToGridMatrix(strGrid);
        const sudokuDomain = new SudokuDomain({grid});

        const sudokuRepository = new SudokuRepositoryImpl();
        return sudokuRepository.isSolved(sudokuDomain);
    }

    test("isSolved empty sudoku", () => {
       expect(testIsSolved('.'.repeat(81))).toBe(false);
    });
    test("isSolved valid", () => {
        expect(testIsSolved(sudokusTestData.filled[0])).toBe(true);
        expect(testIsSolved(sudokusTestData.filled[1])).toBe(true);
        expect(testIsSolved(sudokusTestData.filled[2])).toBe(true);
    });
});

describe("SudokuRepositoryImpl - solve", () => {

    test("solve easy sudoku", () => {

        const grid = UtilsGrid.stringToGridMatrix(sudokusTestData.easy[0]);
        const sudokuDomain = new SudokuDomain({grid});
        const sudokuRepository = new SudokuRepositoryImpl();
        const res = sudokuRepository.solve(sudokuDomain);

        expect(res).toBe(true);
        expect(sudokuRepository.isSolved(sudokuDomain)).toBe(true);
    });
});
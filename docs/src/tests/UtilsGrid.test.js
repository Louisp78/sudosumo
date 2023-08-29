import UtilsGrid from "../components/UtilsGrid";
import Solver from "../components/Solver";
import Utils from "../components/Utils";

test('test reset possibilities from grid', () => {
    const solver = new Solver(Utils.convertArrayToMatrix(Array(81).fill(null), 9));
    solver.generateSudoku();
    UtilsGrid.resetPossibilitiesFromGrid(solver.grid);
    expect(true).toBe(true);
});
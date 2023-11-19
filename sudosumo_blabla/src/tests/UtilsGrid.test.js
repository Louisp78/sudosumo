import UtilsGrid from "../infra/utils/UtilsGrid";
import Solver from "../domain/Solver.ts.old";
import Utils from "../infra/utils/Utils";

test('test reset possibilities from grid', () => {
    const solver = new Solver(Utils.convertArrayToMatrix(Array(81).fill(null), 9));
    solver.generateSudoku();
    UtilsGrid.resetPossibilitiesFromGrid(solver.grid);
    expect(true).toBe(true);
});
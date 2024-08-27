import SudokuDomain from "../../../domain/SudokuDomain";
import {GridState} from "../../../domain/GridState";
import SudokuRepositoryImpl from "../../../domain/SudokuRepositoryImpl";
import {useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import UtilsGrid from "../../../infra/utils/UtilsGrid";

const GridStateMessage = () => {
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);

    const sudokuRepository = new SudokuRepositoryImpl();
    const sudoku = new SudokuDomain({grid: grid});
    if (sudokuRepository.getGridState(sudoku) === GridState.INVALID) {
        return <p style={{color: "red"}}>There is an error somewhere.</p>
    } else if (sudokuRepository.getGridState(sudoku) === GridState.SOLVED) {
        return <p style={{color: "green"}}>Puzzle solved !</p>;
    }
    return <></>
}

export default GridStateMessage;

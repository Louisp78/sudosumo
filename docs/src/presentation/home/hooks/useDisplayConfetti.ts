import React, {useEffect} from "react";
import SudokuDomain from "../../../domain/SudokuDomain";
import SudokuRepositoryImpl from "../../../domain/SudokuRepositoryImpl";
import {useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import UtilsGrid from "../../../components/UtilsGrid";

const useDisplayConfetti = () => {
    const sudokuRepository = new SudokuRepositoryImpl();
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);

    useEffect(() => {
        if (sudokuRepository.isSolved(new SudokuDomain({grid: grid}))) {
            displayConfetti();
        }
    }, [grid, sudokuRepository]);

    const [confetti, setConfetti] = React.useState(false);
    const displayConfetti = () => {
        setConfetti(true);
        setTimeout(() => {
            setConfetti(false);
        }, 5000);
    }
    return {confetti};
}

export default useDisplayConfetti;
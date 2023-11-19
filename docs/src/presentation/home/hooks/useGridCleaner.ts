import {useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import UtilsGrid from "../../../infra/utils/UtilsGrid";
import React from "react";
import useSetGrid from "./useSetGrid";

const useGridCleaner = () => {

    const [displayUndoClean, setDisplayUndoClean] = React.useState(false);
    const {setGrid} = useSetGrid();
    const gridStr = useSelector((state: RootState) => state.grid.grid);

    const cluesStr = useSelector((state: RootState) => state.grid.clues);
    const clues = UtilsGrid.stringToGridMatrix(cluesStr);

    const previousGridStr = useSelector((state: RootState) => state.grid.previousGrid);
    const previousGrid = UtilsGrid.stringToGridMatrix(previousGridStr);
    const clean = () => {
        if (gridStr === cluesStr) {
            return;
        }
        setGrid(clues);
        setDisplayUndoClean(true);
    }

    /// Undo the previous cleaning
    const undoClean = () => {
        setGrid(previousGrid);
        setDisplayUndoClean(false);
    }

    return {clean, displayUndoClean, setDisplayUndoClean, undoClean};
}

export default useGridCleaner;
import React from "react";
import useGridCleaner from "../hooks/useGridCleaner";

const CleanButton = () => {
    const {displayUndoClean, undoClean, clean} = useGridCleaner();
    if (displayUndoClean) {
        return <button onClick={(e) => undoClean()}>Undo clean</button>
    } else {
        return <button onClick={(e) => clean()}>Clean sudoku</button>
    }
};

export default CleanButton;
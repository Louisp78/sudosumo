import useGridCleaner from "../hooks/useGridCleaner";

const CleanButton = () => {
    const {displayUndoClean, undoClean, clean} = useGridCleaner();
    if (displayUndoClean) {
        return <button onClick={() => undoClean()}>Undo clean</button>
    } else {
        return <button onClick={() => clean()}>Clean sudoku</button>
    }
};

export default CleanButton;
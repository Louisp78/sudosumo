import '../../styles/grid.css';
import '../../styles/HUD.css';
import '../../styles/app.css';

import React, {useEffect} from 'react';
import Utils from "../../components/Utils";
import ReactConfetti from 'react-confetti';
import {EditMode, PuzzleState} from "../../enum";
import {useDispatch, useSelector} from "react-redux";
import Grid from "../../components/Grid";
import {
    setCluesReducer,
    setGridReducer, setPreviousGridReducer,
} from "../../infra/redux/slices/gridSlice";
import {setEditModeReducer, setSelectedNumberReducer} from "../../infra/redux/slices/editSlice";
import SudokuDomain from "../../domain/SudokuDomain";
import SudokuRepositoryImpl from "../../domain/SudokuRepositoryImpl";
import {DIFFICULTY} from "../../domain/sudoku_solver_lib/sudoku";
import {GridState} from "../../domain/GridState";
import CellType from "../../domain/CellType";
import {RootState} from "../../infra/redux/store";
import UtilsGrid from "../../components/UtilsGrid";
import {CircularProgress} from "@mui/material";

export const App = () => {
    const dispatch = useDispatch();

    const sudokuRepository = new SudokuRepositoryImpl();

    const currentNumber = useSelector((state: any) => state.edit.selectedNumber);
    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);
    const cluesStr = useSelector((state: RootState) => state.grid.clues);
    const clues = UtilsGrid.stringToGridMatrix(cluesStr);
    const previousGridStr = useSelector((state: RootState) => state.grid.previousGrid);
    const previousGrid = UtilsGrid.stringToGridMatrix(previousGridStr);
    const editMode = useSelector((state: RootState) => state.edit.editMode);

    const [displayUndoClean, setDisplayUndoClean] = React.useState(false);
    const [displayConfetti, setDisplayConfetti] = React.useState(false);
    const [displayLoading, setDisplayLoading] = React.useState(false);
    const [score, setScore] = React.useState(0);

    useEffect(() => {
        newSudoku();
    }, []);

    const newSudoku = () => {
        setDisplayLoading(true);
        setDisplayUndoClean(false);

        const sudoku : SudokuDomain = sudokuRepository.generateSudoku(DIFFICULTY.medium);
        setScore(sudoku.difficultyScore);

        dispatch(setCluesReducer(UtilsGrid.gridMatrixToString(sudoku.clues)));
        setGrid(sudoku.grid);
        setDisplayLoading(false);
    }

    /// Generate a new sudoku
    /// TODO: Add generation with level of difficulty
    /// TODO: Find a way to display loading animation


    const setNumber = (number: number) => {
        if (number > 9 || number < 1) {
            throw new RangeError('number must be between 1 and 9 inclusive');
        }
        dispatch(setSelectedNumberReducer(number))
    }


    const setPuzzleSolved = () => {
        console.log('Sudoku solved');
        setDisplayConfetti(true);
        setTimeout(() => {
            setDisplayConfetti(false);
        }, 5000);
    }

    const handleClick = (index: number) => {
        resetCleaning();
    }


    const resetCleaning = () => {
        if (displayUndoClean) {
            setDisplayUndoClean(false);
        }
    }

    const setGrid = (newGrid: CellType[][]) => {
        const sudoku = new SudokuDomain({grid: newGrid});
        dispatch(setPreviousGridReducer(UtilsGrid.gridMatrixToString(grid)));
        dispatch(setGridReducer(UtilsGrid.gridMatrixToString(newGrid)));
        const gridState = sudokuRepository.getGridState(sudoku);
        if (gridState === GridState.SOLVED) {
            setPuzzleSolved();
        }
    }

    const solve = () => {
        const sudoku = new SudokuDomain({grid: grid});
        if (sudokuRepository.getGridState(sudoku) === GridState.UNSOLVED) {
            if (sudokuRepository.solve(sudoku)) {
                setGrid(sudoku.grid);
            }
        }
    }

    const hint = () => {
        const sudoku = new SudokuDomain({grid: grid});
        if (sudokuRepository.getGridState(sudoku) === GridState.UNSOLVED){
            if (sudokuRepository.hint(sudoku)){
                setGrid(sudoku.grid);
            }
        }
    }


    /// Clean all the grid
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

    const changeEditMode = () => {
        if (editMode === EditMode.Pen) {
            setEditModeReducer(EditMode.Rubber);
        } else {
            setEditModeReducer(EditMode.Pen);
        }
    }

    const checkPuzzleState = () => {
        const sudoku = new SudokuDomain({grid: grid});
        if (sudokuRepository.getGridState(sudoku) === GridState.INVALID) {
            return <p style={{color: "red"}}>There is an error somewhere.</p>
        } else if (sudokuRepository.getGridState(sudoku) === GridState.SOLVED) {
            return <p style={{color: "green"}}>Puzzle solved !</p>;
        } else {
            return undefined;
        }
    }

    const renderConfetti = () => {
        if (displayConfetti)
            return <ReactConfetti tweenDuration={5000}/>;
        else
            return undefined;
    }

    const renderEditMode = () => {
        let content = "";
        if (editMode === EditMode.Pen)
            content = "Switch to rubber";
        else
            content = "Switch to pen";
        return content;
    }

    const renderCleaning = () => {
        if (displayUndoClean) {
            return <button onClick={(e) => undoClean()}>Undo clean</button>
        } else {
            return <button onClick={(e) => clean()}>Clean sudoku</button>
        }
    }

    const renderNumberGrid = () => {
        if (editMode === EditMode.Pen) {
            let grid = Array.from(Array(9).fill(1), (elt, index) => elt + index);
            grid = grid.map((elt) => {
                if (elt === currentNumber) {
                    return <div key={elt} className='selected'>{elt}</div>
                } else {
                    return <div key={elt} className='unselected' onClick={() => setNumber(elt)}>{elt}</div>
                }
            });
            return (
                <div className='numberGrid'>
                    {grid}
                </div>
            );
        }
    }

    const renderGrid = () => {
        if (displayLoading) {
            return <CircularProgress />
        } else {
            return <Grid numberOfRow={9} numberOfCol={9}/>
        }
    }
    return (
        <div className="App">
            <div className="game">
                {renderConfetti()}
                <div className='titleContainer'>
                    <h1>SudoSumo 🍜</h1>
                </div>
                <div className='wrapperSudokuGrid'>
                    {renderGrid()}
                    {renderNumberGrid()}
                </div>
                <div className='containerOptions'>
                    <p>Score of difficulty : {score}</p>
                    {checkPuzzleState()}
                    <div className='options'>
                        <button onClick={(e) => newSudoku()}>New sudoku</button>
                        {renderCleaning()}
                        <button onClick={() => changeEditMode()}>{renderEditMode()}</button>
                        <button onClick={(e) => solve()}>Solve</button>
                        <button onClick={(e) => hint()}>Hint</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


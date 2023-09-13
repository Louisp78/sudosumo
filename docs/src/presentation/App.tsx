import '../styles/grid.css';
import '../styles/HUD.css';
import '../styles/app.css';
import Grid from "../components/Grid";
import React, {useEffect} from 'react';
import Solver from "../components/Solver";
import Utils from "../components/Utils";
import ReactConfetti from 'react-confetti';
import UtilsGrid from "../components/UtilsGrid";
import {GridArrayType} from "../components/Type";
import {EditMode, PuzzleState} from "../enum";

export const App = () => {

    const [currentNumber, setCurrentNumber] = React.useState(1);
    const [values, setValues] = React.useState(Array(81).fill(null));
    const [startValues, setStartValues] = React.useState(Array(81).fill(null));
    const [prevValues, setPrevValues] = React.useState(Array(81).fill(null));
    const [puzzleState, setPuzzleState] = React.useState(PuzzleState.Undone);
    const [editMode, setEditMode] = React.useState(EditMode.Pen);
    const [displayUndoClean, setDisplayUndoClean] = React.useState(false);
    const [displayConfetti, setDisplayConfetti] = React.useState(false);
    const [displayLoading, setDisplayLoading] = React.useState(false);
    const [score, setScore] = React.useState(0);


    useEffect(() => {
        newSudoku();
    }, []);


    /// Generate a new sudoku
    /// TODO: Add generation with level of difficulty
    /// TODO: Find a way to display loading animation
    const newSudoku = async () => {

        setDisplayLoading(true)
        const generation = async () => {
            const solver = new Solver(Utils.convertArrayToMatrix(values, 9));
            solver.gen2(400);
            return solver;
        };

        await generation().then(solver => {
            setDisplayLoading(false);
            setStartValues(Utils.convertMatrixToArray(solver.grid));
            setGrid(Utils.convertMatrixToArray(solver.grid));
            setScore(solver.getScore());
        });
    }

    const nextNumber = () => {
        if (currentNumber + 1 > 9) {
            setCurrentNumber(1)
        } else {
            setCurrentNumber(currentNumber + 1
            )
        }
    }
    const prevNumber = () => {
        if (currentNumber - 1 < 1) {
            setCurrentNumber(9)
        } else {
            setCurrentNumber(currentNumber - 1)
        }
    }

    const setNumber = (number: number) => {
        if (number > 9 || number < 1) {
            throw new RangeError('number must be between 1 and 9 inclusive');
        }
        setCurrentNumber(number);
    }


    const setPuzzleSolved = () => {
        console.log('puzzle solved');
        setDisplayConfetti(true);
        setTimeout(() => {
            setDisplayConfetti(false);
        }, 5000);
    }

    const handleClick = (index: number) => {
        resetCleaning();

        const items: Array<number | null> = values.slice();
        if (editMode === EditMode.Pen) {
            items[index] = currentNumber;
        } else if (editMode === EditMode.Rubber) {
            items[index] = null;
        }
        console.log('handleClick');
        setGrid(items);
    }


    const resetCleaning = () => {
        if (displayUndoClean) {
            setDisplayUndoClean(false);
        }
    }

    const solve = () => {
        if (puzzleState !== PuzzleState.Solved) {
            const grid = Utils.convertArrayToMatrix(values, 9)
            const sudokuSolver = new Solver(grid)

            const newPuzzleState = sudokuSolver.solve();

            const pos = Utils.convertMatrixToArray(sudokuSolver.grid);
            setGrid(pos);

            setPuzzleState(newPuzzleState);
        }
    }


    const setGrid = (newGrid: GridArrayType) => {
        const sudokuSolver = new Solver(Utils.convertArrayToMatrix(newGrid, 9));
        const newPuzzleState = UtilsGrid.isSolved(sudokuSolver.grid, sudokuSolver.possibilities);
        console.log('setGrid: ' + newPuzzleState);
        setValues(newGrid);
        setPuzzleState(newPuzzleState);
        if (newPuzzleState === PuzzleState.Solved) {
            setPuzzleSolved();
        }
    }

    // TODO: Implement an hint system
    const hint = () => {
        if (puzzleState === PuzzleState.Undone) {
            const grid = Utils.convertArrayToMatrix(values, 9)
            const sudokuSolver = new Solver(grid)
            console.log(grid)
            sudokuSolver.hint();
            const newGrid = Utils.convertMatrixToArray(sudokuSolver.grid);
            setGrid(newGrid);
        }
    }


    /// Clean all the grid
    const clean = () => {
        if (!Utils.areSameArray(values, startValues)) {
            setDisplayUndoClean(true);
        }
        setValues(startValues);
        setPrevValues(values);
        setPuzzleState(PuzzleState.Undone);
    }

    /// Undo the previous cleaning
    const undoClean = () => {
        setGrid(prevValues);
        setDisplayUndoClean(false);
    }

    const changeEditMode = () => {
        if (editMode === EditMode.Pen) {
            setEditMode(EditMode.Rubber);
        } else {
            setEditMode(EditMode.Pen);
        }
    }

    const checkPuzzleState = () => {
        //console.log('current puzzle state : ', puzzleState)
        if (puzzleState === PuzzleState.Invalid) {
            return <p style={{color: "red"}}>There is an error somewhere.</p>
        } else if (puzzleState === PuzzleState.Solved) {

            return <p style={{color: "green"}}>Puzzle solved !</p>;
        } else {
            return null;
        }
    }

    const renderConfetti = () => {
        if (displayConfetti)
            return <ReactConfetti tweenDuration={5000}/>;
        else
            return null;
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
        return null;
    }

    const renderScore = () => {
        return <p>Score of difficulty : {score}</p>
    }

    const renderGrid = () => {
        if (displayLoading === true) {
            return <div className='loading'>Loading...</div>
        } else {
            return (
                <Grid
                    values={values}
                    startValues={startValues}
                    currentNumber={currentNumber}
                    handleClick={(i: number) => handleClick(i)}
                    onScrollUp={() => nextNumber()}
                    onScrollDown={() => prevNumber()}
                    editMode={editMode}
                />
            );
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
                    {renderScore()}
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


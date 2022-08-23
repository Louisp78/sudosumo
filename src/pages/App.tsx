import '../styles/grid.css';
import '../styles/HUD.css';
import '../styles/app.css';
import Grid from "../components/Grid";
import React from 'react';
import Solver from "../components/Solver";
import Utils from "../components/Utils";
import ReactConfetti from 'react-confetti';
import UtilsGrid from "../components/UtilsGrid";
import {GridArrayType} from "../components/Type";
import 'react-pro-sidebar/dist/css/styles.css';

enum PuzzleState {
    Undone,
    Invalid,
    Solved
}

enum EditMode {
    Rubber,
    Pen
}

type Props = any;
type State = {
    values: Array<number | null>,
    startValues: Array<number | null>,
    prevValues: Array<number | null>,
    editMode: EditMode,
    puzzleState: PuzzleState,
    displayLoading: boolean,
    displayUndoClean: boolean,
    displayConfetti: boolean,
    score: number,
    currentNumber: number
};

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            values: Array(81).fill(null),
            startValues: Array(81).fill(null),
            prevValues: Array(81).fill(null),
            puzzleState: PuzzleState.Undone,
            editMode: EditMode.Pen,
            displayUndoClean: false,
            displayConfetti: false,
            displayLoading: false,
            score: 0,
            currentNumber: 1,
        }
    }

    componentDidMount() {
        this.newSudoku();
    }

    nextNumber() {
        const currentNumber = this.state.currentNumber;
        if (currentNumber + 1 > 9) {
            this.setState({
                currentNumber: 1
            })
        } else {
            this.setState({
                currentNumber: currentNumber + 1
            })
        }
    }

    prevNumber() {
        const currentNumber = this.state.currentNumber;
        if (currentNumber - 1 < 1) {
            this.setState({
                currentNumber: 9
            })
        } else {
            this.setState({
                currentNumber: currentNumber - 1
            });
        }
    }

    setNumber(number: number) {
        if (number > 9 || number < 1) {
            throw new RangeError('number must be between 1 and 9 inclusive');
        }
        this.setState({
            currentNumber: number
        });
    }


    setPuzzleSolved() {
        console.log('puzzle solved');
        this.setState({displayConfetti: true});
        setTimeout(() => {
            this.setState({displayConfetti: false});
        }, 5000);
    }

    handleClick(index: number) {
        this.resetCleaning();

        const items: Array<number | null> = this.state.values.slice();
        if (this.state.editMode === EditMode.Pen) {
            items[index] = this.state.currentNumber;
        } else if (this.state.editMode === EditMode.Rubber) {
            items[index] = null;
        }
        console.log('handleClick');
        this.setGrid(items);
    }


    resetCleaning() {
        if (this.state.displayUndoClean) {
            this.setState({
                displayUndoClean: false
            });
        }
    }

    solve() {
        if (this.state.puzzleState !== PuzzleState.Solved) {
            const grid = Utils.convertArrayToMatrix(this.state.values, 9)
            const sudokuSolver = new Solver(grid)

            const newPuzzleState = sudokuSolver.solve();

            const pos = Utils.convertMatrixToArray(sudokuSolver.grid);
            this.setGrid(pos);

            this.setState({
                puzzleState: newPuzzleState
            });


        }
    }


    setGrid(newGrid: GridArrayType) {
        const sudokuSolver = new Solver(Utils.convertArrayToMatrix(newGrid, 9));
        const newPuzzleState = UtilsGrid.isSolved(sudokuSolver.grid, sudokuSolver.possibilities);
        console.log('setGrid: ' + newPuzzleState);
        this.setState({
            values: newGrid,
            puzzleState: newPuzzleState,
        });
        if (newPuzzleState === PuzzleState.Solved) {
            this.setPuzzleSolved();
        }
    }

    // TODO: Implement an hint system
    hint() {
        if (this.state.puzzleState === PuzzleState.Undone) {
            const grid = Utils.convertArrayToMatrix(this.state.values, 9)
            const sudokuSolver = new Solver(grid)
            console.log(grid)
            sudokuSolver.hint();
            const newGrid = Utils.convertMatrixToArray(sudokuSolver.grid);
            this.setGrid(newGrid);
        }
    }


    /// Generate a new sudoku
    /// TODO: Add generation with level of difficulty
    /// TODO: Find a way to display loading animation
    async newSudoku() {

        this.setState({
            displayLoading: true
        });


        const generation = async () => {
            const solver = new Solver(Utils.convertArrayToMatrix(this.state.values, 9));
            solver.gen2(400);
            return solver;
        };

        await generation().then(solver => {
            this.setState({
                displayLoading: false
            });
            this.setState({
                startValues: Utils.convertMatrixToArray(solver.grid)
            });
            this.setGrid(Utils.convertMatrixToArray(solver.grid));

            this.setState({score: solver.getScore()});
        });
    }

    /// Clean all the grid
    clean() {
        if (!Utils.areSameArray(this.state.values, this.state.startValues)) {
            this.setState({
                displayUndoClean: true
            });
        }
        this.setState({
            values: this.state.startValues,
            prevValues: this.state.values,
            puzzleState: PuzzleState.Undone
        })
    }

    /// Undo the previous cleaning
    undoClean() {
        this.setGrid(this.state.prevValues);
        this.setState({
            displayUndoClean: false
        });
    }

    changeEditMode() {
        if (this.state.editMode === EditMode.Pen) {
            this.setState({
                editMode: EditMode.Rubber
            })
        } else {
            this.setState({
                editMode: EditMode.Pen
            })
        }
    }

    checkPuzzleState() {
        //console.log('current puzzle state : ', this.state.puzzleState)
        if (this.state.puzzleState === PuzzleState.Invalid) {
            return <p style={{color: "red"}}>There is an error somewhere.</p>
        } else if (this.state.puzzleState === PuzzleState.Solved) {

            return <p style={{color: "green"}}>Puzzle solved !</p>;
        } else {
            return null;
        }
    }

    renderConfetti() {
        if (this.state.displayConfetti)
            return <ReactConfetti tweenDuration={5000}/>;
        else
            return null;
    }

    renderEditMode() {
        let content = "";
        if (this.state.editMode === EditMode.Pen)
            content = "Switch to rubber";
        else
            content = "Switch to pen";
        return content;
    }

    renderCleaning() {
        if (this.state.displayUndoClean) {
            return <button onClick={(e) => this.undoClean()}>Undo clean</button>
        } else {
            return <button onClick={(e) => this.clean()}>Clean sudoku</button>
        }
    }

    renderNumberGrid() {
        if (this.state.editMode === EditMode.Pen) {
            let grid = Array.from(Array(9).fill(1), (elt, index) => elt + index);
            grid = grid.map((elt) => {
                if (elt === this.state.currentNumber) {
                    return <div key={elt} className='selected'>{elt}</div>
                } else {
                    return <div key={elt} className='unselected' onClick={() => this.setNumber(elt)}>{elt}</div>
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

    renderScore() {
        return <p>Score of difficulty : {this.state.score}</p>
    }

    renderGrid() {
        if (this.state.displayLoading === true) {
            return <div className='loading'>Loading...</div>
        } else {
            return (
                <Grid
                    values={this.state.values}
                    startValues={this.state.startValues}
                    currentNumber={this.state.currentNumber}
                    handleClick={(i: number) => this.handleClick(i)}
                    onScrollUp={() => this.nextNumber()}
                    onScrollDown={() => this.prevNumber()}
                    editMode={this.state.editMode}
                />
            );
        }
    }

    render() {
        return (
            <div className="App">
                <div className="game">
                    {this.renderConfetti()}
                    <div className='titleContainer'>
                        <h1>SudoSumo 🍜</h1>
                    </div>
                    <div className='wrapperSudokuGrid'>
                        {this.renderGrid()}
                        {this.renderNumberGrid()}
                    </div>
                    <div className='containerOptions'>
                        {this.renderScore()}
                        {this.checkPuzzleState()}
                        <div className='options'>
                            <button onClick={(e) => this.newSudoku()}>New sudoku</button>
                            {this.renderCleaning()}
                            <button onClick={() => this.changeEditMode()}>{this.renderEditMode()}</button>
                            <button onClick={(e) => this.solve()}>Solve</button>
                            <button onClick={(e) => this.hint()}>Hint</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
export {EditMode, PuzzleState};

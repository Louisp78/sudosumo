import './styles/app.css';
import SudokuGrid from './components/SudokuGrid';
import React from 'react';
import SudokuSolver from './components/SudokuSolver.js'
import Utils from './components/Utils.js'

  const PuzzleState = {
    Undone: 'undone',
    Invalid: 'invalid',
    Solved: 'solved'
  }

  const EditMode = {
    Rubber: 'rubber',
    Pen: 'pen'
  }

class App extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      values: this.props.current != null ? Utils.convertMatrixToArray(this.props.current) : Array(81).fill(null),
      puzzleState: PuzzleState.Undone,
      editMode: EditMode.Pen,
      displayUndoClean: false,
      currentNumber: 1
    }
  }
  nextNumber(){
    const currentNumber = this.state.currentNumber;
    if (currentNumber + 1 > 9){
      this.setState({
        currentNumber: 1
      })
    } else {
      this.setState({
        currentNumber: currentNumber + 1
      })
    }
  }

  prevNumber(){
    const currentNumber = this.state.currentNumber;
    if (currentNumber - 1 < 1){
      this.setState({
        currentNumber: 9
      })
    } else {
      this.setState({
        currentNumber: currentNumber - 1
      });
    }
  }

  handleClick(index){
    this.resetCleanning();

    const items = this.state.values.slice()
    if (this.state.editMode == EditMode.Pen)
    {
      items[index] = this.state.currentNumber;
    } else {
      items[index] = null;
    }
    this.setState({values: items});

    /// Set puzzle state
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(items, 9))
    if (sudokuSolver.isSolved()){
      this.setState({
          puzzleState: PuzzleState.Solved
        })
    } else {
      this.setState({
          puzzleState: PuzzleState.Undone
        })
    }

  }


  resetCleanning(){
    if (this.state.displayUndoClean)
    {
      this.setState({
        displayUndoClean: false,
      });
    }
  }

  solve(){
    if (this.state.puzzleState != PuzzleState.Solved)
    {
      const grid = Utils.convertArrayToMatrix(this.state.values, 9)
      const sudokuSolver = new SudokuSolver(grid)

      sudokuSolver.solve();
      
      const pos = Utils.convertMatrixToArray(sudokuSolver.possibilities);

      console.log(pos);
      this.setState({
        values: pos,
        prevValues: Utils.convertMatrixToArray(sudokuSolver.grid),
        solveDisplay: true});
      if (sudokuSolver.isSolved() == false){
        this.setState({
          puzzleState: PuzzleState.Invalid,
        })
      } else{
        this.setState({
          puzzleState: PuzzleState.Solved,
        })
      }
    }

  }

  hint(){
    if (this.state.puzzleState == PuzzleState.Undone){
      const grid = Utils.convertArrayToMatrix(this.state.values, 9)
      const sudokuSolver = new SudokuSolver(grid)
      console.log(grid)
      sudokuSolver.hint();
      const newGrid = Utils.convertMatrixToArray(sudokuSolver.grid);
      this.setState({ 
        values: newGrid,
      });
    }
  }


  /// Generate a new sudoku
  /// TODO: Add generation with level of difficulty
  newSudoku(){
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(this.state.values, 9));
    sudokuSolver.generateSudoku();
    this.setState({
      values: Utils.convertMatrixToArray(sudokuSolver.grid)
    });
  }

  /// Clean all the grid
  clean(){
    if (Utils.areSameArray(this.state.values, Array(81).fill(null)) == false)
    {
      console.log('is cleaning');
      this.setState({
        displayUndoClean: true
      });
    }
    this.setState({
      values: Array(81).fill(null),
      prevValues: this.state.values,
      puzzleState: PuzzleState.Undone
    })
  }

  /// Undo the previous cleaning
  undoClean(){
    this.setState({
      values: this.state.prevValues,
      displayUndoClean: false
    });
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(this.state.prevValues, 9))
    if (sudokuSolver.isSolved()){
      this.setState({
        puzzleState: PuzzleState.Solved
      });
    }
  }

  changeEditMode(){
    console.log('here')
    if (this.state.editMode == EditMode.Pen)
    {
      this.setState({
        editMode: EditMode.Rubber
      })
    } else {
      this.setState({
        editMode: EditMode.Pen
      })
    }
  }

  renderEditMode(){
    var content = ""
    if (this.state.editMode == EditMode.Pen)
      content = "Switch to rubber";
    else
      content = "Switch to pen";
    return content;
  }

  checkPuzzleState(){
    console.log('current puzzle state : ', this.state.puzzleState)

    if (this.state.puzzleState == PuzzleState.Invalid){
      return <p style={{color: "red"}}>This puzzle is invalid or could not be solved.</p>
    } else if (this.state.puzzleState == PuzzleState.Solved){
      return <p style={{color: "green"}}>Puzzle solved !</p>;
    }
    else {
      return null;
    }
  }

  renderCleanning(){
    if (this.state.displayUndoClean){
      return <button onClick={(e) => this.undoClean()}>Undo clean</button>
    } else {
      return <button onClick={(e) => this.clean()}>Clean sudoku</button>
    }
  }



  render(){
  return (
    <div className="App">
      <div className="game">
        <div className='titleContainer'>
        <h1>SudoSumo 🍜</h1>
        </div>
        <SudokuGrid 
        values={this.state.values} 
        currentNumber={this.state.currentNumber}
        handleClick={(i) => this.handleClick(i)}
        onScrollUp={() => this.nextNumber()}
        onScrollDown={() => this.prevNumber()}
        editMode={this.state.editMode}
        />
        <div className='containerOptions'>
          {this.checkPuzzleState()}
          <div className='options'>
            <button onClick={(e) => this.newSudoku()}>New sudoku</button>
            {this.renderCleanning()}
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

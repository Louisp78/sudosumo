import './styles/app.css';
import SudokuGrid from './components/SudokuGrid';
import React from 'react';
import SudokuSolver from './components/SudokuSolver.js'
import Utils from './components/Utils.js'

  const PuzzleState = {
    Undone: 'undone',
    Invalid: 'invalid',
    Valid: 'valid'
  }
class App extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      values: this.props.current != null ? Utils.convertMatrixToArray(this.props.current) : Array(81).fill(null),
      solveDisplay: false,
      puzzleState: PuzzleState.Undone,
      displayUndoClean: false,
    }
  }

  handleClick(index){
    if (this.state.displayUndoClean)
    {
      this.setState({
        displayUndoClean: false,
      });
    }
    if (this.state.solveDisplay == false)
    {
      const items = this.state.values.slice()
      if (items[index] + 1 > 9){
          items[index] = null;
      }
      else if (items[index] == null)
      {
          items[index] = 1;
      }
      else{
          items[index] += 1;
      }
      this.setState({values: items});
    }
    else {
      this.setState({
        values: this.state.prevValues,
        solveDisplay: false});
    }
  }

  solve(){
    if (this.state.solveDisplay == false)
    {
      const grid = Utils.convertArrayToMatrix(this.state.values, 9)
      const sudokuSolver = new SudokuSolver(grid)

      console.log("before solve")
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
          puzzleState: PuzzleState.Valid,
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
    return null;
  }

  /// Clean all the grid
  clean(){
    if (Utils.areSameArray(this.state.values, Array(81).fill(null)) == false){
      this.setState({
        displayUndoClean: true
      });
    }
    this.setState({
      values: Array(81).fill(null),
      prevValues: this.state.values
    })
  }

  /// Undo the previous cleaning
  undoClean(){
    this.setState({
      values: this.state.prevValues,
      displayUndoClean: false
    });
  }

  checkInvalid(){
    if (this.state.puzzleState == PuzzleState.Invalid){
      return <p style={{color: "red"}}>This puzzle is invalid or could not be solved.</p>
    } else if (this.state.puzzleState == PuzzleState.Valid){
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
        <SudokuGrid values={this.state.values} handleClick={(i) => this.handleClick(i)}/>
        <div className='containerOptions'>
          {this.checkInvalid()}
          <div className='options'>
            <button onClick={(e) => this.newSudoku()}>New sudoku</button>
            {this.renderCleanning()}
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

import './styles/app.css';
import SudokuGrid from './components/SudokuGrid';
import React from 'react';
import SudokuSolver from './components/SudokuSolver.js'
import Utils from './components/Utils.js'
import ReactConfetti from 'react-confetti';

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
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(Array(81).fill(null), 9));
    sudokuSolver.generateSudoku();
    this.state = {
      values: Utils.convertMatrixToArray(sudokuSolver.grid),
      puzzleState: PuzzleState.Undone,
      editMode: EditMode.Pen,
      displayUndoClean: false,
      displayConfetti: false,
      currentNumber: 1,
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

  setNumber(number){
    if (number > 9 || number < 1){
      throw new RangeError('number must be between 1 and 9 inclusive');
    }
    this.setState({
      currentNumber: number
    });
  }


  setPuzzleSolved(){
    this.setState({
          puzzleState: PuzzleState.Solved
        });
      this.setState({displayConfetti: true, solveDisplay:true});
      setTimeout(function() {
        this.setState({displayConfetti: false});
      }.bind(this), 5000);
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
    this.setGrid(items);
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

      this.setGrid(pos);
      this.setState({
        prevValues: Utils.convertMatrixToArray(sudokuSolver.grid),
        solveDisplay: true});
      if (sudokuSolver.isSolved() == false){
        this.setState({
          puzzleState: PuzzleState.Invalid,
        })
      }
    }

  }


  setGrid(newGrid){
    console.log('set grid')
    this.setState({ 
        values: newGrid,
    });   
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(newGrid,9));
    if (sudokuSolver.isSolved()){
      this.setPuzzleSolved();
    } else {
      this.setState({puzzleState: PuzzleState.Undone, solveDisplay: false});
    }
  }

  hint(){
    if (this.state.puzzleState == PuzzleState.Undone){
      const grid = Utils.convertArrayToMatrix(this.state.values, 9)
      const sudokuSolver = new SudokuSolver(grid)
      console.log(grid)
      sudokuSolver.hint();
      const newGrid = Utils.convertMatrixToArray(sudokuSolver.grid);
      this.setGrid(newGrid);
    }
  }


  /// Generate a new sudoku
  /// TODO: Add generation with level of difficulty
  newSudoku(){
    const sudokuSolver = new SudokuSolver(Utils.convertArrayToMatrix(this.state.values, 9));
    sudokuSolver.generateSudoku();
    this.setState({
      puzzleState: PuzzleState.Undone,
    });
    this.setGrid(Utils.convertMatrixToArray(sudokuSolver.grid));
  }

  /// Clean all the grid
  clean(){
    if (Utils.areSameArray(this.state.values, Array(81).fill(null)) == false)
    {
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
    this.setGrid(this.state.prevValues);
    this.setState({
      displayUndoClean: false
    });
  }

  changeEditMode(){
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

  checkPuzzleState(){
    //console.log('current puzzle state : ', this.state.puzzleState)

    if (this.state.puzzleState == PuzzleState.Invalid){
      return <p style={{color: "red"}}>This puzzle is invalid or could not be solved.</p>
    } else if (this.state.puzzleState == PuzzleState.Solved){

      return <p style={{color: "green"}}>Puzzle solved !</p>;
    }
    else {
      return null;
    }
  }

  renderConfetti(){
    if (this.state.displayConfetti)
      return <ReactConfetti tweenDuration={5000} />;
    else
      return null;
  }

  renderEditMode(){
    var content = ""
    if (this.state.editMode == EditMode.Pen)
      content = "Switch to rubber";
    else
      content = "Switch to pen";
    return content;
  }

  renderCleanning(){
    if (this.state.displayUndoClean){
      return <button onClick={(e) => this.undoClean()}>Undo clean</button>
    } else {
      return <button onClick={(e) => this.clean()}>Clean sudoku</button>
    }
  }

  renderNumberGrid(){
      if (this.state.editMode == EditMode.Pen){
      var grid = Array.from(Array(9).fill(1), (elt,index) => elt + index)
      grid = grid.map((elt) => {
        if (elt == this.state.currentNumber){
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

  render(){
  return (
    <div className="App">
      <div className="game">
        {this.renderConfetti()} 
        <div className='titleContainer'>
          <h1>SudoSumo 🍜</h1>
        </div>
        <div className='wrapperSudokuGrid'>
          <SudokuGrid 
          values={this.state.values} 
          currentNumber={this.state.currentNumber}
          handleClick={(i) => this.handleClick(i)}
          onScrollUp={() => this.nextNumber()}
          onScrollDown={() => this.prevNumber()}
          editMode={this.state.editMode}
          />
          {this.renderNumberGrid()}
        </div>
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

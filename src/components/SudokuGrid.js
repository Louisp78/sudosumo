import React from 'react'
import Box from './Box.js'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

class SudokuGrid extends React.Component {

constructor(props){
    super(props)
    this.state = {
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

renderSquare(i){
    /*const x = Math.floor(i / 9);    
    const y = i % 9;
    const hint = this.props.hint;
    if (hint != null && hint.includes({x: x, y: y})){
        console.log('here is the hint');
        return <Box number={this.state.currentNumber} key={i} value={this.props.values[i]} onClick={() => this.props.handleClick(i)}/>;
    }
    else{
        return <Box number={this.state.currentNumber} key={i} value={this.props.values[i]} onClick={() => this.props.handleClick(i)}/>;
    }*/
    return <Box 
                key={i} 
                value={this.props.values[i]}
                number={this.state.currentNumber}
                onClick={() => this.props.handleClick(i)}
                />;
}

renderBoard(){
    const items = this.props.values;
    let board = []
    for (var i = 0; i < items.length; i++){
        board.push(this.renderSquare(i));
    }
    return board;
}

render(){
    return (
    <div className='board'>
        <ReactScrollWheelHandler
        upHandler={(e) => this.nextNumber()}
        downHandler={(e) => this.prevNumber()}
        >
            <ul>  
                {this.renderBoard()}
            </ul>
            <div className="note">Your browser doesn't support CSS Grid. You'll need <a href="http://gridbyexample.com/browsers/">a browser that does</a> to use this app.</div>
        </ReactScrollWheelHandler>
    </div>
    );
}


}

export default SudokuGrid;
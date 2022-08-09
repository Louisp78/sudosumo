import React from 'react'
import Box from './Box.js'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

class SudokuGrid extends React.Component {

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
                number={this.props.currentNumber}
                editMode={this.props.editMode}
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
        upHandler={(e) => this.props.onScrollUp()}
        downHandler={(e) => this.props.onScrollDown()}
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
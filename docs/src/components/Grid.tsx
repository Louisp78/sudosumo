import React from 'react'
import Box from './Box'
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import {EditMode} from "../enum";

type Props = {
    values: Array<number | null>,
    startValues: Array<number | null>,
    currentNumber: number,
    handleClick: (i : number) => void,
    onScrollUp: () => void,
    onScrollDown: () => void,
    editMode: EditMode,
}

type State = never;

class Grid extends React.Component<Props, State> {

renderSquare(i : number) : JSX.Element {
    const isLock = this.props.startValues[i] !== null;
    return <Box
                key={i} 
                value={this.props.values[i]}
                number={this.props.currentNumber}
                editMode={this.props.editMode}
                isLock={isLock}
                onClick={() => this.props.handleClick(i)}
                />;
}

renderBoard() : Array<JSX.Element> {
    const items = this.props.values;
    let board : Array<JSX.Element> = []
    for (let i = 0; i < items.length; i++){
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

export default Grid;
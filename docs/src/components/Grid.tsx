import React from 'react'
import Cell from './cell/Cell'
import {useSelector} from "react-redux";
import {RootState} from "../infra/redux/store";
import UtilsGrid from "../infra/utils/UtilsGrid";

type Props = {
    numberOfRow: number,
    numberOfCol: number,
}


export const Grid = ({numberOfRow, numberOfCol} : Props) => {
    const cluesStr = useSelector((state: RootState) => state.grid.clues);
    const clues = UtilsGrid.stringToGridMatrix(cluesStr);

    const renderCells = () => {
        let board: Array<React.JSX.Element> = []
        for (let x = 0; x < numberOfRow; x++) {
            for (let y = 0; y < numberOfCol; y++) {
                const coordinates = {
                    x: x,
                    y: y
                };
                const cell = <Cell
                    key={x * 9 + y}
                    isLocked={clues[x][y] !== undefined}
                    coordinates={coordinates}/>
                board.push(cell);
            }
        }
        return board;
    }

    return (
        <div className='board'>
                <ul>
                    {renderCells()}
                </ul>
                <div className="note">Your browser doesn't support CSS Grid. You'll need <a
                    href="http://gridbyexample.com/browsers/">a browser that does</a> to use this app.
                </div>
        </div>
    );
}

export default Grid;
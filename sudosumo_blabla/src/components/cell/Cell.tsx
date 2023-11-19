import React, {MouseEventHandler, useEffect, useState} from "react";
import cellStyle from "./cellStyle";
import {useDispatch, useSelector} from "react-redux";
import {setGridReducer} from "../../infra/redux/slices/gridSlice";
import {RootState} from "../../infra/redux/store";
import UtilsGrid from "../../infra/utils/UtilsGrid";
import CellType from "../../domain/CellType";

type Props = {
    key: number,
    isLocked: boolean,
    coordinates: {x: number, y: number},
}


const Cell = ({coordinates, isLocked} : Props) => {

    const gridStr = useSelector((state: RootState) => state.grid.grid);
    const grid = UtilsGrid.stringToGridMatrix(gridStr);

    const currentSelectedNumber = useSelector((state: RootState) => state.edit.selectedNumber) as CellType;
    const dispatch = useDispatch();
    const [valueDisplayed, setValueDisplayed] = useState<number | undefined>(grid[coordinates.x][coordinates.y]);

    const value = grid[coordinates.x][coordinates.y];
    useEffect(() => {
       console.log("cell value changed");
       setValueDisplayed(undefined);
    }, [value]);

    const  onMouseEnter : MouseEventHandler<HTMLLIElement> = () => {
       if (isLocked)
           return
        setValueDisplayed(currentSelectedNumber);
    };
    const onMouseLeave : MouseEventHandler<HTMLLIElement> = () => {
        if (isLocked)
            return
        setValueDisplayed(grid[coordinates.x][coordinates.y]);
    };
    const onClick : MouseEventHandler<HTMLLIElement> = () => {
        if (isLocked)
            return

        //TODO: check edit mode
        grid[coordinates.x][coordinates.y] = currentSelectedNumber;
        dispatch(setGridReducer(UtilsGrid.gridMatrixToString(grid)));
    };
    // generate unique key from coordinates

    return (
        <li
            style={isLocked ? cellStyle.locked : undefined}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}>
            {grid[coordinates.x][coordinates.y] ?? valueDisplayed}
        </li>
    );
}

export default Cell;

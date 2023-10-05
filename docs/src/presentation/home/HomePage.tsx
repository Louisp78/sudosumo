import '../../styles/grid.css';
import '../../styles/HUD.css';
import '../../styles/app.css';

import React, {useEffect} from 'react';
import ReactConfetti from 'react-confetti';
import {EditMode} from "../../enum";
import {useSelector} from "react-redux";
import Grid from "../../components/Grid";
import {setEditModeReducer} from "../../infra/redux/slices/editSlice";
import {RootState} from "../../infra/redux/store";
import {CircularProgress} from "@mui/material";
import useGenerateSudoku from "./hooks/useGenerateSudoku";
import useDisplayConfetti from "./hooks/useDisplayConfetti";
import NumberPicker from "./components/NumberPicker";
import useSolveSudoku from "./hooks/useSolveSudoku";
import useHintSudoku from "./hooks/useHintSudoku";
import CleanButton from "./components/CleanButton";
import GridStateMessage from "./components/GridStateMessage";

export const HomePage = () => {
    const editMode = useSelector((state: RootState) => state.edit.editMode);

    const [displayLoading, setDisplayLoading] = React.useState(false);

    const {score, newSudoku} = useGenerateSudoku({setDisplayLoading: setDisplayLoading,});
    const {confetti} = useDisplayConfetti();
    const {solve} = useSolveSudoku();
    const {hint} = useHintSudoku();

    useEffect(() => {
        newSudoku();
    }, []);

    const changeEditMode = () => {
        if (editMode === EditMode.Pen) {
            setEditModeReducer(EditMode.Rubber);
        } else {
            setEditModeReducer(EditMode.Pen);
        }
    }
    const renderConfetti = () => {
        if (confetti)
            return <ReactConfetti tweenDuration={5000}/>;
    }

    const renderEditMode = () => {
        let content = "";
        if (editMode === EditMode.Pen)
            content = "Switch to rubber";
        else
            content = "Switch to pen";
        return content;
    }

    const renderGrid = () => {
        if (displayLoading) {
            return <CircularProgress />
        } else {
            return <Grid numberOfRow={9} numberOfCol={9}/>
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
                    <NumberPicker/>
                </div>
                <div className='containerOptions'>
                    <p>Score of difficulty : {score}</p>
                    <GridStateMessage/>
                    <div className='options'>
                        <button onClick={(e) => newSudoku()}>New sudoku</button>
                        <CleanButton/>
                        <button onClick={() => changeEditMode()}>{renderEditMode()}</button>
                        <button onClick={(e) => solve()}>Solve</button>
                        <button onClick={(e) => hint()}>Hint</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


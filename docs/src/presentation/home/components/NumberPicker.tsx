import {EditMode} from "../../../enum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../infra/redux/store";
import {setSelectedNumberReducer} from "../../../infra/redux/slices/editSlice";

const NumberPicker = () => {

    const editMode = useSelector((state: RootState) => state.edit.editMode);
    const selectedNumber = useSelector((state : RootState) => state.edit.selectedNumber);
    const dispatch = useDispatch();

    const setNumber = (number: number) => {
        if (number > 9 || number < 1) {
            throw new RangeError('number must be between 1 and 9 inclusive');
        }
        dispatch(setSelectedNumberReducer(number))
    }

    if (editMode === EditMode.Pen) {
        let grid = Array.from(Array(9).fill(1), (elt, index) => elt + index);
        grid = grid.map((elt) => {
            if (elt === selectedNumber) {
                return <div key={elt} className='selected'>{elt}</div>
            } else {
                return <div key={elt} className='unselected' onClick={() => setNumber(elt)}>{elt}</div>
            }
        });
        return (
            <div className='numberGrid'>
                {grid}
            </div>
        );
    }
    return <></>
};

export default NumberPicker;
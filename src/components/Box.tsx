import React from "react";
import {EditMode} from "../pages/App";

const BoxStyle = {
    rubber: {
        backgroundColor: "red",
        textDecoration: "line-through"
    },
    pen: {
        color: "darkgrey",
        backgroundColor: "ghostwhite"
    },
    penValidate: {
        backgroundColor: "lightgreen"
    },
    locked: {
        backgroundColor: "grey",
        cursor: "not-allowed",
        color: "wheat",
    },
}

type Props = {
    key: number,
    value: number | null,
    number: number,
    editMode: EditMode,
    isLock: boolean,
    onClick: () => void,
}

type State = {
    displayHover: boolean,
    clicked: boolean,
    style: any,
}

class Box extends React.Component<Props, State> {

    constructor(props : Props){
        super(props);
        this.state = {
            displayHover: false,
            clicked: false,
            style: {}
        }
    }


    onMouseEnter(){
        if (this.props.editMode === EditMode.Pen)
        {
            this.setState({
            displayHover: true,
            style: BoxStyle.penValidate
        });
        } else {
            this.setState({
                displayHover: false,
                style: BoxStyle.rubber
            })
        }
    }

    onMouseLeave(){
        this.setState({
            displayHover: false,
            style: {}
        })
        if (this.state.clicked){
            this.props.onClick();
            this.setState({
                clicked: false,
            })
        }
    }

    onClick(){
        this.setState({
            clicked: true
        })
        if (this.props.editMode === EditMode.Pen){
            this.setState({
                style: BoxStyle.penValidate,
            });
        } else {
            this.setState({
                style: {
                    color: "rgba(0, 0, 0, 0.0)"
                }
            })
        }
    }

    renderContent(){
        const displayHover = this.state.displayHover;
        if (displayHover){
            return this.props.number;
        }
        else{
            return this.props.value;
        }
    }

    render(){
            return (
                <li
                    style={this.props.isLock ? BoxStyle.locked : this.state.style}
                    onMouseEnter={ this.props.isLock ? undefined : (e) => this.onMouseEnter()}
                    onMouseLeave={ this.props.isLock ? undefined : (e) => this.onMouseLeave()}
                    onClick={ this.props.isLock ? undefined : (e) => this.onClick()}
                >{this.renderContent()}</li>
            );
    }

}

export default Box
import React from "react";
import {EditMode} from "../App.js"
class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            displayHover: false,
            cliked: false,
            value: this.props.value,
            style: {}
        }
    }

    onMouseEnter(){
        if (this.props.editMode == EditMode.Pen)
        {
            this.setState({
            displayHover: true,
            style: {
                color: "darkgrey",
                backgroundColor: "ghostwhite"
            }
        });
        } else {
            this.setState({
                displayHover: false,
                style: {
                    backgroundColor: "red",
                    textDecoration: "line-through"
                }
            })
        }
    }

    onMouseLeave(){
        this.setState({
            displayHover: false,
            style: {}
        })
        if (this.state.cliked){
            this.props.onClick();
            this.setState({
                cliked: false,
            })
        }
    }

    onClick(){
        this.setState({
            cliked: true
        })
        if (this.props.editMode == EditMode.Pen){
            this.setState({
                style: {
                    backgroundColor: "lightgreen"
                }
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
                style={this.state.style}
                onMouseEnter={(e) => this.onMouseEnter()} 
                onMouseLeave={(e) => this.onMouseLeave()}
                onClick={(e) => this.onClick()}
                >{this.renderContent()}</li>
            );
    }
}

export default Box
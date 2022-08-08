import React from "react";
class Box extends React.Component {
    render(){
        if (this.props.hintMode){
            return (
                <li style={{backgroundColor: "blue"}} onClick={(e) => this.props.onClick()}>{this.props.value}</li>
            );
        } else {
            return (
                <li onClick={(e) => this.props.onClick()}>{this.props.value}</li>
            );
        }
    }
}

export default Box
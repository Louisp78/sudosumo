import React from "react";
class Box extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            displayHover: false,
            value: this.props.value,
            style: {}
        }
    }

    onMouseEnter(){
        this.setState({
            value: this.props.number,
            style: {
                color: "darkgrey",
                backgroundColor: "ghostwhite"
            }
        });
    }

    onMouseLeave(){
        this.setState({
            value: this.props.value,
            style: {}
        })
    }

    render(){
            return (
                <li 
                style={this.state.style}
                onMouseEnter={(e) => this.onMouseEnter()} 
                onMouseLeave={(e) => this.onMouseLeave()}
                onClick={(e) => this.props.onClick()}
                >{this.state.value}</li>
            );
    }
}

export default Box
import React from "react";
const cellStyle = {
    rubber : {
        backgroundColor: "red",
        textDecoration: "line-through"
    } as React.CSSProperties,
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
export default cellStyle;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import React from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const BaseButton = (props: { onClick: () => void, icon: IconProp }) => {
    return (
        <div onClick={props.onClick} style={{
            height: 75,
            width: 75,
            borderRadius: "50%",
            background: "#35A29F",
            display: "grid",
            placeItems: "center",
            position: "absolute",
            top: -20,
            right: -20,
            cursor: "pointer"
        }}>
            <FontAwesomeIcon icon={props.icon} size={"2x"} color={"white"}/>
        </div>
    )
}
export default BaseButton;
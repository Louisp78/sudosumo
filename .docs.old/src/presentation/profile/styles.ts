import React from "react";

export const sectionStyle : React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "60px",
    background: "var(--Gray-6, #F2F2F2)",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    width: "1103px",
    height: "490px",
    flexShrink: 0,
    padding: "40px 50px",
}

export const cardHeaderStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
} as React.CSSProperties;
export const userInfoDivStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
} as React.CSSProperties;
export const numberOfSudokuFinishedStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
} as React.CSSProperties;

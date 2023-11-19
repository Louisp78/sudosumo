import React from "react";
import {useGetCurrentUserQuery} from "../infra/redux/api/apiSlice";
import {Avatar, CircularProgress} from "@mui/material";

export const ProfilePage = () => {
    const {data, isLoading, isSuccess, isError, error} = useGetCurrentUserQuery();
    /*return (
        <div>
        <h1>Profile</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{JSON.stringify(error)}</div>}
            {isSuccess && <div>{JSON.stringify(data)}</div>}
        </div>
    )*/

    if (isLoading) {
        return (
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress/>
            </div>
        )
    }

    const sectionStyle = {
        borderRadius: "60px",
        background: "var(--Gray-6, #F2F2F2)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        width: "1103px",
        height: "490px",
        flexShrink: 0,
        padding: "40px 50px",
    }

    const cardHeaderStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    } as React.CSSProperties;
    const userInfoDivStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    } as React.CSSProperties;
    const numberOfSudokuFinishedStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--Gray-5, #E0E0E0)",
        height: "150px",
        width: "min-content",
    } as React.CSSProperties;

    return (
        <div style={{height: "100%", margin: 0, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
        <section style={sectionStyle}>
            <div style={cardHeaderStyle}>
                <div style={userInfoDivStyle}>
                    <Avatar sx={{width: 80, height: 80}}/>
                    <div style={{width: "50px"}}></div>
                    <h2>
                        @llouisp<br/>
                        Louis Place
                    </h2>
                </div>
                <div>
                    <span style={{fontSize: "64px", paddingRight: "9px"}}>145K</span>
                    <span id="score" style={{color: "#828282", fontSize: "36px"}}>kg</span>
                </div>
            </div>
            <div id="nbOfSudokuFinished" style={numberOfSudokuFinishedStyle}>
                <span>Finished Sudoku<br/></span>
                <span>12</span>
            </div>
        </section>
        </div>
    );
}
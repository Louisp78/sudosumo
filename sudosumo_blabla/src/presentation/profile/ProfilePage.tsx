import React from "react";
import {useGetCurrentUserQuery} from "../../infra/redux/api/apiSlice";
import {Avatar, CircularProgress} from "@mui/material";
import {cardHeaderStyle, numberOfSudokuFinishedStyle, sectionStyle, userInfoDivStyle} from "./styles";
import BaseButton from "../../components/BaseButton";
import RouteConfig from "../../routes/RouteConfig";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const ProfilePage = () => {
    const {data: userDto, isLoading, isSuccess, isError, error} = useGetCurrentUserQuery();
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
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <CircularProgress/>
            </div>
        )
    }


    return (
        <div style={{
            height: "100%",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}>

            <section style={sectionStyle}>
                <BaseButton onClick={() => window.location.href = RouteConfig.editProfile} icon={faPen}/>
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
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>

                    <div id="nbOfSudokuFinished" style={numberOfSudokuFinishedStyle}>
                        <h3>Finished Sudoku<br/></h3>
                        <span style={{fontSize: "2rem", paddingTop: "5vh"}}>12</span>
                    </div>
                    <div id="nbOfSudokuFinished" style={numberOfSudokuFinishedStyle}>
                        <h3>Best sudoku teammate<br/></h3>
                        <span style={{fontSize: "2rem", paddingTop: "5vh"}}>@randomUser</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
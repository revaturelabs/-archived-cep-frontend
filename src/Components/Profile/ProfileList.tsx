import React, { useState, useEffect, ReactElement } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Grid, makeStyles, Paper, CssBaseline, StyleRules } from "@material-ui/core";
import { useEventCallback } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

//used solely for styling
const useStyles: Function = makeStyles((theme): StyleRules => ({
    root: {
        height: "fit-content"
    },
    toggleBtn: {
        marginLeft: "41%",
        color: "#F26925",
        backgroundColor: "transparent",
        borderColor: "transparent",
        alignSelf: "center"
    },
    scrollArea: {
        height: '500px',
        overflowY: 'scroll',
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black"
    }
}));
//Show a list of requests
export default function ProfileList(): ReactElement {
    interface styleINF {
        root: string,
        toggleBtn: string,
        scrollArea: string
    }
    const token: String = useSelector((state: any) => state.credReducer.token);
    const [clientSkills, setClientSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [endDate, setEndDate] = useState(new Date);
    const [associateCount, setAssociateCount] = useState(0);
    const styles: styleINF = useStyles();

    function changeSkills(cData: any, aData: any): void {
        setClientSkills(cData);
        setAllSkills(aData);
    }

    //Make an axios call to display the list of requests
    useEffect((): void => {
        /* Request to get list of skills and skills associated with user */
        let x = [
            {
                "categoryId": 1,
                "skillCategory": "Java",
                "active": true
            },
            {
                "categoryId": 2,
                "skillCategory": "JavaScript",
                "active": true
            },
            {
                "categoryId": 3,
                "skillCategory": "TypeScript",
                "active": true
            },
            {
                "categoryId": 4,
                "skillCategory": "HTML",
                "active": true
            },
            {
                "categoryId": 5,
                "skillCategory": "CSS",
                "active": true
            }];

        let y = [
            {
                "categoryId": 1,
                "skillCategory": "Java",
                "active": true
            },
            {
                "categoryId": 2,
                "skillCategory": "JavaScript",
                "active": true
            }]

        changeSkills(y, x);
    }, []);
    /* <div>
               Use this but for 
         {realData.map((data: any) => {
           return <AccUserItem data={data} key={data.userId}/>;
         })}
           </div> */

    function handleDate(event: any): void {
        event.preventDefault();
        setEndDate(event.target.value);
    }

    function handleAmount(event: any): void {
        event.preventDefault();
        setAssociateCount(event.target.value);
    }

    return (
        <Grid container component="main" className={styles.root}>
            <CssBaseline />
            <Grid item xs={false} sm={8} md={5} component={Paper} elevation={5} square>
                    <div className={styles.scrollArea} style={{ height: "100%" }}>
                        <h3>Skills Available</h3>
                        {allSkills.map((data: any) => {
                            return <div>{data.skillCategory}</div>;
                        })}
                    </div>
            </Grid>
            <Grid item xs={false} sm={false} md={7} component={Paper} elevation={2} square>
                <Grid item>
                    <TextField
                        id="outlined-simple-start-adornment"
                        variant="filled"
                        // label="End Time"
                        onChange={handleDate}
                        type="datetime-local"
                        name="endTime"
                    />
                </Grid>
                <br></br>
                <input type="number" className="AmountIn" onChange={handleAmount} value={associateCount}></input>
                <h3>Skill Chosen</h3>
                <div className={styles.scrollArea}>
                    {clientSkills.map((data: any) => {
                        return <div>{data.skillCategory}</div>;
                    })}
                </div>
            </Grid>
        </Grid>


    );
    //Render the list of accounts

}
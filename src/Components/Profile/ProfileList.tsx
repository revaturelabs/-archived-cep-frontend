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
        height: "450px",
        overflowY: 'scroll',
    },
    confirmBtn: {
        backgroundColor: "#f26925",
        color: "#fff",
        cursor: "pointer",
        padding: "10px 15px",
        borderStyle: "none",
        fontSize: "large",
        margin: "15px auto"
    },
    moveBtn: {
        backgroundColor: "#f26925",
        borderRadius: "5px",
        display: "block",
        width: "120px",
        padding: "10px 5px",
        color: "#ffffff",
        borderColor: "#f26925",
        fontSize: "12px",
        margin: "5px auto"
    },
    row: {
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        borderBottom: "1px solid lightgray",
        // borderBottom: "none",
    },
    inline: {
        margin: "5px 10px",
        float: "left"
    },
    label: {
        marginTop: "10px",
        marginBottom: "5px",
        display: "block",
        fontSize: "18px",
        width: "fit-content"
    },
    header: {
        width: "100%",
        paddingBottom: "10px",
        backgroundColor: "#eeeeee",
    },
    input: {
        width: "260px",
        fontSize: "18px",
        textAlign: "center"
    }
}));
//Show a list of requests
export default function ProfileList(): ReactElement {
    interface styleINF {
        root: string,
        toggleBtn: string,
        scrollArea: string,
        confirmBtn: string,
        moveBtn: string,
        row: string,
        inline: string,
        label: string,
        header: string,
        input: string
    }
    const token: String = useSelector((state: any) => state.credReducer.token);
    const userId = useSelector((state: any) => state.credReducer.userId);
    const [clientSkills, setClientSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [endDate, setEndDate] = useState(new Date);
    const [associateCount, setAssociateCount] = useState(0);

    const [message, setMessage] = useState("");
    const styles: styleINF = useStyles();
    /**
     * Remove element from All skill list which already existing in skill list chosen by user
     * @param cData The skill list is chosen by user
     * @param aData List show all skill
     */
    function changeSkills(cData: any, aData: any): void {
        setClientSkills(cData);
        cData.forEach(element => {
            aData = aData.filter(val => val.categoryId !== element.categoryId)
        });

        setAllSkills(aData);
    }

    /**
     * Connect to backend get skill list chosen by user and 
     */
    //Make an axios call to display the list of requests
    useEffect((): void => {
        /* Request to get list of skills and skills associated with user */
        Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/category/allCategories", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/users/profile/" + userId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((clientResult) => {
                        setEndDate(clientResult.data.batchDeadline)
                        setAssociateCount(clientResult.data.associateCount)
                        changeSkills(clientResult.data.neededCategories, result.data);
                    })
            })
            .catch((err) => console.log("error batch:" + err));


    }, []);

    function handleDate(event: any): void {
        event.preventDefault();
        setEndDate(event.target.value);
    }

    function handleAmount(event: any): void {
        event.preventDefault();
        if (event.target.value >= 0)
            setAssociateCount(event.target.value);
    }

    /**
     * Move object from All skill list to list which choose by user when user add new skill
     * @param event get object which select by user
     */
    function addClient(event) {
        let cObj = JSON.parse(event.target.value);
        let temp: any = [...clientSkills];
        temp.push({
            "categoryId": cObj.categoryId,
            "skillCategory": cObj.skillCategory,
            "active": cObj.active
        });
        setClientSkills(temp);
        let aData: any = [...allSkills];
        temp.forEach(element => {
            aData = aData.filter(val => val.categoryId !== element.categoryId)
        });
        setAllSkills(aData);
    }

    /**
     * Move object from user list to All list which choose by user when user dont want a skill
     * @param event get object which select by user
     */
    function subClient(event) {
        let cObj = JSON.parse(event.target.value);
        let temp: any = [...allSkills];
        temp.push({
            "categoryId": cObj.categoryId,
            "skillCategory": cObj.skillCategory,
            "active": cObj.active
        });
        setAllSkills(temp);
        let cData: any = [...clientSkills];
        temp.forEach(element => {
            cData = cData.filter(val => val.categoryId !== element.categoryId)
        });
        setClientSkills(cData);
    }

    /**
     * Update user profile
     * @param event Did nothing
     */
    function sendRequest(event) {
        setMessage("Setting Preferences...")
        let data = {}
        if (associateCount < 0) {
            setMessage("The associate can't less thank 0")
            return;
        }
        var todayDate = new Date(); //Today Date   
        var deadline = new Date(endDate);
        if (todayDate >= deadline) {
            data = {
                'batchDeadline': null,
                'associateCount': associateCount,
                'neededCategories': clientSkills
            }
        }
        else {
            data = {
                'batchDeadline': endDate,
                'associateCount': associateCount,
                'neededCategories': clientSkills
            }
        }

        Axios.put(process.env.REACT_APP_ZUUL_ROUTE + "/users/profile/" + userId, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((result) => {
                setMessage(result.data)
            })
    }

    return (
        <Grid container component="main" className={styles.root}>
            <CssBaseline />
            <div className={styles.header}>
                <div style={{ width: "fit-content", margin: "auto" }}>
                    <label htmlFor="endTime" className={styles.label}>Preferred Batch End Date</label>
                    <TextField
                        id="outlined-simple-start-adornment"
                        variant="filled"
                        onChange={handleDate}
                        type="datetime-local"
                        name="endTime"
                        value={endDate}
                    />
                    <label htmlFor="batchSize" className={styles.label}>Preferred Batch Size</label>
                    <input type="number" className={styles.input} onChange={handleAmount} value={associateCount} name="batchSize"></input>
                </div>

            </div>
            <div className={styles.row}>
                <Grid item xs={false} sm={8} md={3} component={Paper} square>
                    <h3>Skills Available</h3>
                    <div className={styles.scrollArea}>
                        {allSkills.map((data: any) =>
                            <button className={styles.moveBtn} value={JSON.stringify(data)} onClick={addClient}>+ {data.skillCategory}</button>
                        )}
                    </div>
                </Grid>

                <Grid item xs={false} sm={false} md={9} component={Paper} square>
                    <h3>Skill Chosen</h3>
                    <div className={styles.scrollArea}>
                        {clientSkills.map((data: any) =>
                            <button className={`${styles.moveBtn} ${styles.inline}`} style={{ backgroundColor: "#b9b9ba", borderColor: "#b9b9ba" }} value={JSON.stringify(data)} onClick={subClient}>{data.skillCategory}</button>
                        )}
                    </div>
                </Grid>

            </div>
            <div style={{ margin: "auto" }}>
                <h3 style={{ color: "black", textAlign: "center" }}>{message}</h3>
                <button className={styles.confirmBtn} onClick={sendRequest}>Confirm Changes</button>
            </div>

        </Grid>


    );
    //Render the list of accounts

}
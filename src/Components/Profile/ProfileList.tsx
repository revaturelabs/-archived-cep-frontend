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
    },
    confirmBtn: {
        backgroundColor: "#f26925",
        color: "#fff",
        width: "100%",
        height: "30px",
        borderColor: "#f26925",
        fontSize: "large",
        marginTop: "5%"
    },
    moveBtn: {
        backgroundColor: "#fff",
        color: "#f26925",
        marginLeft: "10px",
        borderColor: "#f26925",
        fontSize: "large",
        marginTop: "3%"
    }
}));
//Show a list of requests
export default function ProfileList(): ReactElement {
    interface styleINF {
        root: string,
        toggleBtn: string,
        scrollArea: string,
        confirmBtn: string,
        moveBtn: string
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
                Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/users/profile/"+userId, {
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
        if (event.target.value>=0)
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
        setMessage("")
        let data= {}
        if(associateCount<0){
            setMessage("The associate can't less thank 0")
            return;
        }
        var todayDate = new Date(); //Today Date   
        var deadline= new Date(endDate); 
        if(todayDate >= deadline){
             data= {
                'batchDeadline':null,   
                'associateCount':associateCount,
                'neededCategories':clientSkills
             }
        }
        else{
             data= {
                'batchDeadline':endDate,   
                'associateCount':associateCount,
                'neededCategories':clientSkills
             }
        }

    Axios.put(process.env.REACT_APP_ZUUL_ROUTE + "/users/profile/"+userId, data, {
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
            <Grid item xs={false} sm={8} md={5} component={Paper} elevation={5} square>
                <div className={styles.scrollArea} style={{ height: "100%" }}>
                    <h3>Skills Available</h3>
                    {allSkills.map((data: any) => {
                        return (<div>{data.skillCategory}
                            <button className={styles.moveBtn} value={JSON.stringify(data)} onClick={addClient}>+</button>
                        </div>);
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
                        value={endDate}
                    />
                    <p>Put early date or current date if dont want to set deadline</p>
                </Grid>
                <br></br>
                <input type="number" className="AmountIn" onChange={handleAmount} value={associateCount}></input>
                <p>Put 0 if you want unlimit associate</p>
                <h3>Skill Chosen</h3>
                <div className={styles.scrollArea}>
                    {clientSkills.map((data: any) => {
                        return <div>{data.skillCategory}
                            <button className={styles.moveBtn} value={JSON.stringify(data)} onClick={subClient}>-</button>
                        </div>;
                    })}
                </div>
            </Grid>

            <div style={{ width: "100%" }}>
                <h3 style={{ color: "red", textAlign: "center" }}>{message}</h3>
            </div>

            <button className={styles.confirmBtn} onClick={sendRequest}>Confirm</button>
        </Grid>


    );
    //Render the list of accounts

}
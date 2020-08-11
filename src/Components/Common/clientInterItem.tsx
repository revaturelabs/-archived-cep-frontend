import React, { useState, useEffect, ReactElement, SyntheticEvent } from "react";
import {
    makeStyles,
    Card,
    CardContent,
    CardHeader,
    StyleRules,
} from "@material-ui/core";
import Axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment';


//used solely for styling
const useStyles: Function = makeStyles((): StyleRules => ({
    spacing: {
        marginTop: "15px",
        marginBottom: "15px",
        height: "100%"
    }
}));

//Display individual account 
export default function AccUserItem(props: any): ReactElement {
    interface styleINF {
        spacing: string
    }

    const token: String = useSelector((state: any) => state.credReducer.token);
    const styles: styleINF = useStyles();
    let t: number = props.data.startTime.toString().indexOf("T");
    let date: string = props.data.startTime.slice(0, t);
    function ClientItem(): ReactElement {
        return (
            <Card className={styles.spacing}>
                <CardHeader style={{ backgroundColor: "#F26925" }} title={props.data.requestType}></CardHeader>
                <CardContent>
                    <p>For: {props.data.requestType}</p>
                    <p>{(props.data.batchId) ? "Batch: " + props.data.batchId : "No Batch Specified"}</p>
                    <p>Description: {props.data.description}</p>

                    <p>Date: {moment(props.data.startTime).format("MM/DD/YYYY hh:mm a")}</p>
                </CardContent>
            </Card>
        );
    };

    //Possibly use for checking if signed in and setting token
    useEffect((): void => {
        // console.log(props.data);
    }, []);

    return <ClientItem />;
}

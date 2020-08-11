import React, { useState, useEffect, ReactElement, SyntheticEvent } from "react";
import {
    Grid,
    Typography,
    makeStyles,
    Card,
    CardContent,
    CardHeader,
    StyleRules,
} from "@material-ui/core";
import Axios from "axios";
import { useSelector } from "react-redux";

//used solely for styling
const useStyles: Function = makeStyles((): StyleRules => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    middle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    rightButton: {
        marginTop: "5px",
        marginBottom: "5px",
    },
    spacing: {
        marginTop: "15px",
        marginBottom: "15px",
    },
}));

//Display individual account 
export default function AccUserItem(props: any): ReactElement {
    interface styleINF {
        root: string,
        card: string,
        right: string,
        middle: string,
        rightButton: string,
        spacing: string
    }

    const token: String = useSelector((state: any) => state.credReducer.token);
    const styles: styleINF = useStyles();
    let t: number = props.data.startTime.toString().indexOf("T");
    let date: string = props.data.startTime.slice(0, t);
    function ClientItem(): ReactElement {
        return (
            <Card className={styles.spacing}>
                <CardHeader style={{ backgroundColor: "#F26925" }}></CardHeader>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={3} className={styles.right}>
                            {/* <Typography variant="overline">{userData.company}</Typography>
                        <Typography variant="h4">
                            {userData.firstName} {userData.lastName}
                        </Typography>
                        <Typography variant="h6">{userData.email}</Typography>
                        <Typography variant="h6">{userData.phone}</Typography>
                        <Typography variant="h6">{props.data.requestType}</Typography> */}
                            <Typography variant="h4">{props.data.requestType}</Typography>
                            <Typography variant="h6">{date}</Typography>
                        </Grid>
                        <Grid item xs={6} className={styles.middle}>
                            {/* <Typography variant="h4">{props.data.batchId}</Typography>
                        <Typography variant="body2">{props.data.description}</Typography> */}
                            <Typography variant="h4">{props.data.batchId}</Typography>
                            <Typography variant="h6">{props.data.description}</Typography>
                        </Grid>
                        <Grid item xs={3} className={styles.right}>
                            {/* <Typography variant="body2">{props.data.startTime}</Typography> */}
                            <Typography variant="h4">{props.data.status}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        );
    };

    //Possibly use for checking if signed in and setting token
    useEffect((): void => {
        // console.log(props.data);
    }, []);

    return <ClientItem />;
}

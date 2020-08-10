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
import ConfirmModal from "./confirmModal";
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


    const [cardVisi, setCardVisi] = useState(true);

    function UserCard(): ReactElement {
        let title = `${props.data.firstName} ${props.data.lastName}`;
        return (
            <Card className={styles.spacing}>
                <CardHeader style={{ backgroundColor: "#F26925" }} title={title}></CardHeader>
                <CardContent>
                    Company: {props.data.company}
                    <br />
                    <br />
                    Email: {props.data.email}
                    <br />
                    <br />
                    Phone: {props.data.phone}
                    <br />
                    <br />
                    <ConfirmModal userInfo={props.data} hideCard={callback} />

                </CardContent>
            </Card>
        );
    };

    //React hook that changes visibility through child confirmModal
    const callback = () => {
        setCardVisi(false);
    }

    //Possibly use for checking if signed in and setting token
    useEffect((): void => {
    }, []);

    return <div>{cardVisi ? <UserCard /> : null}</div>;
}
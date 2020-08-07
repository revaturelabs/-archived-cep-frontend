import React, { useState, useEffect, ReactElement, SyntheticEvent } from "react";
import {
    Grid,
    Typography,
    makeStyles,
    Card,
    CardContent,
    CardHeader,
    Button,
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
    left: {
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

interface dataObject {
    firstName: string,
    lastName: string,
    email: string,
    company: string,
    phone: string
}

interface props {
    data: dataObject
}

export default function AccUserItem({data}: props): ReactElement {


    interface styleINF {
        root: string,
        left: string,
        right: string,
        middle: string,
        rightButton: string,
        spacing: string
    }

    const token: String = useSelector((state: any) => state.credReducer.token);
    const styles: styleINF = useStyles();


    const [cardVisi, setCardVisi] = useState(true);

    const CardInfo: React.FC = (): ReactElement => {
        return (
            <Card className={styles.spacing}>
                <CardHeader style={{ backgroundColor: "#F26925" }}></CardHeader>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={3} className={styles.left}>
                            <Typography variant="h4">
                                {data.firstName} {data.lastName}
                            </Typography>
                            <Typography variant="h6">{data.email}</Typography>
                            <Typography variant="h6">{data.phone}</Typography>
                        </Grid>
                        <Grid item xs={6} className={styles.middle}>
                            <Typography variant="h4">{data.company}</Typography>
                        </Grid>
                        <Grid item xs={3} className={styles.right}>
                            <ConfirmModal userInfo={data} hideCard={callback}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    //React hook that changes visibility through child confirmModal
    const callback = ()=>{
        setCardVisi(false);
    }

    //Possibly use for checking if signed in and setting token
    useEffect((): void => {
        // console.log(props.data);
    }, []);

    return <div>{cardVisi ? <CardInfo /> : null}</div>;
}
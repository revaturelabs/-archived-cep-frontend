import React, { useState, useEffect, ReactElement } from 'react';
import { makeStyles, StyleRules } from "@material-ui/core";
import moment from 'moment';

const useStyles: Function = makeStyles((theme: any): StyleRules => ({
    header: {
        backgroundColor: "#f26925",
        fontWeight: "bold",
        color: "#000000",
        cursor: "pointer",
        padding: "18px",
        width: "100%",
        border: "none",
        textAlign: "left",
        outline: "none",
        fontSize: "15px",
    },
    body: {
        backgroundColor: "#eeeeee",
        padding: "0 18px",
        overflow: "hidden",
        display: "none",
    }
}));


interface styleINF {
    header: string,
    body: string
}

export default function Event(props: any): ReactElement {
    const [displayBlock, setDisplay] = useState(false);
    const [colorCoding, setColorCoding] = useState("");

    const styles: styleINF = useStyles();

    console.log("event item", props.eventItem);
    return (
        <div>
            <button onClick={() => setDisplay(!displayBlock)} className={`accordion ${styles.header}`}>{"UserId: " + props.eventItem.userId + " BatchID " + props.eventItem.batchId}</button>
            <div className={styles.body} style={{ display: displayBlock ? "block" : "none" }}>
                <p>Start: {moment(props.eventItem.startTime).format("hh:mm a")}</p>
                <p>End: {moment(props.eventItem.endTime).format("hh:mm a")}</p>
                <p>AllDay: {props.eventItem.isAllDay.toString()}</p>
                <p>Type: {props.eventItem.requestType}</p>
            </div>
        </div>

    )

}

import React, { useState, useEffect, ReactElement } from 'react';
import moment from 'moment';
import "./event.css";

export default function Event(props: any): ReactElement {
    const [displayBlock, setDisplay] = useState(false);
    const [colorCoding, setColorCoding] = useState("");
    useEffect((): void => {
        setColor(props.eventItem.requestType);
    })
    const setColor: Function = (coding): void => {
        switch (coding) {
            case "Intervention":
                setColorCoding("Green")
                break;
            case "Talent":
                setColorCoding("Blue")
                break;
            case "Help":
                setColorCoding("Yellow")
                break;
            default:

        }
    }

    return (
        <div  >
            <button style={{ backgroundColor: colorCoding, fontSize: 15 }} onClick={() => setDisplay(!displayBlock)} className="accordion">{"UserId: " + props.eventItem.userId + " BatchID " + props.eventItem.batchId}</button>
            <div className="panel" style={{ display: displayBlock ? "block" : "none" }}>
                <p>Start: {moment(props.eventItem.startTime).format("hh:mm a")}</p>
                <p>End: {moment(props.eventItem.endTime).format("hh:mm a")}</p>
                <p>AllDay: {props.eventItem.isAllDay.toString()}</p>
                <p>Type: {props.eventItem.requestType}</p>
            </div>
        </div>

    )

}

import React, { useState, useEffect} from 'react';
import moment from 'moment';
import "./event.css";
function Event(props) {
    const [displayBlock, setDisplay] = useState(false);
    const [colorCoding, setColorCoding] = useState("");
    useEffect(()=>{
        setColor(props.eventItem.requestType);
    })
    const setColor = (coding) =>{
        switch(coding){
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
            <button style={{ backgroundColor: colorCoding, fontSize: 15 }} onClick={() => setDisplay(!displayBlock)} class="accordion">{"UserId: " + props.eventItem.userId + " BatchID " + props.eventItem.batchId}</button>
            <div class="panel" style={{ display: displayBlock ? "block" : "none" }}>
                <p>Start: {moment(props.eventItem.startTime).format("hh:mm a")}</p>
                <p>End: {moment(props.eventItem.endTime).format("hh:mm a")}</p>
                <p>AllDay: {props.eventItem.isAllDay.toString()}</p>
                <p>Type: {props.eventItem.requestType}</p>
            </div>
        </div>

    )

}
export default Event;
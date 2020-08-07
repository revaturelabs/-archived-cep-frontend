import React , {useState}from 'react';
import moment from 'moment';
import "./event.css";
function Event(props) {
    /*     batchId: 1,
        userId: 2,
        startTime: 3,
        endTime: 4,
        isAllDay: 5,
        status: "Pending",
        requestType: 7,
        description: 8 */
        const [displayBlock, setDisplay] = useState(false);
    return (
        <div style={{ backgroundColor: "Yellow", fontSize: 15 }} >
            <button onClick={() => setDisplay(!displayBlock)} class="accordion">{"UserId: " + props.eventItem.userId + " BatchID " + props.eventItem.batchId }</button>
            <div class="panel" style={{display: displayBlock ? "block":"none"}}>
                <p>Start: {moment(props.eventItem.startTime).format("hh:mm a")}</p>
                <p>End: {moment(props.eventItem.endTime).format("hh:mm a")}</p>
                <p>AllDay: {props.eventItem.isAllDay.toString()}</p>
                <p>Type: {props.eventItem.requestType}</p>
            </div>
        </div>

    )
}
export default Event;
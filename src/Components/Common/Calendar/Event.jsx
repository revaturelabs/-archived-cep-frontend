import React from 'react';
function Event(props) {
/*     batchId: 1,
    userId: 2,
    startTime: 3,
    endTime: 4,
    isAllDay: 5,
    status: "Pending",
    requestType: 7,
    description: 8 */
    return (
        <div style={{backgroundColor:"Yellow", fontSize: 15 }} onClick={() => alert(props.eventItem.description)}>
    User: {props.eventItem.userId} :: Batch: {props.eventItem.batchId} :: Start: {props.eventItem.startTime} :: End: {props.eventItem.endTime} :: AllDay: {props.eventItem.isAllDay} :: Type: {props.eventItem.requestType}
    </div>

    )
}
export default Event;
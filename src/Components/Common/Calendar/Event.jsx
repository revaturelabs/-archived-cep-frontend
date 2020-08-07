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
        <div style={{backgroundColor:"Yellow", fontSize: "15px"}} onClick={() => alert(props.eventItem.status)}>
    {props.eventItem.userId}
    </div>

    )
}
export default Event;
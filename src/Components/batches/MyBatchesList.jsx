import React from "react";

export default function MyBatchesList(props) {
  return (
    <div>
      <h4>{props.batch.name}</h4>
      <p>{props.batch.location}</p>
      <p>Start Date: {props.batch.startDate}</p>
      <p>End Date: {props.batch.endDate}</p>
      <p>{props.batch.skills}</p>
      <p>{props.batch.avgStats}</p>
      <button onClick={() => props.handleClick(props.batch)}>Learn More</button>
    </div>
  );
}
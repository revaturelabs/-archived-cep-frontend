import React from "react";

export default function MyBatchesList(props) {
  return (
    <div>
      <h4>{props.batch.name}</h4>
      <p>{props.batch.location}</p>
      <p>Start Date: {props.batch.startDate}</p>
      <p>End Date: {props.batch.endDate}</p>
      <p>Skill: {props.batch.skill}</p>
      <p>Current Week: {props.batch.currentWeek}</p>
      <button onClick={() => props.handleClick(props.batch)}>Learn More</button>
    </div>
  );
}
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function GetBatchDetails() {
  const [details, setDetails] = useState([]);

  function handleSubmit() {
    axios
      .get("http://localhost:8080/getBatchDetails", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log(details);
  return (
    <>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {details.map((detail) => (
        <div key={detail.id}>
          <br />
          <li>Batch ID: {detail.batchId}</li>
          <li>Batch Name: {detail.name}</li>
          <li>Batch Skill: {detail.skill}</li>
          <li>Batch Start Date: {detail.startDate}</li>
          <li>Batch End Date: {detail.endDate}</li>
          <li>Batch Location: {detail.location}</li>
          <li>Current Week: {detail.currentWeek}</li>
          <li>Progress: {(detail.currentWeek * 100) / 10}%</li>
          <br />
        </div>
      ))}
    </>
  );
}

import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";
import apiBasePath from "../../../apiBasePath";

export default function GetInterventions() {
  const [details, setDetails] = useState([]);

  function handleSubmit() {
    axios
      .get(process.env.REACT_APP_BASEPATH + "/interventions", {
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
        <div key={detail.batchId}>
          <br />
          <li>Batch ID: {detail.batchId}</li>
          <li>Name: {detail.userId}</li>
          <li>Start Time: {new Date(detail.startTime).toString()}</li>
          <li>End Time: {new Date(detail.endTime).toString()}</li>
          <li>isAllDay: {detail.isAllDay.toString()}</li>
          <li>Status: {detail.status}</li>
          <li>Request Type: {detail.requestType}</li>
          <li>Description: {detail.description}</li>
          <br />
        </div>
      ))}
    </>
  );
}
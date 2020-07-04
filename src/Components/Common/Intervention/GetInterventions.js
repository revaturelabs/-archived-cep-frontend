import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function GetInterventions() {
  const [details, setDetails] = useState([]);

  function handleSubmit() {
    axios
      .get("http://localhost:8080/interventions", {
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
          <li>User ID: {detail.userId}</li>
          <li>Start Time: {new Date(detail.startTime).toUTCString()}</li>
          <br />
        </div>
      ))}
    </>
  );
}
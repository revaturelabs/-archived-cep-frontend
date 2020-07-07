import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function GetBatchDetails() {
  const [details, setDetails] = useState([]);

    axios
      .get("http://localhost:8080/UB/all", {
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
  console.log(details);
  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
        Display
      </Button> */}

      {details.map((detail) => (
        <div key={detail.id}>
          <Button variant='outlined'>
          <table>
          
          <tr style={{fontSize:'13px'}}>Batch ID: {detail.batchId}</tr>
          {/* <tr style={{fontSize:'13px'}}>Batch Name: {detail.name}</tr> */}
          {/* <tr style={{fontSize:'13px'}}>Batch Skill: {detail.skill}</tr>
          <tr style={{fontSize:'13px'}}>Batch Start Date: {detail.startDate}</tr>
          <tr style={{fontSize:'13px'}}>Batch End Date: {detail.endDate}</tr>
          <tr style={{fontSize:'13px'}}>Batch Location: {detail.location}</tr>
          <tr style={{fontSize:'13px'}}>Current Week: {detail.currentWeek}</tr>
          <tr style={{fontSize:'13px'}}>Progress: {(detail.currentWeek * 100) / 10}%</tr> */}
          </table>
          </Button>
          <br />
        </div>
      ))}
    </>
  );
}
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function GetBatchDetails() {
  //const [details,setDetails]=useState([])

  function handleSubmit() {
    axios
      .get("http://34.82.182.44/mock/training/batch/current")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

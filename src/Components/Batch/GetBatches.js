import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function GetBatchDetails({ batches }) {
  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
        Display
      </Button> */}

      {batches.map((detail) => (
        <div key={detail.batchId}>
          <Button variant='outlined'>
          <table>
            <tbody>
              <tr style={{fontSize:'13px'}}><td>Batch ID: {detail.batchId}</td></tr>
            </tbody>
          </table>
          </Button>
          <br />
        </div>
      ))}
    </>
  );
}
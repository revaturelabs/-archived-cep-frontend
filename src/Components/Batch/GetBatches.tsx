import React, { Props } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { selectBatch } from "../../redux/actions/batchAction";

/* We create a type for our properties, and tell Typescript that the 
parameters of our functional component are of that type.*/
type props = {
  batches: object[]
}

export default function GetBatchDetails({batches}: props) {


  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {batches.map((detail: any) => {
        const handleClick = () => {
          dispatch(selectBatch(detail));
        }

        return (
          <div key={detail.batchId}>
            <Button variant='outlined' onClick={handleClick}>
            <table>
              <tbody>
                <tr style={{fontSize:'13px'}}><td>Batch ID: {detail.batchId}</td></tr>
              </tbody>
            </table>
            </Button>
            <br />
          </div>
        )
      })}
    </ React.Fragment>
  );
}

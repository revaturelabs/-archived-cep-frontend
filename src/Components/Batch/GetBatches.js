import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { selectBatch } from "../../redux/actions/batchAction";

export default function GetBatchDetails({ batches }) {
  const dispatch = useDispatch();

  return (
    <>
      {/* Renders a button for every batch */}
      {batches.map((detail) => {
        // When a button is clicked, set the batch to display on the associate page
        const handleClick = () => {
          dispatch(selectBatch(detail));
        }

        return(
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
    </>
  );
}

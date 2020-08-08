import React, { useState, useEffect, ReactElement } from "react";
import BatchComponent from "./BatchComponent";
import { selectBatch } from "../../redux/actions/batchAction";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { dispatchLink } from "../../redux/actions/redirectAction";

export default function MyBatches(): ReactElement {
  const [batches, setBatches] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.credReducer.token);
  const userObject = useSelector((state: any) => state.credReducer.userObject);
  let userId: number;

  // Checking if there was data mapped to this store property
  // Then checking for userId within the property
  if (userObject) {
    userId = userObject.userId;
  }

  //Get information about batches mapped to the client
  useEffect((): void => {
    Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/UB/batchesbyuser", {
      params: {
        userId: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        setBatches(result.data);
      })
      .catch((err) => console.log("error batches:", err));
  }, []);

  //On first render dispatch the current url
  useEffect((): void => {
    dispatch(dispatchLink("/my_batches"));
  }, []);

  function checkBatch(batch: object): void {
    // Send information about batch to store, so associates can be
    // displayed on a different page
    dispatch(selectBatch(batch));
  }

  function conditionRender(): ReactElement {
    if (batches.length == 0) {
      return <h2>You don't have any preferred batches :/</h2>
    } else {
      return (
        <div style={{ padding: "5em" }}>
          <Grid container direction="row" spacing={3}>
            {batches.map((batch: any) => {
              return (
                //added key to Grid to remove error - Michael Worrell
                <Grid item xs={3} key={batch.batchId + 1}> 
                  <BatchComponent
                    key={batch.batchId}
                    batch={batch}
                    handleClick={checkBatch}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
  }

  return conditionRender();
  
}

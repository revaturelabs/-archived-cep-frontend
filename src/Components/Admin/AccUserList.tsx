import React, { useState, useEffect, ReactElement } from "react";
import AccUserItem from "./AccUserItem";
import Axios from "axios";
import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import { useEventCallback } from "@material-ui/core";

//Show a list of requests
export default function AccUserList(): ReactElement {
  const token: String = useSelector((state: any) => state.credReducer.token);
  const [realData, setRealData] = useState([]);

  function changeRealData(data: any): void {
    setRealData(data);
  }

  //Make an axios call to display the list of requests
  useEffect((): void => {
    Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/pending/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        changeRealData(result.data);
      })
      .catch((err) => console.log("error: " + err));
  }, []);


  function conditionalRender(): ReactElement {
    if (realData.length == 0) {
      return <h2>No new account request at this time.</h2>
    }
    else {
      return (
        <div style={{ padding: "5em" }}>
          <Grid container direction="row" spacing={3}>
            {realData.map((data: any, index: number) => {
              return (
                <Grid item xs={3} key={index}>
                  <AccUserItem data={data} key={data.userId} />
                </Grid>
              );
            })}
          </Grid>
        </div>

      );
    }

  }

  return conditionalRender();

}
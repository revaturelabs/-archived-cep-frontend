import React, { useState, useEffect, ReactElement } from "react";
import ClientItem from "./clientInterItem";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";


//Show a list of requests
export default function ClientList(): ReactElement {
  const token: String = useSelector((state: any) => state.credReducer.token);
  const [realData, setRealData] = useState([]);
  const userId = useSelector((state: any) => state.credReducer.userId);

  function changeRealData(data: any): void {
    setRealData(data);
  }

  //Make an axios call to display the list of requests
  useEffect((): void => {
    axios
      .get(
        process.env.REACT_APP_ZUUL_ROUTE + "/requestInterventionById?userId=" + userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      //  .then(res=>res.json())
      .then((response) => {
        changeRealData(response.data);
      })
      .catch((err) => console.log());
  }, []);

  function conditionalRender(): ReactElement {
    if (realData.length == 0) {
      return <h2>You don't have any scheduled interventions at the moment.</h2>
    } else {
      return (

        <div style={{ padding: "5em" }}>
          <Grid container direction="row" spacing={3}>
            {realData.map((data: any, index: number) =>
              <Grid item xs={6} key={index} style={{ minHeight: "250px" }}>
                <ClientItem data={data} key={data.requestId} />
              </Grid>
            )}
          </Grid>
        </div>
      );
    }
  }
  //Render the list of requests
  //Change "realData" to "testData" if you want to mock test with the ideal/test look of the request
  return conditionalRender();
}

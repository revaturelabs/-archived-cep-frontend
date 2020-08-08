import React, { useState, useEffect, ReactElement } from "react";
import AdminItem from "./AdminItem";
import axios from "axios";
import { useSelector } from "react-redux";

//Show a list of requests
export default function AdminList():ReactElement {
  const token:String = useSelector((state: any) => state.credReducer.token);
  const [realData, setRealData] = useState([]);

  function changeRealData(data: any):void {
    setRealData(data);
  }

  //Make an axios call to display the list of requests
  useEffect(():void => {
    axios
      .get(
        process.env.REACT_APP_ZUUL_ROUTE + "/interventions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      //  .then(res=>res.json())
      .then((response) => {
        //Console.log used to check the fields to set up the adminItem for later
        console.log(response.data);
        changeRealData(response.data);
      })
      .catch((err) => console.log());
  }, []);

  function conditionalRender(): ReactElement {
    if (realData.length == 0) {
      return <h2>You don't have any scheduled interventions at the moment..</h2>
    } else {
      return (
        <div>
          {realData.map((data: any) => {
            return <AdminItem data={data} key={data.requestId} />;
          })}
        </div>
      );
    }
  }
  //Render the list of requests
  //Change "realData" to "testData" if you want to mock test with the ideal/test look of the request
  return conditionalRender();
}

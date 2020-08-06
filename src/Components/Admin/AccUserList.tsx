import React, { useState, useEffect, ReactElement } from "react";
import AccUserItem from "./AccUserItem";
import Axios from "axios";
import { useSelector } from "react-redux";

//Show a list of requests
export default function AccUserList():ReactElement {
  const token:String = useSelector((state: any) => state.credReducer.token);
  const [realData, setRealData] = useState([]);

  function changeRealData(data: any):void {
    setRealData(data);
  }

  //Make an axios call to display the list of requests
  useEffect(():void => {
      //switch hard coded data with get request
      /* let x =[
        {
            "userId": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "jd.client@EXXON.com",
            "company": "EXXON",
            "phone": "828-123-4567"
        },
        {
            "userId": 2,
            "firstName": "Jane",
            "lastName": "Jane",
            "email": "jj.client@tex.com",
            "company": "TEXACO",
            "phone": "123-456-7890"
        }
      ] */
      let x = [];
      Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/pending/all", { } )
        .then((result) => {
          x = result.data;
          changeRealData(x);
        })
        .catch((err) => console.log("error: " + err));
  }, []);

  //Render the list of accounts
  return (
    <div>
      {realData.map((data: any) => {
        return <AccUserItem data={data} key={data.userId}/>;
      })}
    </div>
  );
}
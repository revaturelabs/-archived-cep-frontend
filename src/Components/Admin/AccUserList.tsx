import React, { useState, useEffect, ReactElement } from "react";
import AccUserItem from "./AccUserItem";
import axios from "axios";
import { useSelector } from "react-redux";
import apiBasePath from "../../apiBasePath";

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
      let x =[
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
      ]
      changeRealData(x);
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
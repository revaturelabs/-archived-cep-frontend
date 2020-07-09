import React, { useState, useEffect } from "react";
import AdminItem from "./AdminItem";
import axios from "axios";
import { useSelector } from "react-redux";

//Show a list of requests
export default function AdminList() {

  //Get token from redux store. Probably want to store JWT in https cookies
  const token = useSelector((state) => state.credReducer.token);
  const [realData, setRealData] = useState([]);

  function changeRealData(data) {
    setRealData(data);
  }

  //Make an axios call on first render to get all the records of requests that will have all the request info
  useEffect(() => {
    axios
      .get(
        "http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/interventions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        //call a function to set the state with the array of objects we will recieve
        changeRealData(response.data);
      })
      .catch((err) => console.log());
  }, []);

  //Render the list of requests
  return (
    <div>
      {realData.map((data) => {
        return <AdminItem data={data} key={data.requestId} />;
      })}
    </div>
  );
}

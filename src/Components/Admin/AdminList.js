import React, { useState, useEffect } from "react";
import AdminItem from "./AdminItem";
import axios from "axios";
import { useSelector } from "react-redux";

//Show a list of requests
export default function AdminList() {
  const token = useSelector((state) => state.credReducer.token);
  const [realData, setRealData] = useState([]);

  function changeRealData(data) {
    setRealData(data);
  }

  //Make an axios call to display the list of requests
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
      //  .then(res=>res.json())
      .then((response) => {
        //Console.log used to check the fields to set up the adminItem for later
        console.log(response.data);
        changeRealData(response.data);
      })
      .catch((err) => console.log());
  }, []);

  //Render the list of requests
  //Change "realData" to "testData" if you want to mock test with the ideal/test look of the request
  return (
    <div>
      {realData.map((data) => {
        return <AdminItem data={data} key={data.requestId} />;
      })}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import MyBatchesList from "./MyBatchesList";
import { selectBatch } from "../../redux/actions/batchAction";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function MyBatches(props) {
  const [batches, setBatches] = useState([
    {
      id: 1,
      name: "Java/React",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 80,
    },
    {
      id: 2,
      name: ".NET",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 87,
    },
    {
      id: 3,
      name: "Full Stack Java",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 90,
    },
    {
      id: 4,
      name: "Java/Pega",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 94,
    },
    {
      id: 5,
      name: "AWS",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 89,
    },
    {
      id: 6,
      name: "CyberSecurity",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 85,
    },
    {
      name: "Network Systems Engineering",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 81,
    },
    {
      name: "Hadoop - Big Data",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skills: "Java and React",
      location: "Arlington, Texas",
      avgStats: 99,
    }]
  );

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)

  // Get information about batches mapped to the client
  //   useEffect(() => {
  //     Axios.get("http://13.58.157.19:8081/users/userByname/" + username, {
  //   headers: {
  //     Authorization: `Bearer ${props.token}`,
  //   },
  // })
  //   .then((result) => {
  //     setBatches(result);
  //     console.log("set Batches", batches);
  //   })
  //   .catch((err) => console.log("error batches:" + err));
  //   }, []);

  function checkBatch(batch) {
    // Send information about batch to store, so associates can be
    // displayed on a different page
    dispatch(selectBatch(batch))
    props.history.push("/associates");
  }


  return (
    <div>
      {batches.map((batch) => {
        return (
          <MyBatchesList
            key={batch.id}
            batch={batch}
            handleClick={checkBatch}
          />
        );
      })}
    </div>
  );
}


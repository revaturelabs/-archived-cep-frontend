import React, { useState, useEffect } from "react";
import MyBatchesList from "./MyBatchesList";
import { selectBatch } from "../../redux/actions/batchAction";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Grid } from "@material-ui/core";
import { dispatchLink } from "../../redux/actions/redirectAction";

export default function MyBatches(props) {
  const [batches, setBatches] = useState([]);
  const [batchess, setBatchess] = useState([
    {
      batchId: 1,
      name: "Java/React",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 80,
      progress: "",
      week: 0,
    },
    {
      batchId: 2,
      name: ".NET",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 87,
    },
    {
      batchId: 3,
      name: "Full Stack Java",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 90,
    },
    {
      batchId: 4,
      name: "Java/Pega",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 94,
    },
    {
      batchId: 5,
      name: "AWS",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 89,
    },
    {
      batchId: 6,
      name: "CyberSecurity",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 85,
    },
    {
      batchId: 7,
      name: "Network Systems Engineering",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 81,
    },
    {
      batchId: 8,
      name: "Hadoop - Big Data",
      startDate: "2019-12-03",
      endDate: "2020-03-15",
      skill: "Java and React",
      location: "Arlington, Texas",
      avgStats: 99,
    },
  ]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.credReducer.token);
  const userId = useSelector((state) => state.credReducer.userObject.userId);

  //Get information about batches mapped to the client
  useEffect(() => {
    Axios.get("http://localhost:8080/UB/batchesbyuser", {
      params: {
        userId: userId,
      },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
      .then((result) => {
        setBatches(result.data);
        console.log("Checking results", result);
        //console.log("set Batches", batches);
      })
      .catch((err) => console.log("error batches:" + err));
  }, []);
  //On first render dispatch the current url
  useEffect(() => {
    dispatch(dispatchLink("/my_batches"));
  }, []);

  function checkBatch(batch) {
    // Send information about batch to store, so associates can be
    // displayed on a different page
    dispatch(selectBatch(batch));
    //props.history.push("/associates");
  }

  return (
    <div style={{padding: "5em"}}>
      <Grid container direction="row" spacing={3}>
        {batches.map((batch) => {
          return (
            <Grid item xs={3}>
              <MyBatchesList
                key={batch.batchId}
                batch={batch}
                handleClick={checkBatch}
              />
            </Grid>
          );
        })}
        {/* </Grid>
        <Grid item xs>
         <MyBatchesList
            key={batches[1].id}
            batch={batches[1]}
            handleClick={checkBatch}
      />*/}
      </Grid>
    </div>
  );
}

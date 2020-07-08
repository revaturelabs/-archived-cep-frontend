import React, { useState, useEffect } from "react";
import MySpiderGraph from "./MySpiderGraph";
import { Container } from "@material-ui/core";
import axios from "axios";
// import { createLogger } from "redux-logger";
// import { red } from "@material-ui/core/colors";

function averageDuplicates(res) {
  let aveRes = [];
  let resInput = {};
  let counters = {};
  for (let i = 0; i < res.length; i++) {
    if (aveRes.length === 0) {
      aveRes.push(res[i]);
    } else {
      resInput = res[i];
      for (let j = 0; j < aveRes.length; j++) {
        if (res[i].assessmentType === aveRes[j].assessmentType) {
          resInput.traineeId = res[i].traineeId;
          resInput.assessmentType = res[i].assessmentType;
          resInput.score = res[i].score + aveRes[j].score;
          resInput.week = res[i].week;
          resInput.weight = res[i].weight;
          if (counters.hasOwnProperty(res[i].assessmentType)) {
            counters[res[i].assessmentType] += 1;
          } else {
            counters[res[i].assessmentType] = 2;
          }
          aveRes.splice(j, 1);
          break;
        }
      }
      if (resInput.length !== 0) {
        aveRes.push(resInput);
      }
    }
  }
  for (let i = 0; i < aveRes.length; i++) {
    if (counters.hasOwnProperty(aveRes[i].assessmentType)) {
      aveRes[i].score = aveRes[i].score / counters[aveRes[i].assessmentType];
    }
  }
  console.log(aveRes)
  return aveRes;
}

export default function MySpiderGraphPage() {

  const [scores, setScores] = useState([]);

  useEffect(async () => {
    const batchId = "TR-1000";
    const associateEmail =
      "mock0.associate26bd69f4-0e52-4fac-a4e9-c5c69ee0691f@mock.com";

    const headers = {
      "Content-Type": "application/json",
    };

    // const requestUrl = `http://34.82.182.44:80/mock/evaluation/grades/reports/${batchId}/spider/${associateEmail}`
    const requestUrl = `http://localhost:8080/graph/associate/${batchId}/${associateEmail}`;
    console.log(requestUrl);

    // let temp = [];

    await axios({
      method: "get",
      headers: headers,
      url: requestUrl,
    }).then((res) => {
      console.log("inside axios");
      console.log(res.data);

      setScores(res.data);
      // setScores([{'hello':"world"}, {'hello':"goodbye"}, {'hello':"hi"}, {'hello':"telephone"}, {'hello':"africa"}, {'hello':"there"}])
    });
  }, []);


  if (scores.length !== 0) {
    return (
      <>
        <Container maxWidth="sm">
          <MySpiderGraph scores={averageDuplicates(scores)} />
        </Container>
      </>
    );
  } else {
    return <>Data still loading... </>;
  }
}

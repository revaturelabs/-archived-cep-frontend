import React, { useState, useEffect } from "react";
import MySpiderGraph from "./MySpiderGraph";
import { Container } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
// import { createLogger } from "redux-logger";
// import { red } from "@material-ui/core/colors";

function averageDuplicates(res: any): any {

  interface aveResINF{
  assessmentType: string,
  score:number
}
  interface resInputINF{
    assessmentType: string,
    traineeId: number,
    score: number,
    week: number,
    weight: number,
    length: number
  }
  let aveRes: aveResINF[] = [];
 
  let resInput:  resInputINF, {} = {};

  let counters: object = {};
  
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
  return aveRes;
}

export default function MySpiderGraphPage({ batchId, associateEmail }) {
  const token = useSelector((state: any) => state.credReducer.token);

  const [scores, setScores] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // const requestUrl = `http://34.82.182.44:80/mock/evaluation/grades/reports/${batchId}/spider/${associateEmail}`
    const requestUrl = `${process.env.REACT_APP_ZUUL_ROUTE}/graph/associate/${batchId}/${associateEmail}`;

    // let temp = [];

    axios({
      method: "get",
      headers: headers,
      url: requestUrl,
    }).then((res) => {
      setScores(res.data);
      // setScores([{'hello':"world"}, {'hello':"goodbye"}, {'hello':"hi"}, {'hello':"telephone"}, {'hello':"africa"}, {'hello':"there"}])
    });
  }, [associateEmail, batchId]);


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

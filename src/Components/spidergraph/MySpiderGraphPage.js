import React, { useState, useEffect } from "react";
import MySpiderGraph from "./MySpiderGraph";
import { Container } from '@material-ui/core';
import axios from 'axios';
import { createLogger } from "redux-logger";
import { red } from "@material-ui/core/colors";



function handleFetch(){
  const batchId = 'TR-1000'
  const associateEmail = 'mock0.associate26bd69f4-0e52-4fac-a4e9-c5c69ee0691f@mock.com'

  const headers = {
    'Content-Type': 'application/json'
  }

  const requestUrl = `http://34.82.182.44:80/mock/evaluation/grades/reports/${batchId}/spider/${associateEmail}`
  console.log(requestUrl)

  axios({
    method: 'get',
    headers: headers,
    url: requestUrl,
  }).then(
    (res)=>{
      console.log(res.data)
    }
  );

}

function getJson(){
  const resJSON = [
    {
        "traineeId": "restOfBatch",
        "assessmentType": "JDBC",
        "score": 56.12070297449827,
        "week": 1,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Java",
        "score": 64.62596573549159,
        "week": 1,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Quarkus",
        "score": 42.333074261160455,
        "week": 1,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "React",
        "score": 61.98691289565142,
        "week": 2,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Hadoop",
        "score": 42.07892791576245,
        "week": 2,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Spark",
        "score": 46.42564547763151,
        "week": 2,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Kubernetes",
        "score": 49.92724696327658,
        "week": 2,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Quarkus",
        "score": 69.48938055599437,
        "week": 3,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "HTML",
        "score": 50.197860815945795,
        "week": 3,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "gRPC",
        "score": 49.02496797898237,
        "week": 3,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "JavaScript",
        "score": 54.01754355430603,
        "week": 4,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "DevOps",
        "score": 54.229498358333814,
        "week": 4,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Java",
        "score": 37.97615513380836,
        "week": 4,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Spring Boot",
        "score": 50.93763643152573,
        "week": 5,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Hadoop",
        "score": 36.74170006022734,
        "week": 5,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Quarkus",
        "score": 35.82590737062342,
        "week": 5,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Pega",
        "score": 60.60656084733851,
        "week": 6,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "CSS",
        "score": 42.12062316081103,
        "week": 6,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Quarkus",
        "score": 42.72780028818285,
        "week": 6,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "SOAP",
        "score": 53.04618762521183,
        "week": 6,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Unix",
        "score": 60.61463179307825,
        "week": 7,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "Kubernetes",
        "score": 41.19755050715278,
        "week": 7,
        "weight": 100.0
    },
    {
        "traineeId": "restOfBatch",
        "assessmentType": "J2EE",
        "score": 42.50480545268339,
        "week": 7,
        "weight": 100.0
    }
]
return resJSON
}

function averageDuplicates(res){  
  let aveRes = []
  let resInput = {}
  for (let i = 0; i < res.length; i++) {
    if(aveRes.length === 0){
      aveRes.push(res[i]) 
    }else{
      resInput = res[i]  
      for (let j = 0; j < aveRes.length; j++) {
        if(res[i].assessmentType === aveRes[j].assessmentType){
          resInput.traineeId = res[i].traineeId
          resInput.assessmentType = res[i].assessmentType
          resInput.score = (res[i].score + aveRes[j].score) / 2;
          resInput.week = res[i].week
          resInput.weight = res[i].weight
          aveRes.splice(j, 1);
          break;
        }
      }
      aveRes.push(resInput)    
    }
  }

  // for(let i =0;i<aveRes.length;i++){
  //   console.log(aveRes[i]);
  // }
  return aveRes
}

export default function MySpiderGraphPage() {
  const[scores, setScores] = useState( averageDuplicates(getJson()) );
  // handleFetch()
  console.log(scores)
  return (
    <>
      <Container maxWidth="sm">
        <MySpiderGraph scores = {scores}/>
      </Container>
    </>
  );
}

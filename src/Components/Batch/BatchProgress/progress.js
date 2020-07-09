import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from 'react-redux';
import {
    makeStyles,
    Card,
    CardContent,
    CardHeader,
  } from "@material-ui/core";

  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    left: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    right: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rightButton: {
      marginTop: "5px",
      marginBottom: "5px",
    },
    spacing: {
      marginTop: "15px",
      marginBottom: "15px",
      marginLeft:"20px",
    },
    progressPosition:{
      height:"50px",
      width:"100px",
        
    },
    divPosition:{
 
      
    }
  }));

export default function Progress() {
  let batch = useSelector(state => state.batchReducer.currentWeek);
  
  const styles = useStyles();

  let [percentage, setPercentage] = useState(Math.floor((batch/12)*100));

  return (

    <Card className={styles.divPosition}>
      <CardHeader style={{ backgroundColor: "#474C55", color: "#FFF" }} title="Overall Batch Progress" />
      <CardContent>
        <CircularProgressbar className={styles.progressPosition} value={percentage} text={`${percentage}%`} />
        <h3>The Batch still has {`${100-percentage}% `} of Training Left.  </h3>
      </CardContent>
     
    </Card>
  );
}

import React, { useState, useEffect, ReactElement, SyntheticEvent } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Button,
  StyleRules,
} from "@material-ui/core";
import Axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment';

//used solely for styling
const useStyles: Function = makeStyles((): StyleRules => ({
  spacing: {
    marginTop: "15px",
    marginBottom: "15px",
    height: "100%"
  },
  button: {
    margin: "0 5px"
  }
}));

//Display individual requests
export default function AdminItem(props: any): ReactElement {

  interface styleINF {
    spacing: string,
    button: string
  }

  const token: String = useSelector((state: any) => state.credReducer.token);
  const styles: styleINF = useStyles();

  //Userstate
  const [userData, setUserData] = useState({
    company: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  });

  //Status=Pending color is Orange, Status=Completed color is Blue
  //Initial color is Orange
  const [statusColor, setStatusColor] = useState("#F26925");
  const [status, setStatus] = useState(props.data.status);

  //States used for conditional rendering
  const [buttonCompleteVisi, setButtonCompleteVisi] = useState(true);
  const [buttonDeleteVisi] = useState(true);
  const [cardVisi, setCardVisi] = useState(true);

  //Simply return the button component for conditional rendering
  const ButtonComplete: React.FC = (): ReactElement => {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={handleToComplete}
        className={styles.button}
      >
        Mark as complete
      </Button>
    );
  };
  const ButtonDelete: React.FC = (): ReactElement => {
    return (
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleDelete}
        className={styles.button}
      >
        Cancel/Delete
      </Button>
    );
  };

  const CardInfo: React.FC = (): ReactElement => {
    return (
      <Card className={styles.spacing}>
        <CardHeader style={{ backgroundColor: statusColor }} title={userData.company}></CardHeader>
        <CardContent>
          <p>Made By: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>For: {props.data.requestType}</p>
          <p>{(props.data.batchId) ? "Batch: " + props.data.batchId : "No Batch Specified"}</p>
          <p>Description: {props.data.description}</p>
          
          <p>Date: {moment(props.data.startTime).format("MM/DD/YYYY hh:mm a")}</p>

          {buttonCompleteVisi ? <ButtonComplete /> : null}
          {buttonDeleteVisi ? <ButtonDelete /> : null}

        </CardContent>
      </Card>
    );
  };

  // function changeUserData(data:Object):void {
  function changeUserData(data: any): void {
    setUserData(data);
  }
  //On first render check if the status is complete and render the correct color and buttons
  useEffect((): void => {
    if (status === "Done") {
      setStatusColor("#72A4C2");
      setButtonCompleteVisi(false);
    }
    const axios = require("axios");
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_ZUUL_ROUTE}/users/user/?id=${props.data.userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response: any) {
        changeUserData(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  //handle complete button to change to the color, status,
  //and call a function to persist the complete status of the request
  // const handleToComplete:Function = (event:Event):void => {
  function handleToComplete(event: SyntheticEvent): void {
    setStatus("Done");
    setStatusColor("#72A4C2");
    setButtonCompleteVisi(false);
    updateToComplete();
  };

  //Persists Complete of request to database
  const updateToComplete: Function = (): void => {
    //Get JWT

    //axios call
    Axios({
      method: "put",
      url: `${process.env.REACT_APP_ZUUL_ROUTE}/users/admin/request/update/${props.data.requestId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        status: "Done",
      },
    })
      .then((response) => console.log("Success"))
      .catch((err) => console.log("Failure"));
  };

  //Handle onClick delete
  // const handleDelete:Function = (event:Event):void => {
  function handleDelete(event: SyntheticEvent): void {
    Axios.delete(
      `${process.env.REACT_APP_ZUUL_ROUTE}/users/admin/request/delete/${props.data.requestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        /*After delete we reload the webpage so it can show "real time" that the request has been deleted
            May want to just hide the card to not lose potential filtering and sorting options later on*/
        //window.location.reload();
        setCardVisi(false);
      })
      .catch((err) => console.log("Failure"));
  };

  //These props need to change to match the data that is given
  //Change "requestType" to "technology" and "endTime" to "date" if you want to mock test with the ideal/test look of the request
  return <React.Fragment>{cardVisi ? <CardInfo /> : null}</React.Fragment>;
}

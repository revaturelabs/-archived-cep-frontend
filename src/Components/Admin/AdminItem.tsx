import React, { useState, useEffect, ReactElement } from "react";
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
import apiBasePath from "../../apiBasePath";

//used solely for styling
const useStyles:Function = makeStyles(():StyleRules => ({
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
  middle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButton: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  spacing: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

console.log(typeof(useStyles));

//Display individual requests
export default function AdminItem(props: any):ReactElement {
  const token:String = useSelector((state: any) => state.credReducer.token);
  console.log(typeof(token));
  const styles:any = useStyles();
  console.log(typeof(styles));

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
  const ButtonComplete:React.FC = ():ReactElement => {
    return (
      <Button
        className={styles.rightButton}
        variant="outlined"
        color="primary"
        onClick={handleToComplete}
      >
        Completed
      </Button>
    );
  };
  const ButtonDelete:React.FC = ():ReactElement => {
    return (
      <Button
        className={styles.rightButton}
        variant="outlined"
        color="secondary"
        onClick={handleDelete}
      >
        Delete
      </Button>
    );
  };

  const CardInfo:React.FC = ():ReactElement => {
    return (
      <Card className={styles.spacing}>
        <CardHeader style={{ backgroundColor: statusColor }}></CardHeader>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3} className={styles.left}>
              <Typography variant="overline">{userData.company}</Typography>
              <Typography variant="h4">
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="h6">{userData.email}</Typography>
              <Typography variant="h6">{userData.phone}</Typography>
              <Typography variant="h6">{props.data.requestType}</Typography>
            </Grid>
            <Grid item xs={6} className={styles.middle}>
              <Typography variant="h4">{props.data.batchId}</Typography>
              <Typography variant="body2">{props.data.description}</Typography>
            </Grid>
            <Grid item xs={3} className={styles.right}>
              <Typography variant="body2">{props.data.startTime}</Typography>
              {buttonDeleteVisi ? <ButtonDelete /> : null}
              {buttonCompleteVisi ? <ButtonComplete /> : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // function changeUserData(data:Object):void {
  function changeUserData(data:any):void {
    setUserData(data);
  }
  //On first render check if the status is complete and render the correct color and buttons
  useEffect(():any => {
    console.log(typeof(status));
    if (status === "Done") {
      setStatusColor("#72A4C2");
      setButtonCompleteVisi(false);
    }
    const axios = require("axios");
    const config = {
      method: "get",
      url: `${apiBasePath}/users/user/?id=${props.data.userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response: any) {
        console.log(JSON.stringify(response.data));
        changeUserData(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });

    // Axios.get(`http://localhost:8080/users/user/?id=${props.data.userId}`)
    // .then((response)=>{
    //     console.log(response.data);
    //     changeUserData(response.data);
    // })
    // .catch((err) => console.log());
  }, []);

  //handle complete button to change to the color, status,
  //and call a function to persist the complete status of the request
  // const handleToComplete:Function = (event:Event):void => {
  const handleToComplete = ():void => {
    setStatus("Done");
    setStatusColor("#72A4C2");
    setButtonCompleteVisi(false);
    updateToComplete();
  };

  console.log(typeof(handleToComplete));

  //Persists Complete of request to database
  const updateToComplete = ():void => {
    //Get JWT

    //axios call
    Axios({
      method: "put",
      url: `${apiBasePath}/users/admin/request/update/${props.data.requestId}`,
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
  const handleDelete = ():void => {
    Axios.delete(
      `${apiBasePath}/users/admin/request/delete/${props.data.requestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        /*After delete we reload the webpage so it can show "real time" that the request has been deleted
            May want to just hide the card to not lose potential filtering and sorting options later on*/
        //window.location.reload();
        setCardVisi(false);
      })
      .catch((err) => console.log("Failure"));
  };

  console.log(typeof(handleDelete));

  //These props need to change to match the data that is given
  //Change "requestType" to "technology" and "endTime" to "date" if you want to mock test with the ideal/test look of the request
  return <div>{cardVisi ? <CardInfo /> : null}</div>;
}

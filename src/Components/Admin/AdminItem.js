import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import { useSelector } from "react-redux";

//used solely for styling
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

//Display individual requests
export default function AdminItem(props) {
  const token = useSelector((state) => state.credReducer.token);
  const styles = useStyles();

  //state to hold user object
  const [userData, setUserData] = useState({});

  //Status=Pending color is Orange, Status=Completed color is Blue
  //Initial color is Orange
  const [statusColor, setStatusColor] = useState("#F26925");
  const [status, setStatus] = useState(props.data.status);

  //States used for conditional rendering
  const [buttonCompleteVisi, setButtonCompleteVisi] = useState(true);
  const [buttonDeleteVisi] = useState(true);
  const [cardVisi, setCardVisi] = useState(true);

  //Simply return the button component for conditional rendering
  const ButtonComplete = () => {
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
  const ButtonDelete = () => {
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

  //Card that will display the user info and request info
  const CardInfo = () => {
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

  function changeUserData(data) {
    setUserData(data);
  }

  //On first render check if the status is complete and render the correct color and buttons
  //Make a axios call to get the user data that is mapped to a particular request by finding it by userId
  useEffect(() => {
    if (status === "Done") {
      setStatusColor("#72A4C2");
      setButtonCompleteVisi(false);
    }
    var axios = require("axios");

    var config = {
      method: "get",
      url: `http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/users/user/?id=${props.data.userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        changeUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    //This does the same thing as the code from lines 135-151, but that code was simply imported from postman
    // Axios.get(`http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/users/user/?id=${props.data.userId}`)
    // .then((response)=>{
    //     changeUserData(response.data);
    // })
    // .catch((err) => console.log());
  }, []);

  /* handle complete button to change to the color, status,
  and call a function to persist the complete status of the request */
  const handleToComplete = () => {
    setStatus("Done");
    setStatusColor("#72A4C2");
    setButtonCompleteVisi(false);
    updateToComplete();
  };

  //Persists Complete of request to database
  const updateToComplete = () => {
    //axios call
    Axios({
      method: "put",
      url: `http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/users/admin/request/update/${props.data.requestId}`,
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
  /*TODO: Do not delete the actual records. This was super early on to clean up before "Status" existed in the request table. 
  Now just update the status to "Archive" and have the back-end get all records that do not have the "Archieve" status */
  const handleDelete = () => {
    Axios.delete(
      `http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/users/admin/request/delete/${props.data.requestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        //Simply conditionally hide the card to simulate archive
        setCardVisi(false);
      })
      .catch((err) => console.log("Failure"));
  };

  return <div>{cardVisi ? <CardInfo /> : null}</div>;
}

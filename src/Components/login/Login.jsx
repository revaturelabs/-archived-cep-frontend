import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchToken,
  dispatchUserObject,
  dispatchLoggedIn,
} from "../../redux/actions/userAction";
import JWTD from "jwt-decode";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField } from "@material-ui/core";
import { getRoles } from "@testing-library/react";
import apiBasePath from "../../apiBasePath";

//Used for styling Material UI
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//Used render the login component
export default function Login(props) {
  const styles = useStyles();
  const isLoggedIn = useSelector((state) => state.credReducer.isLoggedIn);
  const dispatch = useDispatch();

  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //Change the state of email and password
  function handleChange(event) {
    setCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function getUser(token) {
    // Getting user object from Caliber by decoding jwt
    const email = JWTD(token).sub;
    Axios.get(apiBasePath + "/users/email/", {
      params: {
        email: email,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        dispatch(dispatchUserObject(result.data));
      })
      .catch((err) => console.log("error username:" + err));
  }

  function handleSubmit(event) {
    //Requesting for the token to authenticate user
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiBasePath + "/authenticate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        dispatch(dispatchToken(result.token));
        getUser(result.token);
        dispatch(dispatchLoggedIn());
      })
      .catch((error) => console.log("error", error));
  }

  function conditionalRender() {
    //Conditionally render login or welcome page based on whether 
    // user is logged in. Get "isLoggedIn" from redux store
    if (isLoggedIn) {
      return (
        <div
          className={styles.paper}
          style={{ textAlignVertical: "center", textAlign: "center" }}
        >
          <h1>Welcome To Revature's Client Engagement Portal</h1>
          <h2>Please select from the options on the left</h2>
        </div>
      );
    } else {
      return (
        <div className={styles.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={userCredentials.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={userCredentials.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              style={{ backgroundColor: "#F26925" }}
            >
              Log In
            </Button>
          </form>
        </div>
      );
    }
  }

  return <div>{conditionalRender()}</div>;
}

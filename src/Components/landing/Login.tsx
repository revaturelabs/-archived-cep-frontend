import React, { useState, ReactElement, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchRole,
  dispatchUserID,
  dispatchToken,
  dispatchUserObject,
  dispatchLoggedIn,
  dispatchIsReset,
} from "../../redux/actions/userAction";
import JWTD from "jwt-decode";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";
import { getRoles } from "@testing-library/react";
import { AnyAction } from "redux";
import ResetPage from "./ResetPassword";
import Calendar from "../Common/Calendar/Calendar";
import conditionalRole from "./../../redux/actions/roleTypes";

//Used for styling Material UI
const useStyles: Function = makeStyles((theme): StyleRules => ({
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
  input: {
    width: "100%",
    padding: "15px 15px",
    marginBottom: "15px",
    fontSize: "18px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface styleINF {
  paper: string,
  form: string,
  input: string,
  submit: string
}
//Used render the login component
export default function Login(props: any): ReactElement {

  const styles: styleINF = useStyles();
  const isLoggedIn: boolean = useSelector((state: any) => state.credReducer.isLoggedIn);
  const isReset: boolean = useSelector((state: any) => state.credReducer.isReset);
  const dispatch: any = useDispatch();
  const role: String = useSelector((state: any) => state.credReducer.role);

  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
    message: ""
  });

  //Change the state of email and password
  function handleChange(event: any): void {

    setCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function getUser(token: any): void {
    // Getting user object from Caliber by decoding jw
    const { sub } = JWTD(token);
    //const sub: any = JWTD(token).sub;
    const email: string = sub;

    Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/users/email/", {
      params: {
        email: email.toLowerCase(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        dispatch(dispatchUserObject(result.data));
        dispatch(dispatchRole(result.data.role));
        dispatch(dispatchUserID(result.data.userId));
        dispatch(dispatchIsReset(result.data.resetPassword));
      })
      .catch((err) => console.log("error username:" + err));
  }

  function handleSubmit(event: SyntheticEvent): void {
    //Requesting for the token to authenticate user
    event.preventDefault();
    const myHeaders: any = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", `${window.location.protocol}//${window.location.host}`)


    const raw: string = JSON.stringify({
      email: userCredentials.email.toLowerCase(),
      password: userCredentials.password,
    });

    const requestOptions: Object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setCredentials({
      ...userCredentials,
      message: "Logging in..."
    })

    fetch(process.env.REACT_APP_ZUUL_ROUTE + "/authenticate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(dispatchToken(result.token));
        getUser(result.token);
        dispatch(dispatchLoggedIn());
      })
      .catch((error) => {
        console.log("error", error);
          setCredentials({
            ...userCredentials,
            message: "Invalid login information"
          })
      });
  }

  function conditionalRender(): ReactElement {
    //Conditionally render login or welcome page based on whether 
    // user is logged in. Get "isLoggedIn" from redux store
    if (isReset) {
      return (
        <ResetPage oldPassword={userCredentials.password} />
      )
    } else if (isLoggedIn && role == conditionalRole.ROLE_CLIENT) {
      return (
        <div
          className={styles.paper}
          style={{ textAlign: "center" }}
        >
          <h1>Welcome To Revature's Client Engagement Portal</h1>
          <h2>Please select from the options on the left</h2>
        </div>
      );
    } else if (isLoggedIn && role == conditionalRole.ROLE_ADMIN) {
      return (<React.Fragment>
        <Calendar></Calendar>
      </React.Fragment>
      );
    } else {
      return (
        <div className={styles.paper}>
          <h1>Client Engagement Portal</h1>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              required
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className={styles.input}
              value={userCredentials.email}
            />
            <input
              required
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              className={styles.input}
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
          <h3>{userCredentials.message}</h3>
        </div>
      );
    }
  }

  return <div>{conditionalRender()}</div>;
}

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

//Used render the login component
export default function Login(props: any): ReactElement {

  interface styleINF {
    paper: string,
    form: string,
    input: string,
    submit: string
  }

  const styles: styleINF = useStyles();

  const isLoggedIn: boolean = useSelector((state: any) => state.credReducer.isLoggedIn);
  const isReset: boolean = useSelector((state: any) => state.credReducer.isReset);
  const dispatch: any = useDispatch();

  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
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
    const {sub} = JWTD(token);
    //const sub: any = JWTD(token).sub;
    const email: string = sub;
    
    Axios.get(process.env.REACT_APP_ZUUL_ROUTE + "/users/email/", {
      params: {
        email: email,
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
        console.log(isReset);
        console.log(result.data.resetPassword);
      })
      .catch((err) => console.log("error username:" + err));
  }

  function handleSubmit(event: SyntheticEvent): void {
    //Requesting for the token to authenticate user
    event.preventDefault();
    const myHeaders: any = new Headers();

    myHeaders.append("Content-Type", "application/json");


    const raw: string = JSON.stringify({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    const requestOptions: Object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_ZUUL_ROUTE + "/authenticate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(dispatchToken(result.token));
        getUser(result.token);
        dispatch(dispatchLoggedIn());
      })
      .catch((error) => console.log("error", error));
  }

  function conditionalRender(): ReactElement {
    //Conditionally render login or welcome page based on whether 
    // user is logged in. Get "isLoggedIn" from redux store
    if (isReset) {
      console.log("In IsReset Rendering Function");
      console.log(isReset);
      return (
        <ResetPage oldPassword={userCredentials.password} />
      )
    } else if (isLoggedIn) {
      return (
        <div
          className={styles.paper}
          style={{ /* textAlignVertical: "center", */ textAlign: "center" }}
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
        </div>
      );
    }
  }

  return <div>{conditionalRender()}</div>;
}

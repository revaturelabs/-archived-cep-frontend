import React, { useState, ReactElement, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchToken,
  dispatchUserObject,
  dispatchLoggedIn,
} from "../../redux/actions/userAction";
import JWTD from "jwt-decode";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";
import { getRoles } from "@testing-library/react";
import { AnyAction } from "redux";

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
    backgroundColor: "#F26925"
  },
}));

export default function Register(props: any): ReactElement {

  interface styleINF {
    paper: string,
    form: string,
    submit: string,
    input: string
  }
  const styles: styleINF = useStyles();
  const [userInformation, setInformation] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    message: ""
  });

  function handleChange(event: any): void {
    setInformation({
      ...userInformation,
      [event.target.name]: event.target.value,
    });
  }


  async function handleSubmit(event: SyntheticEvent) {
    //Requesting for the token to authenticate user
    event.preventDefault();
    console.log(userInformation.firstName)
    console.log(userInformation.lastName)
    console.log(userInformation.company)
    console.log(userInformation.phone)
    console.log(userInformation.email)

    if (!userInformation.firstName || !userInformation.lastName || !userInformation.company || !userInformation.phone || !userInformation.email) {
      setInformation({
        ...userInformation,
        message: "Please fill in all information",
      });
      return;
    }
    else {
      setInformation({
        ...userInformation,
        message: "",
      });
    }

    const myHeaders: any = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw: string = JSON.stringify({
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      email: userInformation.email,
      password: "password",
      role: "ADMIN",
      company: userInformation.company,
      phone: userInformation.phone
    });

    const requestOptions: Object = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    /**Connect backend in here 
    const test= await fetch(apiBasePath + "/users/add", requestOptions);
    console.log(await test.status);
    */

    Axios.post(process.env.REACT_APP_ZUUL_ROUTE + "/pending/add", {
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      email: userInformation.email.toLowerCase(),
      company: userInformation.company,
      phone: userInformation.phone
    },
    )
      .then((result) => {
        alert(result.data);
      })
      .catch((err) => console.log("error: " + err));

  }
  function registerRender(): ReactElement {
    return (
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Apply for a new account here!
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            required            
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className={styles.input}
            onChange={handleChange}
            value={userInformation.firstName}
          />
          <input
            required
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className={styles.input}
            value={userInformation.lastName}
          />
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className={styles.input}
            value={userInformation.email}
          />
          <input
            required
            id="company"
            name="company"
            placeholder="Company"
            onChange={handleChange}
            className={styles.input}
            value={userInformation.company}
          />

          <input
            required
            id="phone"
            name="phone"
            type="tel"
            placeholder="555-555-5555"
            pattern="[0-9]{10}"
            onChange={handleChange}
            className={styles.input}
            value={userInformation.phone}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Create New User
            </Button>
        </form>
        <p>{userInformation.message}</p>
      </div>
    );
  }

  return <div>{registerRender()}</div>;
}
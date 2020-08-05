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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props: any): ReactElement {

  interface styleINF {
    paper: string,
    form: string,
    submit: string
  }
  const styles: styleINF = useStyles();
const [userInformation, setInformation] = useState({
    email: "",
    firstName:"",
    lastName:"",
    company:"",
    phone:"",
    message:""
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

    if(!userInformation.firstName || !userInformation.lastName || !userInformation.company || !userInformation.phone || !userInformation.email ) {
      setInformation({
        ...userInformation,
          message: "Please fill in all information",
      });
      return;
    }
    else{
      setInformation({
        ...userInformation,
          message: "",
      });
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(userInformation.email).toLowerCase())){
      setInformation({
        ...userInformation,
          message: "This is invalide email format",
      });
      return;
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
  }
function registerRender(): ReactElement {
      return (
        <div className={styles.paper}>
          <Typography component="h1" variant="h5">
            Create New User
          </Typography>
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={handleChange}
              value={userInformation.firstName}
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              onChange={handleChange}
              value={userInformation.lastName}
            />
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
              value={userInformation.email}
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="company"
              label="Company"
              id="company"
              autoComplete="company"
              onChange={handleChange}
              value={userInformation.company}
            />

          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              autoComplete="phone"
              onChange={handleChange}
              value={userInformation.phone}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              style={{ backgroundColor: "#F26925" }}
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
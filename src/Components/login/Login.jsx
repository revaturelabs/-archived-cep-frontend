import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchToken,
  dispatchUserObject,
  dispatchLoggedIn,
} from "../../redux/actions/userAction";
//import JWTD from "jwt-decode";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField } from "@material-ui/core";

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

  const [userCredentials, setCredentials] = useState({
    userId: 1,
    // email: "stubEmail_1@gmail.com",
    // password: "pass1word",
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

  const dispatch = useDispatch();

  // function getRole(token) {
  //   //Getting the role of the user to conditionally re-route to either
  //   // admin page or my_batches page
  //   const username = JWTD(token).sub;
  //   Axios.get("http://13.58.157.19:8081/role/" + username, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((result) => {
  //       setRole(result.data);
  //     })
  //     .catch((err) => console.log("error username:" + err));
  // }

  function handleSubmit(event) {
    event.preventDefault();

    // Authorize the user
    // fetch("http://13.58.157.19:8081/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: userCredentials.username,
    //     password: userCredentials.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(dispatchToken(res.jwt)); //send jwt to store
    //     getRole(res.jwt);
    //     //If statement to redirect based on user and admin
    //     if (role !== "admin"){
    //         props.history.push("/my_batches");
    //     }
    //     props.history.push("/admin");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    Axios.get("http://localhost:8080/users/email/", {
      params: {
        email: userCredentials.email,
      },
    })
      .then((result) => {
        dispatch(dispatchUserObject(result.data));
        console.log("Checking results", result);
        dispatch(dispatchLoggedIn());
      })
      .catch((err) => console.log("error user:" + err));
  }

  //Form using MaterialUI
  // function OriginalForm(){
  //   return(
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         <br />
  //           <label htmlFor="username">Email:
  //           <input
  //             type="text"
  //             placeholder="Enter email"
  //             name="email"
  //             required
  //             onChange={handleChange}
  //             value={userCredentials.email}
  //           />
  //           </label>

  //           <label htmlFor="password">Password:
  //           <input
  //             type="password"
  //             placeholder="Enter password"
  //             name="password"
  //             required
  //             onChange={handleChange}
  //             value={userCredentials.password}
  //           />
  //           </label>
  //         <button type="submit">
  //           Log In
  //         </button>
  //       </form>
  //     </div>
  //   )
  // }

  function conditionalRender() {
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
              style={{backgroundColor: "#F26925"}}
            >
              Log In
            </Button>
          </form>
        </div>
      );
    }
  }

  //if you want to switch between the original and the material UI version then just copy and paste the code above into the return statement below
  return (
    // <div className={styles.paper}>
    //   <Typography component="h1" variant="h5">
    //     Log In
    //   </Typography>
    //   <form className={styles.form} noValidate onSubmit={handleSubmit}>
    //     <TextField
    //       variant="outlined"
    //       margin="normal"
    //       required
    //       fullWidth
    //       id="email"
    //       label="Email Address"
    //       name="email"
    //       autoComplete="email"
    //       autoFocus
    //       onChange={handleChange}
    //       value={userCredentials.email}
    //     />
    //     <TextField
    //       variant="outlined"
    //       margin="normal"
    //       required
    //       fullWidth
    //       name="password"
    //       label="Password"
    //       type="password"
    //       id="password"
    //       autoComplete="current-password"
    //       onChange={handleChange}
    //       value={userCredentials.password}
    //     />
    //     <Button
    //       type="submit"
    //       fullWidth
    //       variant="contained"
    //       color="primary"
    //       className={styles.submit}
    //     >
    //       Log In
    //     </Button>
    //   </form>
    // </div>

    <div>{conditionalRender()}</div>
  );
}

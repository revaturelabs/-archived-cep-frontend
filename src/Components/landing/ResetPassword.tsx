import React, { useState, ReactElement, SyntheticEvent } from "react";
import axios from "axios";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { dispatchIsReset } from "../../redux/actions/userAction";

const useStyles: Function = makeStyles((theme): StyleRules => ({

  form: {
    paddingTop: "1%",
    paddingRight: "1%",
    paddingLeft: "1%",
    paddingBottom: "1%",
    width: "50%",
    minHeight: "100px",
    margin: 'auto',
    marginTop: "10%",
  },
  warning: {
    textAlign: "center"
  }
}));

interface props {
  oldPassword: string
}

export default function ResetPage({oldPassword}: props): ReactElement {
  interface styleINF {
    form: string
    warning: string
  }

  const styles: styleINF = useStyles();

  const user = useSelector((state: any) => state.credReducer.userObject);

  const dispatch: any = useDispatch();

  const token = useSelector((state: any) => state.credReducer.token);

  const [userPassword, setPassword] = useState({
    newPassword: "",
    rePassword: "",
    message: ""
  });

  function handleChange(event: any): void {
    setPassword({
      ...userPassword,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setPassword({
      ...userPassword,
      message: ""
    });

    if (userPassword.newPassword !== userPassword.rePassword) {
      setPassword({
        ...userPassword,
        message: "The provided passwords do not match."
      });
      return;
    }

    /**Connect to backend in here */
    axios.post(process.env.REACT_APP_ZUUL_ROUTE + "/users/resetpassword", {
      oldPassword: oldPassword,
      newPassword: userPassword.newPassword,
      confirmedPassword: userPassword.rePassword,
      email: user.email
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(function (response) {
      dispatch(dispatchIsReset(false));
      alert(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  function Render(): ReactElement {
    return (
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={userPassword.newPassword}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={userPassword.rePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#F26925" }}
          >
            Reset Password
            </Button>
          <p className={styles.warning}>{userPassword.message}</p>
        </form>
      </div>
    )
  }

  return <div>{Render()}</div>;
}



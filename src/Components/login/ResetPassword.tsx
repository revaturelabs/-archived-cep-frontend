import React, { useState, ReactElement, SyntheticEvent } from "react";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";
import apiBasePath from "../../apiBasePath";

const useStyles: Function = makeStyles((theme): StyleRules => ({

    form: {
        paddingTop: "1%",
        paddingRight: "1%",
        paddingLeft: "1%",
        paddingBottom: "1%",
        width: "50%",
        minHeight:"100px",
        margin: 'auto',
        marginTop:"10%",
      },
    warning:{
        textAlign:"center"
    }
  }));

  export default function LoginPage(): ReactElement {
    interface styleINF {
        form: string
        warning:string
      }
      const styles: styleINF = useStyles();

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
        setPassword({
            ...userPassword,
            message: ""
          });
        if(!userPassword.newPassword|| !userPassword.rePassword){
            setPassword({
                ...userPassword,
                  message: "None of input field can be empty"
              });
              return;
        }
        if(userPassword.newPassword !== userPassword.rePassword){
            setPassword({
                ...userPassword,
                  message: "The password not match"
              });
              return;
        }

        /**Connect to backend in here */
         
      }
    
    function Render(): ReactElement {
        return(
    <div>
        <div className={styles.form} >
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
              label="Enter new Password Again"
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
              onClick={handleSubmit}
              style={{ backgroundColor: "#F26925" }}
            >
             Reset Password
            </Button>
                <p className={styles.warning}>{userPassword.message}</p>
            </div> 
        </div>
        )
    }

    return <div>{Render()}</div>;
  }

  

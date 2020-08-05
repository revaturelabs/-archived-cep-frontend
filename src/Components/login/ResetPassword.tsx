import React, { useState, ReactElement, SyntheticEvent } from "react";
import Axios from "axios";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";

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
        event.preventDefault();
        setPassword({
            ...userPassword,
            message: ""
          });
    
        if(userPassword.newPassword !== userPassword.rePassword){
            setPassword({
                ...userPassword,
                  message: "Two password not match"
              });
              return;
        }

        /**Connect to backend in here */
         
      }
    
    function Render(): ReactElement {
        return(
    <div>
        <form className={styles.form}  onSubmit={handleSubmit}>
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

  

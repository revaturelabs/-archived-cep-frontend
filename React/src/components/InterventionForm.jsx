import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import axios from "axios";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

function Form() {
  const [trigger, setTrigger] = useState();

  function handleChange(e) {
    e.preventDefault();
    setTrigger({ ...trigger, [e.target.name]: e.target.value });
  }
  console.log(trigger);
  function handleSubmit() {
    axios
      .post("http://localhost:8080/intervention", {
        interventionid: "1",
        subject: trigger.subject,
        body: trigger.body,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <br />
      <form>
        <TextField
          id="outlined-simple-start-adornment"
          variant="outlined"
          label="With outlined TextField"
          onChange={handleChange}
          name="subject"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Subject</InputAdornment>
            ),
          }}
        />

        <TextField
          id="outlined-simple-start-adornment"
          variant="outlined"
          label="With outlined TextField"
          onChange={handleChange}
          name="body"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Body</InputAdornment>
            ),
          }}
        />
      </form>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Primary
      </Button>
    </>
  );
}

export default withStyles(styles)(Form);

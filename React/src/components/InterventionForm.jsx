import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
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

  function handleSubmit() {
    axios
      .post("http://localhost:8080/intervention", {
        // interventionid: "1",
        clientName: trigger.clientName,
        clientCompany: trigger.clientCompany,
        clientContactMethod: trigger.clientContactMethod,
        skillCategory: trigger.skillCategory,
        numberOfEngineers: trigger.numberOfEngineers,
        subject: trigger.subject,
      })
      .then(function (response) {
        alert(response.data);
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
          label="Subject"
          onChange={handleChange}
          name="subject"
          fullWidth="true"
        />
        <br />
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          variant="outlined"
          onChange={handleChange}
          name="clientName"
          label="Client Name"
          fullWidth="true"
        />
        <br />
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          variant="outlined"
          onChange={handleChange}
          name="clientCompany"
          label="Client Company"
          fullWidth="true"
        />
        <br />
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          onChange={handleChange}
          name="clientContactMethod"
          label="Client Contact"
          variant="outlined"
          fullWidth="true"
        />
        <br />
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          onChange={handleChange}
          name="skillCategory"
          label="Skill Category of Concern"
          variant="outlined"
          fullWidth="true"
        />
        <br />
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          onChange={handleChange}
          name="numberOfEngineers"
          label="Number of Engineers Needed"
          variant="outlined"
          fullWidth="true"
        />
      </form>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default withStyles(styles)(Form);

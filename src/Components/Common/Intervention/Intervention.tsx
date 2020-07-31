import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
//import {withStyles} from "@material-ui/core/styles";
import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import apiBasePath from '../../../apiBasePath';
import { StaticRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: any) => ({
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
}));

export default function RequestForm(props) {

  /* >>>>>> addon*/ const userId = useSelector((state: any) => state.credReducer.userObject.userId);

  const [trigger, setTrigger] = useState({
    batchId: props.batchId, //Changed by Michael Worrell
    userId: userId, //Changed by Michael Worrell
    startTime: new Date,
    endTime: new Date,
    isAllDay: null,
    status: null,
    requestType: null,
    description: null
  });
  //const styles = useStyles();

  function handleChange(event: any) {
    event.preventDefault();
    setTrigger({ ...trigger, [event.target.name]: event.target.value });
  }

  const token = useSelector((state: any) => state.credReducer.token);

  function handleSubmit() {

    axios.post(apiBasePath + "/interventions", {
      batchId: trigger.batchId,
      userId: trigger.userId,
      startTime: new Date(trigger.startTime).toUTCString(),
      endTime: new Date(trigger.endTime).toUTCString(),
      isAllDay: trigger.isAllDay,
      status: trigger.status,
      requestType: trigger.requestType,
      description: trigger.description
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <br />
      <h1>Request Intervention</h1>
      <form>
        <h4>Requested Start and End Time</h4>
        <TextField
          // id="outlined-simple-start-adornment"
          variant="filled"
          //label="Start Time"
          onChange={handleChange}
          type="datetime-local"
          name="startTime"
        />
        <TextField
          id="outlined-simple-start-adornment"
          variant="filled"
          // label="End Time"
          onChange={handleChange}
          type="datetime-local"
          name="endTime"
        />
        <br />
        <TextField
          // id="outlined-simple-start-adornment"
          variant="filled"
          label={props.batchId ? props.batchId : "Batch ID"} //Changed by Michael W
          onChange={handleChange}
          type="text"
          name="batchId"
          fullWidth={true}
        />
        <br />
        <TextField
          // id="outlined-simple-start-adornment"
          variant="filled"
          label={trigger.userId ? trigger.userId : "User ID"} //Changed by Michael Worrell
          onChange={handleChange}
          type="number"
          name="userId"
          fullWidth={true}
        />
        <br />
        <FormControl style={{ textAlign: "left" }} fullWidth={true} variant="filled">
          <InputLabel >isAllDay</InputLabel>
          <Select
            name="isAllDay"
            onChange={handleChange}>
            {/*    <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {/* Check later ~~~~~~~~~~` */}
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl fullWidth={true} style={{ textAlign: "left" }} variant="filled">
          <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="status"
            onChange={handleChange}
          >
            {/* <MenuItem value=""><em>None</em></MenuItem> */}
            <MenuItem value="Pending">Pending</MenuItem>
            {/* <MenuItem value="Done">Done</MenuItem> */}
          </Select>
        </FormControl>
        <br />
        <FormControl style={{ textAlign: "left" }} fullWidth={true} variant="filled">
          <InputLabel>Request Type</InputLabel>
          <Select
            name="requestType"
            onChange={handleChange}
          >
            {/*       <MenuItem value=""><em>None</em></MenuItem> */}
            <MenuItem value="Intervention">Intervention</MenuItem>
            <MenuItem value="Talent">Talent</MenuItem>
            <MenuItem value="Help">Help</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          id="outlined-simple-start-adornment"
          variant="filled"
          label="Description"
          onChange={handleChange}
          name="description"
          fullWidth={true} />
      </form>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )


}
import React, { useState, ReactElement, SyntheticEvent, ChangeEvent } from 'react';
import TextField from "@material-ui/core/TextField";
//import {withStyles} from "@material-ui/core/styles";
import { Button, makeStyles, StyleRules } from "@material-ui/core";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import apiBasePath from '../../../apiBasePath';
import { StaticRouter } from 'react-router-dom';

const useStyles: Function = makeStyles((theme: any): StyleRules => ({
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

export default function RequestForm(props): ReactElement {

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

  function handleChange(event: any): void {
    event.preventDefault();
    console.log(typeof (event));
    setTrigger({ ...trigger, [event.target.name]: event.target.value });
  }

  const token = useSelector((state: any): void => state.credReducer.token);

  /**
   * This function will compare the interventions start and end date to
   * see if it is in range of the batches start and end time.
   * @param start the start date of the intervention
   * @param end the end date of the intervention
   */
  function isWithinRange(start: Date, end: Date): boolean {
    let bStart: Date = new Date(props.batch.startDate);
    bStart = new Date(bStart.getTime() + bStart.getTimezoneOffset() * 60000); //This is to fix the one day offset for the Date 
    let bEnd: Date = new Date(props.batch.endDate);
    bEnd = new Date(bEnd.getTime() + bEnd.getTimezoneOffset() * 60000); //This is to fix the one day offset for the Date 
    if ((start > bStart) && (end < bEnd)) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(): void {
    if ( !trigger.isAllDay || !trigger.requestType || !trigger.description ) {
      alert("Field Missing");
      return;
    }
    let sTime: Date = new Date(trigger.startTime); //Creating a Date variable to hold the intervention start date
    let eTime: Date = new Date(trigger.endTime); //Creating a Date variable to hold the intervention end date
    if(isWithinRange(sTime, eTime)){ //If this intervention date is within the batch's timeframe, add it
      axios.post(apiBasePath + "/interventions", {
        batchId: trigger.batchId,
        userId: trigger.userId,
        startTime: new Date(trigger.startTime).toUTCString(),
        endTime: new Date(trigger.endTime).toUTCString(),
        isAllDay: trigger.isAllDay,
        status: "Pending", //didn't need this to point to anything since it has only one valid value
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
    } else {
      alert("Invalid Start/End Date");
    }
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
        {/* Commented out because these fields are abstracted */}
        {/* <TextField
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
        <br /> */}
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
        {/* <FormControl fullWidth={true} style={{ textAlign: "left" }} variant="filled">
          <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="status"
            onChange={handleChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <br /> */}
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
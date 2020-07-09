import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import {Button, makeStyles} from "@material-ui/core";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
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

export default function RequestForm(){
 
  const [trigger, setTrigger] = useState();


  function handleChange(event) {
    event.preventDefault();
    setTrigger({...trigger, [event.target.name]: event.target.value});
  }

  const token = useSelector((state) => state.credReducer.token);

  function handleSubmit(){
    

    axios.post("http://ec2-18-232-171-89.compute-1.amazonaws.com:8081/interventions",{
      batchId: trigger.batchId,
      userId: trigger.userId,
      startTime: new Date(trigger.startTime).toUTCString(),
      endTime: new Date(trigger.endTime).toUTCString(),
      isAllDay: trigger.isAllDay,
      status: trigger.status,
      requestType: trigger.requestType,
      description: trigger.description
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(function(response){
      alert(response.data);
    })
    .catch(function(error){
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
            variant="filled"
            onChange={handleChange}
            type="datetime-local"
            name="startTime"
          />
          <TextField
            id="outlined-simple-start-adornment"
            variant="filled"
            onChange={handleChange}
            type="datetime-local"
            name="endTime"
          />
          <br/>
          <TextField
            variant="filled"
            label="Batch ID"
            onChange={handleChange}
            type="text"
            name="batchId"
            fullWidth="true"
          />
          <br/>
          <TextField
            variant="filled"
            label="User ID"
            onChange={handleChange}
            type="number"
            name="userId"
            fullWidth="true"
          />
          <br/>
          <FormControl style={{textAlign:"left"}} fullWidth="true" variant="filled">
          <InputLabel >isAllDay</InputLabel>
            <Select
            name="isAllDay"
            onChange={handleChange}>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
              </Select>
          </FormControl>
          <br/>
          <FormControl fullWidth={true} style={{textAlign:"left"}} variant="filled">
            <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="status"
              onChange={handleChange}
            >

            <MenuItem value="Pending">Pending</MenuItem>

            </Select>
          </FormControl>
          <br/>
          <FormControl style={{textAlign:"left"}} fullWidth="true" variant="filled">
            <InputLabel>Request Type</InputLabel>
            <Select
              name="requestType"
              onChange={handleChange}
            >

            <MenuItem value="Intervention">Intervention</MenuItem>
            <MenuItem value="Talent">Talent</MenuItem>
            <MenuItem value="Help">Help</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <TextField
            id="outlined-simple-start-adornment"
            variant="filled"
            label="Description"
            onChange={handleChange}
            name="description"
            fullWidth="true" />
      </form>
      <br/>
      <br/>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
      </Button>
    </div>
  )
  

}
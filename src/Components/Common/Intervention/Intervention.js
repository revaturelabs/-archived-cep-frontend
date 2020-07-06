import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import axios from "axios";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

  function RequestForm(){
      const [trigger, setTrigger] = useState();

      function handleChange(event) {
          event.preventDefault();
          setTrigger({...trigger, [event.target.name]: event.target.value});
      }

      function handleSubmit(){
          axios.post("http://localhost:8080/interventions",{
              batchId: trigger.batchId,
              userId: trigger.userId,
              startTime: new Date(trigger.startTime).toUTCString(),
              endTime: new Date(trigger.endTime).toUTCString(),
              isAllDay: trigger.isAllDay,
              status: trigger.status,
              requestType: trigger.requestType,
              description: trigger.description})
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
              <h3>Requested Start and End Time</h3>
                  <TextField
                    // id="outlined-simple-start-adornment"
                    variant="outlined"
                    //label="Start Time"
                    onChange={handleChange}
                    type="datetime-local"
                    name="startTime"
                     />
                  <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    // label="End Time"
                    onChange={handleChange}
                    type="datetime-local"
                    name="endTime"
                     />
                    <br/>
                  <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    label="Batch ID"
                    onChange={handleChange}
                    type="number"
                    name="batchId"
                     />
                    <br/>
                  <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    label="User ID"
                    onChange={handleChange}
                    type="number"
                    name="userId"
                     />
                    <br/>
                    
                  {/* <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    label="isAllDay"
                    onChange={handleChange}
                    type="text"
                    name="isAllDay"
                     /> */}
               <FormControl >
        <InputLabel id="demo-controlled-open-select-label">isAllDay</InputLabel>
        <Select
          // labelId="demo-controlled-open-select-label"
          // id="demo-controlled-open-select"
          name="isAllDay"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
                    <br/>
                    <FormControl >
        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          name="status"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
                    <br/>
                    <FormControl >
        <InputLabel id="demo-controlled-open-select-label">Request Type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          name="requestType"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Intervention">Intervention</MenuItem>
          <MenuItem value="Talent">Talent</MenuItem>
          <MenuItem value="Help">Help</MenuItem>
        </Select>
      </FormControl>
                    <br/>
                  <TextField
                    id="outlined-simple-start-adornment"
                    variant="outlined"
                    label="Description"
                    onChange={handleChange}
                    name="description" />
                    {/* fullWidth="true" /> */}
                    {/* <fieldset>
                        <legend>Selecting an item</legend>
                        <select id="myList">
                            <option value="1">one</option>
                            <option value='2'>two</option>
                        </select>
                    </fieldset> */}
              </form>
              <br/><br/>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
              </Button>
          </div>
      )

}

export default withStyles(styles)(RequestForm)
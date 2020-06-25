import React, { useState } from "react";
import "../App.css";
import axios from "axios";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";

export default function EventHandler() {
  const [event, setEvent] = useState([]);

  function onEventCreation(e) {
    if (e.target.value !== "" && e.target.value !== undefined) {
      setEvent({ ...event, [e.target.name]: e.target.value });
    }
  }

  /*  axios.post('https:localhost:5432/event', {
    Name: 'Fred',
    Age: '23'
  })
  .then(function (response) {
    console.log(response);
  }) */

  console.log(event);

  return (
    <ScheduleComponent
      currentView="Month"
      onClick={onEventCreation}
      eventSettings={{ dataSource: event }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

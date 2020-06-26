import React from "react";
import NavBar from "./components/NavBar";
/* import BatchDetails from "./components/BatchDetails";
import AddEvent from "./components/testAddingEvent"; */
import { Route, Switch } from "react-router-dom";
import Calander from "./components/CalanderEvent";
import Form from "./components/InterventionForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/batch">
          <Calander />
        </Route>
        <Route path="/intervention">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

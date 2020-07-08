import React from "react";
import "../App.css";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//Page Components
import MyBatches from "./batches/MyBatches";
import LoginPage from "./login/LoginPage";
import AdminPage from "./Admin/AdminPage";
import Drawer from "./Common/Drawer/Drawer";
import RequestForm from "./Common/Intervention/Intervention";
import GetInterventions from "./Common/Intervention/GetInterventions";
import BatchPage from "./Batch/BatchPage";
import HomePage from "./Common/HomePage";
//For Testing
import BlankPage from "./Common/BlankPage";

//Route Components
import {
  AdminProtectedRoute,
  ClientProtectedRoute,
} from "./Auth/ProtectedRoute";

//Error Page Components
import { Forbbiden, NotFound } from "./Common/ErrorPages";

function App() {
  //Conditionally render the drawer if logged in
  const token = useSelector((state) => state.credReducer.token);
  const isLoggedIn = useSelector((state) => state.credReducer.isLoggedIn);

  return (
    <div>
      {/* {token ? <Drawer /> : null} */}
      {isLoggedIn ? <Drawer /> : null}
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/403" component={Forbbiden} exact />
        <Route path="/404" component={NotFound} exact />
        <div className="App">
          <Route path="/my_batches" component={MyBatches} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/intervention" component={RequestForm} />
          <Route path="/getinterventions" component={GetInterventions} />
          <Route path="/associates" component={BatchPage} />
        </div>
      </Switch>
    </div>
  );
}

export default App;

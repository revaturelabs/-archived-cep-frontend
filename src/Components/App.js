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
import BatchPage from "./Batch/BatchPage";

//For Testing
import BlankPage from "./Common/BlankPage";

//Route Components. To use these simply replace "Route" with this component. If it's an admin only path then replace it with "AdminProtectedRoute" 
import {
  AdminProtectedRoute,
  ClientProtectedRoute,
} from "./Auth/ProtectedRoute";

//Error Page Components
import { Forbbiden, NotFound } from "./Common/ErrorPages";

//paths within the inner <div> are paths that will have additional spacing on the top and left to prevent elements from being overlapped by the drawer and Navbar
function App() {
  
  //Conditionally render the drawer based on login
  const isLoggedIn = useSelector((state) => state.credReducer.isLoggedIn);

  return ( 
    <div>
      {isLoggedIn ? <Drawer /> : null}
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/403" component={Forbbiden} exact />
        <Route path="/404" component={NotFound} exact />
        <div className="App">
          <Route path="/my_batches" component={MyBatches} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/intervention" component={RequestForm} />
          <Route path="/associates" component={BatchPage} />
        </div>
      </Switch>
    </div>
  );
}

export default App;

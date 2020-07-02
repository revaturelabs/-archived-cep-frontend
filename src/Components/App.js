import React from "react";
import "../App.css";
import { Switch, Route } from "react-router-dom";
import MyBatches from "./batches/MyBatches";
import LoginPage from "./login/LoginPage";
import AdminPage from "./Admin/AdminPage";
import Drawer from "./Common/Drawer/Drawer";

import BatchPage from './Batch/BatchPage';

function App() {
  return (
    <div>
      <div className="Drawer">
        <Drawer />
      </div>

      <div className="App">
        <Switch>
          <Route path="/my_batches" component={MyBatches} exact />
          <Route path="/" component={LoginPage} exact />
          <Route path="/admin" exact component={AdminPage} />
          <Route path="/batch" component={BatchPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "../App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyBatches from "./batches/MyBatches";
import LoginPage from "./login/LoginPage";
import AdminPage from "./Admin/AdminPage";
import BlankPage from "./common/BlankPage";
import Drawer from "./Drawer/drawer";

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
        </Switch>
      </div>
    </div>
  );
}

export default App;

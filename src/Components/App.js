import React from "react";
import "../App.css";
import { Switch, Route } from "react-router-dom";
import AdminPage from "./Admin/AdminPage";
import BlankPage from "./Common/BlankPage";
import Drawer from "./Drawer/Drawer";

function App() {
  return (
    <div>
      <div className="Drawer">
        <Drawer />
      </div>

      <div className="App">
        <Switch>
          <Route path="/" exact component={BlankPage} />

          <Route path="/admin" exact component={AdminPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

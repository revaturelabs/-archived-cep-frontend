import React from "react";
import "../App.css";
import { Switch, Route, useHistory} from "react-router-dom";
import { useSelector } from 'react-redux'

import MyBatches from "./batches/MyBatches";
import LoginPage from "./login/LoginPage";
import AdminPage from "./Admin/AdminPage";
import Drawer from "./Common/Drawer/Drawer";
import Spider from './Batch/AssociateList/spidergraph/MySpiderGraphPage'
import BatchPage from './Batch/BatchPage';

function App() {

  //Conditionally render the drawer if logged in
  const token = useSelector(state => state.token);

  const history = useHistory()

  return (
    <div>
        {/* {token ? <Drawer /> : history.push("/")} */}
        <Switch>
          {/* <Route path="/" component={LoginPage} exact />           */}
          <div className="App">
            <Route path="/my_batches" component={MyBatches} exact />
            <Route path="/admin" component={AdminPage} exact/>
            <Route path="/batch" component={BatchPage} />
            <Route path="/spider" component={Spider} />
          </div>
        </Switch>
    </div>
  );
}

export default App;

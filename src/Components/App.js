import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyBatches from "./batches/MyBatches";
import LoginPage from "./login/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/my_batches" component={MyBatches} exact />
        <Route path="/" component={LoginPage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

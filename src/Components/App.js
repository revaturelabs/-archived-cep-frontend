import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyBatches from "./batches/MyBatches";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/my_batches" component={MyBatches} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

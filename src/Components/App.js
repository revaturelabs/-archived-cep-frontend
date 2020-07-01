import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import BatchPage from './Batch/BatchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/batch" component={BatchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

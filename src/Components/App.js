import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminPage from './Admin/AdminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path ="/" exact component={AdminPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

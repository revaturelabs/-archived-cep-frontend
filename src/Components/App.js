import React from 'react';
import '../App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminPage from './Admin/AdminPage';
import drawer from './Drawer/drawer';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path ="/admin" exact component={AdminPage}/>
          <Route path ="/" exact component={HomePage} /> 
          <Route path="/drawer" component={drawer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

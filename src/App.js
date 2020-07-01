import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import MiniDrawer from './components/drawer/Drawer';
import HomePage from './components//homepage/HomePage';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/drawer' component={MiniDrawer} />
        </Switch>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;

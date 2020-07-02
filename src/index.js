import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import Drawer from "./Components/Drawer/Drawer";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

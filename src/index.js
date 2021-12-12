import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import "../node_modules/antd/dist/antd.css";
import App from "./App";
import store from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

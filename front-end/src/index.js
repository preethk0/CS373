import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "mdbreact/dist/css/mdb.css";

ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryParamProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

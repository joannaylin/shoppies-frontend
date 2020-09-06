import React from "react";
import "./App.css";
import Login from "./components/Login";
import Homepage from "./components/Homepage"
import ListShare from "./components/ListShare"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/:username" component={Homepage}/>
        <Route exact path="/users/:username" component={ListShare} />
      </Switch>
    </Router>
  );
}

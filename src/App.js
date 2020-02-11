import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import EventPage from "./containers/EventPage";
import Navbar from "./containers/Navbar";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/event/:id" component={EventPage} />
      </Switch>
    </Router>
  );
};

export default App;

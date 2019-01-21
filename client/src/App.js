import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Table from "./Table";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tableid: null
    };
  }

  // render methods that renders if the state is updated
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={Table} />
        </Switch>
      </Router>
    );
  }
}

export default App;

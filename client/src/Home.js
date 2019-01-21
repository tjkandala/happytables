import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:3001/",
      tableid: null
    };
  }

  create = e => {
    e.preventDefault();
    fetch("/tables/create", {
      method: "post"
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        // alert(`You will be redirected to Table #${data.tableid}`);
        this.setState({ tableid: data.tableid });
        console.log(this.state);
      });

    // send user to page of tableid
  };

  render() {
    if (this.state.tableid != null) {
      return <Redirect to={`/${this.state.tableid}`} />;
    }

    return (
      <div className="container">
        <div>
          <h1 className="logo">Happy Tables!</h1>
        </div>
        <div>
          <p className="homeinfo">
            <b>You and your friends</b> can finally agree on where to eat with
            Happy Tables! We tell you where to eat, taking into account{" "}
            <i>all</i> of your
            <b> individual preferences.</b> We know how hard decision making is,
            so let our algorithm do it <i>for you!</i>
          </p>
        </div>
        <div className="maketablebutton">
          <Button onClick={this.create} bsStyle="primary" bsSize="large" block>
            Make a Table!
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;

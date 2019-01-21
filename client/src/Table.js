import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
  Jumbotron,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import FilterList from "./FilterList";

class Table extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:3001/",
      nickname: "",
      category: "",
      location: "",
      price: 2,
      didsubmit: false,
      restaurant: "",
      filters: []
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    // goal is to retrieve restaurant for table if it exists already
    socket.emit("new user", this.props.match.params.id);

    socket.on("current restaurant name", (currentrestaurant, filters) => {
      this.setState({ restaurant: currentrestaurant, filters: filters });
      console.log(filters);
    });

    // server emits next two events after filters are added
    socket.on("new restaurant", (newrestaurant, tableid) => {
      if (tableid === this.props.match.params.id) {
        this.setState({ restaurant: newrestaurant });
      }
    });

    socket.on("new filters", filters => {
      this.setState({ filters: filters });
      console.log(filters);
    });

    this.initializeStateFromLocalStorage();
  }

  initializeStateFromLocalStorage = () => {
    // check if user has submitted to this table yet
    if (localStorage.hasOwnProperty(this.props.match.params.id)) {
      let localval = localStorage.getItem(this.props.match.params.id);
      let submitted = JSON.parse(localval);
      console.log("didMount didsubmit: " + submitted);
      if (submitted) {
        this.setState({ didsubmit: true });
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    // alert(`u put ${this.state.category} and ${this.state.location}`);

    const socket = socketIOClient(this.state.endpoint);
    socket.emit(
      "new filters",
      this.state.nickname,
      this.state.category,
      this.state.location,
      this.state.price,
      this.props.match.params.id
    );

    this.setState({ didsubmit: true }, () => {
      let submitted = this.state.didsubmit;
      // save state for this table in browser
      localStorage.setItem(
        this.props.match.params.id,
        JSON.stringify(submitted)
      );
    });
  };

  handleChange = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  render() {
    console.log(this.props);
    if (this.state.didsubmit === true) {
      return (
        <div>
          <div>
            <h2>
              Hi Table #{this.props.match.params.id}, what would you like to
              eat?
            </h2>
          </div>
          <div>
            <h2>
              You should eat at <b>{this.state.restaurant}!</b>
            </h2>
          </div>
          <div className="FilterList">
            <FilterList filters={this.state.filters} />
          </div>
        </div>
      );
    } else if (this.state.restaurant.length > 0) {
      return (
        <div>
          <div>
            <h2>
              Hi Table #{this.props.match.params.id}, what would you like to
              eat?
            </h2>
          </div>
          <div className="container">
            <Jumbotron className="jumbotron">
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel>Nickname:</ControlLabel>
                  <FormControl
                    type="text"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Category:</ControlLabel>
                  <FormControl
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Location:</ControlLabel>
                  <FormControl
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Price:</ControlLabel>
                  <FormControl
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                  <Button type="submit">Submit</Button>
                </FormGroup>
              </form>
            </Jumbotron>
          </div>
          <div>
            <h2>
              You should eat at <b>{this.state.restaurant}!</b>
            </h2>
          </div>
          <div className="FilterList">
            <FilterList filters={this.state.filters} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h2>
              Hi Table #{this.props.match.params.id}, what would you like to
              eat?
            </h2>
          </div>
          <div className="container">
            <Jumbotron className="jumbotron">
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel>Nickname:</ControlLabel>
                  <FormControl
                    type="text"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Category:</ControlLabel>
                  <FormControl
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Location:</ControlLabel>
                  <FormControl
                    type="text"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                  <ControlLabel>Price:</ControlLabel>
                  <FormControl
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                  <Button type="submit">Submit</Button>
                </FormGroup>
              </form>
            </Jumbotron>
          </div>
        </div>
      );
    }
  }
}

export default Table;

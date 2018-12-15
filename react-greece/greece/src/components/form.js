import React, { Component } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,

} from "react-bootstrap";

class Add extends Component {
  state = {
    houses: [],
    api: ""
  };

  housesHandler = e => {
    this.setState({ houses: e.target.value });
  };
  addHouses = event => {
    event.preventDefault();

    const ho = JSON.parse(this.state.houses)
    fetch("http://localhost:3120/upload", {
      method: "POST",
      body: JSON.stringify({ houses: ho }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => this.setState({ postResponse: res }))
      .catch(err => console.log(err));
    console.log(this.state.houses);
    this.setState({ houses: [] });


  };
  apiInputHandler = (e) => {
    this.setState({ api: e.target.value });

  }

  readJsonApi = async (event) => {
    event.preventDefault();
    console.log(this.state.api)
    await fetch(this.state.api)
      .then(res => res.json()).then(data => {
        fetch("http://localhost:3120/upload", {
          method: "POST",
          body: JSON.stringify({ houses: data }),
          headers: {
            "Content-Type": "application/json"
          }
        })

      })

      .catch(err => {
        console.log(err);
      });
    this.setState({ api: "" });
  };
  render() {

    return (
      <div>
        <Form onSubmit={this.addHouses}>
          <FormGroup />
          <ControlLabel> Valid json file</ControlLabel>
          <FormControl
            type="textarea"
            value={this.state.houses}
            placeholder="Enter JSON file"
            onChange={this.housesHandler}
          />
          <Button bsStyle="primary" type="submit">
            Add contribution{" "}
          </Button>
        </Form>

        <Form >
          <FormGroup />
          <ControlLabel> Valid json API</ControlLabel>
          <FormControl
            type="textarea"
            value={this.state.api}
            placeholder="Enter JSON API"
            onChange={this.apiInputHandler}
          />
          <Button bsStyle="primary" onClick={this.readJsonApi}>
            Add contribution{" "}
          </Button>
        </Form>
      </div>

    );

  }
}
export default Add;

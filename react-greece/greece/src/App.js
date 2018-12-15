import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Add from "./components/form";
import List from "./components/list";
import Home from "./components/home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/show" component={List} />
          <Route path="/contribute" component={Add} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

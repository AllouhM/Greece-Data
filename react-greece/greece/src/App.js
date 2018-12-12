import React, { Component } from "react";
import List from "./components/list";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Learn React</h1>
        </header>

        <List />
      </div>
    );
  }
}

export default App;

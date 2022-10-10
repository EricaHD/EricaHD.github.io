import React, { Component } from "react";
import Header from "./Header";
import "../css/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Erica Dominic</h1>
        <Header />
        <i>This website is currently under construction; please check back later!</i>
      </div>
    );
  }
}

export default App;

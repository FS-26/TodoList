import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Todo } from "./components/todolist/todo";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      somme: 10,
    };
  }
  render() {
    let cl = "redColor";
    if (this.state.count > 0 && this.state.count <= 10) {
      cl = "redColor";
    } else if (this.state.count > 10) {
      cl = "greenColor";
    } else if (this.state.count < 0) {
      cl = "blueColor";
    }
    return (
      <div>
        <h1>{this.props.children}</h1>
        <h2 className={cl}>
          <span style={{ color: "black" }}>counter: </span> {this.state.count}
        </h2>
        <button
          onClick={() => {
            let c = this.state.count;
            c++;
            this.setState({ count: c });
          }}
        >
          Incrementer
        </button>

        <button
          onClick={() => {
            let c = this.state.count;
            c--;
            this.setState({ count: c });
          }}
        >
          decrementer
        </button>
      </div>
    );
  }
}

class Somme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texte: "Touria",
    };
  }
  render() {
    return (
      <div>
        {this.state.texte}
        <h2>Somme: {this.props.valeur}</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Counter> Hello les super Stars </Counter> */}.
    <div class="container">
      <Todo />
    </div>
  </React.StrictMode>
);

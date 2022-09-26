import { Component } from "react";
import "./todo.css";

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      taskList: [],
      done: false,
    };
  }
  render() {
    // Destructuration
    let { task, taskList } = this.state;
    return (
      <div>
        <form
          className="my-5"
          onSubmit={(e) => {
            e.preventDefault();
            //recupération du tableau dans le state
            let todos = this.state.taskList;
            // ajout de la nouvelle valeur saisie dans l'input
            todos.push(task);
            // Mise à jour du tableau dans le state
            this.setState({ taskList: todos });
            console.log(taskList);
            // Vider l'input
            this.setState({ task: "" });
          }}
        >
          <h1 className="text-center bg-info text-white rounded"> Todo List</h1>
          <div className="input-group">
            {/* Donner le nouvel état à l'input */}
            <input
              className="form-control"
              type="text"
              placeholder="Add task"
              onChange={(e) => {
                this.setState({ task: e.target.value });
              }}
              value={this.state.task}
            />
            <button className="btn btn-primary" type="submit">
              Ajouter
            </button>
          </div>
        </form>

        <h2>List Of tasks</h2>
        <ol className="list-group list-group-numbered">
          {taskList.map((todo, index) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div
                    className={
                      this.state.done === true
                        ? "fw-bold text-decoration-line-through"
                        : "fw-bold"
                    }
                  >
                    {todo}
                  </div>
                </div>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => {
                      //   console.log(e.target.checked);
                      this.setState({ done: e.target.checked });
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

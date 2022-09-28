import { Component, Fragment } from "react";
import "./todo.css";
/**
 * Component to manage todo list
 * @constructor
 * @param {Object} propos - properties of the component
 */
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        content: "",
        id: 0,
        done: false,
      },
      list: [],
      alert: false,
    };
    // au cas on utilise une fonction normal , on peu s'en passer de ça à travers la fonction fléchée
    this.handleChange = this.handleChange.bind(this);
  }
 

  /**
   * Inherit method from the Component class that is executed when the component List is created and mounted in the DOM
   * 
   * Here You can initialize any operation to update the state
   */
  componentDidMount() {
    // charger les éléments déjà stockés
    let data =
      JSON.parse(localStorage.getItem("Todos")) == null
        ? []
        : JSON.parse(localStorage.getItem("Todos"));
    this.setState({ list: data });
  }

  /**
   * Inherit method from the Component class that is executed when the 
   * the  Oject state got update 
   * 
   */
  componentDidUpdate() {
    // Stock le tableau dans le local storage
    localStorage.setItem("Todos", JSON.stringify(this.state.list));
  }

   /**
   * Inherit method from the Component class that is executed when the 
   * the List Component is removed
   * 
   */
  componentWillUnmount() {}


  /**
   * Handle changes generate by input
   * Update the state of the task
   * @param {Event} e - the change event set on the input
   */
  handleChange(e) {
    this.setState({ task: { content: e.target.value } });
    // console.log(this.state.task);
  }

/**
 * Handle the Submit event on the form
 * Add the task to the list
 * @param {Event} e - submit event 
 */
  handleSubmit = (e) => {
    e.preventDefault();

    // destructuration du state, récupération du task et de la list
    let { task, list: taskList } = this.state;
    if (task.content.trim().length !== 0) {
      // creation d'un id unique
      let uId = Math.random() * 10000 + "_" + new Date().getTime();
      // ajout de l'id
      task.id = uId;
      // initialisation du done
      task.done = false;

      // ajouter la valeur saisie au tableau par push
      taskList.push(this.state.task);

      // mettre a jour le state
      this.setState({ list: taskList });

      console.log(this.state.list);
      // vider le champ de texte // affecter le this.state.task à value de l'input pour le vider à chaque fois
      this.setState({ task: { content: "" } });
    } else {
      this.setState({ alert: true });
    }
  };


  
/**
 * Handle the delete of item
 * Remove the item from the list 
 * @param {Number} index - task index in the list of tasks
 */
  handleDelete = (index) => {
    let { list: taskList } = this.state;
    taskList.splice(index, 1);
    this.setState({ list: taskList });
    console.log(index, taskList);
  };

  /**
   * Toggle of the done value of a task
   * @param {String} id - the id of a task
   */
  handleDone = (id) => {
    let { list: taskList } = this.state;
    taskList = taskList.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({ list: taskList });
  };



  render() {
    // destructuration du state

    let { list, alert } = this.state;

    if (alert === true) {
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
    }
    return (
      <>
        {alert === true ? (
          <div className="alert alert-danger text-center fs-2" role="alert">
            <p> Saisisez une Valeur dans le champ</p>
            <p className="mb-0"></p>
          </div>
        ) : (
          ""
        )}

        <div
          className="card w-50 mx-auto shadow-sm bg-info text-white
      my-5"
        >
          <div className="card-header">
            <h2 className="text-center ">Todo List</h2>
          </div>

          <div className="card-body">
            <form onSubmit={this.handleSubmit} className="my-3">
              <div className="input-group">
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Add New Task"
                  type="text"
                  value={this.state.task.content}
                />
                <button className="btn btn-secondary">Ajouter</button>
              </div>
            </form>

            <h2 className="text-center text-danger my-2">List of task</h2>
            <ol className="list-group list-group-numbered">
              {list.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div
                        className={
                          item.done
                            ? "fw-bold text-decoration-line-through"
                            : "fw-bold"
                        }
                      >
                        {item.content}
                      </div>
                    </div>

                   

                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => {
                        this.handleDelete(index);
                      }}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <div className="form-check form-switch mx-1">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={item.done === true ? true : false}
                        id="flexSwitchCheckDefault"
                        onChange={() => {
                          this.handleDone(item.id);
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </>
    );
  }
}
export default List;

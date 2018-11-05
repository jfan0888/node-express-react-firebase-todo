import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TodoForm,
  TodoList,
  Footer,
} from './components/todo';
import {
  addTodo,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos,
} from './lib/todoHelpers';
import {
  loadTodos,
  createTodo,
  saveTodo,
  deleteTodo,
} from './lib/todoService';
import { pipe, partial } from './lib/utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentTodo: ''
    };
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.showTempMessage = this.showTempMessage.bind(this);
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(({ todos }) => {
        const items = Object.entries(todos).map(([key, value]) => ({id: key, ...value}));
        this.setState({ todos: items });
      })
  }

  handleInputChange = e => {
    this.setState({
      currentTodo: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newId = new Date();
    const newTodo = { createdAt: newId, title: this.state.currentTodo, status: false };
    const updatedTodos = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    });

    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'));
  }

  showTempMessage(msg) {
    this.setState({
      message: msg
    });
    setTimeout(() => this.setState({message: ''}), 1000);
  }

  handleEmptySubmit(e) {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please enter a valid todo'
    });
  }

  handleToggle = id => {
    const getToggleTodo = pipe(findById, toggleTodo);
    const updated = getToggleTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({
      todos: updatedTodos
    });
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo updated in the server'));
  }

  handleRemove(id, e) {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });
    deleteTodo(id)
      .then(() => this.showTempMessage('Todo removed from server'));
  }

  render() {
    const { todos, errorMessage, message, currentTodo } = this.state;
    const submitHandler = currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(todos, this.context.route);

    return (
      <div className="App">
        <h1>To-do List</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {message && <p className="success">{message}</p>}
        <TodoForm
          handleInputChange={this.handleInputChange}
          currentTodo={currentTodo}
          handleSubmit={submitHandler}
        />
      <TodoList
        handleToggle={this.handleToggle}
        todos={displayTodos}
        handleRemove={this.handleRemove}
      />
      <Footer />
      </div>
    );
  }
}

export default App;

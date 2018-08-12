import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class TodoList extends Component {

  createNew(e) {

    if (e.which === 13) {
      this.props.store.createTodo(e.target.value);
      e.target.value = ""
    }
    
  }

  toggeleThis(todo){
    todo.complete = !todo.complete
  }

  filter(e) {
    this.props.store.filter = e.target.value;
  }

  render() {

    const { filter, filteredTodos, todos, clearComplete } = this.props.store;
    console.log(todos)
    const todosLs = filteredTodos.map(todo => (
      <li key={todo.id}>
        <input type="checkbox" onChange={this.toggeleThis.bind(this, todo)} value={todo.complete} checked={todo.complete} />
        {todo.value}</li>
    ))

    return (
      <div>
        <h2>To Do List</h2>
        <input onKeyPress={this.createNew.bind(this)} />
        <input value={filter} onChange={this.filter.bind(this)} />
        <ul>{todosLs}</ul>
        <input type="button" onClick={clearComplete} value="clear completed todos" />
      </div>
    );
  }
}

export default TodoList;

import { autorun, computed, observable } from 'mobx'

class Todo {
    @observable value
    @observable id
    @observable complete

    constructor(value){
        this.value =value;
        this.id = Date.now();
        this.complete = false;
    }
}

class Store1 {
    @observable todos = [];
    @observable filter = "";
    @computed get filteredTodos() {
        var matchTodos = new RegExp(this.filter, "i");
        return this.todos.filter(todo => !this.filter || matchTodos.test(todo.value))
    }

    createTodo(value) {
        this.todos.push(new Todo(value))
    }

    clearComplete = () =>   {
        const newTodo = this.todos.filter(todo => !todo.complete);
        this.todos.replace(newTodo);
    }
}

var TodoStore = window.TodoStore = new Store1();

export default TodoStore;

autorun(() => {
    console.log(TodoStore.todos[0]);
    console.log(TodoStore.filter);
})
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos/';
const DELETE_BTN_CLASS = 'delete-btn';
const NEW_TODO_ROW_SELECTOR = '.newToDoRecord-row';
const DONE_CLASS = 'finished-todo';
const TASK_ITEM_CLASS = 'created-todo';

const todoList = document.querySelector('#todoList');
const todoTemplate = document.querySelector('#newToDoRecord').innerHTML;

let todoListArr = [];

todoList.addEventListener('click', onTodoListClick);

init();

function init() {
    fetchTodos()
}

function fetchTodos() {
    fetch(TODOS_URL)
    .then(res => res.json())
    .then(setTodos)
    .then(renderTodos);
}

function renderTodos(list) {
    const html = list.map(generateTodosHtml).join('');
    todoList.innerHTML = html;
}

function generateTodosHtml(todo) {
        return todoTemplate
            .replace('{{doneClass}}', todo.completed ? DONE_CLASS : '')
            .replace('{{id}}', todo.id)
            .replace('{{newtodo}}', todo.title);
}


function setTodos(list) {
    return (todoListArr = list);
}

function onTodoListClick(e) {
    const taskEl = getTodoRow(e.target);

    switch(true) {
        case e.target.classList.contains(DELETE_BTN_CLASS) :
            return removeTodo(+taskEl.dataset.todoId);
        case e.target.classList.contains(TASK_ITEM_CLASS) :
    }       return toggleTodo(+taskEl.dataset.todoId);

}
 
function toggleTodo(todoId) {
    const todo = todoListArr.find((todo) => todo.id === todoId);
    todo.completed = !todo.completed;

    renderTodos(todoListArr);
}

function getTodoRow(el) {
    return el.parentElement.closest(NEW_TODO_ROW_SELECTOR);
}

function removeTodo(todoId) {
    todoListArr.splice(todoListArr.findIndex(todo => todo.id === todoId), 1);
    renderTodos(todoListArr);
}

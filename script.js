const DELETE_BTN_CLASS = 'delete-btn';
const NEW_TODO_ROW_SELECTOR = '.newToDoRecord-row';

const todoForm = document.querySelector('#newToDoForm');
const todoList = document.querySelector('#todoList');
const todoTemplate = document.querySelector('#newToDoRecord').innerHTML;
const formInput = document.querySelector('#todoFormInput');

todoForm.addEventListener('submit', onTodoFormSubmit);
todoList.addEventListener('click', onTodoListClick);

function onTodoFormSubmit(e) {
    e.preventDefault();
    const newTodo = formInput.value;

    if (isTodoValid(newTodo)) {
        addTodo(newTodo);
        resetForm();
    } else {
        alert('Empty input!');
    }
}

function onTodoListClick(e) {
    const tr = getTodoRow(e.target);
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        removeTodo(tr);
    } else {
        tr.classList.toggle('finished-todo')
    }
}

function isTodoValid(todo) {
    return todo != '';
}

function generateTodoHtml(todo) {
    debugger
    return todoTemplate
        .replace('{{newtodo}}', todo);
}

function addTodo(todo) {
    const newTodoHtml = generateTodoHtml(todo);
    todoList.insertAdjacentHTML('beforeend', newTodoHtml);
}

function resetForm() {
    todoForm.reset();
}

function getTodoRow(el) {
    return el.parentElement.closest(NEW_TODO_ROW_SELECTOR);
}

function removeTodo(el) {
    el.remove();
}
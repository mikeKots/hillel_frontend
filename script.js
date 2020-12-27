const buttonEl = document.querySelector('#save-button');
const inputEl = document.querySelector('#add-to-list');
let ul = document.querySelector('#todos');

buttonEl.addEventListener('click', onButtonClick);

function onButtonClick() {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    const newTodo = inputEl.value;
    if (newTodo != '') {
        textSpan.append(newTodo);
        ul.appendChild(li).append(textSpan);
        textSpan.append(newTodo);
        ul.appendChild(li).append(textSpan);
        inputEl.value = "";
    } else {
        return null;
    }
    
}

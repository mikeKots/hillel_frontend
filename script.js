const TODOS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const nameInput = document.querySelector('#nameInput');
const surnameInput = document.querySelector('#surnameInput');
const telNubmerInput = document.querySelector('#telNubmerInput');
const contactsTemplate = document.querySelector('#newContact').innerHTML;
const todoList = document.querySelector('#records');
const deleteBtnClass = 'delete-button';
const createdEl = 'created-contact';

const todosResource = new Http(TODOS_URL);

let currentId;

/**
 * When we open the page - we get all contacts 
 */
fetchContacts();

todoList.addEventListener('click', rowClickHandler);

document.getElementById('addTaskBtn').addEventListener('click', onAddBtnClick);

function onAddBtnClick() {
    if (!isInputValid(nameInput.value, surnameInput.value, telNubmerInput.value)) {
        return;
    }
    
    recordHandler(currentId, nameInput.value, surnameInput.value, telNubmerInput.value);
    clearInput();
}

function recordHandler(id, name, surname, phone) {
    let data = {
        name: name,
        surname: surname,
        phone: phone
    }

    if (id == undefined) {
        return addNewRecord(data)
    } else {
        return modifyRecord(id, data);
    }
}

function addNewRecord(data) {
    return todosResource.create(data).then((res) => {
        const newRecord = generateContactsHtml(res);
        records.innerHTML += newRecord;
    });
}

function modifyRecord(id, data) {
    return todosResource.update(id, data).then((res) => {
        removeElementById(res.id);
        const newRecord = generateContactsHtml(res);
        records.innerHTML += newRecord;
    });
}

function isInputValid(name, houseNumber, telNumber) {
    return name && houseNumber && telNumber;
}

function rowClickHandler(event) {
    if (event.target.classList.contains(deleteBtnClass)) {
        const recordId = event.target.parentElement.parentElement.dataset.todoId;
        todosResource.delete(recordId).then((res) => {
           const deleteCandidate = document.querySelector(`div[data-todo-id="${res.id}"]`);
           deleteCandidate.remove();
        }); 
    }

    if (event.target.parentElement.classList.contains(createdEl)) {
        let inputs = [];
        Array.prototype.forEach.call(event.target.parentElement.children, (child) => {
            if (child.children.length > 0) {
                return
            }
            inputs.push(child.innerText);
        })
        currentId = +getId(event.target.parentElement.dataset.todoId);
        fillInput(inputs[0], inputs[1], inputs[2]);
    }
}

function clearInput() {
    nameInput.value = '';
    surnameInput.value = '';
    telNubmerInput.value = '';
}

function fillInput(name, surname, telephone) {
    nameInput.value = name;
    surnameInput.value = surname;
    telNubmerInput.value = telephone;
}

function generateContactsHtml(todo) {
    return contactsTemplate
        .replace('{{nameInput}}', todo.name)
        .replace('{{surname}}', todo.surname)
        .replace('{{id}}', todo.id)
        .replace('{{phone}}', todo.phone);
}

function renderContacts(list) {
    const html = list.map(generateContactsHtml).join('');
    todoList.innerHTML = html;
}

function fetchContacts(){
    todosResource.list().then(renderContacts);
}

function getId(id) {
    return id;
}

function removeElementById(id) {
    debugger
    return document.querySelector(`div[data-todo-id="${id}"]`).remove();
}



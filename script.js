const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const nameInput = document.querySelector('#nameInput');
const surnameInput = document.querySelector('#surnameInput');
const telNubmerInput = document.querySelector('#telNubmerInput');
const contactsTemplate = document.querySelector('#newContact').innerHTML;
const todoList = document.querySelector('#records');
const deleteBtnClass = 'delete-button';
const createdEl = 'created-contact';
const createdElClass = '.created-contact';

const contactsResource = new Http(CONTACTS_URL);

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
    return contactsResource.create(data).then((res) => {
        const newRecord = generateContactsHtml(res);
        records.innerHTML += newRecord;
    });
}

function modifyRecord(id, data) {
    return contactsResource.update(id, data).then((res) => {
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
        deleteRecodg(event);
    }

    if (event.target.parentElement.classList.contains(createdEl)) {
        setRecordValuesToUpdate(event)
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
    contactsResource.list().then(renderContacts);
}

function getContactById(id) {
    return document.querySelector(`div[data-todo-id="${id}"]`);
}

function removeElementById(id) {
    if (id !== undefined) {
        return document.querySelector(`div[data-todo-id="${id}"]`).remove();
    } else {
        throw Error('Id not found');
    }
}

function deleteRecodg(event) {
    const recordId = event.target.closest(createdElClass);
    contactsResource.delete(recordId).then((res) => {
       removeElementById(res.id);   
    });
}

function setRecordValuesToUpdate(event) {
    let inputs = [];
        Array.prototype.forEach.call(event.target.parentElement.children, (child) => {
            if (child.children.length > 0) {
                return
            }
            inputs.push(child.innerText);
        })
        currentId = +event.target.parentElement.dataset.todoId;
        getRecordById(currentId).then((res) => {
            fillInput(res.name, res.surname, res.telephone);
        });
}

function getRecordById(id) {
    return contactsResource.getById(id);
}

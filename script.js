const nameInput = document.querySelector('#nameInput');
const houseNumberInput = document.querySelector('#houseNumberInput');
const telNubmerInput = document.querySelector('#telNubmerInput');
const actionsInput = document.querySelector('#actionsInput');
const listEl = document.querySelector('.d-table');

document.getElementById('addTaskBtn').addEventListener('click', onAddBtnClick);

function onAddBtnClick() {
    if (!isInputValid(nameInput.value, houseNumberInput.value, telNubmerInput.value)) {
        return;
    }
    addNewRecord(nameInput.value, houseNumberInput.value, telNubmerInput.value);
    clearInput();
}

function addNewRecord(name, houseNumber, telNumber) {
    const taskEl = document.createElement('div');
    taskEl.className = 'd-tr book-records';
    const nameCell = createTableCellWithText(name);
    const houseNumberCell = createTableCellWithText(houseNumber);
    const telNumberCell = createTableCellWithText(telNumber);
    taskEl.append(nameCell, houseNumberCell, telNumberCell, addDeleteCell());
    const records = document.querySelector('#records');
    records.append(taskEl);
}

function createTableCellWithText(text) {
    const tableCell = document.createElement('div');
    tableCell.className = 'd-td';
    tableCell.innerText = text;
    return tableCell;
}

function isInputValid(name, houseNumber, telNumber) {
    return name && houseNumber && telNumber;
}

function deleteElement(event) {
    event.target.parentNode.parentNode.remove();
}

function addDeleteCell() {
    const deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.className ='d-td';
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', deleteElement);
    deleteButton.innerText = 'Delete';
    deleteButtonDiv.append(deleteButton);
    return deleteButtonDiv;
}

function clearInput() {
    nameInput.value = '';
    houseNumberInput.value = '';
    telNubmerInput.value = '';
}
const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts';
const DELETE_BTN_CLASS = 'delete-btn';
const EDIT_BTN_CLASS = 'edit-btn';

const listEl = document.getElementById('contactsList');
const idInputEl = document.getElementById('contactId');
const nameInputEl = document.getElementById('name');
const surnameInputEl = document.getElementById('surname');
const phoneInputEl = document.getElementById('phone');
const addBtnEl = document.getElementById('addContactBtn');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

const $formDialog = $('#formModal').dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        Save: () => {
            submitForm();
            closeModalForm();
        },
        Cancel: () => {
            closeModalForm();
        }
    }
});

let list = [];

listEl.addEventListener('click', onListElClick);
addBtnEl.addEventListener('click', onaAdBtnElClick);

init();

function onListElClick(e) {
    switch (true) {
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteItem(getElementId(e.target));
            break;
        case e.target.classList.contains(EDIT_BTN_CLASS):
            editWithModalForm(e);
            break;
    }
}

function getElementId(element) {
    return element.closest('.item').dataset.id;
}

function onaAdBtnElClick() {
    openModalForm();
    clearForm();
}

function init() {
    getList();
}

function getList() {
    request(URL).then(setData).then(renderList);
}

function setData(data) {
    return (list = data);
}

function renderList(data) {
    $(listEl).html(data.map(getItemElementHtml).join(''));
}

function getItemElementHtml(item) {
    return contactTemplate
        .replace('{{id}}', item.id)
        .replace('{{name}}', item.name)
        .replace('{{surname}}', item.surname)
        .replace('{{phone}}', item.phone);
}

function deleteItem(id) {
    request(`${URL}/${id}`, 'DELETE');

    list = list.filter((item) => item.id != id);

    renderList(list);
}

function editItem(id) {
    const item = list.find((el) => el.id == id);

    fillForm(item);
}

function submitForm() {
    const item = getFormData();
    if (item.id) {
        updateContact(item);
    } else {
        addContact(item);
    }
}

function openModalForm() {
    $formDialog.dialog('open');
}

function closeModalForm() {
    $formDialog.dialog('close');
}

function editWithModalForm(e) {
    openModalForm();
    editItem(getElementId(e.target));
    submitForm();
}

function addContact(item) {
    delete item.id;
    
    request(URL, 'POST', item).then((data) => {
        list.push(data);
        renderList(list);
        clearForm();
    });
}

function updateContact(item) {
    request(`${URL}/${item.id}`, 'PUT', item);

    list = list.map((el) => (el.id != item.id ? el : item));

    renderList(list);
}

function getFormData() {
    return {
        id: idInputEl.value,
        name: nameInputEl.value,
        surname: surnameInputEl.value,
        phone: phoneInputEl.value,
    };
}

function fillForm(obj) {
    idInputEl.value = obj.id;
    nameInputEl.value = obj.name;
    surnameInputEl.value = obj.surname;
    phoneInputEl.value = obj.phone;
}

function clearForm() {
    idInputEl.value = '';
    nameInputEl.value = '';
    surnameInputEl.value = '';
    phoneInputEl.value = '';
}

function request(url, method = 'GET', data) {
    return fetch(url, {
        method,
        body: data && JSON.stringify(data),
        headers: { 'Content-type': 'application/json' },
    })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .catch(() => getList());
}

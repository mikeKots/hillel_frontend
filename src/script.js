import $ from 'jquery';

import './styles.css';

const chatWindow = $('#messages');
const nameInput = $('#nameInput');
const messageInput = $('#messageInput');
const submitBtn = $('#submitBtn');
let socket = getSocket();

submitBtn.on('click', sendMessage);

init();

function init() {
    socket = getSocket();
    onCloseHadler();
    setMessageHandler();
}

function getSocket() {
     return new WebSocket('wss://fep-app.herokuapp.com');
}

function setMessageHandler() {
    socket.onmessage = (msg) => {
        const newEl = document.createElement('li');
        const data = JSON.parse(msg.data);
        newEl.textContent = `${data.name} : ${data.message}`;
        chatWindow.append(newEl);
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function setMessageToSend() {
    if (nameInput.val() !== "" && messageInput.val() !== "") {
        const messageObj = {
            name: nameInput.val(),
            message: messageInput.val()
        }
        return messageObj;
    }
}

function clearInput() {
    nameInput.val(null);
    messageInput.val(null);
}

function onCloseHadler() {
    socket.onclose = () => init();
}

function sendMessage() {
    const data = setMessageToSend();
    if (!data) {
        return;
    }
    socket.send(JSON.stringify(data));
    clearInput();
}

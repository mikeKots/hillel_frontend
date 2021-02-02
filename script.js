const userInfoForm = document.querySelector('#gitHubUserInfo');
const userInput = document.querySelector('#userInfo');
const usersListEl = document.querySelector('#gitHubUsersList');
const templateEl = document.querySelector('#gitHubInfoUser').innerHTML;
const USER_URL = 'https://api.github.com/users/';

userInfoForm.addEventListener('submit', onTodoFormSubmit);

function onTodoFormSubmit(e) {
    e.preventDefault();
    const fullUserUrl = USER_URL + userInput.value;
    fetch(fullUserUrl)
    .then((res) => {
        if (res.status > 399) {
            throw res;
        }
        return res.json();
    })
    .then(renderUser)
    .catch((err) => console.error(`Sorry could not find user: ${userInput.value} status code: ${err.status}`));
}

function renderUser(userData) {
    const newRenderUsers = generateUsersHtml(userData);
    usersListEl.insertAdjacentHTML('beforeend', newRenderUsers);
}

function generateUsersHtml(userData) {
    return templateEl.replace('{{avatar_url}}', userData.avatar_url)
        .replace('{{login}}', userData.login)
        .replace('{{public_repos}}', userData.public_repos)
        .replace('{{followers}}', userData.followers)
        .replace('{{following}}', userData.following);
}

function resetForm() {
    userInfoForm.reset();
}
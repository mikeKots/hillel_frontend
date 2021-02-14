const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';

const menuTemplate = document.querySelector('#newMenyItem').innerHTML;
const contentTemplate = document.querySelector('#photoElement').innerHTML;
const contentEl = document.querySelector('.photos-area');
const menuEl = document.querySelector('.left-menu');
const menuItemEl = 'menu-item';
const menuArea = 'menu';
const contentArea = 'content';

let albumItem;

getAlbumsList();
getAlbumItem();

menuEl.addEventListener('click', rowClickHandler);

function rowClickHandler(event) {
    if (event.target.classList.contains(menuItemEl)) {
        return getPhotosByAlbumId(+event.target.dataset.albumId).then((res) => renderPhotosContent(res));
    }
}

function getPhotosByAlbumId(albumId) {
    const fullUrl = PHOTOS_URL + albumId;
    return doRequest(fullUrl, 'GET');
}

function getAlbumsList() {
    return doGetRequset().then((res) => {
        renderPhotosMenu(res);
        return getPhotosByAlbumId(res[0].id);
    }).then((res) => renderPhotosContent(res));
}

function getAlbumItem() {
    return doGetRequset().then((res) => albumItem = res);
}

function doGetRequset() {
    return doRequest(ALBUMS_URL, 'GET');
}

function doRequest(url, method) {
    return fetch(url, {
        method,
        headers: {
            'Content-type': 'appclication/json',
        }
    }).then((res) => res.json());
}

function renderPhotosMenu(list) {
    return render(list, menuEl, menuArea);
}

function renderPhotosContent(list) {
    return render(list, contentEl, contentArea);
}

function generateContentHtml(photoEl) {
    return generate(photoEl, photoEl, contentArea);
}

function generateMenuHtml(photoItem) {
    return generate(menuTemplate, photoItem, menuArea);
}

function generate(el, item, areaType) {
    if (areaType == menuArea) {
        return el
        .replace('{{menuItem}}', item.title)
        .replace('{{albumId}}', item.id);
    } else {
        return contentTemplate
        .replace('{{src}}', item.url)
        .replace('{{alt}}', item.title);
    }
}

function render(list, el, areaType) {
    let html;
    if (areaType == menuArea) {
        html = list.map(generateMenuHtml).join('');
    } else {
        html = list.map(generateContentHtml).join('');
    }
    el.innerHTML = html;
}

const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';
const albumsEl = document.querySelector('#albums');
const albumItemTemplate = document.querySelector('#albumItemTemplate').innerHTML;
const ALBUM_ITEM_CLASS = 'album-item';
const photoItemTemplate = document.querySelector('#photoItemTemplate').innerHTML;
const photosEl = document.querySelector('#photos');

const controller = new Controller({
    albumsUrl: ALBUMS_URL,
    photosUrl: PHOTOS_URL,
    albumsEl: albumsEl,
    albumItemTemplate: albumItemTemplate,
    albumsItemClass: ALBUM_ITEM_CLASS,
    photoItemTemplate: photoItemTemplate,
    photosEl: photosEl
});


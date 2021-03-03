class Model {
    constructor(options) {
        this._options = options;
    }

    fetch() {
        return fetch(this._url)
        .then((res) => res.json())
        .then((data) => this.setData(data));
    }

    getAlbums() {
        return fetch(this._options.albumsUrl)
            .then((resp) => resp.json())
            .then((albumsList) => {
                return albumsList;
            });
    }
    
    getFirstAlbumPhotos(data) {
        if (data.length) {
            return this.getPhotos(data[0].id);
        }
    }
    
    getPhotos(albumId) {
        return fetch(this.getPhotosUrl(albumId))
            .then((resp) => {
                 return resp.json()
            });
    }

    getPhotosUrl(albumId) {
        return this._options.photosUrl.replace('{{id}}', albumId);
    }
}
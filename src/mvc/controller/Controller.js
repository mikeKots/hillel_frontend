class Controller {
    constructor(options) {
        const viewOptions = options;
        viewOptions.onAlbumClick = (id) => this.getPhotos(id);
        this._options = options;
        this.albumsView = new AlbumsView(viewOptions);
        this.photosView = new PhotosView(this._options);
        this.model = new Model({
            albumsUrl: this._options.albumsUrl, 
            photosUrl: this._options.photosUrl
        });
        this.init();
    }

    init() {
        this.getAlbums().then((res) => this.model.getFirstAlbumPhotos(res)).then((res) => this.renderPhotos(res));
    }

    getPhotos(id) {
        this.model.getPhotos(id).then((res) => this.renderPhotos(res))
    }

    getAlbums() {
        return this.model.getAlbums().then((res) => {
            this.albumsView.renderAlbums(res);
            return res;
        });
    }

    renderPhotos(res) {
       return this.photosView.renderPhotos(res)
    }
}
class AlbumsView {
    constructor(options) {
        this._options = options;
        this._options.albumsEl.addEventListener('click', this.onAlbumsClick.bind(this));
    }

    generateAlbumHtml(album) {
        return this._options.albumItemTemplate
            .replace('{{id}}', album.id)
            .replace('{{title}}', album.title);
    }

    renderAlbums(data) {
        this._options.albumsEl.innerHTML = data
            .map((album) => this.generateAlbumHtml(album))
            .join('\n');
    }

    onAlbumsClick(e) {
        if (e.target.classList.contains(this._options.albumsItemClass)) {
            this._options.onAlbumClick(e.target.dataset.id);
        }
    }
}
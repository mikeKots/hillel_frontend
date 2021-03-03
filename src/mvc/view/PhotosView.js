class PhotosView {
    constructor(options) {
        this._options = options;
    }

    renderPhotos(data) {
        this._options.photosEl.innerHTML = data
            .map((photo) => this.generatePhotoHtml(photo))
            .join('\n');
    }

    generatePhotoHtml(photo) {
        return this._options.photoItemTemplate
            .replace('{{url}}', photo.thumbnailUrl)
            .replace('{{title}}', photo.title);
    }
}
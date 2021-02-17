$( document ).ready(() => {
    const STICKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/';
    const stickersResource = new Http(STICKERS_URL);

    const addButton = $('.stickers-header-button');
    const stickerList = $('.stickers-list');

    addButton.on('click', addNewsticker);

    getList();

    function addNewsticker() {
        stickersResource.create({}).then((res) => {stickerList.append(getStickerTemplate(res.id, res.description))});
    }

    function getStickerTemplate(id, description) {
        return $(`<div class="sticker" data-id="${id}">
        <div class="sticker-header">
            <label class="sticker-label">Label</label>
            <button class="sticker-button">X</button>
        </div>
        <div>
            <textarea class="sticker-description">${description}</textarea>
        </div>
        </div>`);
    }

    function getList() {
        stickersResource.get().then((res) => {
            res.forEach(sticker => {
                stickerList.append(getStickerTemplate(sticker.id, sticker.description));
            });
            registerDeleteListener();
            registerEditListener();
        });
    }

    function deleteSticker(e) {
        const id = +e.target.closest('.sticker').dataset.id;
        return stickersResource.delete(id).then((res) => {
            $(`[data-id=${id}]`).remove();
        });
    }

    function editSticker(e) {
        const id = +e.target.closest('.sticker').dataset.id;
        const description = $(e.target).val();
        return stickersResource.put(id, {description}).then((res) => {
            $(e.target).val(res.description);
        });
    }

    function registerDeleteListener() {
        $('.sticker-button').each((_, element) => {
            $(element).on('click', deleteSticker);
        })
    }

    function registerEditListener() {
        $('.sticker-description').each((_, element) => {
            $(element).on('blur', editSticker);
        })
    }

})


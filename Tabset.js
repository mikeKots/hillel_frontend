'use strict';

class Tabset {
    static ITEM_CLASS = 'kots-custom-tab';
    static ITEM_TITLE_CLASS = 'kots-tabset-title';
    static OPEN_CLASS = 'open-body';
    static BODY_CONTAINER = 'body-container';
    static ACTIVE_TAB = 'active-tab';
    
    constructor(el) {
        this._el = el;
        this.bindEvents(el);
    }

    clickHandler = (event) => {
        if (event.target.classList.contains((Tabset.ITEM_TITLE_CLASS))) {
            const itemEl = this.findItem(event.target);
            this.toggleClass(itemEl, Tabset.ACTIVE_TAB);
            const activeIndex = Array.from(itemEl.parentElement.children).indexOf(itemEl);
            this.toggleActiveItem(activeIndex);
        }
    }

    toggleActiveItem(index) {
        const bodyContainer = document.querySelector('.' + Tabset.BODY_CONTAINER);
        this.toggleClass(bodyContainer.children[index], Tabset.OPEN_CLASS);
    }

    bindEvents(el) {
        el.addEventListener('click', this.clickHandler);
    }

    toggleClass(el, className) {
        const previosActiveTab = document.querySelector('.' + className);
        previosActiveTab.classList.remove(className);
        el.classList.toggle(className);
    }

    findItem(el) {
        return el.closest('.' + Tabset.ITEM_CLASS);
    }
}
class NewTodoForm {
    static CREATE_BTN_SELECTOR = '#createBtn';
    static CREATE_INPUT_SELECTOR = '#todoInput'; 

    constructor(options) {
        this._$el = this.initAddForm()
        this._options = options;
    }

    initAddForm() {
        return $('<ul class="create-todo-form"></ul>')
        .on(
            'click', 
            NewTodoForm.CREATE_BTN_SELECTOR,
            this.onCreateClick.bind(this)
        );
    }

    appendTo($container) {
        $container.append(this._$el);
    }

    renderCreateForm() {
        const html = this.generateItemHtml();
        this._$el.html(html);
    }

    generateItemHtml() {
        return $(`
            <input id="todoInput"></input>
            <button id="createBtn">Add</button>
        `);
    }

    resetForm() {
        $(NewTodoForm.CREATE_INPUT_SELECTOR).val('');
    }

    onCreateClick(e) {
        const $itemEl = $(e.target);
        const item = $itemEl.prev().val();
        this._options.onCreate(item);
        
    }
}

class Http {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    request(url, uri, method, data) {
        debugger
        return fetch(url + uri, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                'Content-type': 'application/json',
            }
        }).then((res) => res.json());
    }

    get(url ,uri = '') {
        debugger
        return this.request(url, uri, 'GET');
    }

    getById(id) {
        return this.get(id);
    }
}
export class Http {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    request(uri, method, data) {
        return fetch(this._baseUrl + uri, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                'Content-type': 'application/json',
            }
        }).then((res) => res.json());
    }

    get(uri = '') {
        return this.request(uri, 'GET');
    }

    delete(id) {
        return this.request(id, 'DELETE');
    }

    post(data) {
        return this.request('', 'POST', data);
    }

    put(id, data) {
        return this.request(id, 'PUT', data);
    }

    create(data) {
        return this.post(data);
    }

    update(id, data) {
        return this.put(id, data);
    }

    list() {
        return this.get();
    }

    getById(id) {
        return this.get(id);
    }
}
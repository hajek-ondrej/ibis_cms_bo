import config from "../config.js";
import localForage from "localforage";
let __instance = null;

class Fetch {
    constructor() {
        this.token = null;
        this.refresh = null;
    }

    request(url, options) {
        return new Promise((resolve, reject) => {
            const fail = data => {
                console.warn('Request failed for '.concat(url, ': ', data.statusText));
                switch (data && data.status) {
                    case 408:
                        this.token = this.refresh;
                        this.post('user/refresh').then(tokens => {
                            if (tokens.a) {
                                this.token = tokens.a;
                                this.refresh = tokens.r;

                                localForage.setItem('ibis', {
                                    id: tokens.i,
                                    token: tokens.a,
                                    refresh: tokens.r
                                }).then(
                                    () => { this.request(url, options).then(resolve, reject) }
                                , reject);
                            } 
                            else
                                reject();

                        }, reject);
                    break;
                }
            };

            fetch(config.Rest.url.concat(url), Object.assign({
                    headers: Object.assign({ 'Content-Type': 'application/json' }, 
                        this.token ? { 'Authorization' : 'Bearer ' + this.token } : null
                    )
                }, options)).then(
                    data => {
                        if (data.ok) {
                            const type = data.headers.get('Content-Type');
                            if (type.substr(0, 16).toLowerCase() == 'application/json')
                                data.json().then(resolve, reject)
                            else if (type.substr(0, 9).toLowerCase() == 'text/html')
                                data.text().then(resolve, reject)
                            else
                                resolve(data);
                        }
                        else {
                            fail(data);
                        }
                    }, 
                    fail
                )
        });
    }

    post(url, data) {
        return this.request(url, {
                method: 'POST',
                body: JSON.stringify(data),
        });
    }

    put(url, data) {
        return this.request(url, {
                method: 'PUT',
                body: JSON.stringify(data),
        });
    }

    get(url, options) {
        const query = options ? Object.keys(options).filter(k => options[k]).map(k => k.concat('=', options[k])).join('&') : null;
        return this.request(query && url.concat('?', query) || url, {
                method: 'GET'
        });
    }
}

if (!__instance)
    __instance = new Fetch();

export default __instance;
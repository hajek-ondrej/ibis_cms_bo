import types from "../types.js"
import config from "../config.js"
import localForage from "localforage";
import Fetch from "../classes/Fetch.js";
import { push } from 'connected-react-router'
import moment from "moment"

let __instance = null;

class App {
    constructor() {
        this.lang = null;
        this.redirectAfterLogin = null;

        this.authorizeClientPromise = null;
        this.getStoredTokenPromise = null;
        this.authorize = this.authorize.bind(this);
        this.authorizeClient = this.authorizeClient.bind(this);
        this.authorizeUser = this.authorizeUser.bind(this);
        this.getTranslations = this.getTranslations.bind(this);
        this.getStoredToken = this.getStoredToken.bind(this);
        
    }



    authorizeUser(credentials) {
        return dispatch => {
            return new Promise((resolve, reject) => {
                const fail = e => {
                    console.warn('Could not authorize user.', e);
                    reject();
                }

                Fetch.post('user/auth', credentials).then(
                    tokens => {
                        Fetch.token = tokens.a;
                        Fetch.refresh = tokens.r;

                        localForage.setItem('ibis', {
                            id: tokens.i,
                            token: tokens.a,
                            refresh: tokens.r
                        }).then(
                            success => {
                                dispatch({
                                    type: types.User.logged,
                                    id: tokens.i
                                });
                                if (this.redirectAfterLogin)
                                    dispatch(push(this.redirectAfterLogin));

                                resolve();
                            },
                            fail);
                    }, fail);
            });
        }
    }

    authorize() {
        if (Fetch.token)
            return new Promise((resolve, reject) => resolve());
        else
            return this.authorizeClient()

    }


    authorizeClient() {
        if (!this.authorizeClientPromise)
            this.authorizeClientPromise = new Promise((resolve, reject) => {
                const fail = e => {
                    console.warn('Could not authorize client.', e);
                    reject();
                }

                Fetch.post(this.lang.concat('/client/auth'), 
                    {
                        client_key: config.Rest.auth.key,
                        client_secure: config.Rest.auth.secure
                    }
                ).then(
                    data => {
                        data.text().then(
                            token => {
                                Fetch.token = token;
                                resolve();
                            }, fail)
                    }, fail);
            });

        return this.authorizeClientPromise;
    }

    getStoredToken() {
        if (!this.getStoredTokenPromise)
            this.getStoredTokenPromise = new Promise((resolve, reject) => {
                localForage.getItem('ibis').then(
                    data => {
                        if (data && data.token) {
                            Fetch.token = data.token || null; 
                            Fetch.refresh = data.refresh || null; 

                            resolve(data.id);
                        }
                        else
                            reject();
                    }, reject);
            });

        return this.getStoredTokenPromise;
    }
    


    getTranslations(id) {
        return dispatch => {
            return new Promise((resolve, reject) => {
                this.authorize().then(
                    () => {
                        Fetch.get('conf/' + id).then(translations => {
                            dispatch({
                                type: types.App.addTranslations,
                                translations
                            });
                            resolve();
                    }, reject)
                })
            });
        };
    }

    run(dispatch, options) {
        this.lang = options.al;
        moment.locale(this.lang)

        this.redirectAfterLogin = options.history.location.pathname != '/login' ? options.history.location.pathname : '/';

        dispatch({ 
            type: types.App.init,
            al: this.lang
        });

        this.getStoredToken().then(
            id => {
                dispatch({
                    type: types.User.logged,
                    id
                })
                dispatch(push(this.redirectAfterLogin));
            },
            fail => {
                this.authorizeClient().then(
                    success => {
                        dispatch(push('/login'));
                    }
                )
            },
        );
        
    }

    
}

if (!__instance)
    __instance = new App();

export default __instance;
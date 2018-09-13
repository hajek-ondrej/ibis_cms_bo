import Fetch from "../classes/Fetch.js";
import { push } from 'connected-react-router'
import types from "../types.js";

let __instance = null;

class Deltas {
    constructor() {
        this.findArticles = this.findArticles.bind(this)
        this.changeStub = this.changeStub.bind(this)
        this.getArticle = this.getArticle.bind(this)
        this.saveArticle = this.saveArticle.bind(this)
    }

    findArticles() {
        return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
            
                const options = Object.assign({
                    page: 1,
                    sort: 'date',
                    order: 'desc',
                    search: null,
                    state: 'all',
                }, {});
                
                Fetch.get('articles', options).then(resolve, reject);

            });
        };
    }

    getArticle(id) {
        return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                Fetch.get('articles/' + id).then(article => {
                    dispatch({
                        type: types.Deltas.articleLoaded,
                        article,
                        id
                    })
                    resolve(article)
                }, reject);
            });
        };
    }

    goToArticle(url) {
        return (dispatch, getState) => {
            dispatch(push(url));
        }
    }

    saveArticle() {
        return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                const state = getState();
                const lang = state.App.locale.active;
                const data = {
                    title: {}, delta: {},  visibility: state.Deltas.stub.published ? '11' : '00'
                }
                data.title[lang] = state.Deltas.stub.title;
                data.delta[lang] = state.Deltas.stub.delta;

                if (state.Deltas.active)
                    Fetch.put('articles/' + state.Deltas.active, data).then(resolve, reject);
                else
                    Fetch.post('articles', data).then(resolve, reject);
            });
        };
    }

    changeStub(stub) {
        return {
            type: types.Deltas.stubChanged,
            stub
        }
    }
    
}

if (!__instance)
    __instance = new Deltas();

export default __instance;
import types from "../types.js";

export default (state = {
    active: null,
    stub: {
        title: null,
        delta: null,
        published: false
    }
}, action) => {
    let next = Object.assign({}, state);
    
    switch (action.type) {
        case types.Deltas.stubChanged:
            next.stub = Object.assign(state.stub, action.stub);
        break;

        case types.Deltas.articleLoaded:
            const article = action.article || {};
            next.stub = {
                title: article.title,
                delta: article.delta && JSON.parse(article.delta) || "",
                published: article.visibility == '11'
            }
            next.active = action.id;
        break;
    }
    
    return next;
};


import types from "../types.js";

export default (state = {
    locale: {
        active: 'en'
    },
    translations: null
}, action) => {
    let next = Object.assign({}, state);
    
    switch (action.type) {
        case types.App.init:
            next.locale.active = action.al;
        break;

        case types.App.addTranslations:
            next.translations = Object.assign({}, next.translations, action.translations)
        break;
      
    }
    
    return next;
};


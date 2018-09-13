import types from "../types.js";

export default (state = {
    logged: false
}, action) => {
    let next = Object.assign({}, state);
    
    switch (action.type) {
        case types.User.logged:
            next.logged = true;
        break;

        case types.User.loggedOut:
            next.logged = false;
        break;
    }

    return next;
};


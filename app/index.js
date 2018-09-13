/* react / redux */
import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware, connectRouter } from "connected-react-router";

import 'css-reset-and-normalize-sass'

/* styles */
import "./assets/scss/main.scss"

/* components */
import App from "./components/App.jsx"

import creators from "./creators/creators.js"
import reducers from "./reducers/reducers.js"

import ImageResize from "quill-image-resize-module";
import 'react-quill/dist/quill.snow.css';
import { Quill } from "react-quill";

Quill.register('modules/ImageResize', ImageResize);
const Parchment = Quill.import('parchment');
Quill.register(new Parchment.Attributor.Style('display', 'display', { 
    whitelist: ['inline']
}));
Quill.register(new Parchment.Attributor.Style('float', 'float', { 
    whitelist: ['left', 'right', 'center']
}));
Quill.register(new Parchment.Attributor.Style('margin', 'margin', {}));
  
const history = createBrowserHistory({ basename: '/ibis/cms/bo/dist'});
const store = createStore(
    connectRouter(history)(reducers), 
        compose(
            applyMiddleware(
                routerMiddleware(history), thunk
            )
        )
    );
const root = document.getElementById('app');

creators.App.run(store.dispatch, {
    al: root.getAttribute('data-al'),
    history
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  root
);

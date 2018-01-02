import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Router } from 'react-router-dom';
import history from './history';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { AUTHENTICATE } from './actions/actionTypes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTHENTICATE })
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} >
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

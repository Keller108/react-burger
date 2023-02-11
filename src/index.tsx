import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import './index.css';
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components';
import { store } from './services/store';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);

//@ts-ignore
if (window.Cypress !== null) {
    //@ts-ignore
    window.store = store;
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();

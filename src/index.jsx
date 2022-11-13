import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components';
import { rootReducer } from './services/reducers';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const store = createStore(rootReducer);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();

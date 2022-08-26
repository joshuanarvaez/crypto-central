import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; //wrap our app with provider so we can access from entire app

import App from './App';
import store from './app/store' //provide this variable to provider below
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router>
        <Provider store={store}>
          <App />
        </Provider>
    </Router>, 
    document.getElementById('root')
    );
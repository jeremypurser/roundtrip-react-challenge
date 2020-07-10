import React from 'react';
import ReactDOM from 'react-dom';
import { APIClient } from './api/APIClient';
import { App } from './App';
import { Environment } from './config/Environment';
import * as serviceWorker from './serviceWorker';

function start() {
  Environment.set({
    api: new APIClient(process.env.REACT_APP_API_URL!),
  });

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

start();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

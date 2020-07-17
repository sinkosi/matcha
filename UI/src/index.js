import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import * as serviceWorker from './serviceWorker';
import { getCookie } from './utils/cookies'

let cookieToken = getCookie('token')
let userData = {}

userData.loggedIn = cookieToken ? true : false
userData.token = userData.loggedIn ? cookieToken : undefined

ReactDOM.render(
  <React.StrictMode>
    <App userData={userData} />,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

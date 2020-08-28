import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { getCookie } from './utils/cookies'

let cookieToken = getCookie('token')
let loginData = getCookie('loginData');

let userData = {}
userData.loggedIn = cookieToken ? true : false
userData.token = userData.loggedIn ? cookieToken : undefined

if (loginData) {
  loginData = JSON.parse(loginData);
  userData = loginData;
}

ReactDOM.render(
  <React.StrictMode>
    <App userData={userData} />,
  </React.StrictMode>,
  document.getElementById('root')
);


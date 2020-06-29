import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import ForgotPassword from './Components/Views/ForgotPassword'
import Header from './Components/Header'
import Home from './Components/Home';
import SignIn from './Components/Views/SignIn';
// import Signup from './Components/Views/Signup';
import CompleteProfile from './Components/Views/CompleteProfile'


function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <CompleteProfile />
    </Fragment>

  );
}

export default App;
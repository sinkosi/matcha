import React, { Fragment } from 'react';
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
// import Header from './Components/Header'
import Home from './Components/Home';
import SignIn from './Components/Views/SignIn';
import SignUp from './Components/Views/SignUp';
import ForgotPassword from './Components/Views/ForgotPassword'
import CompleteProfile from './Components/Views/CompleteProfile'


function App(props) {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={SignIn} exact path="/signin" />
          <Route component={SignUp} exact path="/signup" />
          <Route component={ForgotPassword} exact path="/forgotpassword" />


          <Route component={CompleteProfile} exact path="/completeprofile" />


        </Switch>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
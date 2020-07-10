import React, { Fragment } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
// import Header from './Components/Header'
import SignIn from './Components/Views/SignIn';
import SignUp from './Components/Views/SignUp';
import ForgotPassword from './Components/Views/ForgotPassword'
import CompleteProfile from './Components/Views/CompleteProfile'
import Users from './Components/Views/Users'
import UserProfile from './Components/Views/UserProfile'
import UserProfileEdit from './Components/Views/UserProfileEdit'
import ActivateUser from './Components/ActivateUser'

function App(props) {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/users" />
          <Route component={SignIn} exact path="/signin" />
          <Route component={SignUp} exact path="/signup" />
          <Route component={ForgotPassword} exact path="/forgotpassword" />


          <Route component={CompleteProfile} exact path="/completeprofile" />
          <Route component={Users} exact path="/users" />
          <Route component={UserProfile} exact path="/users/:userId" />
          <Route component={UserProfileEdit} exact path="/users/:userId/edit" />
          <Route component={ActivateUser} exact path="/activate/:userId/:activationCode" />


        </Switch>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
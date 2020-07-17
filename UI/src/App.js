import React, { Fragment, useState, useContext } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header'
import SignIn from './Components/Views/SignIn';
import SignUp from './Components/Views/SignUp';
import ForgotPassword from './Components/Views/ForgotPassword'
import CompleteProfile from './Components/Views/CompleteProfile'
import Users from './Components/Views/Users'
import UserProfile from './Components/Views/UserProfile'
import UserProfileEdit from './Components/Views/UserProfileEdit'
import ActivateUser from './Components/ActivateUser'
import ProtectedRoute from './Components/ProtectedRoute'
import SignedOutRoute from './Components/SignedOutRoute'
import {getCookie} from './utils/cookies'
import { UserContext } from './Components/UserContext'

function App(props) {
  // const handleLoggedInStatus = () => {getCookie('token') ? setLoggedIn(true) : setLoggedIn(false)}
  const [userData, setUserData] = useState(props.userData)

  return (
    <Fragment>

      <CssBaseline />
      <UserContext.Provider value={{userData, setUserData}}>
        { userData.loggedIn ? <Header setUserData={setUserData} /> : <></> }
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/users" />
            <SignedOutRoute exact path="/signin" component={SignIn} {...props} />
            <SignedOutRoute exact path="/signup" component={SignUp} {...props} />
            <SignedOutRoute exact path="/forgotpassword" component={ForgotPassword} {...props} />
            <Route component={ActivateUser} exact path="/activate/:userId/:activationCode" />

            <ProtectedRoute component={CompleteProfile} exact path="/completeprofile" />
            <ProtectedRoute component={Users}  exact path="/users" />
            <ProtectedRoute component={UserProfile} exact path="/users/:userId" />
            <ProtectedRoute component={UserProfileEdit} exact path="/users/:userId/edit" />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </Fragment>

  );
}

export default App;
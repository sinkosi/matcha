import React, { Fragment, useState } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header'
import SignIn from './Components/Views/SignIn';
import SignUp from './Components/Views/SignUp';
import ForgotPassword from './Components/Views/ForgotPassword'
import CompleteProfile from './Components/Views/CompleteProfile'
import Users from './Components/Views/Users'
// import UsersByTags from './Components/Views/UsersByTags'
import UserProfile from './Components/Views/UserProfile'
import Chat from './Components/Views/Chat'
import UserProfileEdit from './Components/Views/UserProfileEdit'
import ActivateUser from './Components/ActivateUser'
import ProtectedRoute from './Components/ProtectedRoute'
import SignedOutRoute from './Components/SignedOutRoute'
import AccountNotActivated from './Components/Views/AccountNotActivated'
import RegistrationSuccessful from './Components/Views/RegistrationSuccessful'
import { UserContext } from './Components/UserContext'

function App(props) {
  // const handleLoggedInStatus = () => {getCookie('token') ? setLoggedIn(true) : setLoggedIn(false)}
  const [userData, setUserData] = useState(props.userData)

  return (
    <Fragment>

      <CssBaseline />
      <UserContext.Provider value={{userData, setUserData}}>
        <BrowserRouter>
        { userData.loggedIn ? <Header setUserData={setUserData} {...props} /> : <></> }
          <Switch>
            <Redirect exact from="/" to="/users" />
            <SignedOutRoute exact path="/signin" component={SignIn} {...props} />
            <SignedOutRoute exact path="/accountnotactivated" component={AccountNotActivated} {...props} />
            <SignedOutRoute exact path="/registrationsuccessful" component={RegistrationSuccessful} {...props} />
            <SignedOutRoute exact path="/signup" component={SignUp} {...props} />
            <SignedOutRoute exact path="/forgotpassword" component={ForgotPassword} {...props} />
            <Route component={ActivateUser} exact path="/activate/:userId/:activationCode" />

            <ProtectedRoute exact path="/completeprofile" component={CompleteProfile}  {...props}/>
            <ProtectedRoute component={Users}  exact path="/users" />
            {/* <ProtectedRoute component={UsersByTags}  exact path="/users/interests" /> */}
            <ProtectedRoute component={UserProfile} exact path="/users/:userId" userData={userData}/>
            <ProtectedRoute component={UserProfile} exact path="/profile" />
            <ProtectedRoute component={UserProfileEdit} exact path="/profile/edit" />
            <ProtectedRoute component={Chat} exact path="/chat" />
            <ProtectedRoute component={Chat} exact path="/chat/:userId" />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </Fragment>

  );
}

export default App;
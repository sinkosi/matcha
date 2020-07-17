import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext'

const SignedOutRoute = ({ component: Component, ...rest }) => {
  const {userData} = useContext(UserContext)

 
  return (
    <>
      { userData.loggedIn ? 
        <Redirect to='/' /> :
        <Route {...rest} render={props => <Component {...rest} {...props} />} />
      }
       </>    
  )
}

export default SignedOutRoute;
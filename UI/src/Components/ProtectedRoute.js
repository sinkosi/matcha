import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {userData} = useContext(UserContext)

 
  return (
    <>
      { userData.loggedIn ? 
        <Route {...rest} render={props => <Component {...rest} {...props} />} /> :
        <Redirect to='/signin' />
      }
       </>    
  )
}

export default ProtectedRoute;
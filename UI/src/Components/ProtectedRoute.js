import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext'
import CompleteProfile from './Views/CompleteProfile'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {userData} = useContext(UserContext)

 
  return (
    <>
      { !userData.loggedIn ? 
          <Redirect to='/signin' /> :
          !userData.completed ?
          <Route {...rest} render={props => <CompleteProfile {...rest} {...props} />} /> :
            <Route {...rest} render={props => <Component {...rest} {...props} />} />
      }
       </>    
  )
}

export default ProtectedRoute;
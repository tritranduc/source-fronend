import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { Spinner } from 'react-bootstrap'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  var { stateAuth } = useContext(AuthContext)
  var { authLoading, isAuthenticated } = stateAuth
  if (authLoading)
    return (
      <div class="spinner-container">
        <Spinner animation="border" role="primary"></Spinner>
      </div>
    )
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <>
              <NavbarMenu />
              <Component {...rest} {...props} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  )
}

export default ProtectedRoute

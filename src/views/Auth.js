import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import './auth.css'
import { AuthContext } from '../contexts/authContext'
import { Redirect } from 'react-router-dom'
import { useContext } from 'react'

import { Spinner } from 'react-bootstrap'

const Auth = ({ authRoute }) => {
  var { stateAuth } = useContext(AuthContext)
  var { authLoading, isAuthenticated } = stateAuth
  let body
  if (authLoading)
    body = (
      <div class="d-flex justify-content-center">
        <Spinner animation="border" role="primary"></Spinner>
      </div>
    )
  else if (isAuthenticated) return <Redirect to="/dashboard" />
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    )
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>mạng xã hội cho tất cả mọi người</h1>
          <h4>tất cả mọi người điều có thể dùng</h4>
          {body}
        </div>{' '}
      </div>
    </div>
  )
}

export default Auth

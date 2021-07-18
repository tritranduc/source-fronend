import { createContext, useEffect } from 'react'
import axios from 'axios'
import { StorageKey, ServerHost } from '../constion'
import {
  setAuthLoginSuccess,
  setAuthLoginFailed,
  loadUser,
  setLogout,
} from '../reducers/AuthReducer'

import { useSelector, useDispatch } from 'react-redux'
import setAuthToken from '../utils/setAuthToken'

export var AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  var stateRedux = useSelector((state) => state)
  var stateAuth = stateRedux.auth
  var dispatch = useDispatch()

  var loginUser = async (loginFrom) => {
    try {
      var response = await axios.post(`${ServerHost}/auth/login`, loginFrom)
      if (response.data.success) {
        localStorage.setItem(StorageKey, response.data.accessToken)
        setAuthToken(response.data.accessToken)
        dispatch(setAuthLoginSuccess(response.data))
        dispatch(loadUser())
      }
      return response.data
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data)
        dispatch(setAuthLoginFailed(error.response.data))
        return error.response.data
      } else {
        dispatch(setAuthLoginFailed({ success: false, message: error.message }))
        return { success: false, message: error.message }
      }
    }
  }
  var registerUser = async (loginFrom) => {
    try {
      var response = await axios.post(`${ServerHost}/auth/register`, loginFrom)
      if (response.data.success) {
        localStorage.setItem(StorageKey, response.data.accessToken)
        setAuthToken(response.data.accessToken)
        dispatch(setAuthLoginSuccess(response.data))
        dispatch(loadUser())
      }
      return response.data
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data)
        dispatch(setAuthLoginFailed(error.response.data))
        return error.response.data
      } else {
        dispatch(setAuthLoginFailed({ success: false, message: error.message }))
        return { success: false, message: error.message }
      }
    }
  }
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  var logoutUser = () => {
    localStorage.removeItem(StorageKey)
    setAuthToken(null)
    dispatch(setLogout())
    dispatch(loadUser())
  }
  const authContextData = {
    stateAuth,
    loginUser,
    dispatch,
    registerUser,
    logoutUser,
  }

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider

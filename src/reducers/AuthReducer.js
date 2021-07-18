import { createSlice } from '@reduxjs/toolkit'
import { initialAuthState } from '../constion'

import { StorageKey, ServerHost } from '../constion'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'

var initialState = initialAuthState
var AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      var { isAuthenticated, user } = action.payload
      return {
        ...state,
        isAuthenticated,
        user,
        authLoading: false,
      }
    },
    setAuthLoginSuccess: (state, action) => {
      var { accessToken } = action.payload
      state.authLoading = false
      state.isAuthenticated = true
      state.user = accessToken
      state.accessToken = accessToken
    },
    setAuthLoginFailed: (state, action) => {
      state.message = action.payload.message
      state.success = action.payload.success
    },
    setAccessToken: (state, action) => {
      var { AccessToken } = action.payload
      state.accessToken = AccessToken
    },
    setLogout(state, action) {
      return {
        ...state,
        authLoading: false,
        isAuthenticated: false,
        user: null,
        success: true,
        message: '',
        type: 'primary',
        accessToken: '',
      }
    },
  },
})
var {
  setAuth,
  setAuthLoginSuccess,
  setAuthLoginFailed,
  setAccessToken,
  setLogout,
} = AuthReducer.actions
export {
  setAuth,
  setAuthLoginSuccess,
  setAuthLoginFailed,
  setAccessToken,
  setLogout,
}
export var loadUser = () => async (dispatch, state) => {
  if (localStorage[StorageKey]) {
    setAuthToken(localStorage[StorageKey])
  }
  var stateAuth = state()
  stateAuth = stateAuth.auth
  try {
    var response = await axios.get(`${ServerHost}/auth`)
    if (response.data.success) {
      if (
        stateAuth.user !== response.data.user ||
        localStorage[StorageKey] !== stateAuth.accessToken
      ) {
        dispatch(setAccessToken({ AccessToken: localStorage[StorageKey] }))
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: response.data.user,
          }),
        )
      }
    }
  } catch (error) {
    localStorage.removeItem(StorageKey)
    setAuthToken(null)
    dispatch(
      setAuth({
        isAuthenticated: false,
        user: null,
      }),
    )
  }
}
export default AuthReducer.reducer
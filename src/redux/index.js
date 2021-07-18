import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import { createLogger } from 'redux-logger'
import AuthReducer from '../reducers/AuthReducer'
import ReduxThunk from 'redux-thunk'
import PostReducer from '../reducers/PostReducer'
import AppReduces from '../reducers/AppReduces'
var reducer = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  app: AppReduces,
})
// var logger = createLogger()
var store = configureStore({
  reducer,
  middleware: [
    // process.env.NODE_ENV !== 'production' ? logger : null,
    ReduxThunk,
    ...getDefaultMiddleware(),
  ],
})
export default store

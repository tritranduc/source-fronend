import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialAppState, ServerHost } from './../constion'
import axios from 'axios'
export var getUser = createAsyncThunk(
  'app/getUser',
  async (data, { getState }) => {
    var userPost = await axios.get(`${ServerHost}/post/getmyallpost`)
    userPost = userPost.data.post
    var userInfo = await axios.get(`${ServerHost}/auth/getuserinfo`)
    userInfo = userInfo.data.user
    return { posts: userPost, user: userInfo }
  },
)

var initialState = initialAppState
var appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    hideErrorApp: (state, actions) => {
      state.userInfo.success = true
      state.userInfo.message = ''
    },
  },
  extraReducers: {
    [getUser.pending]: (state, actions) => {
      state.userInfo = {
        ...state.userInfo,
        user: [],
        posts: [],
        loading: true,
      }
      console.log(actions)
    },
    [getUser.rejected]: (state, actions) => {
      state.userInfo.loading = false

      state.userInfo.success = false
      console.log(actions)
      var error = actions.error
      if (error.response && error.response.data) {
        state.userInfo.message = error.response.data.message
      } else {
        state.userInfo.message = error.message
      }
    },
    [getUser.fulfilled]: (state, actions) => {
      var { payload } = actions
      state.userInfo.loading = false
      state.userInfo.user = payload.user
      state.userInfo.posts = payload.posts
      console.log(actions)
    },
  },
})
export var { hideErrorApp } = appSlice.actions
export default appSlice.reducer

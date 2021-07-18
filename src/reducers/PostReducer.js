import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { initialPostState, ServerHost } from '../constion'

export var DeletePostReducer = createAsyncThunk(
  'post/Delete',
  async (PostId, thunkApi) => {
    var response = await axios.post(`${ServerHost}/post/delete`, { id: PostId })
    return response.data
  },
)

var initialState = initialPostState
var PostReducer = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setGetPostSuccess(state, action) {
      state.posts = action.payload.post
      state.postLoading = false
    },
    setGetPostError(state, action) {
      state.success = false
      state.postLoading = false
      state.message = action.payload.message
    },
    addPostReading: (state, action) => {
      console.log(action.payload)
      state.PostReading = action.payload
    },
    setLikeError(state, actions) {
      state.success = false
      state.message = actions.payload.message
    },
    setLikeSuccess(state, actions) {
      state.posts = state.posts.map((item) => {
        if (item._id === actions.payload.post._id) {
          item = actions.payload.post
        }
        return item
      })
      if (state.PostReading) {
        if (state.PostReading._id === actions.payload.post._id)
          state.PostReading = actions.payload.post
      }
    },
    addPostSuccess(state, action) {
      state.posts.push(action.payload.data)
    },
    addPostError(state, action) {
      state.success = false
      state.message = action.payload.message
    },
    hideError(state, actions) {
      state.success = true
      state.message = null
    },
    findPost(state, action) {
      var postUserClick = state.posts.find(
        (post) => post._id === action.payload._id,
      )
      state.postEdit = postUserClick
    },
    UpdatePostSuccess(state, actions) {
      state.posts = state.posts.map((post) =>
        post._id === actions.payload._id ? actions.payload : post,
      )
    },
    UpdatePostError(state, action) {
      state.success = false
      state.message = action.payload.message
    },
  },
  extraReducers: {
    [DeletePostReducer.rejected]: (state, actions) => {
      state.success = false
      console.log(actions)
      var error = actions.error
      if (error.response && error.response.data) {
        state.message = error.response.data.message
      } else {
        state.message = error.message
      }
    },
    [DeletePostReducer.fulfilled]: (state, actions) => {
      console.log(actions)
      state.posts = state.posts.filter(
        (post) => post._id !== actions.payload.post._id,
      )
    },
  },
})

export var {
  setGetPostSuccess,
  setGetPostError,
  addPostReading,
  setLikeError,
  setLikeSuccess,
  addPostSuccess,
  addPostError,
  hideError,
  findPost,
  UpdatePostSuccess,
  UpdatePostError
} = PostReducer.actions
export var getAllPost = () => async (dispatch, getState) => {
  var post = []
  var postState = getState().post.posts
  try {
    var responsePublicPost = await axios.get(`${ServerHost}/post/public`)
    var responsePrivatePost = await axios.get(`${ServerHost}/post/private`)
    responsePublicPost.data.posts.map((item) => {
      post.push(item)
      return item
    })
    responsePrivatePost.data.posts.map((item) => {
      post.push(item)
      return item
    })
    postState = postState.slice()
    post = post.slice()
    if (postState === post) {
    } else {
      dispatch(setGetPostSuccess({ post, success: true }))
    }
    return { post, success: true }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(setGetPostError(error.response.data))
      return error.response.data
    } else {
      dispatch(setGetPostError({ success: false, message: error.message }))
      return { success: false, message: error.message }
    }
  }
}

export default PostReducer.reducer

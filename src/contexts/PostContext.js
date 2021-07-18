import axios from 'axios'
import { createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ServerHost } from '../constion'
import { setLikeError, setLikeSuccess } from '../reducers/PostReducer'

export var PostContext = createContext()

var PostContextProvider = ({ children }) => {
  const postState = useSelector((state) => state.post)
  const dispatch = useDispatch()
  var addLike = async (postId) => {
    try {
      var response = await axios.post(`${ServerHost}/post/addLike`,{postId})
      if (response.data.success) {
        dispatch(setLikeSuccess(response.data))
        return response.data
      }
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setLikeError(error.response.data))
        return error.response.data
      } else {
        dispatch(setLikeError({ success: false, message: error.message }))
        return { success: false, message: error.message }
      }
    }
  }
  var PostContextData = { postState , addLike}
  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  )
}
export default PostContextProvider

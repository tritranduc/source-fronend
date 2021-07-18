export const ServerHost =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000'
    : 'https://social-networking-project-tri.herokuapp.com'
console.log(ServerHost)
export const StorageKey = 'xiCute'
export const initialAuthState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
  success: true,
  message: '',
  type: 'primary',
  accessToken: '',
}
export const initialPostState = {
  postEdit:null,
  posts: [],
  postLoading: true,
  success: true,
  message: null,
  PostReading: null,
  type: 'primary',
}
export const initialAppState = {
  userInfo: {
    user: {},
    posts: [],
    loading: true,
    success: true,
    message: '',
    type: 'primary',
  },
}
export var imageError = ServerHost + '/image/serverImageDebug.png'

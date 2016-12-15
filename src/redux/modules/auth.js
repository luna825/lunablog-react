import {fromJS} from 'immutable'
import ApiClient from 'utils/ApiClient'

const client = new ApiClient()

const LOGIN = "app/auth/LOGIN"
const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS"
const LOGIN_FAIL = "app/auth/LOGIN_FAIL"

const LOADUSER = 'app/auth/LOADUSER'
const LOADUSER_SUCCESS = 'app/auth/LOADUSER_SUCCESS'
const LOADUSER_FAIL = 'app/auth/LOADUSER_FAIL'

const LOGOUT = 'app/auth/LOGOUT';
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'app/auth/LOGOUT_FAIL';


const initialState = fromJS({
  isAuthenticated: false
})

export default function reducer(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return state.set('isAuthenticating', true)
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticating:false,
        token:action.result.token,
        isAuthenticated:true
      })
    case LOGIN_FAIL:
      return state.merge({
        isAuthenticating:false,
        isAuthenticated:false,
        error: action.error
      })
    case LOADUSER:
      return state.set('loadingUser', true)
    case LOADUSER_SUCCESS:
      return state.merge({
        loadingUser:false,
        userInfo: action.result
      })
    case LOADUSER_FAIL:
      return state.merge({
        loadingUser:false,
        error: action.error
      })
    case LOGOUT:
      return state.merge({
        isAuthenticated: false,
        token: null,
        userInfo: null
      })
    default:
      return state;
  }
}

export function login(email, password){

  return {
    types:[LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client)=>client.post('/auth/login',{
      data:{
        email,
        password
      }
    })
  }
}


function loginRequest(){
  return {
    type: LOGIN
  }
}

function loginSuccess(result){
  return {
    type: LOGIN_SUCCESS,
    result
  }
}

function LoginFail(error){
  return {
    type: LOADUSER_FAIL,
    error
  }
}



export function loadUser(token){
  return {
    types:[LOADUSER, LOADUSER_SUCCESS, LOADUSER_FAIL],
    promise: (client)=>client.get('/users/getMe',{
      token: token
    })
  }
}

export function loadUserInfo(email, password){
  return (getState, dispatch)=>{
    dispatch(loginRequest())
    return client.post('/auth/login',{
      data:{
        email,
        password
      }
    })
    .then(response=>{
      dispatch(loginSuccess(response))
      dispatch(loadUser(response.token))
    })
    .catch(error=> dispatch(LoginFail(error)))

  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}



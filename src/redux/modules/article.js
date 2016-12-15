import {Map} from 'immutable'

import ApiClient from 'utils/ApiClient'
const client = new ApiClient()

const LOAD = 'app/article/LOAD'
const LOAD_SUCCESS = 'app/article/LOAD_SUCCESS'
const LOAD_FAIL = 'app/article/LOAD_FAIL'

const initialState = Map({
  loading: false,
  data:{}
})

export default function reducer(state=initialState, action){
  switch(action.type){
    case LOAD:
      return state.set('loading', true)
    case LOAD_SUCCESS:
      return state.merge({
        loading: false,
        data: action.result.data,
        isLike: action.isLike
      });
    case LOAD_FAIL:
      return state.merge({
        loading: false,
        data: null,
        error: action.error
      })
    default:
      return state;
  }
}


export function load(id){
  return (getState, dispatch)=>{
    const auth = getState().auth.toJS()
    dispatch({type: LOAD})
    return client.get(`/article/${id}/getFrontArticle`)
      .then(result=>{
        const article = result.data
        let isLike = false 
        if(auth.userInfo){
          if( auth.userInfo.likes.indexOf(id) > -1 ){
            isLike = true
          }
        }
        return dispatch({
          type:LOAD_SUCCESS,
          result,
          isLike
        })
      })
      .catch(error=>dispatch({
        type: LOAD_FAIL,
        error
      }))
  }
}


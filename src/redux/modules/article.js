import {Map} from 'immutable'

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
        data: action.result.data
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
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/article/${id}/getFrontArticle`)
  }
}
import { List } from 'immutable'

const LOADTAGS = 'app/tags/LOAD'
const LOADTAGS_SUCCESS = 'app/tags/LOAD_SUCCESS'
const LOADTAGS_FAIL = 'app/tags/LOAD_FAIL'

const initialState = List()

export default function reducer(state=initialState,action){
  switch(action.type){
    case LOADTAGS:
      return state;
    case LOADTAGS_SUCCESS:
      return state.merge(action.result.data)
    case LOADTAGS_FAIL:
      return state;
    default:
      return state;
  }
}

export function loadTagsList(){
  return {
    types: [ LOADTAGS, LOADTAGS_SUCCESS, LOADTAGS_FAIL ],
    promise: (client)=>client.get('/tag/getTagList')
  }
}

export function isLoaded(globState)  {

  return !globState.tags.isEmpty()
}
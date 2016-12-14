import {createReducer} from 'redux-immutablejs'
import {fromJS, List} from 'immutable'

const LOAD_ARTICLE_LIST = 'app/articleList/LOAD'
const LOAD_ARTICLE_LIST_SUCCESS = 'app/articleList/LOAD_SUCCESS'
const LOAD_ARTICLE_LIST_FAIL = 'app/articleList/LOAD_FAIL'


export function loadArticleList(isAdd = false){
  return (getState, dispatch)=>{
    const options = getState().options.toJS()
    dispatch({
      types: [LOAD_ARTICLE_LIST, LOAD_ARTICLE_LIST_SUCCESS, LOAD_ARTICLE_LIST_FAIL],
      itemsPerPage: options.itemsPerPage,
      isAdd: isAdd,
      promise: (client) => client.get('/article/getFrontArticleList',{
        params: options
      })
    })
  }
}


const initialState = fromJS({
  loaded:false,
  isMore:true,
  data:[]
})

export default function reducer(state=initialState, action){
  switch(action.type){
    case LOAD_ARTICLE_LIST:
      return state.set('loading', true);
    case LOAD_ARTICLE_LIST_SUCCESS:
      return state.merge({
        loaded: true,
        loading: false,
        isMore: !(action.result.data.length < action.itemsPerPage),
        data: action.isAdd ? state.get('data').concat(action.result.data) : action.result.data
      })
    case LOAD_ARTICLE_LIST_FAIL:
      return state.merge({
        loaded: false,
        loading: false,
        data: null,
        error: action.error
      })
    default:
      return state;
  }
}


export function isLoaded(globState){
  return !globState.articles.isEmpty() && globState.articles.get('loaded')
}
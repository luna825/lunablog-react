import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

const LOAD_ARTICLE_LIST = 'app/articleList/LOAD'
const LOAD_ARTICLE_LIST_SUCCESS = 'app/articleList/LOAD_SUCCESS'
const LOAD_ARTICLE_LIST_FAIL = 'app/articleList/LOAD_FAIL'


export function loadArticleList(){
  return {
    types: [LOAD_ARTICLE_LIST, LOAD_ARTICLE_LIST_FAIL, LOAD_ARTICLE_LIST_SUCCESS],
    promise: (client) => client.get('/api/article/getFrontArticleList')
  }
}


const initialState = fromJS({
  loaded:false
})

export default function reducer(state=initialState, action){
  switch(action.type){
    
  }
}
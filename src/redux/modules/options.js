import {Map} from 'immutable'

const CHANGE = 'app/options/CHANGE'

const initialState = Map({
  currentPage: 1,
  sortName: 'publish_time',
  itemsPerPage: 2,
  tagId: ''
})

export default function reducer(state=initialState, action){
  switch(action.type){
    case CHANGE:
      return state.merge(action.options)
    default:
      return state;
  }
}

export function changeOption(options){
  return {
    type: CHANGE,
    options:options
  }
}
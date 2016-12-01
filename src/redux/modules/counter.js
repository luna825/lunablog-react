import {Map, fromJS} from 'immutable';

const INCREMENT = 'app/count/INCREMENT'

const INITIAL_STATE = fromJS({
  count: 0
})

export default function reducer(state=INITIAL_STATE,action){
  switch(action.type){
    case INCREMENT:
      return state.update('count', (v)=>v + 1)
    default:
      return state;
  }
}

export function increment(){
  return {
    type: INCREMENT
  }
}

export function incrementIfOdd(){
  return (getstate, dispatch)=>{
    const counter = getstate().getIn(['counter', 'count'])

    if( counter % 2 === 0){
      return
    }

    dispatch(increment())
  }
}
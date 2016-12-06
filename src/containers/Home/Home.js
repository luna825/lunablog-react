import React,{Component, PropTypes} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CounterActions from '../../redux/modules/counter'



@connect(
  state => ({counter: state.getIn(['counter','count'])}),
  dispatch => bindActionCreators(CounterActions, dispatch)
)
export default class Home extends Component {

  static propTypes = {
    counter:PropTypes.number.isRequired,
    increment:PropTypes.func.isRequired,
    incrementIfOdd:PropTypes.func.isRequired
  };

  render(){
    const {counter, increment, incrementIfOdd} = this.props;
    return(
      <div>
        <h2>{counter}</h2>
        <button onClick={increment}>
           You have clicked me {counter} time{counter === 1 ? '' : 's'}.
        </button>
        <button onClick={incrementIfOdd} > incrementIfOdd </button>
      </div>
    )
  }
}

import React,{Component, PropTypes} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CounterActions from '../../redux/modules/counter'
import * as authActions from 'redux/modules/auth'


@connect(
  state => ({
    counter: state.counter.get('count'),
    auth: state.auth
  }),
  dispatch => bindActionCreators({
    ...CounterActions,
    ...authActions
  },dispatch)
)
export default class Home extends Component {

  static propTypes = {
    counter:PropTypes.number.isRequired,
    increment:PropTypes.func.isRequired,
    incrementIfOdd:PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props)
  }

  render(){
    const {counter, increment, incrementIfOdd, 
            login, loadUser, auth, loadUserInfo} = this.props;
    return(
      <div>
        <h2>{counter}</h2>

        <button className="btn btn-success" onClick={increment}>
           You have clicked me {counter} time{counter === 1 ? '' : 's'}.
        </button>
        <button onClick={incrementIfOdd} > incrementIfOdd </button>
        <button onClick={login.bind(this, 'admin@admin.com','admin')}> getToken</button>
        <button onClick={loadUser.bind(this,auth.get('token'))}> loadUser</button>
        <button onClick={loadUserInfo.bind(this,'admin@admin.com','admin')}> loadUserInfo</button>
      </div>
    )
  }
}

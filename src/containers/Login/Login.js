import React, {Component, TypeProps} from 'react'
import {Map} from 'immutable'
import {connect} from 'react-redux'

import * as authActions from 'redux/modules/auth'

@connect(
  state=>({}),
  authActions
)
export default class Login extends Component {
  constructor(props){
    super(props)
    this.redirectRoute = this.props.location.query.next || '/';
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.loadUserInfo(email.value, password.value, this.redirectRoute )
    email.value = '';
    password.value = '';

  }

  render(){
    return(
      <div className="login container">
        <h4 className="title">登 录</h4>
        <form role="form" >
          <div className="login-email input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span> 
            <input ref='email' className="form-control" type="text" value='admin@admin.com'/>
          </div>
          <div className="login-password input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-unlock-alt"></i>
            </span>
            <input ref='password' type="password" className="form-control" value='admin'/>
          </div>
          <button className='btn btn-primary btn-lg btn-block'
            onClick={this.handleSubmit}
          >登 录
          </button>
        </form>      
      </div>
    )
  }
}
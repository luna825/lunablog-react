import React,{Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {DropDown} from 'components'

import './App.scss'


export default class App extends Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-expended hidden-xs">
          <div className="navbar-menu">
            <Link activeClassName="active" className="navbar-item logo" to="/">简</Link>
            <Link className="navbar-item" to="#">
              <i className="fa fa-th" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="navbar-user" >
            <Link to="#" className="navbar-item">
              <i className="fa fa-font"></i>
            </Link>
            <Link className="navbar-item" to='#'>
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </Link>
          </div>
        </nav>
        <nav className="navbar navbar-shrink visible-xs-block">
          <DropDown classname="logo navbar-item" dropdownName='shrink' text="简">
            <li><Link activeClassName='active' to='/'>
              <i className="fa fa-home"></i>
              首页
            </Link></li>
            <li><Link to="#">
              <i className="fa fa-th"></i>
              专题
            </Link></li>
          </DropDown>
        </nav>
        <div>{this.props.children}</div>
        <div>Footer</div>
      </div>
    )
  }
}
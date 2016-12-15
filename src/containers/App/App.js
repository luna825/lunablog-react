import React,{Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {DropDown} from 'components'
import { push } from 'react-router-redux';

import { Tooltip } from 'antd';

import {logout} from 'redux/modules/auth'

@connect(
  state=>({auth: state.auth}),
  dispatch=>bindActionCreators({logout, push}, dispatch)
)
export default class App extends Component {
  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const isAuthenticated = this.props.auth.get('isAuthenticated')
    const nextIsAuthenticated = nextProps.auth.get('isAuthenticated')

    if(!isAuthenticated && nextIsAuthenticated){

    }else if (isAuthenticated && !nextIsAuthenticated){
      this.props.push('/')
    }
  }
  componentDidMount() {

  }

  handleLogout = (e)=>{
    e.preventDefault()
    this.props.logout()
  }

  render(){
    const {logout, auth} = this.props;
    const isAuthenticated = auth.get('isAuthenticated')
    return(
      <div>
        <nav className="navbar navbar-expended hidden-xs">
          <div className="navbar-menu">
            <Link activeClassName="active" className="navbar-item logo" to="/">简</Link>
            <Tooltip placement='right' title='专题'>
              <Link className="navbar-item" to="#">
                <i className="fa fa-th" aria-hidden="true"></i>
                <span className='title'>专题</span>
              </Link></Tooltip>
          </div>
          <div className="navbar-user" >
            <Link to="#" className="navbar-item">
              <i className="fa fa-font"></i>
            </Link>
            {isAuthenticated ? 
              <Link className="navbar-item" to="/logout" onClick={this.handleLogout}>
                <i className="fa fa-sign-out"></i>
              </Link>:
              <Link activeClassName='hide' className="navbar-item" to='/Login'>
                <i className="fa fa-sign-in" aria-hidden="true"></i>
              </Link>
            }
          </div>
        </nav>
        <nav className="navbar navbar-shrink visible-xs-block">
          <DropDown classname="logo navbar-item" dropdownName='shrink' text="简">
            <li><Link activeClassName='active' to='/'>
              <i className="fa fa-home"></i>
              首页
            </Link></li>
            <li>
              <Link to="#"><i className="fa fa-th"></i>专题</Link>
            </li>
          </DropDown>
        </nav>
        <div className="main-box container-fluid">{this.props.children}</div>
      </div>
    )
  }
}
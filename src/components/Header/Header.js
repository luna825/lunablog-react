import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import './Header.scss';


export default class Header extends Component{

  render(){
    return(
      <div className="navbar-box navbar-skin">
        <div className="navbar-menu">
          <Link className='navbar-item logo' to='/'>简</Link>
        </div>

        <div className="navbar-shrink">shrink</div>
        <div className="navbar-extended">extended</div>

      </div>
    )
  }
}
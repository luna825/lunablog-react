import React,{Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


export default class App extends Component {
  render(){
    return(
      <div>
        <div>{this.props.children}</div>
        <div>Footer</div>
      </div>
    )
  }
}
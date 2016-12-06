import React,{Component, PropTypes} from 'react'

import {Header} from 'components'

export default class App extends Component {
  render(){
    return(
      <div>
        <Header />
        <div>{this.props.children}</div>
        <div>Footer</div>
      </div>
    )
  }
}
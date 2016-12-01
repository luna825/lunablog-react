import React,{Component, PropTypes} from 'react'

export default class App extends Component {
  render(){
    return(
      <div>
        <div>Nav</div>
        <div>{this.props.children}</div>
        <div>Footer</div>
      </div>
    )
  }
}
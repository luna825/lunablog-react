//基的bootstrap的下拉菜单
//
import React, {Component, PropTypes} from 'react'

export default class DropDown extends Component {
  constructor(props){
    super(props)
    this.state={
      open:false
    }
  }

  static propTypes={
    children: PropTypes.any.isRequired,
    dropdownName: PropTypes.string.isRequired,
    classname: PropTypes.string,
    text: PropTypes.string.isRequired
  };

  handleClick = ()=>{
    this.setState({
      open: !this.state.open
    })
  }

  render(){
    const {children, dropdownName, classname, text} = this.props;
    console.log(this.state.open)
    return(
      <div className={"dropdown " + (this.state.open ? 'open' : '') }>
        <a href="javascript:viod(0)" 
          className={"dropdown-toggle " + (classname ? classname : '')}
          id={dropdownName} data-toggle="dropdown"
          onClick={this.handleClick}
        >{ text }</a>
          <ul className="dropdown-menu" aria-labelledby={dropdownName} >
            {children}
          </ul>
      </div>
    )
  }

}

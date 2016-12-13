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

  handleClick = (e)=>{
    e.stopPropagation() //取消事件的冒泡和捕获
    this.setState({
      open: !this.state.open
    },()=>{
      if(this.state.open){
        window.addEventListener('click', this.handleClick)
      }else{
        window.removeEventListener('click', this.handleClick)
      }
    })
  }

  render(){
    const {children, dropdownName, classname, text} = this.props;
    return(
      <div className={"dropdown " + (this.state.open ? 'open' : '') }>
        <a href="javascript:void(0)" 
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

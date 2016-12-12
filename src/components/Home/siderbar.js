import React, {Component, PropTypes} from 'react'

export default class Siderbar extends Component {

  static propTypes = {
    imgUrl: PropTypes.any.isRequired
  };

  render(){
    const {imgUrl} = this.props;
    let styles = { backgroundImage: 'url(' + imgUrl + ')'}
    return(
      <div className="col-sm-3 sider hidden-xs">
        <div className='sider-img' style={styles}></div>
        <div className="sider-bottom">
          <h1>Luna</h1>
          <h3>学习交流</h3>
          <p>一个模仿简书的个人blog</p>
          <button className="btn btn-lg btn-success ">
            <i style={{marginRight:8}} className="fa fa-pencil" aria-hidden="true"></i>写文章
          </button>
        </div>
      </div>
    )
  }
}
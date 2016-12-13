import React, {Component, PropTypes} from 'react'
import {Map} from 'immutable'

export default class LoadMoreArticles extends Component {

  constructor(props){
    super(props)
  }

  static propTypes={
    loadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    options: PropTypes.instanceOf(Map).isRequired
  };

  render(){
    const { loadMore, isLoading, options } = this.props;
    return(
      <div className="article-more">
        <button 
        onClick={e=>loadMore(e, options.update('currentPage', v=>v+1) ,true)} 
        disabled={isLoading}
        >
        <i className={"fa fa-refresh " + (isLoading&&'fa-spin')}></i>
        点击查看更多</button>
      </div>
    )
  }
}
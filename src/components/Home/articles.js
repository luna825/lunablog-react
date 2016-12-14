import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {List} from 'immutable'

import {customTime} from 'utils/utils'

export default class Articles extends Component {
  constructor(props){
    super(props)
  }

  static propTypes={
    articleList: PropTypes.instanceOf(List).isRequired
  }

  render(){
    const {articleList} = this.props;
    return(
      <ul className="media-list article-list">
        {(articleList.size <= 0) ? <li> 还没有文章 </li> :
          articleList.toJS().map((article, i)=>
          <li className="media article-item" key={i}>
            <div className="media-body">
              <p className="article-top">
                <span>{customTime(article.publish_time)}</span>
              </p>
              <h4 className="media-heading article-title">
                <Link to={ '/article/' + article._id } > {article.title}</Link>
              </h4>
              <div className="article-footer">
                <span>阅读 {article.visit_count}</span>
                <span> · 评论 {article.comment_count} </span>
                <span> · 喜欢 {article.like_count}</span>
              </div>
            </div>
            <a href="#" className="media-right wrap-img">
              <img src="http://localhost:9000/uploads/1476437616598.png" alt=""/>
            </a>
          </li>
        )}
      </ul>
    )
  }
}
import React, {Component, PropTypes} from 'react'
import {Map} from 'immutable'
import {asyncConnect} from 'redux-async-connect'
import {connect} from 'react-redux'
import {load as loadArticle} from 'redux/modules/article'


@asyncConnect([{
  promise:({store:{getState, dispatch}, params:{id}})=>{
    dispatch(loadArticle(id))
  }
}])
@connect(
  state => ({article: state.article}),
  {}
)
export default class Article extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    article: PropTypes.instanceOf(Map).isRequired,
    params: PropTypes.object.isRequired
  }

  componentDidMount() {
  }

  renderLoadAnimate =()=>
    <div className="animate-wrap">
      <div className="animate-before"></div>
      <div className="animate-after"></div>
    </div>


  render(){
    const {article} = this.props;
    const articleDetail = article.get('data')
    let loading = article.get('loading')

    return(
      <div className="article-box">
        { loading ? this.renderLoadAnimate() : 
          <div className="container">
          { articleDetail ?
            <g>
              <div className="article">
                <h1 className="article-title">{article.getIn(['data','title'])}</h1>
                <div className="article-meta">
                  <span>阅读{article.getIn(['data','visit_count'])}</span>
                  <span>评论{article.getIn(['data','comment_count'])}</span>
                  <span>喜欢{article.getIn(['data','like_count'])}</span>
                </div>
                <div className="article-content"
                 dangerouslySetInnerHTML={{__html: article.getIn(['data','content'])}}></div>
              </div>  
              <div className="meta-like">
                <div className="like">
                  <a className="like-button" href="javascript:void(0)">
                    <i className="fa fa-heart-o"></i> 喜欢
                  </a>
                  <div className="fenge"></div>
                  <span>{article.getIn(['data','like_count'])}</span>
                </div>
              </div>
            </g> : <h2>没有这篇文章</h2>}
          </div>
        }
      </div>
    )
  }
}
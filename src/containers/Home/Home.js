import React,{Component, PropTypes} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-async-connect'

import { Siderbar, Tags } from 'components'

import * as tagsActions from 'redux/modules/tags'
import {loadTagsList, isLoaded as tagsLoad } from 'redux/modules/tags'
import {loadArticleList} from 'redux/modules/articles'
import {changeOption} from 'redux/modules/options'

@asyncConnect([{
  promise:({store:{getState, dispatch}})=>{
    let promises = []
    if (!tagsLoad(getState())){
      promises.push(dispatch(loadTagsList()))
    }

    promises.push(dispatch(loadArticleList()))

    return Promise.all(promises);
  }
}])
@connect(
  state=>({tags: state.tags, options: state.options, articles: state.articles}),
  {changeOption, loadArticleList}
)
export default class Home extends Component {
  constructor(props){
    super(props)
  }

  handleChange= (e, options)=>{
    e.preventDefault()
    const {changeOption, loadArticleList} = this.props;
    changeOption(options)
    loadArticleList()
  }

  render(){
    const {tags, options, articles} = this.props;
    return(
      <div className="container-fluid main-box">
        <Siderbar imgUrl='http://upload.jianshu.io/daily_images/images/ZzGddGzsGxxviDzvWnzH.jpg' />
        <div className="col-sm-7 col-sm-offset-3 main-content">
          <Tags isLoading={articles.get('loading')} tagList={tags} options={options} changeSort={this.handleChange}  />
        </div>
        
      </div>
    )
  }
}
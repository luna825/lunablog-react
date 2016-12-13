import React, {Component, PropTypes} from 'react'
import {Map, List} from 'immutable'



export default class Tags extends Component {

  static propTypes = {
    tagList: PropTypes.instanceOf(List).isRequired,
    options: PropTypes.instanceOf(Map).isRequired,
    changeSort: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  render(){
    const {tagList, changeSort, options, isLoading} = this.props;
    const img = require('../../theme/img/tiny.gif')
    return(
      <ul className="tags-nav list-unstyled">
        <li>
          <a href="javascript:void(0)" 
          className={(options.get('sortName')==='publish_time') && 'active'}
          onClick={e=>changeSort(e, {'currentPage':1,'sortName':'publish_time','tagId':''})}>
            最新
          </a>
        </li>
        <li>
          <a href="javascript:void(0)"
          className={(options.get('sortName')==="visit_count") && 'active'}
          onClick={e=>changeSort(e, {'currentPage':1,'sortName':'visit_count','tagId':''})}
          >热门</a>
        </li>
        {tagList.toJS().map((tag, i)=>
          <li key={i}>
            <a href="javascript:;"
            className={(options.get('tagId') === tag._id) && 'active' }
            onClick = {e=>changeSort(e, options.merge({currentPage:1, tagId: tag._id, sortName:''}))}
            >{tag.name}</a>
          </li>
        )}
        {isLoading && 
          <li>
            <img style={{width:17}} src={img} alt=""/>
          </li>
        }
      </ul>
    )
  }
}
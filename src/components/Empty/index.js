import React, { Component } from 'react'
import noData from './images/noData.png'
import './index.less'

class Empty extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="empty" style={{ height: `${ this.props.height || 120 }px` }}>
        <img src={ noData } alt="" />
        <span>{ this.props.text || '暂无内容' }</span>
      </div>
    )
  }
}

export default Empty
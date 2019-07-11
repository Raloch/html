import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'
import KlineDepth from './klinedepth'

let widget

@inject('trade', 'kline')
@observer
class Kline extends Component {
  componentDidMount() {
    this.props.kline.setDataFeed()
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.props.kline.refreshKline, false)
  }
  render() {
    return (
      <div className="kline">
        <div id="tv_container"></div>
        <KlineDepth />
      </div>
    )
  }
}

export default Kline
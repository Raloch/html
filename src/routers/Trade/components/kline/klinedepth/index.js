import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'

// const Highcharts = require('highcharts')
// require('highcharts/modules/exporting')(Highcharts)

@inject('Store')
@observer
class KlineDepth extends Component {
  componentDidMount() {
    this.props.Store.highchartsInit(false)
  }
  close = () => {
    this.props.Store.kline.isShowDepth = false
    this.props.Store.kline.isFullScreen = false
    setTimeout(() => {
      this.props.Store.highchartsInit(true)
    }, 0)
  }
  setfullscreen = () => {
    this.props.Store.kline.isFullScreen = !this.props.Store.kline.isFullScreen
    // 异步等待上面执行完毕
    setTimeout(() => {
      this.props.Store.highchartsInit(true)
    }, 0)
  }
  render() {
    const store = this.props.Store
    return (
      <div className={ `depth ${ store.kline.isFullScreen ? 'fullscreen' : '' }` } style={{ display: store.kline.isShowDepth ? 'flex' : 'none' }}>
        <header>
          <div className="enlarge">
            {/* 全屏按钮 */}
            <svg onClick={ this.setfullscreen } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor"><path d="M21 7v4h1V6h-5v1z"/><path d="M16.854 11.854l5-5-.708-.708-5 5zM7 7v4H6V6h5v1z"/><path d="M11.146 11.854l-5-5 .708-.708 5 5zM21 21v-4h1v5h-5v-1z"/><path d="M16.854 16.146l5 5-.708.708-5-5z"/><g><path d="M7 21v-4H6v5h5v-1z"/><path d="M11.146 16.146l-5 5 .708.708 5-5z"/></g></g></svg>
          </div>
          <div className="toKlineChart" onClick={ this.close }>行情图</div>
        </header>
        <main id="kline-depth"></main>
      </div>
    )
  }
}

export default KlineDepth
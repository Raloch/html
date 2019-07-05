import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'

const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

@inject('Store')
@observer
class KlineDepth extends Component {
  componentDidMount() {
    this.highchartsInit()
  }
  highchartsInit = () => {
    Highcharts.chart('kline-depth', {
      chart: {
        type: 'areaspline',
        zoomType: void 0 // 'xy'
      },
      title: {
        text: '' // ETH-BTC Market Depth
      },
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [{
          color: '#888',
          value: 0.1523,
          width: 0, // 去除表格竖线
          label: {
            text: '', // Actual price
            rotation: 90
          }
        }],
        title: {
          text: '' // Price
        }
      },
      yAxis: [{
        lineWidth: 1,
        gridLineWidth: 0, // 去除表格横线
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'left',
          x: 8
        }
      }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'right',
          x: -8
        }
      }],
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: 'center'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size=10px;">价格: {point.key}</span><br/>',
        valueDecimals: 2
      },
      series: [{
        name: '累计', // Bids
        data: [
            [
                0.1524,
                0.948665
            ],
            [
                0.1539,
                35.510715
            ],
            [
                0.154,
                39.883437
            ],
            [
                0.1541,
                40.499661
            ],
            [
                0.1545,
                43.262994000000006
            ],
            [
                0.1547,
                60.14799400000001
            ],
            [
                0.1553,
                60.30799400000001
            ],
            [
                0.1558,
                60.55018100000001
            ]
        ],
        color: '#00b66f',
        fillColor: 'rgba(0, 182, 111, 0.2)'
      }, {
        name: '累计', // Asks
        data: [
            [
                0.1453,
                12.345828999999998
            ],
            [
                0.1454,
                10.035642
            ],
            [
                0.148,
                9.326642
            ],
            [
                0.1522,
                3.76317
            ]
        ],
        color: '#fc5857',
        fillColor: 'rgba(252, 88, 87, 0.2)'
      }]
    });
  }
  close = () => {
    this.props.Store.kline.isShowDepth = false
    this.props.Store.kline.isFullScreen = false
    setTimeout(() => {
      this.highchartsInit()
    }, 0)
  }
  setfullscreen = () => {
    this.props.Store.kline.isFullScreen = !this.props.Store.kline.isFullScreen
    // 异步等待上面执行完毕
    setTimeout(() => {
      this.highchartsInit()
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
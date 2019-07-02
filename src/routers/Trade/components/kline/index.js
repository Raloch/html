import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'
import { message } from 'antd';

const config = {
  supports_search: false,
  supports_group_request: false,
  supported_resolutions : ["1", "5", "15", "30", "60", "1D", "1W"],
  supports_marks: true,
  supports_time: true,
  exchanges: [
    {
      value: 'BCH',
      name: 'All Exchanges',
      desc: ''
    }
  ]
}

@inject('Store')
@observer
class Kline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datafeed: null
    }
  }
  componentDidMount() {
    this.setDataFeed()
  }
  // 设置datafeed配置数据
  setDataFeed = () => {
    let datafeed = {
      onReady: cb => {
        setTimeout(() => {
          cb(config)
        }, 0);
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        var symbol_stub = {
          name: symbolName,
          ticker: symbolName,
          description: "",
          has_intraday: true,
          has_no_volume: false,
          minmov: 1,
          minmov2: 2,
          pricescale: 100000,
          session: "24x7",
          supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
          timezone: "Asia/Shanghai",
          type: "stock"
        }
        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub)
        }, 0)
      },
      getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
        // 周期设置 -- 转换成秒
        resolution = this.timeConversion(resolution)
        this.props.Store.kline.HCK = onHistoryCallback
        let params = [symbolInfo.name, from, to, resolution]
        this.sendKlineQueryReq(params)
      },
      subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        resolution = this.timeConversion(resolution)
        this.props.Store.kline.SUB = onRealtimeCallback
        let params = [symbolInfo.name, resolution]
        this.sendKlineSubReq(params)
      },
      unsubscribeBars(subscriberUID){

      },
      getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution){

      }
    }
    this.setState({
      datafeed
    }, () =>{
      this.widgetInit()
    })
  }
  // 需要等待setDataFeed动作结束
  widgetInit = () => {
    let _this = this
    window.tvWidget = new window.TradingView.widget({
      // debug: true,
      fullscreen: false,
      width: '100%',
      height: 400,
      symbol: 'BTCUSDT',
      interval: '15',
      container_id: "kline",
      // datafeed: new window.Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
      datafeed: _this.state.datafeed,
      library_path: "charting_library/",
      // locale: getParameterByName('lang') || "en",
      locale: "zh",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: 'http://saveload.tradingview.com',
      charts_storage_api_version: "1.1",
      client_id: 'tradingview.com',
      user_id: 'public_user_id'
    })
    // window.addEventListener('DOMContentLoaded', this.widgetInit, false)
  }
  // 将周期转换成秒
  timeConversion = time => {
    switch(time) {
      case ('1M' || '1W' || '1D' || 'D'):
        return 86400
      case '240':
        return 14400
      case '120':
        return 7200
      case '60':
        return 3600
      case '30':
        return 1800
      case '15':
        return 900
      case '5':
        return 300
      case '1':
        return 60
      default:
        return 86400
    }
  }
  // websocket发送请求
  sendRequest = data => {
    let ws = this.props.Store.ws
    let data1 = {
      id: 1,
      method: 'server.ping',
      params: []
    }
    // 交易市场
    let data2 = {
      id: 2,
      method: 'state.subscribe',
      params: []
    }
    // 深度
    let data3 = {
      id: 2,
      method: 'depth.subscribe',
      params: [`${ this.props.Store.currentCoinsType }`, parseFloat(this.props.Store.depth.count), '0.00000001']
    }
    // 最新成交
    let data5 = {
      id: 5,
      method: 'deals.subscribe',
      params: ['BTCUSDT']
    }
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(data))
    } else {
      ws.onopen = () => {
        message.success('ws连接成功')
        setInterval(() => {
          ws.send(JSON.stringify(data1))
        }, 3000)
        ws.send(JSON.stringify(data2))
        ws.send(JSON.stringify(data3))
        ws.send(JSON.stringify(data5))
        ws.send(JSON.stringify(data))
      }
    }
  }
  // 发送历史数据请求
  sendKlineQueryReq = params => {
    let data = {
      id: 8,
      method: 'kline.query',
      params: params
    }
    this.sendRequest(data)
  }
  // 发送实时数据请求
  sendKlineSubReq = params => {
    let data = {
      id: 9,
      method: 'kline.subscribe',
      params: params
    }
    this.sendRequest(data)
  }
  render() {
    return (
      <div id="kline"></div>
    )
  }
}

export default Kline
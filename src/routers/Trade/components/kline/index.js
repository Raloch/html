import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'
import KlineDepth from './klinedepth'

let widget

@inject('trade')
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
  componentWillUnmount() {
    document.removeEventListener('click', this.refreshKline, false)
  }
  // 设置datafeed配置数据
  setDataFeed = () => {
    let datafeed = {
      onReady: cb => {
        setTimeout(() => {
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
          cb(config)
        }, 0);
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        var symbol_stub = {
          name: symbolName, // 商品名称
          ticker: symbolName, // 唯一标识符
          description: "", // 商品说明
          has_intraday: true,
          has_no_volume: false,
          minmov: 1, // 最小波动
          minmov2: 2,
          pricescale: 100000000, // 价格精度
          session: "24x7", // 商品交易时间
          supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"], // 商品周期选择器中启用一个周期数组
          timezone: 'Asia/Shanghai',
          type: "stock", // 仪表的可选类型
        }
        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub)
        }, 0)
      },
      getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
        // 周期设置 -- 转换成秒
        resolution = this.timeConversion(resolution)
        this.props.trade.kline.HCK = onHistoryCallback
        let params = [symbolInfo.name, from, to, resolution]
        this.sendKlineQueryReq(params)
      },
      subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        resolution = this.timeConversion(resolution)
        this.props.trade.kline.SUB = onRealtimeCallback
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
    widget = this.widget = window.tvWidget = new window.TradingView.widget({
      debug: false,
      fullscreen: false, // 是否全屏
      // autosize: true, // 是否占用所有可用空间
      width: '99%',
      height: '100%',
      symbol: _this.props.trade.currentCoinsType, // 'ADABTC'
      interval: '15',
      container_id: "tv_container",
      // datafeed: new window.Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
      datafeed: _this.state.datafeed,
      library_path: "charting_library/",
      // locale: getParameterByName('lang') || "en",
      locale: "zh",
      timezone: 'Asia/Shanghai',
      disabled_features: [
        // 'border_around_the_chart', // 图标边框
        "use_localstorage_for_settings",
        "symbol_search_hot_key",
        "header_symbol_search", // 隐藏搜索按钮(ADABTC)
        "header_compare", // 对比按钮
        "header_undo_redo", // 撤销重做
        "header_screenshot", // 截图按钮
        "header_saveload", // 保存按钮
        "caption_buttons_text_if_possible",
        "go_to_date",
        "snapshot_trading_drawings",
        "show_hide_button_in_legend",
        "symbol_info",
        "display_market_status",
        "remove_library_container_border",
        "volume_force_overlay",
        "header_interval_dialog_button",
        "show_interval_dialog_on_key_press",
        "legend_context_menu"
        // "header_fullscreen_button"
      ],
      enabled_features: [
        "dont_show_boolean_study_arguments",
        "keep_left_toolbar_visible_on_small_screens",
        "side_toolbar_in_fullscreen_mode",
        "adaptive_logo"
      ],
      studies_overrides: {
        "volume.volume.color.0": "#8A3A3B",
        "volume.volume.color.1": "#6A833A",
        "volume.volume.transparency": 65,
        "volume.show ma": true
      },
      drawings_access: {
        type: "black",
        tools: [{
          name: "Regression Trend"
        }]
      },
      // enabled_features: ["study_templates"],
      charts_storage_url: 'http://saveload.tradingview.com',
      charts_storage_api_version: "1.1",
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      toolbar_bg: '#fff', // 工具栏背景色
      custom_css_url: '../../../../../charting_library/static/index.css', // 必须为css文件，切要放到charting_library文件夹下static里
      overrides: {
        volumePaneSize: "medium",
        "scalesProperties.lineColor": "#838c97", // 刻度线颜色
        "scalesProperties.textColor": "#838c97", // 图表字体色
        "paneProperties.background": "#ffffff", // 图表背景色
        "paneProperties.vertGridProperties.color": "#f7f8fa", // 栅格竖线
        "paneProperties.horzGridProperties.color": "#f7f8fa", // 栅格横线
        "paneProperties.crossHairProperties.color": "#8aa1Be", // 鼠标移动时坐标线颜色
        "paneProperties.legendProperties.showLegend": false, // 横向线下文字（Volume(20)...）
        "paneProperties.legendProperties.showStudyArguments": true,
        "paneProperties.legendProperties.showStudyTitles": true,
        "paneProperties.legendProperties.showStudyValues": true,
        "paneProperties.legendProperties.showSeriesTitle": true,
        "paneProperties.legendProperties.showSeriesOHLC": true,
        "mainSeriesProperties.candleStyle.upColor": "#12B886",
        "mainSeriesProperties.candleStyle.downColor": "#FA5252",
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderColor": "#838c97",
        "mainSeriesProperties.candleStyle.borderUpColor": "#12B886",
        "mainSeriesProperties.candleStyle.borderDownColor": "#FA5252",
        "mainSeriesProperties.candleStyle.wickUpColor": "#12B886",
        "mainSeriesProperties.candleStyle.wickDownColor": "#FA5252",
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.hollowCandleStyle.upColor": "#12B886",
        "mainSeriesProperties.hollowCandleStyle.downColor": "#FA5252",
        "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
        "mainSeriesProperties.hollowCandleStyle.borderColor": "#838c97",
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#12B886",
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#FA5252",
        "mainSeriesProperties.haStyle.upColor": "#12B886",
        "mainSeriesProperties.haStyle.downColor": "#FA5252",
        "mainSeriesProperties.haStyle.drawWick": !0,
        "mainSeriesProperties.haStyle.drawBorder": !0,
        "mainSeriesProperties.haStyle.borderColor": "#838c97",
        "mainSeriesProperties.haStyle.borderUpColor": "#12B886",
        "mainSeriesProperties.haStyle.borderDownColor": "#FA5252",
        "mainSeriesProperties.haStyle.wickColor": "#838c97",
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.upColor": "#12B886",
        "mainSeriesProperties.barStyle.downColor": "#FA5252",
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.dontDrawOpen": !1,
        "mainSeriesProperties.lineStyle.color": "#838c97",
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.1)",
        "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.02)",
        "mainSeriesProperties.areaStyle.linecolor": "#838c97",
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.priceSource": "close"
      }
    })
    // 切换交易对 -- 该函数只在实例生成时执行一次，所以需要添加click的监听函数来触发
    widget.onChartReady(() => {
      // 点击market才会更改交易对，若点击其他地方，交易对没有改变，K线数据不会刷新，所以可直接监听document
      widget.chart().createStudy("Moving Average", false, false, [7], null, {"Plot.linewidth": 2,"plot.color": "#ffba70"});
      widget.chart().createStudy("Moving Average", false, false, [30], null, {"Plot.linewidth": 2,"plot.color": "#6bcaed"})
      // 离开页面时需要移除监听，否则会报错
      document.addEventListener('click', this.refreshKline, false)
    })
    // 创建自定义按钮 -- 深度图
    widget.headerReady().then(() => {
      let button = widget.createButton({ align: 'right' })
      button.setAttribute('title', '深度图')
      button.setAttribute('class', 'button-depth')
      button.textContent = '深度图'
      button.addEventListener('click', function() {
        _this.props.trade.kline.isShowDepth = true
      })
    })
  }
  refreshKline = () => {
    widget.chart().setSymbol(this.props.trade.currentCoinsType, data => {
      // console.log('k线数据刷新')
    })
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
    const trade = this.props.trade
    let ws = trade.ws
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(data))
    } else {
      ws.onopen = () => {
        // message.success('ws连接成功')
        trade.sendReq(1, 'server.ping', [])
        setInterval(() => {
          trade.sendReq(1, 'server.ping', [])
        }, 3000)
        ws.send(JSON.stringify(data))
        trade.sendReq(2, 'state.subscribe', [])
        trade.sendReq(2, 'depth.subscribe', [`${ trade.currentCoinsType }`, parseFloat(trade.depth.count), '0.00000001'])
        trade.sendReq(5, 'deals.subscribe', [`${ trade.currentCoinsType }`])
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
      <div className="kline">
        <div id="tv_container"></div>
        <KlineDepth />
      </div>
    )
  }
}

export default Kline
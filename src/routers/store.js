/*
  全局Store
  直接实例化，在 ./index.js 通过 Provider 渗透。
  在模块内用 @inject('Store')，将 Store 注入到 props 上。
  哪里用，哪里 @inject('Store')。

  注意：无论是全局 Store，还是局部 store，必须 @inject('xxx')注入到 props 上才能获取，保证结构的一致性。
*/

import { observable, action, computed, reaction } from 'mobx'
import { BeforeSendGet, BeforeSendPost } from '../components/Ajax'
import { message } from 'antd'
import { dataBTC } from './Trade/components/coinsList'
import { dataBTC as homedataBTC } from './Home/components/marketList'

const Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

class Store {
  @observable userInfo = {
    name: ''
  }
  @observable loading = false
  @action updateName = (name) => {
    this.userInfo.name = name
  }
  @action updateLoading = (boolean) => {
    this.loading = boolean
  }

  // 鲁锐 -- start
  /* ---------------------------------------------- 币币交易 start ----------------------------------------------- */

  @observable urlpath = ''
  // 主页
  @observable USDTLoading = false
  @observable BTCLoading = true
  @observable ETHLoading = false
  @observable BCTLoading = false
  @observable collectLoading = false
  @observable isUpdate = true
  
  // 币币交易当前页面币种
  @observable currencyTrading = {
    coinsTypeTitle: 'BTC',
    coinsType: 'ADA'
  }
  @computed get currentCoinsType() {
    // return 'BTCUSDT'
    return this.currencyTrading.coinsType + this.currencyTrading.coinsTypeTitle
  }
  @action coinsTypeTitleHandle = type => {
    this.currencyTrading.coinsTypeTitle = type
  }
  @action coinsTypeHandle = type => {
    this.currencyTrading.coinsType = type
  }

  // websocket
  @observable ws = null
  @action tradeWsInit = from => {
    if ("WebSocket" in window) {
    // 您的浏览器支持websocket
      if (this.ws === null) {
        this.ws = new WebSocket('wss://socket.coinex.com/')
      }
      // 此处的onopen可能不执行，可能会被K线中的onopen覆盖
      this.ws.onopen = () => {
        // message.success('websocket已连接')
        // 每个一段时间ping一次，防止断开
        this.sendReq(1, 'server.ping', [])
        setInterval(() => {
          this.sendReq(1, 'server.ping', [])
        }, 3000)
        this.sendReq(2, 'state.subscribe', []) // 交易市场
        if (from === 'trade') {
          // 深度
          store.sendReq(2, 'depth.subscribe', [`${ store.currentCoinsType }`, parseFloat(store.depth.count), '0.00000001'])
          // 最近成交
          store.sendReq(5, 'deals.subscribe', [`${ store.currentCoinsType }`])
        }
      }
      this.ws.onmessage = res => {
        this.updateMarket(res)
      }
      this.ws.onclose = res => {
        // message.warn('websocket连接关闭')
      }
    } else {
      message.error('您的浏览器不支持websocket')
    }
  }
  @action sendReq = (id, method, params) => {
    let obj = {
      id: id,
      method: method,
      params: params
    }
    this.ws.send(JSON.stringify(obj))
  }
  @action wsSend = obj => {
    this.ws.send(JSON.stringify(obj))
  }
  @action updateMarket = res => {
    const data = JSON.parse(res.data)
    // 币币交易 -- market
    if (this.urlpath === '/trade' && data.method === 'state.update') {
      let params = data.params[0]
      // 循环获取的数据更新本地数据
      dataBTC.forEach((val, i) => {
        let keyArr = Object.keys(params)
        let name = val.exchangePairs + 'BTC'
        if (keyArr.includes(name)) {
          let obj = params[name]
          val.newPrice = obj.last
        }
      })
      this.market.isUpdate = !this.market.isUpdate
      this.market.BTCLoading = false
    }
    // 主页 -- market
    if (this.urlpath === '/home' && data.method === 'state.update') {
      let params = data.params[0]
      homedataBTC.forEach((val, i) => {
        let keyArr = Object.keys(params)
        let name = val.exchangePairs.replace('/', '')
        if (keyArr.includes(name)) {
          let obj = params[name]
          val.newPrice = obj.last
          val.highestPrice = obj.high
          val.minimumPrice = obj.low
          val.dailyVolume = obj.volume
          val.dailyTurnover = obj.deal + ' BTC'
        }
      })
      this.BTCLoading = false
      this.isUpdate = !this.isUpdate
    }
    // 最近成交
    if (this.urlpath === '/trade' && data.method === 'deals.update') {
      if (data.params[1].length > 100) {
        let arr = []
        data.params[1].forEach((val, i) => {
          arr[i] = {
            key: `${val.id}`,
            time: val.time,
            price: val.price,
            amount: val.amount,
            type: val.type
          }
        })
        this.newDeal.newDealData = arr
        this.newDeal.newDealLoading = false
      } else {
        let arr = []
        data.params[1].forEach((val, i) => {
          arr[i] = {
            key: `${val.id}`,
            time: val.time,
            price: val.price,
            amount: val.amount,
            type: val.type
          }
        })
        this.updateNewDeal([...arr, ...this.newDeal.newDealData])
      }
    }
    // 深度
    if (this.urlpath === '/trade' && data.method === 'depth.update') {
      // count为20, 50
      let count = parseFloat(this.depth.count)
      // 封装处理20/50个数据的total
      let handle = (arr, type) => {
        let len = arr.length
        let num = 0
        for (let i = 0; i < len; i++) {
          if (i === 0) {
            arr[i][2] = arr[i][1]
          } else {
            arr[i][2] = (parseFloat(arr[i - 1][2]) + parseFloat(arr[i][1])).toFixed(8)
          }
          num += parseFloat(arr[i][1])
        }
        // 给数组重新排序（原数组里有个别可能乱序）
        arr.sort((a, b) => {
          return a[0] - b[0]
        })
        if (arr.length > count) {
          this.depth[type] = JSON.stringify(arr.slice(0, count))
        } else {
          this.depth[type] = JSON.stringify(arr.slice(0))
        }
        let chartArr = JSON.parse(this.depth[type]).slice(0)
        chartArr.forEach(val => {
          val[0] = parseFloat(val[0])
          val[1] = parseFloat(val[2])
          val.length = 2
        })
        if (type === 'askData') {
          this.depth.askTotal = num
          // 给深度图asks赋值,深度图数据会更新(highcharts数据更新方法：chart.series[i].setData())
          this.kline.chart.series[1].setData(chartArr)
        } else {
          this.depth.depthTotal = num
          // 给深度图bids赋值
          this.kline.chart.series[0].setData(chartArr)
        }
      }
      // 开始数据的全部显示
      if (data.params[0]) {
        let asksArr = data.params[1].asks
        let bidsArr = data.params[1].bids
        handle(asksArr, 'askData')
        handle(bidsArr, 'depthData')
      } else { // 数据部分更新
        // 处理asks列表展示
        if ("asks" in data.params[1]) {
          let arr = data.params[1].asks
          let len = arr.length
          let num = 0
          let askData = JSON.parse(this.depth.askData)
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < askData.length; j++) {
              if (parseFloat(arr[i][0]) === parseFloat(askData[j][0])) {
                if (parseFloat(arr[i][1]) > 0) {
                  askData[j][1] = arr[i][1]
                } else {
                  // 对应价格数量为0则删除
                  askData.splice(j, 1)
                }
                break
              } else {
                // 数量为0，没有对应价格需要过滤该数据
                if (parseFloat(arr[i][1]) > 0) {
                  if (j < askData.length - 1) {
                    if (j === 0 && parseFloat(arr[i][0]) < parseFloat(askData[j][0])) {
                      askData.unshift(arr[i])
                      if (askData.length > count) {
                        askData = askData.slice(0, count)
                      }
                      break
                    }
                    if (parseFloat(arr[i][0]) > parseFloat(askData[j][0]) && parseFloat(arr[i][0]) < parseFloat(askData[j + 1][0])) {
                      askData.splice(j + 1, 0, arr[i])
                      if (askData.length > count) {
                        askData = askData.slice(0, count)
                      }
                      break
                    }
                  } else {
                    askData.push(arr[i])
                    if (askData.length > count) {
                      askData = askData.slice(0, count)
                    }
                    break
                  }
                }
              }
            }
          }
          if (askData.length > count) {
            askData = askData.slice(0, count)
          } else {
            askData = askData.slice(0)
          }
          handle(askData, 'askData')
        }
        // 处理bids列表展示
        if ('bids' in data.params[1]) {
          let arr = data.params[1].bids
          let len = arr.length
          let num = 0
          let depthData = JSON.parse(this.depth.depthData)
          for (let i = 0; i < len; i++) {
            for (let j = 0; j < depthData.length; j++) {
              if (parseFloat(arr[i][0]) === parseFloat(depthData[j][0])) {
                if (parseFloat(arr[i][1]) > 0) {
                  depthData[j][1] = arr[i][1]
                } else {
                  // 对应价格数量为0则删除
                  depthData.splice(j, 1)
                }
                break
              } else {
                // 数量为0，没有对应价格需要过滤该数据
                if (parseFloat(arr[i][1]) > 0) {
                  if (j < depthData.length - 1) {
                    if (j === 0 && parseFloat(arr[i][0]) < parseFloat(depthData[j][0])) {
                      depthData.unshift(arr[i])
                      if (depthData.length > count) {
                        depthData = depthData.slice(0, count)
                      }
                      break
                    }
                    if (parseFloat(arr[i][0]) > parseFloat(depthData[j][0]) && parseFloat(arr[i][0]) < parseFloat(depthData[j + 1][0])) {
                      depthData.splice(j + 1, 0, arr[i])
                      if (depthData.length > count) {
                        depthData = depthData.slice(0, count)
                      }
                      break
                    }
                  } else {
                    depthData.push(arr[i])
                    if (depthData.length > count) {
                      depthData = depthData.slice(0, count)
                    }
                    break
                  }
                }
              }
            }
          }
          if (depthData.length > count) {
            depthData = depthData.slice(0, count)
          } else {
            depthData = depthData.slice(0)
          }
          depthData = depthData.reverse()
          handle(depthData, 'depthData')
        }
      }
    }
    // k线 -- 实时数据
    if (this.urlpath === '/trade' && typeof data.ttl === 'number') {
      let historyData = data.result.map(val => {
        return {
          time: Number(val[0]) * 1000,
          close: Number(val[2]),
          open: Number(val[1]),
          high: Number(val[3]),
          low: Number(val[4]),
          volume: Number(val[5])
        }
      })
      this.kline.lastTime = historyData[historyData.length - 1].time
      this.kline.historyData = historyData
      if (historyData && historyData.length) {
        // HCK是Kline组件传过来的函数，当websocket启动后退出trade页面，websocket继续执行，而Kline组件已销毁，HCK方法不存在，会报错Cannot read property 'tradingViewApi' of null，所以要判断是否为trade页面，否则不执行HCK方法
        setTimeout(() => {
          this.kline.HCK(historyData, { noData: false })
        }, 0)
      } else {
        this.kline.HCK(historyData, { noData: true })
      }
    }
    // k线 -- 历史数据
    if (this.urlpath === '/trade' && data.method === 'kline.update') {
      let bars = data.params.map(val => {
        return {
          time: Number(val[0]) * 1000,
          close: Number(val[2]),
          open: Number(val[1]),
          high: Number(val[3]),
          low: Number(val[4]),
          volume: Number(val[5])
        }
      })[0]
      // 对比存储的最新时间和最新数据的时间大小来更新数据
      if (this.kline.lastTime - bars.time <= 0) {
        setTimeout(() => {
          this.kline.SUB(bars)
        }, 0)
      }
    }
  }
  // 更新最近成交
  @action updateNewDeal = arr => {
    this.newDeal.newDealData = arr
  }

  /* --- 交易市场 start --- */
  @observable market = {
    BTCLoading: true,
    isUpdate: true
  }
  /* --- 交易市场 end --- */

  /* --- 最近成交 start --- */
  @observable newDeal = {
    newDealData: [],
    newDealLoading: true,
    isRender: 0
  }
  /* --- 最近成交 end --- */

  /* --- 深度 start --- */
  @observable depth = {
    askData: '', // JSON.stringify()字符串化处理，取的时候JSON.parse()转成对象
    askTotal: 0, // 红色累计
    depthData: '',
    depthTotal: 0, // 绿色累计
    mode: 3,
    count: '20'
  }
  /* --- 深度 end --- */

  /* --- k线 start --- */
  @observable kline = {
    historyData: [],
    lastTime: 0,
    HCK: null,
    SUB: null,
    isShowDepth: false,
    isFullScreen: false,
    chart: null // highcharts对象存储
  }
  @action highchartsInit = flag => {
    this.kline.chart = Highcharts.chart('kline-depth', {
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
        },
        series: {
          marker: {
            enabled: false // 去除线条上的实心点
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size=10px;">价格: {point.key}</span><br/>',
        valueDecimals: 2
      },
      series: [{
        name: '累计', // Bids
        data: [],
        color: '#00b66f',
        fillColor: 'rgba(0, 182, 111, 0.2)'
      }, {
        name: '累计', // Asks
        data: [],
        color: '#fc5857',
        fillColor: 'rgba(252, 88, 87, 0.2)'
      }],
      credits: {
        enabled: false // 去除版权信息
      }
    })
    // 用于深度图放大缩小时重新赋入数据
    if (flag) {
      let chartArr0 = JSON.parse(this.depth.askData).slice(0)
      let chartArr1 = JSON.parse(this.depth.depthData).slice(0)
      chartArr0.forEach(val => {
        val[0] = parseFloat(val[0])
        val[1] = parseFloat(val[2])
        val.length = 2
      })
      chartArr1.forEach(val => {
        val[0] = parseFloat(val[0])
        val[1] = parseFloat(val[2])
        val.length = 2
      })
      this.kline.chart.series[0].setData(chartArr1)
      this.kline.chart.series[1].setData(chartArr0)
    }
  }
  /* --- k线 end --- */

  /* --- 限价交易 start --- */
  @observable transactionData = {
    activeKey: '1',
    availableBalance: 0,
    buyButtonLoading1: false,
    sellButtonLoading1: false,
    buyPrice1: '',
    buyAmount1: '',
    sellPrice1: '',
    sellAmount1: '',
    buyButtonLoading2: false,
    sellButtonLoading2: false,
    buyPrice2: '',
    buyAmount2: '',
    sellPrice2: '',
    sellAmount2: ''
  }
  @computed get ifBuyEnough() {
    const { activeKey, availableBalance, buyPrice1, buyAmount1, buyPrice2, buyAmount2 } = this.transactionData
    if (activeKey === '1') {
      if (buyPrice1 && buyAmount1) {
        return parseFloat(availableBalance) - parseFloat(buyPrice1) * parseFloat(buyAmount1) > 0
      } else {
        return true
      }
    } else {
      if (buyPrice2 && buyAmount2) {
        return parseFloat(availableBalance) - parseFloat(buyPrice2) * parseFloat(buyAmount2) > 0
      } else {
        return true
      }
    }
  }
  @computed get ifSellEnough() {
    const { activeKey, availableBalance, sellPrice1, sellAmount1, sellPrice2, sellAmount2 } = this.transactionData
    if (activeKey === '1') {
      if (sellPrice1 && sellAmount1) {
        return parseFloat(availableBalance) - parseFloat(sellPrice1) * parseFloat(sellAmount1) > 0
      } else {
        return true
      }
    } else {
      if (sellPrice2 && sellAmount2) {
        return parseFloat(availableBalance) - parseFloat(sellPrice2) * parseFloat(sellAmount2) > 0
      } else {
        return true
      }
    }
  }
  // 预计交易额 -- 买入
  @computed get estimateBuyPrice() {
    const { activeKey, buyPrice1, buyAmount1, buyPrice2, buyAmount2 } = this.transactionData
    if (activeKey === '1') {
      if (buyPrice1 && buyAmount1) {
        return parseFloat(buyPrice1) * parseFloat(buyAmount1)
      } else {
        return 0
      }
    } else {
      if (buyPrice2 && buyAmount2) {
        return parseFloat(buyPrice2) * parseFloat(buyAmount2)
      } else {
        return 0
      }
    }
  }
  // 预计交易额 -- 卖出
  @computed get estimateSellPrice() {
    const { activeKey, sellPrice1, sellAmount1, sellPrice2, sellAmount2 } = this.transactionData
    if (activeKey === '1') {
      if (sellPrice1 && sellAmount1) {
        return parseFloat(sellPrice1) * parseFloat(sellAmount1)
      } else {
        return 0
      }
    } else {
      if (sellPrice2 && sellAmount2) {
        return parseFloat(sellPrice2) * parseFloat(sellAmount2)
      } else {
        return 0
      }
    }
  }
  // 限价交易/市价交易  key值切换
  @action transactionChange = key => {
    this.transactionData.activeKey = key
  }
  // 可用余额获取
  @action setAvailableBalance = num => {
    this.transactionData.availableBalance = num
  }
  @action handleBuyPrice = num => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.buyPrice1 = num
    } else {
      this.transactionData.buyPrice2 = num
    }
  }
  @action handleBuyAmount = num => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.buyAmount1 = num
    } else {
      this.transactionData.buyAmount2 = num
    }
  }
  @action handleSellPrice = num => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.sellPrice1 = num
    } else {
      this.transactionData.sellPrice2 = num
    }
  }
  @action handleSellAmount = num => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.sellAmount1 = num
    } else {
      this.transactionData.sellAmount2 = num
    }
  }
  // 买入
  @action buyCoins = obj => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.buyButtonLoading1 = true
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          // message.success('买入成功')
          // 更新当前委托
          _this.getCurrentData()
          // 更新历史委托 -- 挂单出去后当前委托立即更新，历史委托不是及时更新，需要定时器来等待历史委托的更新
          setTimeout(() => {
            _this.getHistoryData()
          }, 200)
          setTimeout(() => {
            _this.transactionData.buyButtonLoading1 = false
          }, 1000)
        }
      })
    } else {
      this.transactionData.buyButtonLoading2 = true
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          // message.success('买入成功')
          // 更新当前委托
          _this.getCurrentData()
          // 更新历史委托 -- 挂单出去后当前委托立即更新，历史委托不是及时更新，需要定时器来等待历史委托的更新
          setTimeout(() => {
            _this.getHistoryData()
          }, 200)
          setTimeout(() => {
            _this.transactionData.buyButtonLoading2 = false
          }, 1000)
        }
      })
    }
  }
  // 卖出
  @action sellCoins = obj => {
    if (this.transactionData.activeKey === '1') {
      this.transactionData.sellButtonLoading1 = true
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          // message.success('卖出成功')
          // 更新当前委托
          _this.getCurrentData()
          // 更新历史委托
          _this.getHistoryData()
          setTimeout(() => {
            _this.transactionData.sellButtonLoading1 = false
          }, 1000)
        }
      })
    } else {
      this.transactionData.sellButtonLoading2 = true
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          // message.success('卖出成功')
          // 更新当前委托
          _this.getCurrentData()
          // 更新历史委托
          _this.getHistoryData()
          setTimeout(() => {
            _this.transactionData.sellButtonLoading2 = false
          }, 1000)
        }
      })
    }
  }
  /* --- 限价交易 end --- */


  /* --- 当前委托 start --- */
  @observable currentData = {
    currentEntrustData: [],
    currentLoading: true,
    currentPage: 0
  }
  // 分页器页数控制
  @action currentPageChange = page => {
    this.currentData.currentPage = page
  }
  @action currentDataInit = () => {
    this.getCurrentData()
    setInterval(() => {
      this.getCurrentData()
    }, 1000000)
  }
  // 获取当前委托数据
  @action getCurrentData = () => {
    let _this = this
    const { currentPage } = this.currentData
    let obj = {
      market: this.currentCoinsType,
      offset: `${ currentPage * 10 }, 10`
    }
    BeforeSendGet('/api/v1/user/order/pending', obj, function(d) {
      if (d.code === 0) {
        let data = []
        if (d.result.records.length > 0) {
          d.result.records.forEach((val, i) => {
            data[i] = {
              key: `${ val.id }`,
              ctime: val.ctime,
              side: val.side,
              price: val.price,
              amount: val.amount,
              left: val.left,
              deal_stock: val.deal_stock,
              deal_money: val.deal_money,
              operation: '撤销'
            }
          })
        }
        _this.currentData.currentEntrustData = data
        _this.currentData.currentLoading = false
      }
    })
  }
  /* --- 当前委托 end --- */


  /* --- 历史委托 start --- */
  @observable historyData = {
    historyEntrustData: [],
    historyLoading: true,
    currentPage: 0
  }
  // 分页器页数控制
  @action historyPageChange = page => {
    this.historyData.currentPage = page
  }
  // 初始化历史委托数据，并设置定时器
  @action historyDataInit = () => {
    this.getHistoryData()
    setInterval(() => {
      this.getHistoryData()
    }, 1000000);
  }
  // 获取历史委托数据
  @action getHistoryData = () => {
    let _this = this
    const { currentPage } = this.historyData
    let obj = {
      market: this.currentCoinsType,
      offset: `${ currentPage * 10 }, 10`
    }
    BeforeSendGet('/api/v1/user/market/user-deals', obj, function(d) {
      if (d.code === 0) {
        let data = []
        d.result.records.forEach((val, i) => {
          data[i] = {
            key: `${ val.deal_order_id }`,
            time: val.time,
            side: val.side,
            price: val.price,
            amount: val.amount,
            alreadyDeal: '--',
            deal: val.deal,
            avePrice: '--',
            operation: '交易明细',
            fee: val.fee
          }
        })
        _this.historyData.historyEntrustData = data
        _this.historyData.historyLoading = false
      }
    })
  }
  /* --- 历史委托 end --- */

  /* ---------------------------------------------- 币币交易 end ----------------------------------------------- */
}

const store = new Store()

// 侦听 -- store.depth.count，值改变则出发函数（页面初始渲染时不触发）（autorun初始渲染时会触发）
const reaction1 = reaction(
  () => store.depth.count,
  count => {
    store.sendReq(2, 'depth.subscribe', [`${ store.currentCoinsType }`, parseFloat(store.depth.count), '0.00000001'])
  }
)

const reaction2 = reaction(
  () => store.currentCoinsType,
  type => {
    store.sendReq(2, 'depth.subscribe', [`${ type }`, parseFloat(store.depth.count), '0.00000001'])
  }
)

export default store
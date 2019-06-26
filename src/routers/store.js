/*
  全局Store
  直接实例化，在 ./index.js 通过 Provider 渗透。
  在模块内用 @inject('Store')，将 Store 注入到 props 上。
  哪里用，哪里 @inject('Store')。

  注意：无论是全局 Store，还是局部 store，必须 @inject('xxx')注入到 props 上才能获取，保证结构的一致性。
*/

import { observable, action, computed } from 'mobx'
import { BeforeSendGet, BeforeSendPost } from '../components/Ajax'
import { message } from 'antd'
import { dataBTC } from './Trade/components/coinsList'

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

  
  // 币币交易当前页面币种
  @observable currencyTrading = {
    coinsTypeTitle: 'BTC',
    coinsType: 'ADA'
  }
  @computed get currentCoinsType() {
    return 'BTCUSDT'
    // return this.currencyTrading.coinsType + this.currencyTrading.coinsTypeTitle
  }
  @action coinsTypeTitleHandle = type => {
    this.currencyTrading.coinsTypeTitle = type
  }
  @action coinsTypeHandle = type => {
    this.currencyTrading.coinsType = type
  }

  // websocket
  @observable ws = null
  @action tradeWsInit = () => {
    let _this = this
    if ("WebSocket" in window) {
    // 您的浏览器支持websocket
      if (this.ws === null) {
        this.ws = new WebSocket('wss://socket.coinex.com/')
      }
      this.ws.onopen = function() {
        message.success('websocket已连接')
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
        // 最近成交记录 -- 模板
        let data4 = {
          id: 4,
          method: 'deals.query',
          params: ['BTCUSDT', 34, 0]
        }
        // 最新成交
        let data5 = {
          id: 5,
          method: 'deals.subscribe',
          params: ['BTCUSDT']
        }
        _this.ws.send(JSON.stringify(data1))
        // setInterval(() => {
        //   _this.ws.send(JSON.stringify(data1))
        // }, 3000)
        _this.ws.send(JSON.stringify(data2))
        _this.ws.send(JSON.stringify(data5))
      }
      this.ws.onmessage = function(res) {
        _this.updateMarket(res)
      }
      this.ws.onclose = function(res) {
        message.warn('websocket连接关闭')
      }
    } else {
      message.error('您的浏览器不支持websocket')
    }
  }
  @action wsSend = obj => {
    this.ws.send(JSON.stringify(obj))
  }
  @action updateMarket = res => {
    const data = JSON.parse(res.data)
    // 交易市场 -- data2
    if (data.method === 'state.update') {
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
    // 最近成交 -- data5
    if (data.method === 'deals.update') {
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
          message.success('买入成功')
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
          message.success('买入成功')
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
          message.success('卖出成功')
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
          message.success('卖出成功')
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
    }, 5000000)
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
    }, 5000000);
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

export default store
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

  /* --- 限价交易 start --- */
  @observable transactionData = {
    buyButtonLoading: false,
    sellButtonLoading: false,
    buyPrice: '',
    buyAmount: '',
    sellPrice: '',
    sellAmount: ''
  }
  // 预计交易额 -- 买入
  @computed get estimateBuyPrice() {
    const { buyPrice, buyAmount } = this.transactionData
    if (buyPrice && buyAmount) {
      return parseFloat(buyPrice) * parseFloat(buyAmount)
    } else {
      return 0
    }
  }
  // 预计交易额 -- 卖出
  @computed get estimateSellPrice() {
    const { sellPrice, sellAmount } = this.transactionData
    if (sellPrice && sellAmount) {
      return parseFloat(sellPrice) * parseFloat(sellAmount)
    } else {
      return 0
    }
  }
  @action handleBuyPrice = num => {
    this.transactionData.buyPrice = num
  }
  @action handleBuyAmount = num => {
    this.transactionData.buyAmount = num
  }
  @action handleSellPrice = num => {
    this.transactionData.sellPrice = num
  }
  @action handleSellAmount = num => {
    this.transactionData.sellAmount = num
  }
  // 买入
  @action buyCoins = obj => {
    this.transactionData.buyButtonLoading = true
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
          _this.transactionData.buyButtonLoading = false
        }, 1000)
      }
    })
  }
  // 卖出
  @action sellCoins = obj => {
    this.transactionData.sellButtonLoading = true
    let _this = this
    BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
      if (d.code === 0) {
        message.success('卖出成功')
        // 更新当前委托
        _this.getCurrentData()
        // 更新历史委托
        _this.getHistoryData()
        setTimeout(() => {
          _this.transactionData.sellButtonLoading = false
        }, 1000)
      }
    })
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
            operation: '交易明细'
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
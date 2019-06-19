/*
  全局Store
  直接实例化，在 ./index.js 通过 Provider 渗透。
  在模块内用 @inject('Store')，将 Store 注入到 props 上。
  哪里用，哪里 @inject('Store')。

  注意：无论是全局 Store，还是局部 store，必须 @inject('xxx')注入到 props 上才能获取，保证结构的一致性。
*/

import { observable, action, transaction } from 'mobx'
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

  /* start -- 限价交易 -- start */
  @observable transactionData = {
    buyButtonLoading: false,
    sellButtonLoading: false
  }
  // 买入
  @action buyCoins = obj => {
    this.transactionData.buyButtonLoading = true
    let _this = this
    BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
      if (d.code === 0) {
        message.success('买入成功')
        // 更新当前委托
        _this.getCurrentData({
          market: 'BTCUSDT',
          offset: '0, 100'
        })
        // 更新历史委托 -- 挂单出去后当前委托立即更新，历史委托不是及时更新，需要定时器来等待历史委托的更新
        setTimeout(() => {
          _this.getHistoryData({
            market: 'BTCUSDT',
            offset: '0, 100'
          })
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
        _this.getCurrentData({
          market: 'BTCUSDT',
          offset: '0, 100'
        })
        // 更新历史委托
        _this.getHistoryData({
          market: 'BTCUSDT',
          offset: '0, 100'
        })
        setTimeout(() => {
          _this.transactionData.sellButtonLoading = false
        }, 1000)
      }
    })
  }
  /* end -- 限价交易 -- end */


  /* start -- 当前委托 -- start */
  @observable currentData = {
    currentEntrustData: [],
    currentLoading: true
  }
  @action currentDataInit = () => {
    let obj = {
      market: 'BTCUSDT',
      offset: '0, 100'
    }
    this.getCurrentData(obj)
    setInterval(() => {
      this.getCurrentData(obj)
    }, 5000000)
  }
  // 获取当前委托数据
  @action getCurrentData = obj => {
    let _this = this
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
  /* end -- 当前委托 -- end */


  /* start -- 历史委托 -- start */
  @observable historyData = {
    historyEntrustData: [],
    historyLoading: true
  }
  // 初始化历史委托数据，并设置定时器
  @action historyDataInit = () => {
    let obj = {
      market: 'BTCUSDT',
      offset: '0, 100'
    }
    this.getHistoryData(obj)
    setInterval(() => {
      this.getHistoryData(obj)
    }, 5000000);
  }
  // 获取历史委托数据
  @action getHistoryData = obj => {
    let _this = this
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
  /* end -- 历史委托 -- end */
}

const store = new Store()

export default store
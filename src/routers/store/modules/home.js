import { observable, action } from 'mobx'
import trade from './trade'

class Home {
  @observable urlpath = '' // 当前页面pathname
  @observable USDTLoading = false
  @observable BTCLoading = true
  @observable ETHLoading = false
  @observable BCTLoading = false
  @observable collectLoading = false
  @observable isUpdate = true // 传递该变量强制更新home-market页面
  @observable activeKey = '0'
  @observable marketList = []
  @observable market0 = [] // 列表展示的币种(搜索时变化)
  @observable marketCache0 = [] // 用于保存搜索后全部币种
  @observable market1 = []
  @observable marketCache1 = []
  @observable market2 = []
  @observable marketCache2 = []
  @observable market3 = []
  @observable marketCache3 = []
  @observable market4 = []
  @observable marketCache4 = []
  @observable market5 = []
  @observable marketCache5 = []
  @observable market6 = []
  @observable marketCache6 = []
  @observable collectData = []
  @observable collectDataCache = []
  @observable marketLoading = []

  @action getMarketList = () => {
    // BeforeSendGet('/api/v1/visitor/market/list', {}, function(res) {
    //   if (res.code === 0) {
    //     home.marketList = JSON.stringify(res.result)
    //     res.result.forEach((val, i) => {
    //       home[`market${i + 1}`] = val.Stock.map((item, index) => (
    //         {
    //           key: `${ index }`,
    //           isCollected: false,
    //           exchangePairs: `${ item }/${ val.Money }`,
    //           newPrice: '--',
    //           highsAndLows: '--',
    //           highestPrice: '--',
    //           minimumPrice: '--',
    //           dailyVolume: '--',
    //           dailyTurnover: '--'
    //         }
    //       ))
    //       home[`marketCache${i}`] = home[`market${i}`].slice(0)
    //     })
    //   }
    // })
    let result = [
      {
        Money: 'USDT',
        Stock: ['ETH', 'BTC', 'HSN', 'EOS']
      },
      {
        Money: 'BTC',
        Stock: ['ETH', 'HSN', 'WTC', 'ETC']
      },
      {
        Money: 'ETH',
        Stock: ['HSN', 'WTC', 'LAMB']
      }
    ]
    this.marketList = JSON.stringify(result)
    result.forEach((val, i) => {
      this[`market${i}`] = val.Stock.map((item, index) => (
        {
          key: `${ index }`,
          isCollected: false,
          exchangePairs: `${ item }/${ val.Money }`,
          newPrice: '--',
          highsAndLows: '--',
          highestPrice: '--',
          minimumPrice: '--',
          dailyVolume: '--',
          dailyTurnover: '--'
        }
      ))
      this[`marketCache${i}`] = this[`market${i}`].slice(0)
      trade.market[`market${i}`] = val.Stock.map((item, index) => (
        {
          key: `${index}`,
          isCollected: false,
          exchangePairs: `${ item }`,
          newPrice: '--',
          highsAndLows: '--%'
        }
      ))
      trade.market[`marketCache${i}`] = trade.market[`market${i}`].slice(0)
    })
  }
}

const home = new Home()

export default home
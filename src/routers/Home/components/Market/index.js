import React, { Component } from 'react'
import { Input, Icon, Tabs, Table } from 'antd'
import './index.less'
import { BeforeSendGet } from '../../../../components/Ajax'
import { inject, observer } from 'mobx-react'
import Empty from '../../../../components/Empty'
import star1 from '../../images/star1.png'
import star2 from '../../images/star2.png'
import { withRouter } from 'react-router-dom'

const { TabPane } = Tabs

@withRouter
@inject('home', 'trade')
@observer
class ExchangeMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }
  componentDidMount() {
    const trade = this.props.trade
    const home = this.props.home
    home.urlpath = '/home'
    // BeforeSendGet('/api/v1/visitor/market/list', {}, function(res) {
    //   if (res.code === 0) {
    //     home.marketList = JSON.stringify(res.result)
    //     let len = res.result.length
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
    if (home.marketList.length === 0) {
      home.getMarketList()
    }
    if (trade.ws === null || trade.ws.readyState === 0) {
      trade.tradeWsInit()
    } else {
      trade.sendReq(2, 'state.subscribe', [])
    }
  }
  componentWillUnmount() {
    const trade = this.props.trade
    const home = this.props.home
    home.urlpath = ''
    home.marketLoading = true
    // 当websocket没有成功开启或者扔处于connecting状态，就跳转到其他页面，会提示send报错
    if (trade.ws !== null && trade.ws.readyState !== 0) {
      trade.sendReq(2, 'state.unsubscribe', [])
    }
  }
  // 标题栏切换回调
  coinsTypeChange = (key) => {
    let home = this.props.home
    let marketList = JSON.parse(home.marketList)
    home.activeKey = key
    if (this.state.searchText) {
      this.setState({
        searchText: ''
      })
      marketList.forEach((val, i) => {
        home[`market${i}`] = home[`marketCache${i}`]
      })
    }
    if (+home.activeKey === marketList.length) {
      let collect = marketList.map(() => {
        return {
          market: []
        }
      })
      marketList.forEach((val, i) => {
        collect[i].market = home[`market${i}`].filter(val => val.isCollected)
      })
      let data = []
      marketList.forEach((val, i) => {
        data.push(...collect[i].market)
      })
      home.collectData = data
      home.collectDataCache = data
    }
  }
  // 搜索币种
  search = () => {
    const home = this.props.home
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      if (JSON.parse(home.marketList).length === +home.activeKey) {
        let data = home.collectDataCache.filter(val => {
          return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
        })
        home.collectData = data
      } else {
        let data = home[`marketCache${ home.activeKey }`].filter(val => {
          return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
        })
        home[`market${ home.activeKey }`] = data
      }
    } else {
      if (JSON.parse(home.marketList).length === +home.activeKey) {
        home.collectData = home.collectDataCache
      } else {
        home[`market${ home.activeKey }`] = home[`marketCache${ home.activeKey }`]
      }
    }  
  }
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    }, () => {
      this.search()
    })
  }
  // 点击star图标收藏
  rowClick = (record, rowKey) => {
    return {
      onClick: e => {
        if (e.target.className === 'collectStar') {
          // 用record设置收藏有点慢 -- 待解决方法，暂留
          record.isCollected = !record.isCollected
        }
        if (e.target.className === 'exchangePairs') {
          let trade = this.props.trade
          let text = e.target.innerHTML
          let arr = text.split('/')
          trade.currencyTrading.coinsType = arr[0]
          trade.currencyTrading.coinsTypeTitle = arr[1]
          this.props.history.push('/trade')
        }
      }
    }
  }
  render() {
    console.log('刷新')
    const home = this.props.home
    let marketList = home.marketList.length > 0 ? JSON.parse(home.marketList) : []
    let isUpdate = home.isUpdate
    const loadingStyle = {
      spinning: home.marketLoading,
      tip: 'Loading...',
      indicator: <Icon type="loading" spin />
    }
    let columns = [
      {
        title: '',
        dataIndex: 'isCollected',
        render: text => {
          return (
            <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star2 : star1 } alt="" />
          )
        },
        align: 'right',
        width: '5%'
      },
      {
        title: '交易对',
        dataIndex: 'exchangePairs',
        align: 'center',
        width: '11%',
        render: text => {
          return (
            <td className="exchangePairs" style={{ display: 'block', width: '100%', textAlign: 'center', cursor: 'pointer' }}>{ text }</td>
          )
        }
      },
      {
        title: '最新价',
        dataIndex: 'newPrice',
        align: 'center',
        width: '11%'
      },
      {
        title: '日涨跌',
        dataIndex: 'highsAndLows',
        render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>,
        align: 'center',
        width: '11%'
      },
      {
        title: '最高价',
        dataIndex: 'highestPrice',
        align: 'center',
        width: '11%'
      },
      {
        title: '最低价',
        dataIndex: 'minimumPrice',
        align: 'center',
        width: '11%'
      },
      {
        title: '日成交量',
        dataIndex: 'dailyVolume',
        align: 'center',
        width: '20%'
      },
      {
        title: '日成交额',
        dataIndex: 'dailyTurnover',
        sorter: (a, b) => {
          return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
        },
        align: 'center',
        width: '20%'
      }
    ]
    return (
      <div className="exchange_market">
        <Input
          placeholder="搜索币种"
          prefix={ <Icon onClick={ this.search } type="search" style={{ color: '#9a9a9a', cursor: 'pointer' }} /> }
          className="market_search_input"
          value={ this.state.searchText }
          // onPressEnter={ this.search }
          onChange={ this.handleChange }
        />
        { marketList.length > 0 ?
          <Tabs defaultActiveKey="0" onChange={ this.coinsTypeChange }>
            { marketList.map((val, i) => (
              <TabPane tab={ `${ val.Money }市场` } key={i}>
                <Table columns={ columns }
                  dataSource={ home[`market${i}`] }
                  pagination={ false }
                  loading={ loadingStyle }
                  onRow={ this.rowClick }
                  locale={{
                    emptyText: (
                      <Empty height="120" text="无匹配数据" />
                    )
                  }}
                />
              </TabPane>
            )) }
            <TabPane tab={ <span><img style={{ marginBottom: 5, marginRight: 5 }} src={ star2 } />自选市场</span> } key={ `${ marketList.length }` }>
              <Table columns={ columns } dataSource={ home.collectData } pagination={ false } onRow={ this.rowClick } locale={{
                emptyText: (
                  <Empty height="120" text="暂无收藏" />
                )
              }} />
            </TabPane>
          </Tabs>
          : ''
        }
      </div>
    )
  }
}

export default ExchangeMarket
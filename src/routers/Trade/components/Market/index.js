import React, { Component } from 'react'
import { Checkbox, Tabs, Table, Input, Icon } from 'antd'
import './index.less'
import star1 from '../../images/star1.png'
import star2 from '../../images/star2.png'
import { inject, observer } from 'mobx-react'

const { TabPane } = Tabs

@inject('trade', 'home')
@observer
class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      selfCheckValue: false
    }
  }
  componentDidMount() {
    const home = this.props.home
    if (home.marketList.length === 0) {
      home.getMarketList()
    }
  }
  // 币种改变 -- 根据自选框有无选中展示数据
  activeKeyChange = key => {
    const home = this.props.home
    const trade = this.props.trade
    let marketList = JSON.parse(home.marketList)
    let market = trade.market
    this.props.trade.market.activeKey = key
    if (this.state.searchText) {
      this.setState({
        searchText: ''
      })
      marketList.forEach((val, i) => {
        market[`market${i}`] = market[`marketCache${i}`]
      })
    }
    if (this.state.selfCheckValue) {
      this.displayBySelfCheckAndKey(key)
    }
  }
  // 根据activeKey及自选按钮选中状态来设置展示的数据
  displayBySelfCheckAndKey = key => {
    const trade = this.props.trade
    const market = trade.market
    let data = market[`marketCache${key}`].filter(val => {
      return val.isCollected
    })
    market[`market${key}`] = data
  }
  // 搜索币种
  search = () => {
    const trade = this.props.trade
    let market = trade.market
    this.setState({
      selfCheckValue: false
    })
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      let data = market[`marketCache${ market.activeKey }`].filter(val => {
        return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
      })
      market[`market${ market.activeKey }`] = data
    } else {
      market[`market${ market.activeKey }`] = market[`marketCache${ market.activeKey }`]
    }  
  }
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value
    }, () => {
      this.search()
    })
  }
  // 点击收藏按钮收藏
  rowClick = (record, rowkey) => {
    return {
      onClick: e => {
        const trade = this.props.trade
        if (e.target.className === 'collectStar') {
          record.isCollected = !record.isCollected
        } else {
          trade.currencyTrading.coinsType = record.exchangePairs
          trade.currencyTrading.coinsTypeTitle = JSON.parse(this.props.home.marketList)[trade.market.activeKey].Money
          trade.newDeal.newDealLoading = true
          trade.sendReq(5, 'deals.subscribe', [trade.currentCoinsType])
        }
      }
    }
  }
  // 自选 -- 显示已收藏
  selfCheckedData = e => {
    let checked = e.target.checked
    this.setState({
      searchText: '',
      selfCheckValue: checked
    })
    if (checked) {
      this.displayBySelfCheckAndKey(this.props.trade.market.activeKey)
    } else {
      JSON.parse(this.props.home.marketList).forEach((val, i) => {
        this.props.trade.market[`market${i}`] = this.props.trade.market[`marketCache${i}`]
      })
    }
  }
  render() {
    const trade = this.props.trade
    const home = this.props.home
    let marketList = home.marketList.length > 0 ? JSON.parse(home.marketList) : []
    // isUpdate为mobx中用来强制更新该页面
    let isUpdate = trade.market.isUpdate
    const loadingStyle = {
      spinning: trade.market.marketLoading,
      tip: 'Loading...',
      indicator: <Icon type="loading" spin />
    }
    const columns = [
      {
        title: '币种',
        dataIndex: 'exchangePairs',
        render: (text, record) => {
          return (
            <span><img className="collectStar" style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</span>
          )
        },
        align: 'center',
        sorter: (a, b) => {
          return b.exchangePairs.charCodeAt(0) - a.exchangePairs.charCodeAt(0)
        },
        width: '34%'
      },
      {
        title: '最新价',
        dataIndex: 'newPrice',
        align: 'center',
        sorter: (a, b) => {
          return parseFloat(a.newPrice) - parseFloat(b.newPrice)
        },
        width: '40%'
      },
      {
        title: '涨跌',
        dataIndex: 'highsAndLows',
        align: 'center',
        sorter: (a, b) => {
          return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
        },
        render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>,
        width: '36%'
      }
    ]
    return (
      <div className="exchange-market">
        <header>
          <p>交易市场</p>
          <Input
            placeholder="搜索币种"
            prefix={ <Icon onClick={ this.search } type="search" style={{ color: '#9a9a9a', cursor: 'pointer' }} /> }
            className="coins-search"
            value={ this.state.searchText }
            // onPressEnter={ this.search }
            onChange={ this.handleChange }
          />
        </header>
        <main>
          { marketList.length > 0 ?
            <Tabs defaultActiveKey="0" onChange={ this.activeKeyChange } tabBarExtraContent={ <Checkbox checked={ this.state.selfCheckValue } onChange={ this.selfCheckedData } className="self-check">自选</Checkbox> }>
              { marketList.map((val, i) => (
                <TabPane tab={ `${ val.Money }` } key={i}>
                  <Table columns={ columns } dataSource={ trade.market[`market${i}`] } scroll={{ y: 545 }} pagination={ false } onRow={ this.rowClick } loading={ loadingStyle } />
                </TabPane>
              )) }
            </Tabs>
            : ''
          }
        </main>
      </div>
    )
  }
}

export default Market
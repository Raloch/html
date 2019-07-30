import React, { Component } from 'react'
import { Input, Icon, Tabs, Table, message } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT, columnsCollect } from '../marketList'
import './index.less'
import { BeforeSendGet } from '../../../../components/Ajax'
import { inject, observer } from 'mobx-react'
import Empty from '../../../../components/Empty'
import star2 from '../../images/star2.png'
import { withRouter } from 'react-router-dom'

const { TabPane } = Tabs
let collectData = []

@withRouter
@inject('home', 'trade')
@observer
class ExchangeMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      activeKey: '1',
      dataBTC: dataBTC,
      dataUSDT: dataUSDT,
      dataETH: dataETH,
      dataBCT: dataBCT,
      collectData: collectData,
      collectDataCache: [],
      activeKeyBefore: '1'
    }
  }
  componentDidMount() {
    const trade = this.props.trade
    const home = this.props.home
    home.urlpath = '/home'
    BeforeSendGet('/api/v1/visitor/market/list', {}, function(res) {
      if (res.code === 0) {
        console.log(res)
      }
    })
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
    home.BTCLoading = true
    // 当websocket没有成功开启或者扔处于connecting状态，就跳转到其他页面，会提示send报错
    if (trade.ws !== null && trade.ws.readyState !== 0) {
      trade.sendReq(2, 'state.unsubscribe', [])
    }
  }
  // 标题栏切换回调
  coinsTypeChange = (key) => {
    this.setState({
      activeKey: key
    }, () => {
      if (this.state.searchText) {
        this.setState({
          searchText: ''
        })
        switch(this.state.activeKeyBefore) {
          case '1':
            this.setState({
              dataBTC
            })
            break
          case '2':
            this.setState({
              dataUSDT
            })
            break
          case '3':
            this.setState({
              dataETH
            })
            break
          case '4':
            this.setState({
              dataBCT
            })
            break
        }
      }
      this.setState({
        activeKeyBefore: key
      })
      if (this.state.activeKey === '5') {
        let BTCCollect = dataBTC.filter(val => {
          return val.isCollected
        })
        let USDTCollect = dataUSDT.filter(val => {
          return val.isCollected
        })
        let ETHCollect = dataETH.filter(val => {
          return val.isCollected
        })
        let BCTCollect = dataBCT.filter(val => {
          return val.isCollected
        })
        let data = [...BTCCollect, ...USDTCollect, ...ETHCollect, ...BCTCollect]
        collectData = data
        this.setState({
          collectData
        })
      }
    })
    
  }
  // 搜索币种
  search = () => {
    const home = this.props.home
    let arr, name
    switch(this.state.activeKey) {
      case '1':
        arr = dataBTC
        name = 'dataBTC'
        home.BTCLoading = true
        break
      case '2':
        arr = dataUSDT
        name = 'dataUSDT'
        break
      case '3':
        arr = dataETH
        name = 'dataETH'
        break
      case '4':
        arr = dataBCT
        name = 'dataBCT'
        break
      case '5':
        arr = collectData
        name = 'collectData'
    }
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      let data = arr.filter(val => {
        return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
      })
      this.setState({
        [name]: data
      })
    } else {
      this.setState({
        [name]: arr
      })
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
    const home = this.props.home
    let isUpdate = home.isUpdate
    const loadingStyle = {
      spinning: home.BTCLoading,
      tip: 'Loading...',
      indicator: <Icon type="loading" spin />
    }
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
        <Tabs defaultActiveKey="1" onChange={ this.coinsTypeChange }>
          <TabPane tab="BTC市场" key="1">
            <Table columns={ columnsBTC } dataSource={ this.state.dataBTC } pagination={ false } loading={ loadingStyle } onRow={ this.rowClick } locale={{
              emptyText: (
                <Empty height="120" text="无匹配数据" />
              )
            }} />
          </TabPane>
          <TabPane tab="USDT市场" key="2">
            <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } pagination={ false } onRow={ this.rowClick } locale={{
              emptyText: (
                <Empty height="120" text="无匹配数据" />
              )
            }} />
          </TabPane>
          <TabPane tab="ETH市场" key="3">
            <Table columns={ columnsETH } dataSource={ this.state.dataETH } pagination={ false } onRow={ this.rowClick } locale={{
              emptyText: (
                <Empty height="120" text="无匹配数据" />
              )
            }} />
          </TabPane>
          <TabPane tab="BCT市场" key="4">
            <Table columns={ columnsBCT } dataSource={ this.state.dataBCT } pagination={ false } onRow={ this.rowClick } locale={{
              emptyText: (
                <Empty height="120" text="无匹配数据" />
              )
            }} />
          </TabPane>
          <TabPane tab={ <span><img style={{ marginBottom: 5, marginRight: 5 }} src={ star2 } />自选市场</span> } key="5">
            <Table columns={ columnsCollect } dataSource={ this.state.collectData } pagination={ false } onRow={ this.rowClick } locale={{
              emptyText: (
                <Empty height="120" text="暂无收藏" />
              )
            }} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default ExchangeMarket
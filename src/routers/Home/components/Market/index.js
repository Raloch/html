import React, { Component } from 'react'
import { Input, Icon, Tabs, Table, message } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT, columnsCollect } from '../marketList'
import './index.less'
import { inject, observer } from 'mobx-react'
import Empty from '../../../../components/Empty'
import star2 from '../../images/star2.png'

const { TabPane } = Tabs
let ws = null
let collectData = []

@inject('Store')
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
    const store = this.props.Store
    store.urlpath = '/home'
    if (store.ws === null) {
      store.tradeWsInit()
    } else {
      store.sendReq(2, 'state.subscribe', [])
    }
  }
  componentWillUnmount() {
    const store = this.props.Store
    store.path = ''
    store.BTCLoading = true
    store.sendReq(2, 'state.unsubscribe', [])
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
    const store = this.props.Store
    let arr, name, loadName
    switch(this.state.activeKey) {
      case '1':
        arr = dataBTC
        name = 'dataBTC'
        loadName = 'BTCLoading'
        store.BTCLoading = true
        break
      case '2':
        arr = dataUSDT
        name = 'dataUSDT',
        loadName = 'USDTLoading'
        store.USDTLoading = true
        break
      case '3':
        arr = dataETH
        name = 'dataETH'
        loadName = 'ETHLoading'
        store.ETHLoading = true
        break
      case '4':
        arr = dataBCT
        name = 'dataBCT'
        loadName = 'BCTLoading'
        store.BCTLoading = true
        break
      case '5':
        arr = collectData
        name = 'collectData'
        loadName = 'collectLoading'
        store.collectLoading = true
    }
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      let data = arr.filter(val => {
        return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
      })
      let loadName = store[loadName]
      this.setState({
        [name]: data,
        [loadName]: false
      })
    } else {
      this.setState({
        [name]: arr,
        [loadName]: false
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
      }
    }
  }
  render() {
    const store = this.props.Store
    let isUpdate = store.isUpdate 
    const loadingStyle = {
      spinning: store.BTCLoading,
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
        <Tabs defaultActiveKey="1" className="market_header" onChange={ this.coinsTypeChange }>
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
            <Table columns={ columnsCollect } dataSource={ this.state.collectData } pagination={ false } loading={ store.CollectLoading } onRow={ this.rowClick } locale={{
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
import React, { Component } from 'react'
import { Input, Icon, Tabs, Table, message, Empty } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT, columnsFree, dataFree } from '../marketList'
import './index.less'
import star2 from '../../images/star2.png'

const { TabPane } = Tabs
let ws = null

class ExchangeMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      activeKey: '1',
      dataUSDT: dataUSDT,
      dataBTC: dataBTC,
      dataETH: dataETH,
      dataBCT: dataBCT,
      dataFree: dataFree,
      USDTLoading: false,
      BTCLoading: true,
      ETHLoading: false,
      BCTLoading: false,
      FreeLoading: false
    }
  }
  componentDidMount() {
    this.WebSocketInit()
  }
  WebSocketInit = () => {
    let _this = this
    if ("WebSocket" in window) {
    // 您的浏览器支持websocket
      if (ws === null) {
        ws = new WebSocket('wss://socket.coinex.com/')
      }
      ws.onopen = function() {
        message.success('websocket已连接')
        let data1 = {
          id: 1,
          method: 'server.ping',
          params: []
        }
        let data2 = {
          id: 2,
          method: 'state.subscribe',
          params: []
        }
        ws.send(JSON.stringify(data1))
        ws.send(JSON.stringify(data2))
      }
      ws.onmessage = function(res) {
        // message.success('正在接收数据...')
        _this.updateMarket(res)
      }
      ws.onclose = function(res) {
        message.warn('websocket连接关闭')
      }
    } else {
      message.error('您的浏览器不支持websocket')
    }
  }
  // 接收websocket数据设置首页交易市场数据展示
  updateMarket(res) {
    let data = JSON.parse(res.data)
    if (data.method) {
      let params = data.params[0]
      switch(this.state.activeKey) {
        case '1':
          dataBTC.forEach((val, i) => {
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
          this.setState({
            BTCLoading: false,
            dataBTC
          })
          break
      }
    }
  }
  // 标题栏切换回调
  callback = (key) => {
    this.state.activeKey = key
  }
  // 搜索币种
  search = () => {
    let arr, name, loadName
    switch(this.state.activeKey) {
      case '1':
        arr = dataUSDT
        name = 'dataUSDT',
        loadName = 'USDTLoading'
        this.setState({
          USDTLoading: true
        })
        break
      case '2':
        arr = dataBTC
        name = 'dataBTC'
        loadName = 'BTCLoading'
        this.setState({
          BTCLoading: true
        })
        break
      case '3':
        arr = dataBTC
        name = 'dataETH'
        loadName = 'ETHLoading'
        this.setState({
          ETHLoading: true
        })
        break
      case '4':
        arr = dataBTC
        name = 'dataBCT'
        loadName = 'BCTLoading'
        this.setState({
          BCTLoading: true
        })
        break
      case '5':
        arr = dataBTC
        name = 'dataFree'
        loadName = 'FreeLoading'
        this.setState({
          FreeLoading: true
        })
        break
    }
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      let data = arr.filter(val => {
        return val.exchangePairs.toLowerCase().includes(this.state.searchText.toLowerCase())
      })
      // setTimeout(() => { // 模拟延迟加载loading效果
      //   this.setState({
      //     [name]: data,
      //     [loadName]: false
      //   })
      // }, 1000)
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
    })
  }
  // 点击star图标收藏
  rowClick = (record, rowKey) => {
    return {
      onClick: e => {
        if (e.target.className === 'collectStar') {
          switch(this.state.activeKey) {
            case '1':
              this.state.dataUSDT[record.key - 1].isCollected = !this.state.dataUSDT[record.key - 1].isCollected
              this.setState({
                  dataUSDT
              })
              break
            case '2':
              this.state.dataBTC[record.key - 1].isCollected = !this.state.dataBTC[record.key - 1].isCollected
              this.setState({
                  dataBTC
              })
              break
            case '3':
              this.state.dataETH[record.key - 1].isCollected = !this.state.dataETH[record.key - 1].isCollected
              this.setState({
                  dataETH
              })
              break
            case '4':
              this.state.dataBCT[record.key - 1].isCollected = !this.state.dataBCT[record.key - 1].isCollected
              this.setState({
                  dataBCT
              })
              break
          }
        }
      }
    }
  }
  render() {
    return (
      <div className="exchange_market">
        <Input
          placeholder="搜索币种"
          prefix={ <Icon onClick={ this.search } type="search" style={{ color: '#9a9a9a', cursor: 'pointer' }} /> }
          className="market_search_input"
          value={ this.state.searchText }
          onPressEnter={ this.search }
          onChange={ this.handleChange }
        />
        <Tabs defaultActiveKey={ this.state.activeKey } className="market_header" onChange={ this.callback }>
          <TabPane tab="BTC市场" key="1">
            <Table columns={ columnsBTC } dataSource={ this.state.dataBTC } pagination={ false } loading={ this.state.BTCLoading } onRow={ this.rowClick } />
          </TabPane>
          <TabPane tab="USDT市场" key="2">
            <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } pagination={ false } loading={ this.state.USDTLoading } onRow={ this.rowClick } />
          </TabPane>
          <TabPane tab="ETH市场" key="3">
            <Table columns={ columnsETH } dataSource={ this.state.dataETH } pagination={ false } loading={ this.state.USDTLoading } onRow={ this.rowClick } />
          </TabPane>
          <TabPane tab="BCT市场" key="4">
            <Table columns={ columnsBCT } dataSource={ this.state.dataBCT } pagination={ false } loading={ this.state.USDTLoading } onRow={ this.rowClick } />
          </TabPane>
          <TabPane tab={ <span><img style={{ marginBottom: 5, marginRight: 5 }} src={ star2 } />自选市场</span> } key="5">
            <Table columns={ columnsFree } dataSource={ this.state.dataFree } pagination={ false } loading={ this.state.USDTLoading } onRow={ this.rowClick } />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default ExchangeMarket
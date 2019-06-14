import React, { Component } from 'react'
import { Checkbox, Tabs, Table, Input, Icon, message } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT } from '../coinsList'
import { exchangeData } from '../currentExchangeList'
import './index.less'

let ws = null
const { TabPane } = Tabs

class Market extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      activeKey: '1',
      dataUSDT: dataUSDT,
      dataBTC: dataBTC,
      dataETH: dataETH,
      dataBCT: dataBCT,
      USDTLoading: false,
      BTCLoading: false,
      ETHLoading: false,
      BCTLoading: false,
      exchangeData: exchangeData, // 最近交易
      selfCheckValue: false
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
  // 币种改变 -- 根据自选框有无选中展示数据
  activeKeyChange = (key) => {
    this.state.activeKey = key
    if (this.state.selfCheckValue) {
      this.displayBySelfCheckAndKey(key)
    } else {
      this.setState({
        dataUSDT: dataUSDT,
        dataBTC: dataBTC,
        dataETH: dataETH,
        dataBCT: dataBCT
      })
    }
  }
  // 根据activeKey及自选按钮选中状态来设置展示的数据
  displayBySelfCheckAndKey = key => {
    switch(key) {
      case '1':
        let USDTCollected = dataUSDT.filter(val => {
          return val.isCollected
        })
        this.setState({
          dataUSDT: USDTCollected
        })
        break
      case '2':
        let BTCCollected = dataBTC.filter(val => {
          return val.isCollected
        })
        this.setState({
          dataBTC: BTCCollected
        })
        break
      case '3':
        let ETHCollected = dataETH.filter(val => {
          return val.isCollected
        })
        this.setState({
          dataETH: ETHCollected
        })
        break
      case '4':
        let BCTCollected = dataBCT.filter(val => {
          return val.isCollected
        })
        this.setState({
          dataBCT: BCTCollected
        })
        break
    }
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
    }
    if (this.state.searchText !== '') {
      // 过滤不匹配的元素
      let data = arr.filter(val => {
        return val.coinsType.toLowerCase().includes(this.state.searchText.toLowerCase())
      })
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
  // 精度小数点
  accuracyChange = val => {
    console.log(val)
  }
  // 点击收藏按钮收藏
  rowClick = (record, rowkey) => {
    return {
      onClick: (e) => {
        if (e.target.className === 'collectStar') {
          switch(this.state.activeKey) {
            case '1':
              this.state.dataUSDT[rowkey].isCollected = !this.state.dataUSDT[rowkey].isCollected
              this.setState({
                dataUSDT
              })
              break
            case '2':
              this.state.dataBTC[rowkey].isCollected = !this.state.dataBTC[rowkey].isCollected
              this.setState({
                dataBTC
              })
              break
            case '3':
              this.state.dataETH[rowkey].isCollected = !this.state.dataETH[rowkey].isCollected
              this.setState({
                dataETH
              })
              break
            case '4':
              this.state.dataBCT[rowkey].isCollected = !this.state.dataBCT[rowkey].isCollected
              this.setState({
                dataBCT
              })
              break
          }
        }
      }
    }
  }
  // 自选 -- 显示已收藏
  selfCheckedData = e => {
    let checked = e.target.checked
    this.setState({
      selfCheckValue: checked
    })
    const { activeKey } = this.state
    if (checked) {
      this.displayBySelfCheckAndKey(activeKey)
    } else {
      this.setState({
        dataUSDT: dataUSDT,
        dataBTC: dataBTC,
        dataETH: dataETH,
        dataBCT: dataBCT
      })
    }
  }
  render() {
    return (
      <div className="exchange-market">
        <header>
          <p>交易市场</p>
          <Input
            placeholder="搜索币种"
            prefix={ <Icon onClick={ this.search } type="search" style={{ color: '#9a9a9a', cursor: 'pointer' }} /> }
            className="coins-search"
            value={ this.state.searchText }
            onPressEnter={ this.search }
            onChange={ this.handleChange }
          />
        </header>
        <main>
          <Tabs defaultActiveKey={ this.state.activeKey } onChange={ this.activeKeyChange } tabBarExtraContent={ <Checkbox checked={ this.state.selfCheckValue } onChange={ this.selfCheckedData } className="self-check">自选</Checkbox> }>
            <TabPane tab="BTC" key="1">
              <Table columns={ columnsBTC } dataSource={ this.state.dataBTC } scroll={{ y: 545 }} pagination={ false } onRow={ this.rowClick } />
              {/* <div className="market_USDT" style={{ height: 569, overflow: 'auto' }}>
                <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } pagination={ false } />
              </div> */}
            </TabPane>
            <TabPane tab="USDT" key="2">
              <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } scroll={{ y: 545 }} pagination={ false } onRow={ this.rowClick } />
            </TabPane>
            <TabPane tab="ETH" key="3">
              <Table columns={ columnsETH } dataSource={ this.state.dataETH } scroll={{ y: 545 }} pagination={ false } onRow={ this.rowClick } />
            </TabPane>
            <TabPane tab="BCT" key="4">
              <Table columns={ columnsBCT } dataSource={ this.state.dataBCT } scroll={{ y: 545 }} pagination={ false } onRow={ this.rowClick } />
            </TabPane>
          </Tabs>
        </main>
      </div>
    )
  }
}

export default Market
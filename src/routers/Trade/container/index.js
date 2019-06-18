import React, { Component } from 'react'
import './index.less'
import { Layout, message } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT } from '../components/coinsList'
import { exchangeData } from '../components/currentExchangeList'
import { BeforeSendGet, BeforeSendPost } from '../../../components/Ajax'

import Market from '../components/Market'
import CoinsTypeData from '../components/CoinsTypeData'
import Kline from '../components/Kline'
import EntrustInformation from '../components/EntrustInformation'
import Transaction from '../components/Transaction'
import TypeHeader from '../components/TypeHeader'
import CurrentEntrust from '../components/CurrentEntrust'
import HistoryEntrust from '../components/HistoryEntrust'
import NewDeal from '../components/NewDeal'

const { Footer, Sider, Content } = Layout

let ws = null

class Trade extends Component {
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
      BTCLoading: true,
      ETHLoading: false,
      BCTLoading: false,
      exchangeData: exchangeData, // 最近交易
      currentExchangeLoading: true,
      // transaction -- 限价交易
      buyButtonLoading: false,
      sellButtonLoading: false,
      // currentEntrust -- 当前委托
      currentEntrustData: []
    }
  }
  componentDidMount() {
    this.WebSocketInit()

    // 当前委托
    let obj = {
      market: 'BTCUSDT',
      offset: '0, 100'
    }
    this.getCurrentTrustData(obj)
    // 设置定时器更新当前委托数据
    setInterval(() => {
      this.getCurrentTrustData(obj)
    }, 5000);
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
        // 交易市场
        let data2 = {
          id: 2,
          method: 'state.subscribe',
          params: []
        }
        let data3 = {
          id: 3,
          method: 'state.subscribe',
          params: ['BTCUSDT', 20, '1']
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
        let data6 = {                                                                          
          id: 6,
          method: 'kline.query',
          params: ['BTCUSDT', 1559268744, 1560564804, 900]
        }
        let data7 = {                                                                          
          id: 7,
          method: 'kline.subscribe',
          params: ['BTCUSDT', 900]
        }
        ws.send(JSON.stringify(data1))
        ws.send(JSON.stringify(data2))
        ws.send(JSON.stringify(data5))
      }
      ws.onmessage = function(res) {
        _this.updateMarket(res)
      }
      ws.onclose = function(res) {
        message.warn('websocket连接关闭')
      }
    } else {
      message.error('您的浏览器不支持websocket')
    }
  }
  loadNewDeal = () => {
    this.setState({
      currentExchangeLoading: true
    })
  }
  // 接收websocket数据设置币币交易 -- 交易市场数据展示
  updateMarket = res => {
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
      this.setState({
        BTCLoading: false,
        dataBTC
      })
    }
    // 最近成交 -- data5
    if (data.method === 'deals.update') {
      if (data.params[1].length > 50) {
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
        this.setState({
          currentExchangeLoading: false,
          exchangeData: arr
        })
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
        this.setState({
          exchangeData: arr.concat(this.state.exchangeData)
        })
      }
    }
  }
  // 限价单
  buyLimit = obj => {
    this.setState({
      buyButtonLoading: true
    }, () => {
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          message.success('买入成功')
          // console.log('限价单 ' + JSON.stringify(d.result))
          _this.getCurrentTrustData({
            market: 'BTCUSDT',
            offset: '0, 100'
          })
          setTimeout(() => {
            _this.setState({
              buyButtonLoading: false
            })
          }, 1000)
        }
      })
    })
  }
  sellLimit = obj => {
    this.setState({
      sellButtonLoading: true
    }, () => {
      let _this = this
      BeforeSendPost('/api/v1/user/order/put-limit', obj, function(d) {
        if (d.code === 0) {
          message.success('卖出成功')
          // console.log('限价单 ' + JSON.stringify(d.result))
          _this.getCurrentTrustData({
            market: 'BTCUSDT',
            offset: '0, 100'
          })
          setTimeout(() => {
            _this.setState({
              sellButtonLoading: false
            })
          }, 1000)
        }
      })
    })
  }
  // 当前委托接口获取数据
  getCurrentTrustData = obj => {
    let _this = this
    BeforeSendGet('/api/v1/user/order/pending', obj, function(d) {
      if (d.code === 0) {
        let data = []
        // console.log(d.result.records)
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
        _this.setState({
          currentEntrustData: data
        })
      }
    })
  }
  // 撤销当前委托
  revoke = obj => {
    let _this = this
    BeforeSendPost('/api/v1/user/order/cancel', obj, function(d) {
      if (d.code === 0) {
        message.success('撤销成功')
        _this.getCurrentTrustData({
          market: 'BTCUSDT',
          offset: '0, 100'
        })
      }
    })
  }
  // 精度小数点
  accuracyChange = val => {
    // console.log(val)
  }
  render() {
    return (
      <div className="trade">
        <Layout className="trade-layout">
          {/* 左边交易市场栏 */}
          <Sider width="20.4545%" className="trade-sider" theme="light">
            {/* 交易市场 */}
            <Market BTCLoading={ this.state.BTCLoading } loadNewDeal={ this.loadNewDeal } ws={ ws } />
            <div className="line" style={{ height: 12, backgroundColor: '#eef1f7' }}></div>
            {/* 最新成交 */}
            <NewDeal currentExchangeLoading={ this.state.currentExchangeLoading } exchangeData={ this.state.exchangeData } />
          </Sider>
          {/* 右边内容 */}
          <Layout className="trade-right-layout">
            {/* 右侧头部 -- 币种数据展示 */}
            <TypeHeader />
            <Content className="trade-right-layout-content">
              <Layout className="trade-right-layout-content-layout">
                <Content className="trade-right-layout-content-layout-content">
                  {/* k线 */}
                  <Kline></Kline>
                  {/* 限价交易 */}
                  <Transaction buyButtonLoading={ this.state.buyButtonLoading } buyLimit={ this.buyLimit } sellButtonLoading={ this.state.sellButtonLoading } sellLimit={ this.sellLimit } />
                </Content>
                <Sider width="28.0979%" className="trade-right-layout-content-layout-sider" theme="light">
                  {/* 委托信息 */}
                  <EntrustInformation />
                </Sider>
                {/* Sider-width-390px */}
              </Layout>
            </Content>
            <Footer className="right-footer">
              {/* 当前委托 */}
              <CurrentEntrust currentEntrustData={ this.state.currentEntrustData } revoke={ this.revoke } />
              {/* 历史委托 */}
              <HistoryEntrust />
              {/* 币种资料 */}
              <CoinsTypeData />
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Trade
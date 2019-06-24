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
import { inject, observer } from 'mobx-react'

const { Footer, Sider, Content } = Layout

let ws = null

@inject('Store')
@observer
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
      exchangeData: [], // 最近交易
      currentExchangeLoading: true,
      // currentEntrust -- 当前委托
      currentEntrustData: [],
      ifFetch: true, // 设置dataBTC数据时，market子组件无法更新到，需要该变量传值改变来强制更新market组件
    }
  }
  componentDidMount() {
    // this.WebSocketInit()
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
        // ws.send(JSON.stringify(data2))
        ws.send(JSON.stringify(data5))
      }
      ws.onmessage = function(res) {
        _this.updateMarket(res)
      }
      ws.onclose = function(res) {
        console.log(res)
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
        ifFetch: !this.state.ifFetch
      })
    }
    // 最近成交 -- data5
    if (data.method === 'deals.update') {
      if (data.params[1].length > 50) {
        let arr = []
        data.params[1].forEach((val, i) => {
          arr[i] = {
            key: `${val.id + val.time}`,
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
        // 用一个布尔值强制渲染子组件，该布尔值无需添加到子组件props中
        this.setState({
          exchangeData: [...arr, ...this.state.exchangeData]
        })
      }
    }
  }
  render() {
    return (
      <div className="trade">
        <Layout className="trade-layout">
          {/* 左边交易市场栏 */}
          <Sider width="20.4545%" className="trade-sider" theme="light">
            {/* 交易市场 */}
            <Market BTCLoading={ this.state.BTCLoading } loadNewDeal={ this.loadNewDeal } ws={ ws } dataBTC={ this.state.dataBTC } ifFetch={ this.state.ifFetch } />
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
                  <Transaction />
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
              <CurrentEntrust currentEntrustData={ this.state.currentEntrustData } />
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
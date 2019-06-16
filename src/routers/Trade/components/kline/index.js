import React, { Component } from 'react'
import './index.less'
import { message } from 'antd'

let ws = null

class Kline extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
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
        // 交易市场币种数据
        let data2 = {
          id: 2,
          method: 'state.subscribe',
          params: ['BTCUSDT', 20, '1']
        }
        let data3 = {
          id: 3,
          method: 'deals.query',
          params: ['BTCUSDT', 34, 0]
        }
        let data4 = {
          id: 4,
          method: 'deals.subscribe',
          params: ['BTCUSDT']
        }
        let data5 = {
          id: 5,
          method: 'deals.query',
          params: []
        }
        ws.send(JSON.stringify(data1))
        ws.send(JSON.stringify(data2))
      }
      ws.onmessage = function(res) {
        // message.success('正在接收数据...')
      }
      ws.onclose = function(res) {
        message.warn('websocket连接关闭')
      }
    } else {
      message.error('您的浏览器不支持websocket')
    }
  }
  render() {
    return (
      <div className="k-line"></div>
    )
  }
}

export default Kline
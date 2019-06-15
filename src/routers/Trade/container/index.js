import React, { Component } from 'react'
import './index.less'
import { Layout, Input, Icon, Tabs, Table, Select, Steps, Button, Checkbox, message } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT } from '../components/coinsList'
import { exchangeColumns, exchangeData } from '../components/currentExchangeList'
import { currentEntrustColumns, currentEntrustData } from '../components/currentEntrustList'
import { historyEntrustColumns, historyEntrustData } from '../components/historyEntrustList'
import { entrustMessageColumns1, entrustMessageData1, entrustMessageColumns2, entrustMessageData2 } from '../components/entrustMessageList'
import Market from '../components/Market'
import CoinsTypeData from '../components/CoinsTypeData'
import star2 from '../images/star2.png'
import Kline from '../components/Kline/index'

const { Header, Footer, Sider, Content } = Layout
const { TabPane } = Tabs
const { Option } = Select
const { Step } = Steps

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
      currentExchangeLoading: true
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
    let data = JSON.parse(res.data)
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
      // console.log(data.params[1])
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
  // 精度小数点
  accuracyChange = val => {
    console.log(val)
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
            <div className="new-exchange">
              <header>
                <p>最近成交</p>
              </header>
              <main>
                <Table loading={ this.state.currentExchangeLoading } columns={ exchangeColumns } dataSource={ this.state.exchangeData.slice(0, 38) } pagination={ false } />
              </main>
            </div>
          </Sider>
          {/* 右边内容 */}
          <Layout className="trade-right-layout">
            <Header className="trade-right-layout-header">
              <div className="coinType fl">
                <img src={star2} alt=""/> BCH/USDT
              </div>
              <div className="newPrice fl">
                <div className="newPrice-left fl">
                  <div className="newPrice-box">
                    <p className="newPrice-left-title">最新价</p>
                    <p className="newPrice-left-price">0.00000000</p>
                  </div>
                </div>
                <div className="newPrice-right fl">≈ 0.0785 CNR</div>
              </div>
              <div className="highAndLow fl">
                <div className="box">
                  <p className="title">24小时涨跌</p>
                  <p className="percentage">-00.00%</p>
                </div>
              </div>
              <div className="highestPrice fl">
                <div className="box">
                  <p className="title">24小时最高价</p>
                  <p className="percentage">0.00000000BTC</p>
                </div>
              </div>
              <div className="lowestPrice fl">
                <div className="box">
                  <p className="title">24小时最低价</p>
                  <p className="percentage">0.00000000BTC</p>
                </div>
              </div>
              <div className="volume fl">
                <div className="box">
                  <p className="title">24小时成交量</p>
                  <p className="percentage">0.00000000BCH</p>
                </div>
              </div>
              <div className="turnover fl">
                <div className="box">
                  <p className="title">24小时成交额</p>
                  <p className="percentage">0.00000000BTC</p>
                </div>
              </div>
            </Header>
            <Content className="trade-right-layout-content">
              <Layout className="trade-right-layout-content-layout">
                <Content className="trade-right-layout-content-layout-content">
                  {/* k线 */}
                  <div className="k-line">
                    <Kline></Kline>
                  </div>
                  <div className="transaction">
                    <Tabs defaultActiveKey="1" onChange={ this.transactionChange }>
                      <TabPane className="present-price" tab="限价交易" key="1">
                        <div className="purchase fl">
                          <header>
                            <div>
                              <h3 className="fl">买入BCH</h3>
                              <a className="fr" href="javascript:void(0)">充值 ></a>
                            </div>
                            <p className="validBTC">可用: 0BTC</p>
                          </header>
                          <main>
                            <div className="input-purchase">
                              <div className="purchase-price">
                                <Input size="large" />
                                <p>买入价<span> (BTC)</span></p>
                              </div>
                              <p>≈0.01 CNY</p>
                              <div className="purchase-number">
                                <Input size="large" />
                                <p>买入量<span> (BCH)</span></p>
                              </div>
                            </div>
                            <div className="transaction-steps">
                              <Steps progressDot current={1}>
                                <Step title="" description="0%" />
                                <Step title="" description="25%" />
                                <Step title="" description="50%" />
                                <Step title="" description="75%" />
                                <Step title="" description="100%" />
                              </Steps>
                            </div>
                            <p className="expected-turnover">预计交易额: <span>0BTC</span></p>
                            <Button type="primary" size="large" block>买入</Button>
                          </main>
                        </div>
                        <div className="sellout fr">
                          <header>
                            <div>
                              <h3 className="fl">卖出BCH</h3>
                              <a className="fr" href="javascript:void(0)">充值 ></a>
                            </div>
                            <p className="validBTC">可用: 0BTC</p>
                          </header>
                          <main>
                            <div className="input-purchase">
                              <div className="purchase-price">
                                <Input size="large" />
                                <p>卖出价<span> (BTC)</span></p>
                              </div>
                              <p>≈0.01 CNY</p>
                              <div className="purchase-number">
                                <Input size="large" />
                                <p>卖出量<span> (BCH)</span></p>
                              </div>
                            </div>
                            <div className="transaction-steps">
                              <Steps progressDot current={1}>
                                <Step title="" description="0%" />
                                <Step title="" description="25%" />
                                <Step title="" description="50%" />
                                <Step title="" description="75%" />
                                <Step title="" description="100%" />
                              </Steps>
                            </div>
                            <p className="expected-turnover">预计交易额: <span>0BTC</span></p>
                            <Button type="primary" size="large" block>卖出</Button>
                          </main>
                        </div>
                      </TabPane>
                      <TabPane className="present-price" tab="市价交易" key="2">
                        <div className="purchase fl">
                          <header>
                            <div>
                              <h3 className="fl">买入BCH</h3>
                              <a className="fr" href="javascript:void(0)">充值 ></a>
                            </div>
                            <p className="validBTC">可用: 0BTC</p>
                          </header>
                          <main>
                            <div className="input-purchase">
                              <div className="purchase-price">
                                <Input size="large" />
                                <p>买入价<span> (BTC)</span></p>
                              </div>
                              <p style={{ height: 12, width: '100%' }}></p>
                              <div className="purchase-number">
                                <Input size="large" />
                                <p>交易额<span> (BCH)</span></p>
                              </div>
                            </div>
                            <div className="transaction-steps">
                              <Steps progressDot current={1}>
                                <Step title="" description="0%" />
                                <Step title="" description="25%" />
                                <Step title="" description="50%" />
                                <Step title="" description="75%" />
                                <Step title="" description="100%" />
                              </Steps>
                            </div>
                            <p className="expected-turnover" style={{ width: '100%', height: 21 }}><span></span></p>
                            <Button type="primary" size="large" block>买入</Button>
                          </main>
                        </div>
                        <div className="sellout fr">
                          <header>
                            <div>
                              <h3 className="fl">卖出BCH</h3>
                              <a className="fr" href="javascript:void(0)">充值 ></a>
                            </div>
                            <p className="validBTC">可用: 0BTC</p>
                          </header>
                          <main>
                            <div className="input-purchase">
                              <div className="purchase-price">
                                <Input size="large" />
                                <p>卖出价<span> (BTC)</span></p>
                              </div>
                              <p style={{ height: 12, width: '100%' }}></p>
                              <div className="purchase-number">
                                <Input size="large" />
                                <p>卖出量<span> (BCH)</span></p>
                              </div>
                            </div>
                            <div className="transaction-steps">
                              <Steps progressDot current={1}>
                                <Step title="" description="0%" />
                                <Step title="" description="25%" />
                                <Step title="" description="50%" />
                                <Step title="" description="75%" />
                                <Step title="" description="100%" />
                              </Steps>
                            </div>
                            <p className="expected-turnover" style={{ width: '100%', height: 21 }}><span></span></p>
                            <Button type="primary" size="large" block>卖出</Button>
                          </main>
                        </div>
                      </TabPane>
                      <div className="rate">
                        <p className="rate-taker fl">Taker费率: 0.01%</p>
                        <p className="rate-maker fr">Maker费率: 0.01%</p>
                      </div>
                    </Tabs>
                  </div>
                </Content>
                <Sider width="28.0979%" className="trade-right-layout-content-layout-sider" theme="light">
                  <header>
                    <h2 className="fl">委托信息</h2>
                    <div className="accuracy fr">
                      合并深度:
                      <Select defaultValue="num8" dropdownMatchSelectWidth={false} onChange={ this.accuracyChange }>
                        <Option value="num1">1位小数</Option>
                        <Option value="num2">2位小数</Option>
                        <Option value="num3">3位小数</Option>
                        <Option value="num4">4位小数</Option>
                        <Option value="num5">5位小数</Option>
                        <Option value="num6">6位小数</Option>
                        <Option value="num7">7位小数</Option>
                        <Option value="num8">8位小数</Option>
                      </Select>
                    </div>
                  </header>
                  <main>
                    <Table className="entrustMessage-table1" columns={ entrustMessageColumns1 } dataSource={ entrustMessageData1 } pagination={ false } />
                    <div className="new-price">
                      <p>最新价 <span>0.000000000BTC</span> <Icon className="arrow-down" type="arrow-down" /></p>
                    </div>
                    <Table className="entrustMessage-table2" columns={ entrustMessageColumns2 } dataSource={ entrustMessageData2 } pagination={ false } />
                  </main>
                </Sider>
                {/* Sider-width-390px */}
              </Layout>
            </Content>
            <Footer className="right-footer">
              <div className="current-entrust">
                <header>当前委托</header>
                <main>
                  <Table scroll={{ y: 380 }} columns={ currentEntrustColumns } dataSource={ currentEntrustData } pagination={ false } />
                </main>
              </div>
              <div className="history-entrust">
                <header>历史委托</header>
                <main>
                  <Table scroll={{ y: 380 }} columns={ historyEntrustColumns } dataSource={ historyEntrustData } pagination={ false } />
                </main>
              </div>
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
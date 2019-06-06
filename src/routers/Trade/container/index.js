import React, { Component } from 'react'
import './index.less'
import { Layout, Input, Icon, Tabs, Table, Select } from 'antd'
import { columnsUSDT, dataUSDT, columnsBTC, dataBTC, columnsETH, dataETH, columnsBCT, dataBCT } from '../components/coinsList'
import { exchangeColumns, exchangeData } from '../components/currentExchangeList'
import { currentEntrustColumns, currentEntrustData } from '../components/currentEntrustList'
import { historyEntrustColumns, historyEntrustData } from '../components/historyEntrustList'
import { entrustMessageColumns1, entrustMessageData1, entrustMessageColumns2, entrustMessageData2 } from '../components/entrustMessageList'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

const { Header, Footer, Sider, Content } = Layout
const { TabPane } = Tabs
const { Option } = Select

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
      BTCLoading: false,
      ETHLoading: false,
      BCTLoading: false,
      exchangeData: exchangeData // 最近交易
    }
  }
  callback = (key) => {
    this.state.activeKey = key
  }
  // 搜索币种
  search = () => {
    let arr, name, loadName
    console.log(this.state.activeKey)
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
  render() {
    return (
      <div className="trade">
        <Layout className="trade-layout">
          {/* 左边交易市场栏 */}
          <Sider width="20.4545%" className="trade-sider" theme="light">
            {/* 交易市场 */}
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
                <Tabs defaultActiveKey={ this.state.activeKey } onChange={ this.callback }>
                  <TabPane tab="USDT" key="1">
                    <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } scroll={{ y: 540 }} pagination={ false } />
                    {/* <div className="market_USDT" style={{ height: 569, overflow: 'auto' }}>
                      <Table columns={ columnsUSDT } dataSource={ this.state.dataUSDT } pagination={ false } />
                    </div> */}
                  </TabPane>
                  <TabPane tab="BTC" key="2">
                    <Table columns={ columnsBTC } dataSource={ this.state.dataBTC } pagination={ false } />
                  </TabPane>
                  <TabPane tab="ETH" key="3">
                    <Table columns={ columnsETH } dataSource={ this.state.dataETH } pagination={ false } />
                  </TabPane>
                  <TabPane tab="BCT" key="4">
                    <Table columns={ columnsBCT } dataSource={ this.state.dataBCT } pagination={ false } />
                  </TabPane>
                </Tabs>
              </main>
            </div>
            <div className="line" style={{ height: 12, backgroundColor: '#eef1f7' }}></div>
            {/* 最新成交 */}
            <div className="new-exchange">
              <header>
                <p>最近成交</p>
              </header>
              <main>
                <Table columns={ exchangeColumns } dataSource={ this.state.exchangeData.slice(0, 38) } pagination={ false } />
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
                  <div className="k-line">K线</div>
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
                          </main>
                        </div>
                        <div className="sellout fr"></div>
                      </TabPane>
                      <TabPane tab="市价交易" key="2">Content of Tab Pane 2</TabPane>
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
              <div className="MSCurrency">
                <header>
                  <p className="fl">币种资料</p>
                  <a href="javascript:void(0)" className="fr">了解更多>></a>
                </header>
                <main>
                  <h3>BCH</h3>
                  <div className="coinMsg">
                    <h4>特币现金(Bitcoin Cash)</h4>
                    <p>比特币（BTC）是目前世界上最受追捧的数字货币，2017年8月1日发生分差，在一个“硬叉”的事件中，诞生了一种被称为比特币现金（BCH）的新数字货币。由于版本切换，比特币区块链被分叉至两条独立的区块链。在分叉前拥有比特币的所有人都有权获得相同数量的“比特币现金”代币，类似于股票中的股息派发。比特币现金（BCH）是由一小部分比特币开发者推出的不同配置的新版比特币，是一种新型的区块链资产。在2017年8月1日，比特币现金开始挖矿，每个比特币投资者的账户上将出现与比特币数量等量的比特币现金（BCH）。</p>
                  </div>
                </main>
              </div>
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Trade
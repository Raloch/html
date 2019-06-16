import React, { Component } from 'react'
import './index.less'
import { Tabs, Input, Steps, Button } from 'antd'

const { TabPane } = Tabs
const { Step } = Steps

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
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
    )
  }
}

export default Transaction
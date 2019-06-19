import React, { Component } from 'react'
import './index.less'
import { Tabs, Input, Steps, Button, message, Modal, Form } from 'antd'
import { BeforeSendGet, BeforeSendPost } from '@/components/Ajax/index'
import { inject, observer } from 'mobx-react'

const { TabPane } = Tabs
const { Step } = Steps

@inject('Store')
@observer
class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buyPrice: '',
      buyAmount: '',
      validBTC: 0, // 可用余额
      visible: false,
      rechargeNumber: Number,
      sellAmount: '',
      sellPrice: '',
      sellButtonLoading: false
    }
  }
  componentDidMount() {
    const _this = this
    let obj = {
      assets: ''
    }
    BeforeSendGet('/api/v1/user/balance/query', obj, function(d) {
      if (d.code === 0) {
        _this.setState({
          validBTC: d.result.BTC.available
        })
      }
    })
  }
  handleBuyPrice = e => {
    this.setState({
      buyPrice: e.target.value
    })
  }
  handleBuyAmount = e => {
    this.setState({
      buyAmount: e.target.value
    })
  }
  handleSellPrice = e => {
    this.setState({
      sellPrice: e.target.value
    })
  }
  handleSellAmount = e => {
    this.setState({
      sellAmount: e.target.value
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
      rechargeNumber: ''
    })
  }
  // 充值
  recharge = () => {
    let _this = this
    let obj = {
      asset: 'BTC',
      change: this.state.rechargeNumber
    }
    BeforeSendPost('/api/v1/user/balance/update', obj, function(d) {
      if (d.code === 0) {
        message.success('充值成功')
        let obj = {
          assets: ''
        }
        BeforeSendGet('/api/v1/user/balance/query', obj, function(d) {
          if (d.code === 0) {
            _this.setState({
              validBTC: d.result.BTC.available
            })
          }
        })
        _this.setState({
          visible: false
        })
      }
    })
  }
  buy = () => {
    let obj = {
      market: 'BTCUSDT',
      side: 'buy',
      amount: this.state.buyAmount,
      price: this.state.buyPrice
    }
    this.props.Store.buyCoins(obj)
  }
  sell = () => {
    let obj = {
      market: 'BTCUSDT',
      side: 'sell',
      amount: this.state.sellAmount,
      price: this.state.sellPrice
    }
    this.props.Store.sellCoins(obj)
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleRechargeNumber = e => {
    this.setState({
      rechargeNumber: e.target.value
    })
  }
  render() {
    const { buyButtonLoading, sellButtonLoading } = this.props.Store.transactionData
    return (
      <div className="transaction">
        <Tabs defaultActiveKey="1" onChange={ this.transactionChange }>
          <TabPane className="present-price" tab="限价交易" key="1">
            <div className="purchase fl">
              <header>
                <div>
                  <h3 className="fl">买入BCH</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { this.state.validBTC }BTC</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <Input value={ this.state.buyPrice } onChange={ this.handleBuyPrice } size="large" />
                    <p>买入价<span> (BTC)</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className="purchase-number">
                    <Input value={ this.state.buyAmount } onChange={ this.handleBuyAmount } size="large" />
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
                <Button type="primary" size="large" onClick={ this.buy } loading={ buyButtonLoading } block>买入</Button>
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
                    <Input value={ this.state.sellPrice } onChange={ this.handleSellPrice } size="large" />
                    <p>卖出价<span> (BTC)</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className="purchase-number">
                    <Input value={ this.state.sellAmount } onChange={ this.handleSellAmount } size="large" />
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
                <Button type="primary" size="large" onClick={ this.sell } loading={ sellButtonLoading } block>卖出</Button>
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
        <RModal
          visible={ this.state.visible }
          onCancel={ this.handleCancel }
          onOk={ this.recharge }
          rechargeNumber={ this.state.rechargeNumber }
          handleRechargeNumber={ this.handleRechargeNumber }
        />
      </div>
    )
  }
}

class RechargeModal extends Component {
  render() {
    const { visible, onCancel, onOk, form, rechargeNumber, handleRechargeNumber } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={ visible }
        title="充值"
        okText="确认"
        onCancel={ onCancel }
        onOk={ onOk }
      >
        <Form >
          <Form.Item>
            { getFieldDecorator('number', {
              rules: [{
                required: true,
                message: '请输入充值数量'
              }]
            })(<Input value={ rechargeNumber } onChange={ handleRechargeNumber } placeholder="请输入充值数量" />) }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const RModal = Form.create({ name: 'form_in_modal' })(RechargeModal)

export default Transaction
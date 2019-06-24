import React, { Component } from 'react'
import './index.less'
import { Tabs, Input, Steps, Button, message, Modal, Form, InputNumber } from 'antd'
import { BeforeSendGet, BeforeSendPost } from '@/components/Ajax/index'
import { inject, observer } from 'mobx-react'
import Cookies from 'js-cookie'

const { TabPane } = Tabs
const { Step } = Steps

@inject('Store')
@observer
class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      rechargeNumber: Number
    }
  }
  componentDidMount() {
    if (Cookies.get('account')) {
      const _this = this
      let obj = {
        assets: ''
      }
      BeforeSendGet('/api/v1/user/balance/query', obj, function(d) {
        if (d.code === 0) {
          _this.props.Store.setAvailableBalance(d.result.BTC.available)
        }
      })
    }
  }
  handleBuyPrice = num => {
    this.props.Store.handleBuyPrice(num)
  }
  handleBuyAmount = num => {
    this.props.Store.handleBuyAmount(num)
  }
  handleSellPrice = num => {
    this.props.Store.handleSellPrice(num)
  }
  handleSellAmount = num => {
    this.props.Store.handleSellAmount(num)
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
      amount: this.props.Store.transactionData.buyAmount1,
      price: this.props.Store.transactionData.buyPrice1
    }
    this.props.Store.buyCoins(obj)
  }
  sell = () => {
    let obj = {
      market: 'BTCUSDT',
      side: 'sell',
      amount: this.props.Store.transactionData.sellAmount1,
      price: this.props.Store.transactionData.sellPrice1
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
    const store = this.props.Store
    const ifShowBuyWarn = store.ifBuyEnough ? '' : 'creditRunLow'
    const ifShowSellWarn = store.ifSellEnough ? '' : 'creditRunLow'
    const ifBuyButtonDisabled1 = !(store.transactionData.buyPrice1 && store.transactionData.buyAmount1) || !store.ifBuyEnough
    const ifSellButtonDisabled1 = !(store.transactionData.sellPrice1 && store.transactionData.sellAmount1) || !store.ifSellEnough
    const ifBuyButtonDisabled2 = !(store.transactionData.buyPrice2 && store.transactionData.buyAmount2) || !store.ifBuyEnough
    const ifSellButtonDisabled2 = !(store.transactionData.sellPrice2 && store.transactionData.sellAmount2) || !store.ifSellEnough
    return (
      <div className="transaction">
        <Tabs activeKey={ store.transactionData.activeKey } onChange={ store.transactionChange }>
          <TabPane className="present-price" tab="限价交易" key="1">
            <div className="purchase fl">
              <header>
                <div>
                  <h3 className="fl">买入{ store.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { store.transactionData.availableBalance }{ store.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ store.transactionData.buyPrice1 } onChange={ this.handleBuyPrice } size="large" />
                    <p>买入价<span> ({ store.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className={ `purchase-number ${ ifShowBuyWarn }` }>
                    <InputNumber min={0} value={ store.transactionData.buyAmount1 } onChange={ this.handleBuyAmount } size="large" />
                    <p>买入量<span> ({ store.currencyTrading.coinsType })</span></p>
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
                <p className="expected-turnover">预计交易额: <span>{ store.estimateBuyPrice }{ store.currencyTrading.coinsTypeTitle }</span></p>
                <Button type="primary" size="large" onClick={ this.buy } loading={ store.transactionData.buyButtonLoading1 } disabled={ ifBuyButtonDisabled1 } block>买入</Button>
              </main>
            </div>
            <div className="sellout fr">
              <header>
                <div>
                  <h3 className="fl">卖出{ store.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { store.transactionData.availableBalance }{ store.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ store.transactionData.sellPrice1 } onChange={ this.handleSellPrice } size="large" />
                    <p>卖出价<span> ({ store.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className={ `purchase-number ${ ifShowSellWarn }` }>
                    <InputNumber min={0} value={ store.transactionData.sellAmount1 } onChange={ this.handleSellAmount } size="large" />
                    <p>卖出量<span> ({ store.currencyTrading.coinsType })</span></p>
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
                <p className="expected-turnover">预计交易额: <span>{ store.estimateSellPrice }{ store.currencyTrading.coinsTypeTitle }</span></p>
                <Button type="primary" size="large" onClick={ this.sell } loading={ store.transactionData.sellButtonLoading1 } disabled={ ifSellButtonDisabled1 } block>卖出</Button>
              </main>
            </div>
          </TabPane>
          <TabPane className="present-price" tab="市价交易" key="2">
            <div className="purchase fl">
              <header>
                <div>
                  <h3 className="fl">买入{ store.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { store.transactionData.availableBalance }{ store.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber value={ store.transactionData.buyPrice2 } onChange={ this.handleBuyPrice } min={0} size="large" />
                    <p>买入价<span> ({ store.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p style={{ height: 12, width: '100%' }}></p>
                  <div className={ `purchase-number ${ ifShowBuyWarn }` }>
                    <InputNumber value={ store.transactionData.buyAmount2 } onChange={ this.handleBuyAmount } min={0} size="large" />
                    <p>交易额<span> ({ store.currencyTrading.coinsType })</span></p>
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
                <Button type="primary" size="large" onClick={ this.buy } loading={ store.transactionData.buyButtonLoading2 } disabled={ ifBuyButtonDisabled2 } block>买入</Button>
              </main>
            </div>
            <div className="sellout fr">
              <header>
                <div>
                  <h3 className="fl">卖出{ store.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { store.transactionData.availableBalance }{ store.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ store.transactionData.sellPrice2 } onChange={ this.handleSellPrice } size="large" />
                    <p>卖出价<span> ({ store.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p style={{ height: 12, width: '100%' }}></p>
                  <div className={ `purchase-number ${ ifShowSellWarn }` }>
                    <InputNumber min={0} value={ store.transactionData.sellAmount2 } onChange={ this.handleSellAmount } size="large" />
                    <p>卖出量<span> ({ store.currencyTrading.coinsType })</span></p>
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
                <Button type="primary" size="large" onClick={ this.sell } loading={ store.transactionData.sellButtonLoading2 } disabled={ ifSellButtonDisabled2 } block>卖出</Button>
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
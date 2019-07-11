import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { Tabs, Input, Steps, Button, message, Modal, Form, InputNumber } from 'antd'
import { BeforeSendGet, BeforeSendPost } from '@/components/Ajax/index'
import { inject, observer } from 'mobx-react'
import Cookies from 'js-cookie'

const { TabPane } = Tabs
const { Step } = Steps

@inject('trade')
@observer
class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
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
          _this.props.trade.setAvailableBalance(d.result.BTC.available)
        }
      })
    }
  }
  handleBuyPrice = num => {
    this.props.trade.handleBuyPrice(num)
  }
  handleBuyAmount = num => {
    this.props.trade.handleBuyAmount(num)
  }
  handleSellPrice = num => {
    this.props.trade.handleSellPrice(num)
  }
  handleSellAmount = num => {
    this.props.trade.handleSellAmount(num)
  }
  showModal = () => {
    this.setState({
      visible: true,
      rechargeNumber: ''
    })
  }
  buy = () => {
    let obj = {
      market: `${ this.props.trade.currentCoinsType }`,
      side: 'buy',
      amount: this.props.trade.transactionData.buyAmount1,
      price: this.props.trade.transactionData.buyPrice1
    }
    this.props.trade.buyCoins(obj)
  }
  sell = () => {
    let obj = {
      market: `${ this.props.trade.currentCoinsType }`,
      side: 'sell',
      amount: this.props.trade.transactionData.sellAmount1,
      price: this.props.trade.transactionData.sellPrice1
    }
    this.props.trade.sellCoins(obj)
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  submit = form =>{
    form.validateFields((err, values) => {
      if (!err) {
        let { number } = values
        let _this = this
        let obj = {
          // asset: this.props.trade.currencyTrading.coinsTypeTitle,
          asset: 'BTC',
          change: number
        }
        BeforeSendPost('/api/v1/user/balance/update', obj, function(d) {
          if (d.code === 0) {
            message.success('充值成功')
            let obj = {
              assets: ''
            }
            BeforeSendGet('/api/v1/user/balance/query', obj, function(d) {
              if (d.code === 0) {
                _this.props.trade.setAvailableBalance(d.result.BTC.available)
                _this.setState({
                  visible: false
                })
              }
            })
          }
        })
      }
    })
  }
  render() {
    const trade = this.props.trade
    const ifShowBuyWarn = trade.ifBuyEnough ? '' : 'creditRunLow'
    const ifShowSellWarn = trade.ifSellEnough ? '' : 'creditRunLow'
    const ifBuyButtonDisabled1 = !(trade.transactionData.buyPrice1 && trade.transactionData.buyAmount1) || !trade.ifBuyEnough
    const ifSellButtonDisabled1 = !(trade.transactionData.sellPrice1 && trade.transactionData.sellAmount1) || !trade.ifSellEnough
    const ifBuyButtonDisabled2 = !(trade.transactionData.buyPrice2 && trade.transactionData.buyAmount2) || !trade.ifBuyEnough
    const ifSellButtonDisabled2 = !(trade.transactionData.sellPrice2 && trade.transactionData.sellAmount2) || !trade.ifSellEnough
    return (
      <div className="transaction">
        <div className="notLogged" style={{ display: Cookies.get('loginState') ? 'none' : 'block' }}>请先 <span><Link to="/login">登录</Link></span> / <span><Link to="/regist">注册</Link></span></div>
        <Tabs activeKey={ trade.transactionData.activeKey } onChange={ trade.transactionChange }>
          <TabPane className="present-price" tab="限价交易" key="1">
            <div className="purchase fl">
              <header>
                <div>
                  <h3 className="fl">买入{ trade.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { trade.transactionData.availableBalance }{ trade.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ trade.transactionData.buyPrice1 } onChange={ this.handleBuyPrice } size="large" />
                    <p>买入价<span> ({ trade.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className={ `purchase-number ${ ifShowBuyWarn }` }>
                    <InputNumber min={0} value={ trade.transactionData.buyAmount1 } onChange={ this.handleBuyAmount } size="large" />
                    <p>买入量<span> ({ trade.currencyTrading.coinsType })</span></p>
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
                <p className="expected-turnover">预计交易额: <span>{ trade.estimateBuyPrice }{ trade.currencyTrading.coinsTypeTitle }</span></p>
                <Button type="primary" size="large" onClick={ this.buy } loading={ trade.transactionData.buyButtonLoading1 } disabled={ ifBuyButtonDisabled1 } block>买入</Button>
              </main>
            </div>
            <div className="sellout fr">
              <header>
                <div>
                  <h3 className="fl">卖出{ trade.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { trade.transactionData.availableBalance }{ trade.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ trade.transactionData.sellPrice1 } onChange={ this.handleSellPrice } size="large" />
                    <p>卖出价<span> ({ trade.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p>≈0.01 CNY</p>
                  <div className={ `purchase-number ${ ifShowSellWarn }` }>
                    <InputNumber min={0} value={ trade.transactionData.sellAmount1 } onChange={ this.handleSellAmount } size="large" />
                    <p>卖出量<span> ({ trade.currencyTrading.coinsType })</span></p>
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
                <p className="expected-turnover">预计交易额: <span>{ trade.estimateSellPrice }{ trade.currencyTrading.coinsTypeTitle }</span></p>
                <Button type="primary" size="large" onClick={ this.sell } loading={ trade.transactionData.sellButtonLoading1 } disabled={ ifSellButtonDisabled1 } block>卖出</Button>
              </main>
            </div>
          </TabPane>
          <TabPane className="present-price" tab="市价交易" key="2">
            <div className="purchase fl">
              <header>
                <div>
                  <h3 className="fl">买入{ trade.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { trade.transactionData.availableBalance }{ trade.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber value={ trade.transactionData.buyPrice2 } onChange={ this.handleBuyPrice } min={0} size="large" />
                    <p>买入价<span> ({ trade.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p style={{ height: 12, width: '100%' }}></p>
                  <div className={ `purchase-number ${ ifShowBuyWarn }` }>
                    <InputNumber value={ trade.transactionData.buyAmount2 } onChange={ this.handleBuyAmount } min={0} size="large" />
                    <p>交易额<span> ({ trade.currencyTrading.coinsType })</span></p>
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
                <Button type="primary" size="large" onClick={ this.buy } loading={ trade.transactionData.buyButtonLoading2 } disabled={ ifBuyButtonDisabled2 } block>买入</Button>
              </main>
            </div>
            <div className="sellout fr">
              <header>
                <div>
                  <h3 className="fl">卖出{ trade.currencyTrading.coinsType }</h3>
                  <a className="fr" href="javascript:void(0)" onClick={ this.showModal }>充值 ></a>
                </div>
                <p className="validBTC">可用: { trade.transactionData.availableBalance }{ trade.currencyTrading.coinsTypeTitle }</p>
              </header>
              <main>
                <div className="input-purchase">
                  <div className="purchase-price">
                    <InputNumber min={0} value={ trade.transactionData.sellPrice2 } onChange={ this.handleSellPrice } size="large" />
                    <p>卖出价<span> ({ trade.currencyTrading.coinsTypeTitle })</span></p>
                  </div>
                  <p style={{ height: 12, width: '100%' }}></p>
                  <div className={ `purchase-number ${ ifShowSellWarn }` }>
                    <InputNumber min={0} value={ trade.transactionData.sellAmount2 } onChange={ this.handleSellAmount } size="large" />
                    <p>卖出量<span> ({ trade.currencyTrading.coinsType })</span></p>
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
                <Button type="primary" size="large" onClick={ this.sell } loading={ trade.transactionData.sellButtonLoading2 } disabled={ ifSellButtonDisabled2 } block>卖出</Button>
              </main>
            </div>
          </TabPane> 
        </Tabs>
        <div className="rate">
          <p className="rate-taker fl">Taker费率: 0.01%</p>
          <p className="rate-maker fr">Maker费率: 0.01%</p>
        </div>
        <RModal
          visible={ this.state.visible }
          onCancel={ this.handleCancel }
          submit={ this.submit }
        />
      </div>
    )
  }
}

class RechargeModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.submit(this.props.form)
  }
  render() {
    const { visible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={ visible }
        title="充值"
        footer={ null }
        onCancel={ onCancel }
      >
        <Form onSubmit={ this.handleSubmit }>
          <Form.Item>
            { getFieldDecorator('number', {
              rules: [{
                required: true,
                message: '请输入充值数量'
              }]
            })(<Input placeholder="请输入充值数量" />) }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>充值</Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const RModal = Form.create({ name: 'form_in_modal' })(RechargeModal)

export default Transaction
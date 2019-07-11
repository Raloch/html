import React, { Component, Fragment } from 'react'
import './index.less'
import { Select, Icon, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import green from '../../images/green.png'
import red from '../../images/red.png'
import redGreen from '../../images/red-green.png'

const { Option } = Select

@inject('trade')
@observer
class EntrustInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCountControl: true
    }
  }
  // 精度小数点
  accuracyChange = val => {
    console.log(val)
  }
  countControl = () => {
    this.setState({
      isCountControl: !this.state.isCountControl
    })
  }
  countHandle = value => {
    this.props.trade.depth.count = value
  }
  redGreen = () => {
    const trade = this.props.trade
    trade.depth.mode = 3
    trade.depth.count = '20'
  }
  render() {
    const trade = this.props.trade
    return (
      <div className="entrust-infomation">
        <header>
          <div className="accuracy fl">
            <Select defaultValue="num8" dropdownMatchSelectWidth={ false } onChange={ this.accuracyChange } size="small" suffixIcon={ <Icon type="caret-down" /> }>
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
          <div className="mode-switch">
            <img src={ red } onClick={ () => trade.depth.mode = 1 } alt="" />
            <img src={ green } onClick={ () => trade.depth.mode = 2 } alt="" />
            <img src={ redGreen } onClick={ this.redGreen } alt="" />
          </div>
        </header>
        <main>
          <div className="setListNum" style={{ display: trade.depth.mode !== 3 ? 'block' : 'none' }}>
            <div className="count-control">
              <div className="line"></div>
              <Icon type="double-right" onClick={ this.countControl } style={{ transform: this.state.isCountControl ? 'rotate(90deg)' : 'rotate(270deg)', margin: '0 10px', cursor: 'pointer', transition: 'all .3s ease' }} />
              <div className="line"></div>
            </div>
            <div className="count-option" style={{ height: this.state.isCountControl ? '24px' : '0' }}>
              <span className="name">显示数量:</span>
              <Select value={ trade.depth.count } dropdownMatchSelectWidth={ false } onChange={ this.countHandle } size="small" suffixIcon={ <Icon type="caret-down" /> }>
                <Option value="20">20</Option>
                <Option value="50">50</Option>
              </Select>
            </div>
          </div>
          <div className="title">
            <ul>
              <li>价格({ trade.currencyTrading.coinsTypeTitle })</li>
              <li>数量({ trade.currencyTrading.coinsType })</li>
              <li>累计({ trade.currencyTrading.coinsType })</li>
            </ul>
          </div>
          <div className="mode">
            <div className="mode-ask" style={{ flex: trade.depth.mode !== 2 ? 1 : 0 }}>
              <ul>
                { trade.depth.askData ? JSON.parse(trade.depth.askData).reverse().map(val => {
                  return (
                    <li>
                      <p>{ val[0] }</p>
                      <p>{ val[1] }</p>
                      <p>{ val[2] }</p>
                      {/* 红色百分比展示 */}
                      <div style={{ width: `${ parseFloat(val[2]) / trade.depth.askTotal * 100 }%` }}></div>
                    </li>
                  )
                  }) : <Spin spinning={ true } tip="Loading..." indicator={ <Icon type="loading" spin /> } style={{ height: '350px' }} /> }
              </ul>
            </div>
            <div className="price-float">
              { trade.depth.askData ? (
                <Fragment>
                  <p style={{ color: '#00b66f' }}>0.00000761<Icon type="arrow-down" /></p>
                  <p>≈ 0.6611 CNY</p>
                </Fragment>
              ) : <p>--</p> }
            </div>
            <div className="mode-depth" style={{ flex: trade.depth.mode !== 1 ? 1 : 0, overflow: trade.depth.mode !== 3 && trade.depth.count === '50' ? 'auto' : 'hidden' }}>
              <ul>
              { trade.depth.depthData ? JSON.parse(trade.depth.depthData).reverse().map(val => {
                  return (
                    <li>
                      <p>{ val[0] }</p>
                      <p>{ val[1] }</p>
                      <p>{ val[2] }</p>
                      {/* 红色百分比展示 */}
                      <div style={{ width: `${ parseFloat(val[2]) / trade.depth.depthTotal * 100 }%` }}></div>
                    </li>
                  )
                }) : <Spin spinning={ true } tip="Loading..." indicator={ <Icon type="loading" spin /> } style={{ height: '350px' }} /> }
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default EntrustInformation
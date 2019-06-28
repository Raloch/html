import React, { Component, Fragment } from 'react'
import './index.less'
import { Select, Icon, Spin } from 'antd'
// import { entrustMessageData1, entrustMessageData2 } from '../entrustMessageList'
import { inject, observer } from 'mobx-react'
import green from '../../images/green.png'
import red from '../../images/red.png'
import redGreen from '../../images/red-green.png'

const { Option } = Select

@inject('Store')
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
    this.props.Store.depth.count = value
  }
  redGreen = () => {
    const store = this.props.Store
    store.depth.mode = 3
    store.depth.count = '20'
  }
  render() {
    const store = this.props.Store
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
            <img src={ red } onClick={ () => store.depth.mode = 1 } alt="" />
            <img src={ green } onClick={ () => store.depth.mode = 2 } alt="" />
            <img src={ redGreen } onClick={ this.redGreen } alt="" />
          </div>
        </header>
        <main>
          <div className="setListNum" style={{ display: store.depth.mode !== 3 ? 'block' : 'none' }}>
            <div className="count-control">
              <div className="line"></div>
              <Icon type="double-right" onClick={ this.countControl } style={{ transform: this.state.isCountControl ? 'rotate(90deg)' : 'rotate(270deg)', margin: '0 10px', cursor: 'pointer', transition: 'all .3s ease' }} />
              <div className="line"></div>
            </div>
            <div className="count-option" style={{ height: this.state.isCountControl ? '24px' : '0' }}>
              <span className="name">显示数量:</span>
              <Select value={ store.depth.count } dropdownMatchSelectWidth={ false } onChange={ this.countHandle } size="small" suffixIcon={ <Icon type="caret-down" /> }>
                <Option value="20">20</Option>
                <Option value="50">50</Option>
              </Select>
            </div>
          </div>
          <div className="title">
            <ul>
              <li>价格({ store.currencyTrading.coinsTypeTitle })</li>
              <li>数量({ store.currencyTrading.coinsType })</li>
              <li>累计({ store.currencyTrading.coinsType })</li>
            </ul>
          </div>
          <div className="mode">
            <div className="mode-ask" style={{ flex: store.depth.mode !== 2 ? 1 : 0 }}>
              <ul>
                { store.depth.askData ? JSON.parse(store.depth.askData).reverse().map(val => {
                  return (
                    <li>
                      <p>{ val[0] }</p>
                      <p>{ val[1] }</p>
                      <p>{ val[2] }</p>
                      {/* 红色百分比展示 */}
                      <div style={{ width: `${ parseFloat(val[2]) / store.depth.askTotal * 100 }%` }}></div>
                    </li>
                  )
                  }) : <Spin spinning={ true } tip="Loading..." indicator={ <Icon type="loading" spin /> } style={{ height: '350px' }} /> }
              </ul>
            </div>
            <div className="price-float">
              { store.depth.askData ? (
                <Fragment>
                  <p style={{ color: '#00b66f' }}>0.00000761<Icon type="arrow-down" /></p>
                  <p>≈ 0.6611 CNY</p>
                </Fragment>
              ) : <p>--</p> }
            </div>
            <div className="mode-depth" style={{ flex: store.depth.mode !== 1 ? 1 : 0, overflow: store.depth.mode !== 3 && store.depth.count === '50' ? 'auto' : 'hidden' }}>
              <ul>
              { store.depth.depthData ? JSON.parse(store.depth.depthData).map(val => {
                  return (
                    <li>
                      <p>{ val[0] }</p>
                      <p>{ val[1] }</p>
                      <p>{ val[2] }</p>
                      {/* 红色百分比展示 */}
                      <div style={{ width: `${ parseFloat(val[2]) / store.depth.depthTotal * 100 }%` }}></div>
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
import React, { Component } from 'react'
import './index.less'
import { Select, Icon } from 'antd'
import { entrustMessageData1, entrustMessageData2 } from '../entrustMessageList'
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
    this.state = {}
  }
  // 精度小数点
  accuracyChange = val => {
    console.log(val)
  }
  render() {
    const store = this.props.Store
    return (
      <div className="entrust-infomation">
        <header>
          <div className="accuracy fl">
            <Select defaultValue="num8" dropdownMatchSelectWidth={ false } onChange={ this.accuracyChange } size="small" dropdownClassName="depth-select">
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
            <img src={ redGreen } onClick={ () => store.depth.mode = 3 } alt="" />
          </div>
        </header>
        <main>
          <div className="setListNum"></div>
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
                }) : null }
              </ul>
            </div>
            <div className="price-float">
              { store.depth.askData ? (
                <div>
                  <p style={{ color: '#00b66f' }}>0.00000761<Icon type="arrow-down" /></p>
                  <p>≈ 0.6611 CNY</p>
                </div>
              ) : <p>--</p> }
            </div>
            <div className="mode-depth" style={{ flex: store.depth.mode !== 1 ? 1 : 0 }}>
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
                }) : null }
              </ul>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default EntrustInformation
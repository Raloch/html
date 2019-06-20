import React, { Component } from 'react'
import './index.less'
import { Layout } from 'antd'
import star2 from '../../images/star2.png'
import { inject, observer } from 'mobx-react'

const { Header } = Layout

@inject('Store')
@observer
class TypeHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Header className="trade-right-layout-header">
        <div className="coinType fl">
          <img src={star2} alt=""/> { this.props.Store.currencyTrading.coinsType }/{ this.props.Store.currencyTrading.coinsTypeTitle }
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
    )
  }
}

export default TypeHeader
import React, { Component } from 'react'
import './index.less'
import { Spin, Icon } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import Empty from '../../../../components/Empty'

@inject('trade')
@observer
class NewDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="new-deal">
        <header>
          <p>最近成交</p>
        </header>
        <main>
          {/* 使用Table，数据更新时滚动条会向下滑动一行的距离 -- 暂时无法解决，用ul>li来写 */}
          {/* <Table loading={ this.props.trade.newDeal.newDealLoading } columns={ exchangeColumns } dataSource={ this.props.trade.newDeal.newDealData.slice(0, 38) } pagination={ false } /> */}
          <div className="title">
            <p>时间</p>
            <p>价格 ({ this.props.trade.currencyTrading.coinsTypeTitle })</p>
            <p>成交量 ({ this.props.trade.currencyTrading.coinsType })</p>
          </div>
          { !this.props.trade.newDeal.newDealLoading ? this.props.trade.newDeal.newDealData.length === 0 ? <Empty height="200" /> : (
            <div className="content">
              { this.props.trade.newDeal.newDealData.slice(0, 38).map(val => (
                <ul>
                  <li>{ moment(parseFloat(val.time * 1000)).format('HH:mm:ss') }</li>
                  <li style={{ color: val.type === 'buy' ? '#00b275' : '#ef5057' }}>{ val.price }</li>
                  <li>{ val.amount }</li>
                </ul>
              )) }
            </div>
          ) : (
            <div className="loading">
              <Spin spinning={ true } tip="Loading..." indicator={ <Icon type="loading" spin /> } style={{ height: '350px' }} />
            </div>
          ) }
            
        </main>
      </div>
    )
  }
}

export default NewDeal
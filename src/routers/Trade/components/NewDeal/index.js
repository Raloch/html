import React, { Component } from 'react'
import './index.less'
import { Spin } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import Empty from '../../../../components/Empty'

@inject('Store')
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
          {/* <Table loading={ this.props.Store.newDeal.newDealLoading } columns={ exchangeColumns } dataSource={ this.props.Store.newDeal.newDealData.slice(0, 38) } pagination={ false } /> */}
          <div className="title">
            <p>时间</p>
            <p>价格 ({ this.props.Store.currencyTrading.coinsTypeTitle })</p>
            <p>成交量 ({ this.props.Store.currencyTrading.coinsType })</p>
          </div>
          { !this.props.Store.newDeal.newDealLoading ? this.props.Store.newDeal.newDealData.length === 0 ? <Empty height="200" /> : (
            <div className="content">
              { this.props.Store.newDeal.newDealData.slice(0, 38).map(val => (
                <ul>
                  <li>{ moment(parseFloat(val.time * 1000)).format('HH:mm:ss') }</li>
                  <li style={{ color: val.type === 'buy' ? '#00b275' : '#ef5057' }}>{ val.price }</li>
                  <li>{ val.amount }</li>
                </ul>
              )) }
            </div>
          ) : (
            <div className="loading">
              <Spin />&nbsp;&nbsp;&nbsp;加载中...
            </div>
          ) }
            
        </main>
      </div>
    )
  }
}

export default NewDeal
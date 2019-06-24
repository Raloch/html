import React, { Component } from 'react'
import './index.less'
import { Table } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import $ from 'jquery'

@inject('Store')
@observer
class NewDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.props.Store.tradeWsInit()
  }
  render() {
    const exchangeColumns = [
      {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
        render: text => moment(parseFloat(text) * 1000).format('HH:mm:ss')
      },
      {
        title: '价格(BTC)',
        dataIndex: 'price',
        align: 'center',
        render: (text, record) => <span style={{ color: `${ record.type === 'buy' ? '#00b275' : '#ef5057' }` }}>{ text }</span>
      },
      {
        title: '成交量(ADA)',
        dataIndex: 'amount',
        align: 'center'
      }
    ]
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
            <p>价格 (BTC)</p>
            <p>成交量 (ADA)</p>
          </div>
          <div className="content">
            { this.props.Store.newDeal.newDealData.slice(0, 38).map(val => (
              <ul>
                <li>{ moment(parseFloat(val.time)).format('HH:mm:ss') }</li>
                <li style={{ color: val.type === 'buy' ? '#00b275' : '#ef5057' }}>{ val.price }</li>
                <li>{ val.amount }</li>
              </ul>
            )) }
          </div>
        </main>
      </div>
    )
  }
}

export default NewDeal
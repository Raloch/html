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
  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      $(window).unbind("scroll.unable")
    }, 100)
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
          <p>最近成交{ this.props.Store.newDeal.isRender }</p>
        </header>
        <main>
          <Table loading={ this.props.Store.newDeal.newDealLoading } columns={ exchangeColumns } dataSource={ this.props.Store.newDeal.newDealData } pagination={ false } />
        </main>
      </div>
    )
  }
}

export default NewDeal
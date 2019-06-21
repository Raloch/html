import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table, Modal } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'

import Empty from '../../../../components/Empty'

@inject('Store')
@observer
class HistoryEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 100,
      pageSize: 10,
      current: 1,
      isExchangeDetail: true
    }
  }
  componentDidMount() {
    this.props.Store.historyDataInit()
  }
  // 页数改变数据更新
  pageChange = page => {
    this.setState({
      current: page
    }, () => {
      this.props.Store.historyPageChange(page - 1)
      this.props.Store.getHistoryData()
    })
  }
  showExchangeDetailModal = () => {
    this.setState({
      isExchangeDetail: true
    })
  }
  hideExchangeModal = () => {
    this.setState({
      isExchangeDetail: false
    })
  }
  render() {
    const { total, pageSize, current } = this.state
    const historyEntrustColumns = [
      {
        title: '委托时间',
        dataIndex: 'time',
        align: 'center',
        width: '17%',
        render: text => moment(parseFloat(text) * 1000).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '方向',
        dataIndex: 'side',
        align: 'center',
        width: '10%',
        render: text => {
          return text === 1 ? <span style={{ color: '#FD0C0CFF' }}>卖出</span> : <span style={{ color: '#1AB781FF' }}>买入</span>
        }
      },
      {
        title: '委托价格(BTC)',
        dataIndex: 'price',
        align: 'center',
        width: '14%'
      },
      {
        title: '委托数量(BCH)',
        dataIndex: 'amount',
        align: 'center',
        width: '12%'
      },
      {
        title: '已成交',
        dataIndex: 'alreadyDeal',
        align: 'center',
        width: '12%'
      },
      {
        title: '成交总额',
        dataIndex: 'deal',
        align: 'center',
        width: '12%'
      },
      {
        title: '成交均价',
        dataIndex: 'avePrice',
        align: 'center',
        width: '12%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '12%',
        render: text => <span style={{ cursor: 'pointer' }} onClick={ this.showExchangeDetailModal }>{ text }</span>
      }
    ]
    const { historyEntrustData, historyLoading } = this.props.Store.historyData
    const data = Cookies.get('loginState') ? historyEntrustData : []
    const paginationProps = {
      showQuickJumper: true,
      total: total,
      pageSize: pageSize,
      size: 'small',
      current: current,
      onChange: this.pageChange
    }
    return (
      <div className="history-entrust">
        <header>历史委托</header>
        <main>
          <Table
            // scroll={{ y: 380 }}
            columns={ historyEntrustColumns }
            dataSource={ data }
            pagination={ paginationProps }
            locale={{
              emptyText: (
                <Empty height="120" />
              )
            }}
            // 设置唯一行id，否则会出现超出pageSize的行数
            rowKey={ record => record.key + record.time }
            loading={ historyLoading }
          />
        </main>
        <div className="exchangeDetail-dialog">
          <div className="content"></div>
        </div>
      </div>
    )
  }
}

export default HistoryEntrust
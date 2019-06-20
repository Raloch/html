import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table, message } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'
import { BeforeSendPost } from '../../../../components/Ajax'

import Empty from '../../../../components/Empty'

@inject('Store')
@observer
class CurrentEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 40,
      pageSize: 10,
      current: 1
    }
  }
  componentDidMount() {
    this.props.Store.currentDataInit()
  }
  // 撤销
  revoke = id => {
    let _this = this
    let obj = {
      market: this.props.Store.currentCoinsType,
      orderid: id
    }
    BeforeSendPost('/api/v1/user/order/cancel', obj, function(d) {
      if (d.code === 0) {
        message.success('撤销成功')
        _this.props.Store.getCurrentData()
      }
    })
  }
  // 页数改变数据更新
  pageChange = page => {
    this.setState({
      current: page
    }, () => {
      this.props.Store.currentPageChange(page - 1)
      this.props.Store.getCurrentData()
    })
  }
  render() {
    const { total, pageSize, current } = this.state
    const currentEntrustColumns = [
      {
        title: '委托时间',
        dataIndex: 'ctime',
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
        title: '未成交',
        dataIndex: 'left',
        align: 'center',
        width: '12%'
      },
      {
        title: '已成交',
        dataIndex: 'deal_stock',
        align: 'center',
        width: '12%'
      },
      {
        title: '成交均价',
        dataIndex: 'deal_money',
        align: 'center',
        width: '12%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '12%',
        render: (text, record) => {
          return (
            <span onClick={ () => this.revoke(record.key) } style={{ cursor: 'pointer' }}>{ text }</span>
          )
        }
      }
    ]
    const { currentEntrustData, currentLoading } = this.props.Store.currentData
    const data = Cookies.get('loginState') ? currentEntrustData : []
    const paginationProps = {
      showQuickJumper: true,
      total: total,
      pageSize: pageSize,
      size: 'small',
      current: current,
      onChange: this.pageChange
    }
    return (
      <div className="current-entrust">
        <header>当前委托</header>
        <main>
          <Table
            // scroll={{ y: 380 }}
            columns={ currentEntrustColumns }
            dataSource={ data }
            pagination={ paginationProps }
            locale={{
              emptyText: (
                <Empty height="120" />
              )
            }}
            // 设置唯一行id，否则会出现超出pageSize的行数
            rowKey={ record => record.key + record.time }
            loading={ currentLoading }
          />
        </main>
      </div>
    )
  }
}

export default CurrentEntrust
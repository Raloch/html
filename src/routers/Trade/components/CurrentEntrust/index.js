import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table } from 'antd'
import moment from 'moment'
import { BeforeSendGet } from '../../../../components/Ajax/index'

import Empty from '../../../../components/Empty'

class CurrentEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEntrustData: []
    }
  }
  render() {
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
          let obj = {
            market: 'BTCUSDT',
            orderid: record.key
          }
          return (
            <span onClick={ () => this.props.revoke(obj) } style={{ cursor: 'pointer' }}>{ text }</span>
          )
        }
      }
    ]
    const data = Cookies.get('loginState') ? this.props.currentEntrustData : []
    return (
      <div className="current-entrust">
        <header>当前委托</header>
        <main>
          <Table
            scroll={{ y: 380 }}
            columns={ currentEntrustColumns }
            dataSource={ data }
            pagination={ false }
            locale={{
              emptyText: (
                <Empty height="120" />
              )
            }}
          />
        </main>
      </div>
    )
  }
}

export default CurrentEntrust
import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table } from 'antd'
import { historyEntrustColumns, historyEntrustData } from '../historyEntrustList'
import { BeforeSendGet } from '../../../../components/Ajax/index'

import Empty from '../../../../components/Empty'

class HistoryEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // componentDidMount() {
  //   let obj = {
  //     market: 'BTCUSDT',
  //     offset: 10
  //   }
  //   BeforeSendGet('/api/v1/user/market/user-deals', obj, function(d) {
  //     if (d.code === 0) {
  //       console.log(d.result)
  //     }
  //   })
  // }
  render() {
    const data = Cookies.get('loginState') ? historyEntrustData : []
    return (
      <div className="history-entrust">
        <header>历史委托</header>
        <main>
          <Table
            scroll={{ y: 380 }}
            columns={ historyEntrustColumns }
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

export default HistoryEntrust
import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table } from 'antd'
import { historyEntrustColumns, historyEntrustData } from '../historyEntrustList'

import Empty from '../../../../components/Empty'

class HistoryEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const data = Cookies.get('account') ? historyEntrustData : []
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
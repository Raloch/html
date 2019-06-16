import React, { Component } from 'react'
import './index.less'
import { Table } from 'antd'
import { historyEntrustColumns, historyEntrustData } from '../historyEntrustList'

class HistoryEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="history-entrust">
        <header>历史委托</header>
        <main>
          <Table scroll={{ y: 380 }} columns={ historyEntrustColumns } dataSource={ historyEntrustData } pagination={ false } />
        </main>
      </div>
    )
  }
}

export default HistoryEntrust
import React, { Component } from 'react'
import './index.less'
import { Table } from 'antd'
import { currentEntrustColumns, currentEntrustData } from '../currentEntrustList'

class CurrentEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="current-entrust">
        <header>当前委托</header>
        <main>
          <Table scroll={{ y: 380 }} columns={ currentEntrustColumns } dataSource={ currentEntrustData } pagination={ false } />
        </main>
      </div>
    )
  }
}

export default CurrentEntrust
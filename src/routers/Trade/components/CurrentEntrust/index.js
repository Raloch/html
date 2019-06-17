import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table } from 'antd'
import { currentEntrustColumns, currentEntrustData } from '../currentEntrustList'

import Empty from '../../../../components/Empty'

class CurrentEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const data = Cookies.get('account') ? currentEntrustData : []
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
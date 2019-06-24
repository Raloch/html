import React, { Component } from 'react'
import './index.less'
import { Table } from 'antd'
import { exchangeColumns, exchangeData } from '../currentExchangeList'

class NewDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="new-deal">
        <header>
          <p>最近成交</p>
        </header>
        <main>
          <Table loading={ this.props.currentExchangeLoading } columns={ exchangeColumns } dataSource={ this.props.exchangeData } pagination={ false } />
        </main>
      </div>
    )
  }
}

export default NewDeal
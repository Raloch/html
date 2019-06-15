import React, { Component } from 'react'
import './index.less'
import { Select, Table, Icon } from 'antd'
import { entrustMessageColumns1, entrustMessageData1, entrustMessageColumns2, entrustMessageData2 } from '../entrustMessageList'

const { Option } = Select

class EntrustInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 精度小数点
  accuracyChange = val => {
    console.log(val)
  }
  render() {
    return (
      <div className="entrust-infomation">
        <header>
          <h2 className="fl">委托信息</h2>
          <div className="accuracy fr">
            合并深度:
            <Select defaultValue="num8" dropdownMatchSelectWidth={ false } onChange={ this.accuracyChange }>
              <Option value="num1">1位小数</Option>
              <Option value="num2">2位小数</Option>
              <Option value="num3">3位小数</Option>
              <Option value="num4">4位小数</Option>
              <Option value="num5">5位小数</Option>
              <Option value="num6">6位小数</Option>
              <Option value="num7">7位小数</Option>
              <Option value="num8">8位小数</Option>
            </Select>
          </div>
        </header>
        <main>
          <Table className="entrustMessage-table1" columns={ entrustMessageColumns1 } dataSource={ entrustMessageData1 } pagination={ false } />
          <div className="new-price">
            <p>最新价 <span>0.000000000BTC</span> <Icon className="arrow-down" type="arrow-down" /></p>
          </div>
          <Table className="entrustMessage-table2" columns={ entrustMessageColumns2 } dataSource={ entrustMessageData2 } pagination={ false } />
        </main>
      </div>
    )
  }
}

export default EntrustInformation
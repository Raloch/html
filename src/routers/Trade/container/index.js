import React, { Component } from 'react'
import './index.less'
import { Layout } from 'antd'

import Market from '../components/Market'
import CoinsTypeData from '../components/CoinsTypeData'
import Kline from '../components/Kline'
import EntrustInformation from '../components/EntrustInformation'
import Transaction from '../components/Transaction'
import TypeHeader from '../components/TypeHeader'
import CurrentEntrust from '../components/CurrentEntrust'
import HistoryEntrust from '../components/HistoryEntrust'
import NewDeal from '../components/NewDeal'
import { inject, observer } from 'mobx-react'

const { Footer, Sider, Content } = Layout

@inject('Store')
@observer
class Trade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      activeKey: '1'
    }
  }
  componentDidMount() {
    this.props.Store.tradeWsInit()
  }
  render() {
    return (
      <div className="trade-container">
        <div className="trade">
          <Layout className="trade-layout">
            {/* 左边交易市场栏 */}
            <Sider width="20.4545%" className="trade-sider" theme="light">
              {/* 交易市场 */}
              <Market />
              <div className="line" style={{ height: 12, backgroundColor: '#eef1f7' }}></div>
              {/* 最新成交 */}
              <NewDeal />
            </Sider>
            {/* 右边内容 */}
            <Layout className="trade-right-layout">
              {/* 右侧头部 -- 币种数据展示 */}
              <TypeHeader />
              <Content className="trade-right-layout-content">
                <Layout className="trade-right-layout-content-layout">
                  <Content className="trade-right-layout-content-layout-content">
                    {/* k线 */}
                    <Kline></Kline>
                    {/* 限价交易 */}
                    <Transaction />
                  </Content>
                  <Sider width="28.0979%" className="trade-right-layout-content-layout-sider" theme="light">
                    {/* 委托信息 */}
                    <EntrustInformation />
                  </Sider>
                  {/* Sider-width-390px */}
                </Layout>
              </Content>
              <Footer className="right-footer">
                {/* 当前委托 */}
                <CurrentEntrust />
                {/* 历史委托 */}
                <HistoryEntrust />
                {/* 币种资料 */}
                <CoinsTypeData />
              </Footer>
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}

export default Trade
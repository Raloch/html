import React, { Component } from 'react'
import './index.less'
import Cookies from 'js-cookie'
import { Table, Modal } from 'antd'
import moment from 'moment'
import { inject, observer } from 'mobx-react'

import Empty from '../../../../components/Empty'
import ModalDialog from '../../../../components/Modal'

@inject('Store')
@observer
class HistoryEntrust extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 100,
      pageSize: 10,
      current: 1,
      isExchangeDetail: false,
      // modal内容
      time: '',
      price: '--',
      amount: '--'
    }
  }
  componentDidMount() {
    if (Cookies.get('account')) {
      this.props.Store.historyDataInit()
    } else {
      this.props.Store.historyData.historyLoading = false
    }
  }
  // 页数改变数据更新
  pageChange = page => {
    this.setState({
      current: page
    }, () => {
      this.props.Store.historyPageChange(page - 1)
      this.props.Store.getHistoryData()
    })
  }
  showExchangeDetailModal = (record, rowKey) => {
    return {
      onClick: (e) => {
        if (e.target.className === 'detail') {
          this.setState({
            isExchangeDetail: true,
            time: record.time,
            price: record.price,
            amount: record.amount,
            deal: record.deal,
            fee: record.fee
          })
        }
      }
    }
  }
  CloseExchangeModal = () => {
    this.setState({
      isExchangeDetail: false
    })
  }
  render() {
    const { total, pageSize, current, isExchangeDetail, time, price, amount, deal, fee } = this.state
    const historyEntrustColumns = [
      {
        title: '委托时间',
        dataIndex: 'time',
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
        title: '已成交',
        dataIndex: 'alreadyDeal',
        align: 'center',
        width: '12%'
      },
      {
        title: '成交总额',
        dataIndex: 'deal',
        align: 'center',
        width: '12%'
      },
      {
        title: '成交均价',
        dataIndex: 'avePrice',
        align: 'center',
        width: '12%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '12%',
        render: text => <span className="detail" style={{ cursor: 'pointer' }}>{ text }</span>
      }
    ]
    const exchangeDetailColumns = [
      {
        title: '成交时间',
        dataIndex: 'time',
        align: 'center',
        render: text => moment(parseFloat(text) * 1000).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '成交价格',
        dataIndex: 'price',
        align: 'center'
      },
      {
        title: '成交数量',
        dataIndex: 'amount',
        align: 'center'
      },
      {
        title: '成交金额',
        dataIndex: 'deal',
        align: 'center'
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        align: 'center'
      },
      {
        title: 'Taker/Maker',
        dataIndex: 'text6',
        align: 'center'
      }
    ]
    const exchangeDetailData = [
      {
        key: '1',
        time: time,
        price: price,
        amount: amount,
        deal: deal,
        fee: fee,
        text6: 'Taker'
      }
    ]
    const { historyEntrustData, historyLoading } = this.props.Store.historyData
    const data = Cookies.get('account') ? historyEntrustData : []
    const paginationProps = Cookies.get('account') ? {
      showQuickJumper: true,
      total: total,
      pageSize: pageSize,
      size: 'small',
      current: current,
      onChange: this.pageChange
    } : false
    return (
      <div className="history-entrust">
        <header>历史委托</header>
        <main>
          <Table
            // scroll={{ y: 380 }}
            columns={ historyEntrustColumns }
            dataSource={ data }
            pagination={ paginationProps }
            onRow={ this.showExchangeDetailModal }
            locale={{
              emptyText: (
                <Empty height="120" />
              )
            }}
            // 设置唯一行id，否则会出现实际行数超出pageSize的行数
            rowKey={ record => record.key + record.time }
            loading={ historyLoading }
          />
        </main>
        {/* Modal属于全局样式，无法在组件中设置样式，在Layouts组件中设置 */}
        <Modal
          visible={ isExchangeDetail }
          width="940px"
          title="成交明细"
          onCancel={ this.CloseExchangeModal }
          footer={ false }
          wrapClassName="exchange-details"
        >
          <div className="exchang-detail">
            <div className="card-exhibition">
              <div>
                <p>0.00000000</p>
                <p>成交均价 (BTC)</p>
              </div>
              <div>
                <p>{ amount }</p>
                <p>成交数量 (BCH)</p>
              </div>
              <div>
                <p>{ price }</p>
                <p>成交金额 (BTC)</p>
              </div>
              <div>
                <p>{ fee }</p>
                <p>手续费 (BCH)</p>
              </div>
            </div>
            <div className="table-exhibition">
              <Table
                columns={ exchangeDetailColumns }
                dataSource={ exchangeDetailData }
                pagination={ false }
                locale={{
                  emptyText: (
                    <Empty height="40" />
                  )
                }}
              />
            </div>
          </div>
        </Modal>
        {/* <ModalDialog visible={ isExchangeDetail } width="940px" title="成交明细" height="54px" onCancel={ this.CloseExchangeModal }>
          <div className="exchang-detail">
            <div className="card-exhibition">
              <div>
                <p>0.00000000</p>
                <p>成交均价 (BTC)</p>
              </div>
              <div>
                <p>0.00000000</p>
                <p>成交数量 (BCH)</p>
              </div>
              <div>
                <p>0.00000000</p>
                <p>成交金额 (BTC)</p>
              </div>
              <div>
                <p>0.00000000</p>
                <p>手续费 (BCH)</p>
              </div>
            </div>
            <div className="table-exhibition">
              <Table
                columns={ exchangeDetailColumns }
                dataSource={ exchangeDetailData }
                pagination={ false }
                locale={{
                  emptyText: (
                    <Empty height="40" />
                  )
                }}
              />
            </div>
          </div>
        </ModalDialog> */}
      </div>
    )
  }
}

export default HistoryEntrust
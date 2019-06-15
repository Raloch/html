import React from 'react'
import moment from 'moment'

export const exchangeColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
    render: text => moment(parseFloat(text) * 1000).format('HH:mm:ss')
  },
  {
    title: '价格(BTC)',
    dataIndex: 'price',
    align: 'center',
    render: (text, record) => <span style={{ color: `${ record.type === 'buy' ? '#00b275' : '#ef5057' }` }}>{ text }</span>
  },
  {
    title: '成交量(BTC)',
    dataIndex: 'amount',
    align: 'center'
  }
]

export const exchangeData = [
  // {
  //   key: '1',
  //   time: 0,
  //   price: '0.00000000',
  //   amount: '187.00000'
  // },
  // {
  //   key: '2',
  //   time: 0,
  //   price: '0.00000000',
  //   amount: '0.00000'
  // }
]
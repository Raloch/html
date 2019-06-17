import React from 'react'

export const currentEntrustColumns = [
  {
    title: '委托时间',
    dataIndex: 'entrustTime',
    align: 'center',
    width: '17%'
  },
  {
    title: '方向',
    dataIndex: 'direction',
    align: 'center',
    width: '10%'
  },
  {
    title: '委托价格(BTC)',
    dataIndex: 'entrustPrice',
    align: 'center',
    width: '14%'
  },
  {
    title: '委托数量(BCH)',
    dataIndex: 'entrustNumber',
    align: 'center',
    width: '12%'
  },
  {
    title: '未成交',
    dataIndex: 'noDeal',
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
    title: '成交均价',
    dataIndex: 'entrustAveragePrice',
    align: 'center',
    width: '12%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '12%'
  }
]

export const currentEntrustData = [
  {
    key: '1',
    entrustTime: '2018-07-23 10:54:23',
    direction: '买入',
    entrustPrice: '市价',
    entrustNumber: '1.00000000',
    noDeal: '1.00000000',
    alreadyDeal: '1.00000000',
    entrustAveragePrice: '0.00000230',
    operation: '成交明细'
  },
  {
    key: '2',
    entrustTime: '2018-07-24 10:54:23',
    direction: '买入',
    entrustPrice: '12345.000012',
    entrustNumber: '1.00000000',
    noDeal: '1.00000000',
    alreadyDeal: '1.00000000',
    entrustAveragePrice: '0.00000230',
    operation: '成交明细'
  }
]
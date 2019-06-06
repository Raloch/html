import React from 'react'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

export const columnsUSDT = [
  {
    title: '币种',
    dataIndex: 'coinsType',
    render: text => <td><img style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ text ? star1 : star2 } alt="" />{ text }</td>,
    align: 'center',
    sorter: (a, b) => {
      return b.coinsType.charCodeAt(0) - a.coinsType.charCodeAt(0)
    }
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.newPrice) - parseFloat(b.newPrice)
    }
  },
  {
    title: '涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
    },
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  }
]

export const dataUSDT = [
  {
    key: '1',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '6',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '7',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '8',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '9',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '10',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '11',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '12',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '13',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '14',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '15',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '16',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '17',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '18',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '19',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '20',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '21',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '22',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '23',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '24',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '25',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '26',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '27',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '28',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '29',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '30',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '31',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '32',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '33',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '34',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '35',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '36',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '37',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '38',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '39',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '40',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]

export const columnsBTC = [
  {
    title: '币种',
    dataIndex: 'coinsType',
    render: text => <td><img style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ text ? star1 : star2 } alt="" />{ text }</td>,
    align: 'center',
    sorter: (a, b) => {
      return b.coinsType.charCodeAt(0) - a.coinsType.charCodeAt(0)
    }
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.newPrice) - parseFloat(b.newPrice)
    }
  },
  {
    title: '涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
    },
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  }
]

export const dataBTC = [
  {
    key: '1',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '6',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '7',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]

export const columnsETH = [
  {
    title: '币种',
    dataIndex: 'coinsType',
    render: text => <td><img style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ text ? star1 : star2 } alt="" />{ text }</td>,
    align: 'center',
    sorter: (a, b) => {
      return b.coinsType.charCodeAt(0) - a.coinsType.charCodeAt(0)
    }
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.newPrice) - parseFloat(b.newPrice)
    }
  },
  {
    title: '涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
    },
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  }
]

export const dataETH = [
  {
    key: '1',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]

export const columnsBCT = [
  {
    title: '币种',
    dataIndex: 'coinsType',
    render: text => <td><img style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ text ? star1 : star2 } alt="" />{ text }</td>,
    align: 'center',
    sorter: (a, b) => {
      return b.coinsType.charCodeAt(0) - a.coinsType.charCodeAt(0)
    }
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.newPrice) - parseFloat(b.newPrice)
    }
  },
  {
    title: '涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
    },
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  }
]

export const dataBCT = [
  {
    key: '1',
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]
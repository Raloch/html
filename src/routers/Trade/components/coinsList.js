import React from 'react'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

export const columnsUSDT = [
  {
    title: '币种',
    dataIndex: 'coinsType',
    render: (text, record) => {
      return (
        <td><img className="collectStar" style={{ width: 12, cursor: 'pointer',   marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</td>
      )
    },
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
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '6',
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '7',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '8',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '9',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '10',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '11',
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '12',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '13',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '14',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '15',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '16',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '17',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '18',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '19',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '20',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '21',
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '22',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '23',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '24',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '25',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '26',
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '27',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '28',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '29',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '30',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '31',
    isCollected: false,
    coinsType: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '32',
    isCollected: false,
    coinsType: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '33',
    isCollected: false,
    coinsType: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '34',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '35',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '36',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '37',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '38',
    isCollected: false,
    coinsType: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '39',
    isCollected: false,
    coinsType: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '40',
    isCollected: false,
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
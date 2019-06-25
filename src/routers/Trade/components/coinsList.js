import React from 'react'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

export const columnsUSDT = [
  {
    title: '币种',
    dataIndex: 'exchangePairs',
    render: (text, record) => {
      return (
        <td><img className="collectStar" style={{ width: 12, cursor: 'pointer',   marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</td>
      )
    },
    align: 'center',
    sorter: (a, b) => {
      return b.exchangePairs.charCodeAt(0) - a.exchangePairs.charCodeAt(0)
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
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    isCollected: true,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    isCollected: true,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '6',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '7',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '8',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '9',
    isCollected: true,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '10',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '11',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '12',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '13',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '14',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '15',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '16',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '17',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '18',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '19',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '20',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '21',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '22',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '23',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '24',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '25',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '26',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '27',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '28',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '29',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '30',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '31',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '32',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '33',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '34',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '35',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '36',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '37',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '38',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '39',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '40',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]

export const columnsBTC = [
  {
    title: '币种',
    dataIndex: 'exchangePairs',
    render: (text, record) => {
      return (
        <span><img className="collectStar" style={{ width: 12, cursor: 'pointer', marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</span>
      )
    },
    align: 'center',
    sorter: (a, b) => {
      return b.exchangePairs.charCodeAt(0) - a.exchangePairs.charCodeAt(0)
    },
    width: '34%'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.newPrice) - parseFloat(b.newPrice)
    },
    width: '40%'
  },
  {
    title: '涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.highsAndLows) - parseFloat(b.highsAndLows)
    },
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>,
    width: '36%'
  }
]

export const dataBTC = [
  {
    key: '1',
    isCollected: false,
    exchangePairs: 'ADA',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '2',
    isCollected: true,
    exchangePairs: 'ATOM',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '3',
    isCollected: false,
    exchangePairs: 'BAT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'BCH',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '5',
    isCollected: true,
    exchangePairs: 'BSV',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '6',
    isCollected: true,
    exchangePairs: 'BTM',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '7',
    isCollected: false,
    exchangePairs: 'BTT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '8',
    isCollected: true,
    exchangePairs: 'BTU',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '9',
    isCollected: false,
    exchangePairs: 'CET',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '10',
    isCollected: false,
    exchangePairs: 'CMT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '11',
    isCollected: false,
    exchangePairs: 'CNN',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '12',
    isCollected: false,
    exchangePairs: 'CODY',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '13',
    isCollected: false,
    exchangePairs: 'CTXC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '14',
    isCollected: false,
    exchangePairs: 'DASH',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '15',
    isCollected: false,
    exchangePairs: 'DCR',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '16',
    isCollected: false,
    exchangePairs: 'DERO',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '17',
    isCollected: false,
    exchangePairs: 'DOGE',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '18',
    isCollected: false,
    exchangePairs: 'EGT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '19',
    isCollected: false,
    exchangePairs: 'EOS',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '20',
    isCollected: false,
    exchangePairs: 'ETC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '21',
    isCollected: false,
    exchangePairs: 'ETH',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '22',
    isCollected: false,
    exchangePairs: 'GNT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '23',
    isCollected: false,
    exchangePairs: 'HC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '24',
    isCollected: false,
    exchangePairs: 'HOT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '25',
    isCollected: false,
    exchangePairs: 'HYDRO',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '26',
    isCollected: false,
    exchangePairs: 'IOTA',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '27',
    isCollected: false,
    exchangePairs: 'KAN',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '28',
    isCollected: false,
    exchangePairs: 'LAMB',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '29',
    isCollected: false,
    exchangePairs: 'LFC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '30',
    isCollected: false,
    exchangePairs: 'LINK',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '31',
    isCollected: false,
    exchangePairs: 'LOOM',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '32',
    isCollected: false,
    exchangePairs: 'LTC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '33',
    isCollected: false,
    exchangePairs: 'NANO',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '34',
    isCollected: false,
    exchangePairs: 'NEO',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '35',
    isCollected: false,
    exchangePairs: 'NNB',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '36',
    isCollected: false,
    exchangePairs: 'OLT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '37',
    isCollected: false,
    exchangePairs: 'OMG',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '38',
    isCollected: false,
    exchangePairs: 'ONG',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '39',
    isCollected: false,
    exchangePairs: 'ONT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '40',
    isCollected: false,
    exchangePairs: 'QTUM',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '41',
    isCollected: false,
    exchangePairs: 'SC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '42',
    isCollected: false,
    exchangePairs: 'SEELE',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '43',
    isCollected: false,
    exchangePairs: 'TCT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '44',
    isCollected: false,
    exchangePairs: 'TRTL',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '45',
    isCollected: false,
    exchangePairs: 'TRX',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '46',
    isCollected: false,
    exchangePairs: 'ULT',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '47',
    isCollected: false,
    exchangePairs: 'VET',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '48',
    isCollected: false,
    exchangePairs: 'WWB',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '49',
    isCollected: false,
    exchangePairs: 'XLM',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '50',
    isCollected: false,
    exchangePairs: 'XMR',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '51',
    isCollected: false,
    exchangePairs: 'XRP',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '52',
    isCollected: false,
    exchangePairs: 'XZC',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '53',
    isCollected: false,
    exchangePairs: 'ZIL',
    newPrice: '--',
    highsAndLows: '--'
  },
  {
    key: '54',
    isCollected: false,
    exchangePairs: 'ZRX',
    newPrice: '--',
    highsAndLows: '--'
  }
]

export const columnsETH = [
  {
    title: '币种',
    dataIndex: 'exchangePairs',
    render: (text, record) => {
      return (
        <td><img className="collectStar" style={{ width: 12, cursor: 'pointer',   marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</td>
      )
    },
    align: 'center',
    sorter: (a, b) => {
      return b.exchangePairs.charCodeAt(0) - a.exchangePairs.charCodeAt(0)
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
    isCollected: true,
    exchangePairs: 'BCH',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]

export const columnsBCT = [
  {
    title: '币种',
    dataIndex: 'exchangePairs',
    render: (text, record) => {
      return (
        <td><img className="collectStar" style={{ width: 12, cursor: 'pointer',   marginRight: 5, marginBottom: 3 }} src={ record.isCollected ? star2 : star1 } alt="" />{ text }</td>
      )
    },
    align: 'center',
    sorter: (a, b) => {
      return b.exchangePairs.charCodeAt(0) - a.exchangePairs.charCodeAt(0)
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
    isCollected: true,
    exchangePairs: 'BWD',
    newPrice: '0.00000000',
    highsAndLows: '-00.00%'
  },
  {
    key: '2',
    isCollected: true,
    exchangePairs: 'YC',
    newPrice: '1230.00000000',
    highsAndLows: '1.00%'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'SC',
    newPrice: '10.01234000',
    highsAndLows: '-0.10%'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'BKK',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'USDT',
    newPrice: '0.00000000',
    highsAndLows: '00.00%'
  }
]
import React from 'react'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

export const columnsUSDT = [
  {
    title: '',
    dataIndex: 'isCollected',
    render: text => {
      return (
        <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />
      )
    },
    align: 'center'
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs',
    align: 'center'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice',
    defaultSortOrder: 'descend',
    align: 'center'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice',
    align: 'center'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume',
    align: 'center'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataUSDT = [
  {
    key: '1',
    isCollected: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000006 BTC'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000004 BTC'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000199 BTC'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '-8.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00002305 BTC'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00099999 BTC'
  },
  {
    key: '6',
    isCollected: true,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '-6.01%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000053 BTC'
  }
]

export const columnsBTC = [
  {
    title: '',
    dataIndex: 'isCollected',
    render: text => {
      return (
        <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />
      )
    },
    align: 'center'
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs',
    align: 'center'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>,
    align: 'center'
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice',
    align: 'center'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice',
    align: 'center'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume',
    align: 'center'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    },
    align: 'center'
  }
]

export const dataBTC = [
  {
    key: '1',
    isCollected: false,
    exchangePairs: 'ADA/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'ATOM/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '3',
    isCollected: false,
    exchangePairs: 'BAT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'BCH/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'BSV/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '6',
    isCollected: false,
    exchangePairs: 'BTM/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '7',
    isCollected: false,
    exchangePairs: 'BTT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '8',
    isCollected: false,
    exchangePairs: 'BTU/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '9',
    isCollected: false,
    exchangePairs: 'CET/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '10',
    isCollected: false,
    exchangePairs: 'CMT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '11',
    isCollected: false,
    exchangePairs: 'CNN/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '12',
    isCollected: false,
    exchangePairs: 'CODY/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '13',
    isCollected: false,
    exchangePairs: 'CTXC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '14',
    isCollected: false,
    exchangePairs: 'DASH/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '15',
    isCollected: false,
    exchangePairs: 'DCR/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '16',
    isCollected: false,
    exchangePairs: 'DERO/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '17',
    isCollected: false,
    exchangePairs: 'DOGE/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '18',
    isCollected: false,
    exchangePairs: 'EGT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '19',
    isCollected: false,
    exchangePairs: 'EOS/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '20',
    isCollected: false,
    exchangePairs: 'ETC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '21',
    isCollected: false,
    exchangePairs: 'ETH/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '22',
    isCollected: false,
    exchangePairs: 'GNT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '23',
    isCollected: false,
    exchangePairs: 'HC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '24',
    isCollected: false,
    exchangePairs: 'HOT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '25',
    isCollected: false,
    exchangePairs: 'HYDRO/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '26',
    isCollected: false,
    exchangePairs: 'IOTA/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '27',
    isCollected: false,
    exchangePairs: 'KAN/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '28',
    isCollected: false,
    exchangePairs: 'LAMB/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '29',
    isCollected: false,
    exchangePairs: 'LFC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '30',
    isCollected: false,
    exchangePairs: 'LINK/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '31',
    isCollected: false,
    exchangePairs: 'LOOM/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '32',
    isCollected: false,
    exchangePairs: 'LTC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '33',
    isCollected: false,
    exchangePairs: 'NANO/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '34',
    isCollected: false,
    exchangePairs: 'NEO/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '35',
    isCollected: false,
    exchangePairs: 'NNB/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '36',
    isCollected: false,
    exchangePairs: 'OLT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '37',
    isCollected: false,
    exchangePairs: 'OMG/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '38',
    isCollected: false,
    exchangePairs: 'ONG/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '39',
    isCollected: false,
    exchangePairs: 'ONT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '40',
    isCollected: false,
    exchangePairs: 'QTUM/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '41',
    isCollected: false,
    exchangePairs: 'SC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '42',
    isCollected: false,
    exchangePairs: 'SEELE/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '43',
    isCollected: false,
    exchangePairs: 'TCT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '44',
    isCollected: false,
    exchangePairs: 'TRTL/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '45',
    isCollected: false,
    exchangePairs: 'TRX/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '46',
    isCollected: false,
    exchangePairs: 'ULT/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '47',
    isCollected: false,
    exchangePairs: 'VET/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '48',
    isCollected: false,
    exchangePairs: 'WWB/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '49',
    isCollected: false,
    exchangePairs: 'XLM/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '50',
    isCollected: false,
    exchangePairs: 'XMR/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '51',
    isCollected: false,
    exchangePairs: 'XRP/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '52',
    isCollected: false,
    exchangePairs: 'XZC/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '53',
    isCollected: false,
    exchangePairs: 'ZIL/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  },
  {
    key: '54',
    isCollected: false,
    exchangePairs: 'ZRX/BTC',
    newPrice: '--',
    highsAndLows: '--',
    highestPrice: '--',
    minimumPrice: '--',
    dailyVolume: '--',
    dailyTurnover: '--'
  }
]

export const columnsETH = [
  {
    title: '',
    dataIndex: 'isCollected',
    render: text => {
      return (
        <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />
      )
    }
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataETH= [
  {
    key: '1',
    isCollected: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]

export const columnsBCT = [
  {
    title: '',
    dataIndex: 'isCollected',
    render: text => {
      return (
        <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />
      )
    }
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataBCT = [
  {
    key: '1',
    isCollected: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]

export const columnsFree = [
  {
    title: '',
    dataIndex: 'isCollected',
    render: text => {
      return (
        <img className="collectStar" style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />
      )
    }
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataFree = [
  {
    key: '1',
    isCollected: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    isCollected: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    isCollected: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]